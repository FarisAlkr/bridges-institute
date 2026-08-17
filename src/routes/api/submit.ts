import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import {
  ALLOWED_CV_EXT,
  ELAPSED_FIELD,
  HONEYPOT_FIELD,
  LOCALE_FIELD,
  MAX_CV_BYTES,
  MIN_FILL_MS,
  looksLikeRepeatedFiller,
} from "@/lib/form-protection";
import { DEFAULT_LOCALE, isLocale, metaT, type Locale } from "@/i18n";
import { SITE_URL } from "@/site-config";

// Single canonical submission endpoint for both the application (ApplyForm) and the
// contact form (C1). It validates server-side, then delivers the submission by email.
// It returns success ONLY when delivery actually succeeded; it never fakes a success on
// a hiring form.
//
// Two delivery paths, chosen by which env vars are set (never hard-coded):
//
//   1. RESEND_API_KEY + SUBMISSIONS_TO_EMAIL  [preferred]
//      Sends the email directly through Resend, attaching the CV here in code. Optional
//      SUBMISSIONS_FROM_EMAIL overrides the sender once a domain is verified in Resend.
//
//   2. SUBMISSIONS_WEBHOOK_URL  [fallback]
//      POSTs the JSON payload below to a Make/Zapier-style automation, which then has to
//      base64-decode the CV itself. Kept so an existing automation keeps working.
//
// Path 1 is preferred precisely because the attachment is built here, under test, rather
// than depending on a receiver elsewhere decoding cv.base64 correctly.
//
// Neither configured → 503 not_configured, so the UI shows a clear failure rather than
// silently dropping an application.
//
// The webhook payload (path 2):
//   {
//     formType: "apply" | "contact",
//     subject:  string,                    // ready-to-use email subject
//     text:     string,                    // ready-to-use plain-text body (all fields)
//     fields:   { [name]: string },        // structured fields for mapping
//     cv: null | {                         // apply only; null if no CV uploaded
//       filename, contentType, sizeBytes,
//       base64                             // full file bytes — decode to a real attachment
//     },
//     receivedAt: ISO string
//   }
// The CV is embedded as base64 so it always arrives (multipart file parts get dropped by
// some webhook receivers). The automation decodes cv.base64 into an email attachment (or
// uploads it and links to it) — a real attachment or working link, not dropped.

