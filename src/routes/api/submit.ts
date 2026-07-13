import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

// Single canonical submission endpoint for both the application (ApplyForm) and the
// contact form (C1). It validates server-side, then delivers the submission to an
// email/automation webhook. It returns success ONLY when delivery actually
// succeeded; it never fakes a success on a hiring form.
//
// Destination is provider-agnostic via env (set in Vercel, never hard-coded):
//   SUBMISSIONS_WEBHOOK_URL — an email/automation webhook (Make / Zapier / Resend, etc.)
//   that turns the payload into an email to the Bridges inbox.
//
// We POST a JSON payload (not raw multipart) so nothing is dropped by the receiver:
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
//
// If the env var is unset, the endpoint responds 503 { ok:false, error:"not_configured" }
// so the UI shows a clear failure rather than silently dropping an application.
//
// NOTE: server routes run on Vercel's function layer, not the static output — confirm
// that layer is active on the final domain (see open-questions C4b).

const APPLY_REQUIRED = ["name", "contact", "english", "location", "why"];
const CONTACT_REQUIRED = ["name", "email", "message"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Effective end-to-end cap on the RAW file. Two size limits bind the chain:
//  1. Inbound (browser → this function) is raw multipart: must stay under Vercel's
//     ~4.5 MB request-body limit.
//  2. Outbound (this function → webhook) is JSON with the CV base64-encoded, which is
//     ~33% larger than the raw file; it must stay under the webhook receiver's limit
//     (Make / Zapier / Resend, typically a few MB).
// 3 MB raw → ~3.1 MB inbound and ~4.0 MB outbound JSON — both comfortably safe. This is
// the largest real file that reliably makes it all the way to the inbox.
const MAX_CV_BYTES = 3 * 1024 * 1024; // 3 MB (raw); ~4.0 MB once base64-encoded outbound
const ALLOWED_CV_EXT = [".pdf", ".doc", ".docx"];

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const Route = createFileRoute("/api/submit")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        let form: FormData;
        try {
          form = await request.formData();
        } catch {
          return json({ ok: false, error: "bad_request" }, 400);
        }

        const formType = String(form.get("formType") ?? "");
        if (formType !== "apply" && formType !== "contact") {
          return json({ ok: false, error: "unknown_form_type" }, 400);
        }

        // --- Server-side validation (mirrors the client) ---
        const required = formType === "apply" ? APPLY_REQUIRED : CONTACT_REQUIRED;
        const errors: Record<string, string> = {};
        for (const field of required) {
          if (!String(form.get(field) ?? "").trim()) errors[field] = "required";
        }
        if (formType === "contact") {
          const email = String(form.get("email") ?? "").trim();
          if (email && !errors.email && !EMAIL_RE.test(email)) errors.email = "invalid_email";
        }

        // Validate the optional CV.
        const cv = form.get("cv");
        const hasCv = formType === "apply" && cv instanceof File && cv.size > 0;
        if (hasCv) {
          const name = (cv as File).name.toLowerCase();
          if (!ALLOWED_CV_EXT.some((ext) => name.endsWith(ext))) errors.cv = "invalid_type";
          else if ((cv as File).size > MAX_CV_BYTES) errors.cv = "too_large";
        }

        if (Object.keys(errors).length > 0) {
          return json({ ok: false, errors }, 422);
        }

        // --- Build the JSON payload ---
        const fields: Record<string, string> = {};
        for (const [key, value] of form.entries()) {
          if (key === "cv" || key === "formType") continue;
          if (typeof value === "string" && value.trim()) fields[key] = value;
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

        const who = fields.name ?? fields.contact ?? fields.email ?? "";
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
        const webhook = process.env.SUBMISSIONS_WEBHOOK_URL;
        if (!webhook) {
          // No destination configured — fail loudly rather than drop the submission.
          console.error("[submit] SUBMISSIONS_WEBHOOK_URL is not set; submission not delivered");
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
            return json({ ok: false, error: "delivery_failed" }, 502);
          }
        } catch (err) {
          console.error("[submit] delivery error", err);
          return json({ ok: false, error: "delivery_failed" }, 502);
        }

        return json({ ok: true });
      },
    },
  },
});
