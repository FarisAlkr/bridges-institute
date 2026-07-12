import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";

// Single canonical application form used on the homepage (#apply) and /teach.
// TODO(C1): wire a real submission endpoint + CV upload destination before launch.
// Until then this only shows a client-side success state — nothing is sent or stored.

export function ApplyForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-brass bg-ivory p-8 md:p-10 text-center">
        <div className="eyebrow justify-center">Thank you</div>
        <h3 className="mt-4 font-display text-2xl md:text-3xl text-ink">Your application is in.</h3>
        <p className="mt-4 mx-auto max-w-md text-slate-body leading-relaxed">
          We read every application ourselves. We&apos;ll be in touch to set up a short
          conversation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
      <ApplyField label="Name" name="name" autoComplete="name" required />
      <ApplyField label="Phone or email" name="contact" autoComplete="email" required />
      <ApplyField
        label="Your English background"
        name="english"
        placeholder="e.g. native speaker, near-native, studied/lived abroad…"
        required
      />
      <ApplyField
        label="Location"
        name="location"
        placeholder="Which Negev town or area?"
        required
      />
      <div className="md:col-span-2">
        <ApplyField
          label="Why do you want to teach with Bridges?"
          name="why"
          placeholder="One line is enough."
          required
        />
      </div>

      <div className="md:col-span-2">
        <label htmlFor="cv" className="eyebrow block">
          CV <span className="normal-case tracking-normal text-slate-body">(optional)</span>
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
        <p className="max-w-md text-sm text-slate-body leading-relaxed">
          This is paid work, not volunteering. By applying, you agree to be contacted about your
          application.
        </p>
        <button type="submit" className="btn-primary">
          Apply to Teach <ArrowUpRight size={16} />
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  const base =
    "mt-3 block w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-ink placeholder:text-ink/40 focus:border-brass focus:outline-none focus:ring-0 transition";
  return (
    <div>
      <label htmlFor={name} className="eyebrow block">
        {label}
        {required && <span className="text-brass"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={base}
      />
    </div>
  );
}
