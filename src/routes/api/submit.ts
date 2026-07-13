import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

// Single canonical submission endpoint for both the application (ApplyForm) and the
// contact form (C1). It validates server-side, then forwards the submission — including
// the optional CV file — to a configured destination. It returns success ONLY when the
// submission was actually delivered; it never fakes a success on a hiring form.
//
// Destination is provider-agnostic via env, so no provider is hard-coded:
//   SUBMISSIONS_WEBHOOK_URL   — receives the multipart form (fields + CV) via POST.
//                               Point it at your backend, an automation (Zapier/Make/
//                               n8n), or a form service. The CV file is included, so
//                               "CV destination" is wherever the webhook routes it.
// If it isn't set, the endpoint responds 503 { ok:false, error:"not_configured" } so the
// UI shows a clear failure rather than silently dropping an application.
//
// NOTE: server routes run on Vercel's function layer, not the static output — confirm
// that layer is active on the final domain (see open-questions C4b).

const APPLY_REQUIRED = ["name", "contact", "english", "location", "why"];
const CONTACT_REQUIRED = ["name", "email", "message"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_CV_BYTES = 5 * 1024 * 1024; // 5 MB
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
        if (formType === "apply" && cv instanceof File && cv.size > 0) {
          const name = cv.name.toLowerCase();
          if (!ALLOWED_CV_EXT.some((ext) => name.endsWith(ext))) errors.cv = "invalid_type";
          else if (cv.size > MAX_CV_BYTES) errors.cv = "too_large";
        }

        if (Object.keys(errors).length > 0) {
          return json({ ok: false, errors }, 422);
        }

        // --- Deliver ---
        const webhook = process.env.SUBMISSIONS_WEBHOOK_URL;
        if (!webhook) {
          // No destination configured — fail loudly rather than drop the submission.
          console.error("[submit] SUBMISSIONS_WEBHOOK_URL is not set; submission not delivered");
          return json({ ok: false, error: "not_configured" }, 503);
        }

        try {
          // Forward the full multipart payload (fields + CV) to the destination.
          const res = await fetch(webhook, { method: "POST", body: form });
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
