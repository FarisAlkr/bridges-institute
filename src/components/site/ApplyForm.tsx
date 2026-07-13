import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

// Single canonical application form used on the homepage (#apply) and /teach.
// TODO(C1): wire a real submission endpoint + CV upload destination before launch.
// Until then this only shows a client-side success state — nothing is sent or stored.

// Order matters: used to focus the first invalid field on submit.
const REQUIRED = ["name", "contact", "english", "location", "why"] as const;

export function ApplyForm() {
  const { t } = useTranslation("common");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    for (const name of REQUIRED) {
      if (!String(data.get(name) ?? "").trim()) {
        next[name] = t("form.requiredError", { field: t(`applyForm.errorFields.${name}`) });
      }
    }
    setErrors(next);
    const firstInvalid = REQUIRED.find((n) => next[n]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    setSubmitted(true);
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
      <div className="rounded-2xl border border-brass-deep bg-ivory p-8 md:p-10 text-center">
        <div className="eyebrow justify-center">{t("applyForm.thankYou")}</div>
        <h3 className="mt-4 font-display text-2xl md:text-3xl text-ink">
          {t("applyForm.successTitle")}
        </h3>
        <p className="mt-4 mx-auto max-w-md text-slate-body leading-relaxed">
          {t("applyForm.successBody")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-6 md:grid-cols-2">
      <ApplyField
        label={t("applyForm.labels.name")}
        name="name"
        autoComplete="name"
        required
        error={errors.name}
        onClear={clearError}
      />
      <ApplyField
        label={t("applyForm.labels.contact")}
        name="contact"
        autoComplete="email"
        required
        error={errors.contact}
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

      <div className="md:col-span-2">
        <label htmlFor="cv" className="eyebrow block">
          {`${t("applyForm.cv")} `}
          <span className="normal-case tracking-normal text-slate-body">{t("form.optional")}</span>
        </label>
        <input
          id="cv"
          name="cv"
          type="file"
          accept=".pdf,.doc,.docx"
          className="mt-3 block w-full text-sm text-slate-body file:mr-4 file:rounded-full file:border-0 file:bg-ink file:px-6 file:py-3 file:text-xs file:uppercase file:tracking-[0.18em] file:text-ivory hover:file:bg-ink-soft"
        />
      </div>

      <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-md text-sm text-slate-body leading-relaxed">{t("applyForm.consent")}</p>
        <button type="submit" className="btn-primary">
          {`${t("cta.applyToTeach")} `}
          <ArrowUpRight size={16} aria-hidden />
        </button>
      </div>
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
  error,
  onClear,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  onClear: (name: string) => void;
}) {
  const base =
    "mt-3 block w-full border-0 border-b bg-transparent px-0 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass-deep focus-visible:ring-offset-2 focus-visible:ring-offset-ivory transition";
  return (
    <div>
      <label htmlFor={name} className="eyebrow block">
        {label}
        {required && <span className="text-brass-deep"> *</span>}
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