// Mirrors REQUIRED in src/components/site/ApplyForm.tsx. Phone and email are separate
// fields and the degree question is required, at the client's request; `experience` is
// optional because the client treats teaching experience as an advantage, not a
// condition.
const APPLY_REQUIRED = ["name", "phone", "email", "english", "degree", "location", "why"];
const CONTACT_REQUIRED = ["name", "email", "message"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// The accepted formats and the size cap live in form-protection.ts alongside the field
// names, so the browser hint, the client-side guard and this server check are one source
// of truth and cannot drift apart.

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// The form carries method="post" action="/api/submit" so that a submit landing before
// hydration — or with JS blocked — still delivers instead of leaking the applicant's
// answers into a GET query string. Those submissions are real browser navigations, so
// they must be answered with a page, not with JSON. fetch() sends `Accept: */*`, a
// browser navigation sends `text/html`, which is what separates the two paths.
function wantsHtml(request: Request): boolean {
  return (request.headers.get("accept") ?? "").includes("text/html");
}

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

// Minimal self-contained confirmation for the no-JS path, in the applicant's language.
// Deliberately plain: it exists so nobody is ever shown raw JSON after applying.
function htmlResponse(locale: Locale, title: string, body: string, status = 200) {
  const t = metaT(locale, "common");
  const dir = locale === "en" ? "ltr" : "rtl";
  return new Response(
    `<!doctype html><html lang="${locale}" dir="${dir}"><head><meta charset="utf-8">` +
      `<meta name="viewport" content="width=device-width,initial-scale=1">` +
      `<title>${escapeHtml(title)}</title>` +
      `<style>body{margin:0;display:grid;place-items:center;min-height:100vh;` +
      `font:16px/1.6 system-ui,sans-serif;background:#f7f4ee;color:#1c1b18;padding:24px}` +
      `main{max-width:34rem;text-align:center}h1{font-size:1.5rem;margin:0 0 .75rem}` +
      `a{color:#8a6a2f}</style></head><body><main><h1>${escapeHtml(title)}</h1>` +
      `<p>${escapeHtml(body)}</p><p><a href="${SITE_URL}">${escapeHtml(t("brand"))}</a></p>` +
      `</main></body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

// --- Abuse controls ---------------------------------------------------------------
// This is a public endpoint that relays into the client's inbox, so it needs a floor of
// protection against bots and bursts. Deliberately NO timing heuristics or CAPTCHA:
// on a hiring form, silently losing one real application costs more than receiving
// some spam, and both of those techniques trade false negatives for false positives.

// Best-effort in-memory limiter. Fluid Compute reuses instances across concurrent
// requests, so this reliably blunts a burst from a single source — it is not a
// distributed guarantee across all instances and is not intended as one.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const recentHits = new Map<string, number[]>();

function clientIp(request: Request): string {
  // Vercel sets x-forwarded-for; the client address is the first entry.
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;

  // Prune expired entries so the map cannot grow unbounded on a long-lived instance.
  for (const [key, times] of recentHits) {
    const kept = times.filter((t) => t > cutoff);
    if (kept.length) recentHits.set(key, kept);
    else recentHits.delete(key);
  }

  const times = recentHits.get(ip) ?? [];
  if (times.length >= RATE_LIMIT_MAX) return true;
  times.push(now);
  recentHits.set(ip, times);
  return false;
}

// --- Delivery via Resend -----------------------------------------------------------
//
// Sender address. Resend will only send from a domain verified in the Resend dashboard;
// until bridges-institute.com is verified there, `onboarding@resend.dev` is the one
// address it accepts — and it can then only deliver to the Resend account owner's own
// email. That is enough to prove the pipeline end to end. Once the domain is verified,
// set SUBMISSIONS_FROM_EMAIL to something like
// "Bridges Institute <applications@bridges-institute.com>" and it sends to anyone.
const DEFAULT_FROM = "Bridges Institute <onboarding@resend.dev>";

type SubmissionPayload = {
  formType: string;
  subject: string;
  text: string;
  fields: Record<string, string>;
  cv: { filename: string; contentType: string; sizeBytes: number; base64: string } | null;
  receivedAt: string;
};

// Returns true only on a real accepted send.
async function deliverViaResend(
  apiKey: string,
  to: string,
  payload: SubmissionPayload,
): Promise<boolean> {
  const applicant = payload.fields.email;
  const body: Record<string, unknown> = {
    from: process.env.SUBMISSIONS_FROM_EMAIL || DEFAULT_FROM,
    // Comma-separated list is supported, so one env var can fan out to several people.
    to: to
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean),
    subject: payload.subject,
    text: `${payload.text}\n\nReceived: ${payload.receivedAt}`,
  };
  // Replying to the notification then answers the applicant directly.
  if (applicant && EMAIL_RE.test(applicant)) body.reply_to = applicant;
  // Resend takes attachment bytes as base64 in `content` — the same bytes we already
  // read off the upload, so the CV arrives as a real file with no decode step in
  // between. This is what the webhook route could never guarantee.
  if (payload.cv) {
    body.attachments = [{ filename: payload.cv.filename, content: payload.cv.base64 }];
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      // Resend explains refusals (unverified domain, bad recipient) in the body — log it,
      // it is the difference between a 5-second fix and an afternoon.
      console.error(`[submit] resend responded ${res.status}: ${await res.text()}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[submit] resend delivery error", err);
    return false;
  }
}

// Acknowledgement to the SENDER — applicant or contact enquiry alike — in the language
// they filled the form in.
//
// The copy is the client's own approved success text for that form, reused verbatim —
// including the deliberately conditional "IF your background matches one of our current
// needs" on the apply side. This email must not promise more than the on-screen
// confirmation does, so each form's receipt repeats its own success panel and nothing more.
//
// Best-effort by design: it is sent only AFTER the submission itself is safely
// delivered, and a failure here is logged and swallowed. A sender not receiving a
// receipt is a small problem; a submission failing because the receipt bounced is a
// serious one.
async function sendSubmitterReceipt(
  apiKey: string,
  to: string,
  locale: Locale,
  formType: "apply" | "contact",
  replyTo: string | undefined,
): Promise<void> {
  const t = metaT(locale, "common");
  const signature = `${t("brand")} — ${SITE_URL}`;

  // Apply copy lives in `common` (shared by the homepage and /teach forms); the contact
  // form's success copy lives in its own page namespace.
  const c = metaT(locale, "contact");
  const { subject, text } =
    formType === "apply"
      ? {
          subject: t("applyForm.emailSubject"),
          text: [
            t("applyForm.thankYou"),
            "",
            t("applyForm.successTitle"),
            t("applyForm.successBody"),
            "",
            signature,
          ].join("\n"),
        }
      : {
          subject: c("form.emailSubject"),
          text: [c("form.successTitle"), c("form.successBody"), "", signature].join("\n"),
        };

  const body: Record<string, unknown> = {
    from: process.env.SUBMISSIONS_FROM_EMAIL || DEFAULT_FROM,
    to: [to],
    subject,
    text,
  };
  // A reply goes to the Bridges inbox, not into the void.
  if (replyTo) body.reply_to = replyTo.split(",")[0]?.trim();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`resend ${res.status}: ${await res.text()}`);
}

