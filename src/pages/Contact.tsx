import { useState, type FormEvent } from "react";
import { Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";


const CONTACT_REQUIRED = [
  { name: "name", label: "Name" },
  { name: "email", label: "Email" },
  { name: "message", label: "Message" },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    for (const f of CONTACT_REQUIRED) {
      if (!String(data.get(f.name) ?? "").trim()) next[f.name] = `${f.label} is required.`;
    }
    const email = String(data.get("email") ?? "").trim();
    if (email && !next.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address.";
    }
    setErrors(next);
    const first = CONTACT_REQUIRED.map((f) => f.name).find((n) => next[n]);
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    setSent(true);
  }

  function clearError(name: string) {
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const nextErr = { ...prev };
      delete nextErr[name];
      return nextErr;
    });
  }

  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-cream border-b border-border">
        <div className="container-editorial max-w-4xl">
          <Reveal>
            <div className="eyebrow">Contact & Partnerships</div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl text-ink leading-[1.02]">
              Let's <em className="italic text-brass-deep font-light">talk.</em>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 md:mt-8 text-base md:text-lg text-slate-body max-w-2xl leading-relaxed">
              Whether you're a school exploring a program, a partner exploring a collaboration, or
              simply curious — we'd love to hear from you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-editorial grid gap-12 md:gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-10 md:space-y-12">
            <Reveal>
              <div>
                <div className="eyebrow">Visit</div>
                <div className="mt-5 flex gap-4 items-start">
                  <MapPin aria-hidden className="text-brass-deep mt-1 shrink-0" size={20} />
                  <p className="font-display text-xl md:text-2xl text-ink leading-snug">
                    Yehuda HaNachtom 10
                    <br />
                    Be'er Sheva, Israel
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div>
                <div className="eyebrow">Email</div>
                <div className="mt-5 flex gap-4 items-center">
                  <Mail aria-hidden className="text-brass-deep shrink-0" size={20} />
                  <a
                    href="mailto:info@bridgesinstitute.org"
                    className="link-underline font-display text-lg sm:text-xl md:text-2xl text-ink break-all"
                  >
                    info@bridgesinstitute.org
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div>
                <div className="eyebrow">Follow</div>
                <div className="mt-5 flex gap-3">
                  <a
                    href="https://facebook.com/BridgesEng"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 hover:border-brass-deep hover:text-brass-deep transition"
                  >
                    <Facebook size={16} />
                  </a>
                  <a
                    href="https://instagram.com/Bridgesinst"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 hover:border-brass-deep hover:text-brass-deep transition"
                  >
                    <Instagram size={16} />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="rounded-2xl border border-border bg-cream p-6 sm:p-8 md:p-10">
                <div className="eyebrow">Send a Message</div>
                {sent ? (
                  <div className="mt-8 text-center py-10">
                    <h3 className="font-display text-2xl md:text-3xl text-ink">
                      Thank you — message received.
                    </h3>
                    <p className="mt-3 text-slate-body">We'll be in touch shortly.</p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="mt-6 md:mt-8 grid gap-5 md:gap-6"
                  >
                    <div className="grid gap-6 md:grid-cols-2">
                      <Input
                        label="Name"
                        name="name"
                        required
                        error={errors.name}
                        onClear={clearError}
                      />
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        required
                        error={errors.email}
                        onClear={clearError}
                      />
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                      <Input label="Organization" name="org" onClear={clearError} />
                      <Input
                        label="Subject"
                        name="subject"
                        as="select"
                        options={[
                          "General Enquiry",
                          "Partnership",
                          "Programs for Schools",
                          "Press",
                        ]}
                        onClear={clearError}
                      />
                    </div>
                    <Input
                      label="Message"
                      name="message"
                      as="textarea"
                      required
                      error={errors.message}
                      onClear={clearError}
                    />
                    <button type="submit" className="btn-primary justify-self-start mt-2">
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-32">
        <div className="container-editorial">
          <SectionHeader eyebrow="Find Us" title="In the heart of Be'er Sheva." />
          <Reveal delay={120}>
            <div className="mt-10 md:mt-12 overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Bridges Institute on the map"
                src="https://www.google.com/maps?q=Yehuda+HaNachtom+10,+Be%27er+Sheva,+Israel&output=embed"
                className="w-full h-72 sm:h-96 md:h-[480px] grayscale-[0.4]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Input({
  label,
  name,
  type = "text",
  required,
  as,
  options,
  error,
  onClear,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  as?: "textarea" | "select";
  options?: string[];
  error?: string;
  onClear: (name: string) => void;
}) {
  const base =
    "mt-3 block w-full rounded-md border bg-ivory px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-brass-deep transition " +
    (error ? "border-error focus:border-error" : "border-ink/15 focus:border-brass-deep");
  const aria = {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${name}-error` : undefined,
  } as const;
  return (
    <div>
      <label htmlFor={name} className="text-xs uppercase tracking-[0.18em] text-ink/60">
        {label}
        {required && <span className="text-brass-deep"> *</span>}
      </label>
      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          className={base}
          required={required}
          onInput={() => onClear(name)}
          {...aria}
        />
      ) : as === "select" ? (
        <select
          id={name}
          name={name}
          className={base}
          required={required}
          defaultValue=""
          onChange={() => onClear(name)}
          {...aria}
        >
          <option value="" disabled>
            Select…
          </option>
          {options?.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          className={base}
          onInput={() => onClear(name)}
          {...aria}
        />
      )}
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-2 text-sm font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}
