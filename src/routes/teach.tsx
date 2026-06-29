import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import teachHero from "@/assets/teach-hero.jpg";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/teach")({
  head: () => ({
    meta: [
      { title: "Teach With Bridges — Careers" },
      { name: "description", content: "Make a difference through education. Join Bridges Institute as a native English-speaking teacher or pedagogical director in Southern Israel." },
      { property: "og:title", content: "Teach With Bridges" },
      { property: "og:description", content: "Meaningful work, a supportive team, and the chance to shape a generation of English speakers." },
      { property: "og:url", content: "/teach" },
      { property: "og:image", content: teachHero },
    ],
    links: [{ rel: "canonical", href: "/teach" }],
  }),
  component: Teach,
});

const reasons = [
  ["Meaningful Impact", "Your classroom changes a student's relationship to a language — and to themselves."],
  ["Supportive Environment", "A close-knit team of educators, mentors, and coordinators who have your back."],
  ["Flexible Opportunities", "Part-time, full-time, and project-based engagements across the region."],
  ["Competitive Compensation", "Fair, transparent pay aligned with experience and program scope."],
  ["Diverse Settings", "Schools, community centers, and municipalities — Arab and Jewish communities alike."],
];

const requirements = [
  "Native English speaker (or near-native fluency with US/UK/Canadian schooling).",
  "Bachelor's degree or equivalent professional experience.",
  "Legal status to work in Israel.",
  "Comfort working with children, teenagers, or adult learners.",
  "Warmth, patience, and a sense of humor — the rest we'll teach you.",
];

function Teach() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="relative min-h-[60svh] md:min-h-[70svh] flex items-end overflow-hidden">
        <img src={teachHero} alt="A Bridges teacher" width={1600} height={1000}
             className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/50 to-ink/95" />
        <div className="container-editorial relative z-10 pb-16 pt-32 md:pb-20 md:pt-40 text-ivory">
          <Reveal><div className="eyebrow text-brass">Teach With Bridges</div></Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] leading-[1.05] lg:leading-[1.02] text-ivory max-w-4xl">
              Make a difference <em className="italic text-brass font-light">through education.</em>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 md:mt-8 max-w-2xl text-base md:text-lg text-ivory/80">
              Bring your voice to a classroom where it matters. We're hiring native English-speaking educators across Southern Israel.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why teach */}
      <section className="py-20 md:py-32">
        <div className="container-editorial">
          <SectionHeader eyebrow="Why Teach Here" title="The work is real, and so is the support." />
          <div className="mt-12 md:mt-16 grid gap-px bg-border rounded-2xl overflow-hidden border border-border md:grid-cols-2 lg:grid-cols-3">
            {reasons.map(([t, d], i) => (
              <Reveal key={t} delay={i * 60} className="bg-cream">
                <div className="p-7 md:p-10 h-full">
                  <div className="font-display text-brass text-sm">0{i + 1}</div>
                  <h3 className="mt-4 font-display text-xl md:text-2xl text-ink">{t}</h3>
                  <p className="mt-4 text-slate-body leading-relaxed">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="bg-ink text-ivory py-20 md:py-28">
        <div className="container-editorial grid gap-10 md:gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal><div className="eyebrow text-brass">Minimum Requirements</div></Reveal>
            <Reveal delay={120}>
              <h2 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl text-ivory leading-tight">
                The bar is honest, not ornate.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <ul className="space-y-5">
              {requirements.map((r, i) => (
                <Reveal key={r} delay={i * 60}>
                  <li className="flex gap-5 border-b border-ivory/15 pb-5">
                    <span className="font-display text-brass">0{i + 1}</span>
                    <span className="text-ivory/85">{r}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Application */}
      <section id="apply" className="py-20 md:py-32 bg-cream">
        <div className="container-editorial">
          <SectionHeader eyebrow="Apply Now" title="Tell us about you." intro="A few minutes here, and we'll be in touch." />

          {submitted ? (
            <Reveal>
              <div className="mt-12 md:mt-16 rounded-2xl border border-brass bg-ivory p-8 md:p-12 text-center">
                <div className="eyebrow justify-center">Thank you</div>
                <h3 className="mt-4 font-display text-2xl md:text-3xl text-ink">Your application is in.</h3>
                <p className="mt-4 text-slate-body">We review every submission personally and will reach out within a few days.</p>
              </div>
            </Reveal>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); window.scrollTo({ top: e.currentTarget.offsetTop - 100, behavior: "smooth" }); }}
              className="mt-12 md:mt-16 grid gap-6 md:gap-8 md:grid-cols-2"
            >
              <Field label="Full Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" required />
              <Field label="Position" name="position" as="select" options={["English Teacher", "Pedagogical Director"]} />
              <Field label="Legal Status in Israel" name="status" as="select" options={["Citizen", "Permanent Resident", "Work Visa", "Other"]} />
              <Field label="Social Profile (LinkedIn / other)" name="social" />
              <Field label="Preferred Ages" name="ages" as="select" options={["Children (6–12)", "Teenagers (13–18)", "Adults", "Any"]} />
              <div className="md:col-span-1">
                <label className="eyebrow block">CV Upload</label>
                <input type="file" accept=".pdf,.doc,.docx" className="mt-4 block w-full text-sm text-slate-body file:mr-4 file:rounded-full file:border-0 file:bg-ink file:px-6 file:py-3 file:text-xs file:uppercase file:tracking-[0.18em] file:text-ivory hover:file:bg-ink-soft" />
              </div>
              <div className="md:col-span-2">
                <Field label="About You" name="about" as="textarea" />
              </div>
              <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-6">
                <p className="text-sm text-slate-body max-w-md">By submitting, you agree to be contacted regarding your application.</p>
                <button type="submit" className="btn-primary">Submit Application</button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function Field({
  label, name, type = "text", required, as, options,
}: {
  label: string; name: string; type?: string; required?: boolean;
  as?: "select" | "textarea"; options?: string[];
}) {
  const base = "mt-4 block w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-ink placeholder:text-ink/40 focus:border-brass focus:outline-none focus:ring-0 transition";
  return (
    <div>
      <label htmlFor={name} className="eyebrow block">{label}{required && <span className="text-brass"> *</span>}</label>
      {as === "select" ? (
        <select id={name} name={name} className={base} required={required} defaultValue="">
          <option value="" disabled>Select…</option>
          {options?.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : as === "textarea" ? (
        <textarea id={name} name={name} rows={4} className={base} required={required} />
      ) : (
        <input id={name} name={name} type={type} required={required} className={base} />
      )}
    </div>
  );
}