// Reject cross-site posts. A MISSING Origin header is allowed through on purpose:
// some same-origin form posts omit it, and rejecting those would drop real
// applications. This blocks the naive cross-origin case, nothing more.
function isCrossSite(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host !== new URL(request.url).host;
  } catch {
    return true;
  }
}

export const Route = createFileRoute("/api/submit")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        if (isCrossSite(request)) {
          return json({ ok: false, error: "forbidden" }, 403);
        }
        if (isRateLimited(clientIp(request))) {
          return json({ ok: false, error: "rate_limited" }, 429);
        }

        let form: FormData;
        try {
          form = await request.formData();
        } catch {
          return json({ ok: false, error: "bad_request" }, 400);
        }

        // Honeypot: only a bot fills this. Answer 200 so it believes it succeeded and
        // moves on instead of retrying, but deliver nothing.
        if (String(form.get(HONEYPOT_FIELD) ?? "").trim()) {
          console.warn("[submit] discarded a submission that tripped the honeypot");
          return json({ ok: true });
        }

        // Submitted faster than a person can type. Only judged when the client actually
        // reported a duration — a missing value is NOT treated as suspicious, so a
        // genuine applicant is never rejected because the measurement failed to arrive.
        const elapsed = Number(form.get(ELAPSED_FIELD));
        if (Number.isFinite(elapsed) && elapsed > 0 && elapsed < MIN_FILL_MS) {
          console.warn(`[submit] discarded a submission filled in ${elapsed}ms`);
          return json({ ok: true });
        }

        const formType = String(form.get("formType") ?? "");
        if (formType !== "apply" && formType !== "contact") {
          return json({ ok: false, error: "unknown_form_type" }, 400);
        }

        // Needed here (not just at receipt time) so the no-JS HTML replies are in the
        // language the applicant actually filled the form in.
        const rawLocale = String(form.get(LOCALE_FIELD) ?? "");
        const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
        const asHtml = wantsHtml(request);
        const tc = metaT(locale, "common");
        const ok = () =>
          asHtml
            ? htmlResponse(locale, tc("applyForm.successTitle"), tc("applyForm.successBody"))
            : json({ ok: true });

        // --- Server-side validation (mirrors the client) ---
        const required = formType === "apply" ? APPLY_REQUIRED : CONTACT_REQUIRED;
        const errors: Record<string, string> = {};
        for (const field of required) {
          if (!String(form.get(field) ?? "").trim()) errors[field] = "required";
        }
        // Both forms now carry a dedicated email field.
        const email = String(form.get("email") ?? "").trim();
        if (email && !errors.email && !EMAIL_RE.test(email)) errors.email = "invalid_email";

        // The CV is mandatory on the apply form at the client's request. The contact form
        // has no CV field, so this only ever applies to applications.
        const cv = form.get("cv");
        const hasCv = formType === "apply" && cv instanceof File && cv.size > 0;
        if (formType === "apply" && !hasCv) {
          errors.cv = "required";
        } else if (hasCv) {
          const name = (cv as File).name.toLowerCase();
          if (!ALLOWED_CV_EXT.some((ext) => name.endsWith(ext))) errors.cv = "invalid_type";
          else if ((cv as File).size > MAX_CV_BYTES) errors.cv = "too_large";
        }

        if (Object.keys(errors).length > 0) {
          if (asHtml) {
            return htmlResponse(locale, tc("form.errorTitle"), tc("form.submitError"), 422);
          }
          return json({ ok: false, errors }, 422);
        }

        // --- Build the JSON payload ---
        const fields: Record<string, string> = {};
        for (const [key, value] of form.entries()) {
          if (key === "cv" || key === "formType" || key === HONEYPOT_FIELD) continue;
          if (key === ELAPSED_FIELD || key === LOCALE_FIELD) continue;
          if (typeof value === "string" && value.trim()) fields[key] = value;
        }

        // One token pasted into several unrelated free-text boxes. This is what the
        // observed spam actually looked like — "Pranab" as the English background, the
        // degree AND the reason for applying — and it is the signal the honeypot missed,
        // because that bot renders the page properly and skips hidden inputs.
        if (looksLikeRepeatedFiller(fields)) {
          console.warn("[submit] discarded a submission with the same answer repeated");
          return ok();
        }

        let cvPayload: {
          filename: string;
          contentType: string;
          sizeBytes: number;
          base64: string;
        } | null = null;
        if (hasCv) {
          const file = cv as File;
          const buf = Buffer.from(await file.arrayBuffer());
          cvPayload = {
            filename: file.name,
            contentType: file.type || "application/octet-stream",
            sizeBytes: file.size,
            base64: buf.toString("base64"),
          };
        }

        const who = fields.name ?? fields.email ?? fields.phone ?? "";
        const subject =
          formType === "apply"
            ? `New teaching application${who ? ` — ${who}` : ""}`
            : `New contact message${who ? ` — ${who}` : ""}`;
        const text = Object.entries(fields)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n");

        const payload = {
          formType,
          subject,
          text,
          fields,
          cv: cvPayload,
          receivedAt: new Date().toISOString(),
        };

        // --- Deliver ---
        // Resend first when configured, because the CV attachment is then built here,
        // in code we test, instead of relying on a webhook receiver to base64-decode it
        // correctly. The webhook path stays as a fallback so an existing Make/Zapier
        // setup keeps working. Neither configured → 503, never a fake success.
        const resendKey = process.env.RESEND_API_KEY;
        const webhook = process.env.SUBMISSIONS_WEBHOOK_URL;

        if (resendKey) {
          const to = process.env.SUBMISSIONS_TO_EMAIL;
          if (!to) {
            console.error("[submit] RESEND_API_KEY is set but SUBMISSIONS_TO_EMAIL is not");
            return json({ ok: false, error: "not_configured" }, 503);
          }
          const delivered = await deliverViaResend(resendKey, to, payload);
          if (!delivered)
            return asHtml
              ? htmlResponse(locale, tc("form.errorTitle"), tc("form.submitError"), 502)
              : json({ ok: false, error: "delivery_failed" }, 502);

          // Only now that the submission is safely delivered, acknowledge to the sender —
          // both forms, so nobody is left wondering whether it arrived. Deliberately not
          // awaited into the response contract: if this throws, the submission still
          // succeeded and the user still sees success.
          const senderEmail = fields.email;
          if (senderEmail && EMAIL_RE.test(senderEmail)) {
            const rawLocale = String(form.get(LOCALE_FIELD) ?? "");
            const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
            try {
              await sendSubmitterReceipt(resendKey, senderEmail, locale, formType, to);
            } catch (err) {
              console.error(`[submit] ${formType} receipt failed (submission WAS delivered)`, err);
            }
          }
          return ok();
        }

        if (!webhook) {
          // No destination configured — fail loudly rather than drop the submission.
          console.error("[submit] no delivery destination configured; submission not delivered");
          return json({ ok: false, error: "not_configured" }, 503);
        }

        try {
          const res = await fetch(webhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) {
            console.error(`[submit] destination responded ${res.status}`);
            return asHtml
              ? htmlResponse(locale, tc("form.errorTitle"), tc("form.submitError"), 502)
              : json({ ok: false, error: "delivery_failed" }, 502);
          }
        } catch (err) {
          console.error("[submit] delivery error", err);
          return asHtml
            ? htmlResponse(locale, tc("form.errorTitle"), tc("form.submitError"), 502)
            : json({ ok: false, error: "delivery_failed" }, 502);
        }

        return ok();
      },
    },
  },
});
