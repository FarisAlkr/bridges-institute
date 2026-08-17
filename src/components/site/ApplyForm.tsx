import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import { HoneypotField } from "./HoneypotField";
import {
  ALLOWED_CV_EXT,
  CV_ACCEPT,
  ELAPSED_FIELD,
  LOCALE_FIELD,
  MAX_CV_BYTES,
  MAX_CV_MB,
} from "@/lib/form-protection";

// Single canonical application form used on the homepage (#apply) and /teach.
// Submits to the canonical /api/submit endpoint (C1); shows the success state only on a
// real delivery, and a retry-able error otherwise.

// Order matters: used to focus the first invalid field on submit. Mirrors
// APPLY_REQUIRED in src/routes/api/submit.ts, which re-validates server-side.
//
// Phone and email are separate fields, and the degree question is required, at the
// client's request. `experience` is deliberately NOT required: the client describes
// teaching experience as an advantage rather than a condition.
const REQUIRED = ["name", "phone", "email", "english", "degree", "location", "why"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ApplyForm() {
  const { t, i18n } = useTranslation("common");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Filename for the custom upload control below — the native one is hidden.
  const [cvName, setCvName] = useState("");
  // When the form first appeared on screen. Set in an effect, never during render, so
  // the prerendered HTML carries no build-time timestamp. The server is sent the elapsed
  // duration rather than two clocks to compare, so a wrong device clock cannot matter.
  const shownAt = useRef<number | null>(null);
  useEffect(() => {
    shownAt.current = Date.now();
  }, []);

  // The confirmation panel is shorter than the form it replaces, so the page collapses
  // under the reader and they can end up looking at whitespace below it — having just
  // uploaded a CV with no idea whether it worked. Pull it into view.
  const successRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!submitted) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    successRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  }, [submitted]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    for (const name of REQUIRED) {
      if (!String(data.get(name) ?? "").trim()) {
        next[name] = t("form.requiredError", { field: t(`applyForm.errorFields.${name}`) });
      }
    }
    const email = String(data.get("email") ?? "").trim();
    if (email && !next.email && !EMAIL_RE.test(email)) next.email = t("form.emailError");
    // The CV is mandatory at the client's request; the server re-checks all three rules.
    const cv = data.get("cv");
    if (!(cv instanceof File) || cv.size === 0) {
      next.cv = t("form.requiredError", { field: t("applyForm.cv") });
    } else {
      const name = cv.name.toLowerCase();
      if (!ALLOWED_CV_EXT.some((ext) => name.endsWith(ext))) next.cv = t("form.cvTypeError");
      else if (cv.size > MAX_CV_BYTES) next.cv = t("form.cvSizeError", { max: MAX_CV_MB });
    }
    setErrors(next);
    const firstInvalid = [...REQUIRED, "cv"].find((n) => next[n]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setFormError("");
    setSending(true);
    data.set("formType", "apply");
    // Which language the applicant actually filled in, so their confirmation email comes
    // back in that language rather than defaulting to English.
    data.set(LOCALE_FIELD, i18n.language);
    if (shownAt.current !== null) data.set(ELAPSED_FIELD, String(Date.now() - shownAt.current));
    try {
      const res = await fetch("/api/submit", { method: "POST", body: data });
      if (res.ok) {
        setSubmitted(true);
        return;
      }
      if (res.status === 422) {
        const body = (await res.json().catch(() => null)) as {
          errors?: Record<string, string>;
        } | null;
        if (body?.errors) {
          const mapped: Record<string, string> = {};
          for (const [field, code] of Object.entries(body.errors)) {
            mapped[field] =
              code === "invalid_type"
                ? t("form.cvTypeError")
                : code === "too_large"
                  ? t("form.cvSizeError", { max: MAX_CV_MB })
                  : code === "invalid_email"
                    ? t("form.emailError")
                    : t("form.requiredError", {
                        field: t(`applyForm.errorFields.${field}`, field),
                      });
          }
          setErrors(mapped);
          document.getElementById(Object.keys(mapped)[0])?.focus();
          return;
        }
      }
      setFormError(t("form.submitError"));
    } catch {
      setFormError(t("form.submitError"));
    } finally {
      setSending(false);
    }
  }

  function clearError(name: string) {
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  if (submitted) {
    return (
      // role="status" makes a screen reader announce this — the panel simply replacing
      // the form is silent otherwise, so a non-sighted applicant got no confirmation at
      // all that their application went through.
      <div
        ref={successRef}
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-brass-deep bg-ivory p-8 md:p-10 text-center"
      >
        <CheckCircle2 size={44} aria-hidden className="mx-auto text-brass-deep" strokeWidth={1.5} />
        <div className="eyebrow justify-center mt-5">{t("applyForm.thankYou")}</div>
        <h3 className="mt-3 font-display text-2xl md:text-3xl text-ink">
          {t("applyForm.successTitle")}
        </h3>
        <p className="mt-4 mx-auto max-w-md text-slate-body leading-relaxed">
          {t("applyForm.successBody")}
        </p>
      </div>
    );
  }

  return (
    // method/action/encType matter even though handleSubmit intercepts every normal
    // submit: without them the HTML default is GET to the current page, so a submit that
    // happens before hydration — or with JS blocked — would put the applicant's name,
    // phone, email and free-text answers into the query string, and from there into
    // browser history, access logs and the Referer header, while the CV silently never
    // uploaded. With them, that same fallback is a real multipart POST to the endpoint.
    <form
      onSubmit={handleSubmit}
      method="post"
      action="/api/submit"
      encType="multipart/form-data"
      noValidate
      className="grid gap-6 md:grid-cols-2"
    >
      <HoneypotField />
      {/* Tells the no-JS fallback POST which form it is; the JS path sets it too. */}
      <input type="hidden" name="formType" value="apply" />
      <ApplyField
        label={t("applyForm.labels.name")}
        name="name"
        autoComplete="name"
        required
        error={errors.name}
        onClear={clearError}
      />
      <ApplyField
        label={t("applyForm.labels.phone")}
        name="phone"
        type="tel"
        autoComplete="tel"
        required
        error={errors.phone}
        onClear={clearError}
      />
      <ApplyField
        label={t("applyForm.labels.email")}
        name="email"
        type="email"
        autoComplete="email"
        required
        error={errors.email}
        onClear={clearError}
      />
      <ApplyField
        label={t("applyForm.labels.english")}
        name="english"
        placeholder={t("applyForm.placeholders.english")}
        required
        error={errors.english}
        onClear={clearError}
      />
      <ApplyField
        label={t("applyForm.labels.degree")}
        name="degree"
        placeholder={t("applyForm.placeholders.degree")}
        required
        error={errors.degree}
        onClear={clearError}
      />
      <ApplyField
        label={t("applyForm.labels.experience")}
        name="experience"
        placeholder={t("applyForm.placeholders.experience")}
        optionalLabel={t("form.optional")}
        error={errors.experience}
        onClear={clearError}
      />
      <ApplyField
        label={t("applyForm.labels.location")}
        name="location"
        placeholder={t("applyForm.placeholders.location")}
        required
        error={errors.location}
        onClear={clearError}
      />
      <div className="md:col-span-2">
        <ApplyField
          label={t("applyForm.labels.why")}
          name="why"
          placeholder={t("applyForm.placeholders.why")}
          required
          error={errors.why}
          onClear={clearError}
        />
      </div>

      {/* The CV is required, so it gets its own panel rather than sitting as one more
          row among the text fields — an applicant who misses it cannot submit at all. */}
      <div className="md:col-span-2 rounded-2xl border border-brass/40 bg-cream/50 p-5 md:p-6">
        {/* Two <label for="cv"> elements would otherwise concatenate into the accessible
            name ("CV * Upload CV"), so the input is named from this one explicitly. The
            asterisk is decorative — `required` is what conveys requiredness to a screen
            reader, and read aloud "star" is just noise. */}
        <label htmlFor="cv" id="cv-label" className="eyebrow block">
          {t("applyForm.cv")}
          <span aria-hidden="true" className="text-brass-deep">
            {" *"}
          </span>
        </label>
        {/* The browser's own file button and "no file chosen" text are labelled in the
            OS/browser language, which put Hebrew chrome on the English page. The real
            input is hidden from sight but still focusable, and this label is the visible
            control — `peer` carries its focus ring so keyboard users can see it. */}
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <input
            id="cv"
            name="cv"
            type="file"
            accept={CV_ACCEPT}
            required
            aria-labelledby="cv-label"
            aria-invalid={errors.cv ? true : undefined}
            aria-describedby={errors.cv ? "cv-hint cv-error" : "cv-hint"}
            onChange={(e) => {
              clearError("cv");
              setCvName(e.currentTarget.files?.[0]?.name ?? "");
            }}
            className="sr-only peer"
          />
          {/* Same brushed-gold treatment as the hero's Apply CTA (btn-gold + cta-gold),
              so the one required upload reads as a primary action. `peer-focus` rather
              than `peer-focus-visible` because the ring must also appear when validation
              moves focus here programmatically. */}
          <label
            htmlFor="cv"
            className="btn-gold cta-gold cursor-pointer peer-focus:ring-2 peer-focus:ring-brass-deep peer-focus:ring-offset-2 peer-focus:ring-offset-cream"
          >
            <Upload size={16} aria-hidden />
            {t("form.uploadCv")}
          </label>
          {/* The native control announces the chosen filename by itself; since it is
              hidden, this stands in for that announcement. */}
          <span aria-live="polite" className="text-sm font-medium text-ink/80">
            {cvName || t("form.noFileSelected")}
          </span>
        </div>
        <p id="cv-hint" className="mt-3 text-sm text-slate-body">
          {t("form.cvHint", { max: MAX_CV_MB })}
        </p>
        {errors.cv && (
          <p id="cv-error" role="alert" className="mt-2 text-sm font-medium text-error">
            {errors.cv}
          </p>
        )}
      </div>

      <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-4">
        <div className="max-w-md space-y-3">
          <p className="text-sm text-slate-body leading-relaxed">{t("applyForm.consent")}</p>
          <p className="text-sm text-slate-body leading-relaxed">{t("applyForm.responseNotice")}</p>
        </div>
        <button type="submit" className="btn-primary" disabled={sending}>
          {sending ? t("form.submitting") : `${t("cta.applyToTeach")} `}
          {!sending && <ArrowUpRight size={16} aria-hidden />}
        </button>
      </div>

      {formError && (
        <p role="alert" className="md:col-span-2 text-sm font-medium text-error">
          {formError}
        </p>
      )}
    </form>
  );
}

function ApplyField({
  label,
  name,
  type = "text",
  required,
  placeholder,
  autoComplete,
  optionalLabel,
  error,
  onClear,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  optionalLabel?: string;
  error?: string;
  onClear: (name: string) => void;
}) {
  const base =
    "mt-3 block w-full border-0 border-b bg-transparent px-0 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass-deep focus-visible:ring-offset-2 focus-visible:ring-offset-ivory transition";
  return (
    <div>
      <label htmlFor={name} className="eyebrow block">
        {label}
        {/* Decorative: `required` on the input is what a screen reader announces. */}
        {required && (
          <span aria-hidden="true" className="text-brass-deep">
            {" *"}
          </span>
        )}
        {optionalLabel && (
          <span className="normal-case tracking-normal text-slate-body"> {optionalLabel}</span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        onInput={() => onClear(name)}
        className={`${base} ${error ? "border-error focus:border-error" : "border-ink/25 focus:border-brass-deep"}`}
      />
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-2 text-sm font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}
