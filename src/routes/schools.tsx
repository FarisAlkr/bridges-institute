import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import g2 from "@/assets/gallery-2.jpg";

export const Route = createFileRoute("/schools")({
  head: () => ({
    meta: [
      { title: "Schools & Institutions — Bridges Institute" },
      { name: "description", content: "Programs for schools, community centers, and municipalities across the Negev. Native English-speaking educators delivering measurable, joyful results." },
      { property: "og:title", content: "Schools — Bridges Institute" },
      { property: "og:description", content: "Bring Bridges to your school." },
      { property: "og:url", content: "/schools" },
    ],
    links: [{ rel: "canonical", href: "/schools" }],
  }),
  component: Schools,
});

const programs = [
  { t: "In-School English Immersion", d: "Weekly, ongoing classes inside the school day — taught fully in English by a native speaker.", scope: "Grades 3–12 · Year-long" },
  { t: "After-School Enrichment", d: "Small-group sessions focused on conversation, games, and confidence-building.", scope: "All ages · Semester-based" },
  { t: "English Camps & Intensives", d: "Vacation-week programs that pack months of practice into days of immersion.", scope: "Children & teens · 1–2 weeks" },
  { t: "Teacher Co-Teaching", d: "Native English speakers paired with local teachers to co-design lessons and model live conversation.", scope: "Custom · Ongoing" },
  { t: "Community Center Programs", d: "Open-access classes hosted at municipal and community partners — serving Arab and Jewish neighborhoods alike.", scope: "All ages · Year-round" },
  { t: "Bespoke Partnerships", d: "Custom programs designed with your school's curriculum, calendar, and goals in mind.", scope: "Tailored · By request" },
];

function Schools() {
  return (
    <>
      <section className="relative pt-40 pb-24 bg-cream border-b border-border">
        <div className="container-editorial grid gap-12 lg:grid-cols-12 items-end">
          <div className="lg:col-span-8">
            <Reveal><div className="eyebrow">Schools & Institutions</div></Reveal>
            <Reveal delay={120}>
              <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-[5.5rem] text-ink leading-[1.02]">
                Programs designed for the <em className="italic text-brass font-light">classrooms</em> you already have.
              </h1>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={200}>
              <p className="text-lg text-slate-body leading-relaxed">
                Whether you serve thirty students or three thousand, we shape our programs around your school's rhythm — not the other way around.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-32">
        <div className="container-editorial">
          <SectionHeader eyebrow="Our Programs" title="Six ways to work together." />
          <div className="mt-16 grid gap-px bg-border rounded-2xl overflow-hidden border border-border md:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <Reveal key={p.t} delay={i * 60} className="bg-cream">
                <div className="p-10 h-full flex flex-col">
                  <span className="font-display text-brass text-sm">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-2xl text-ink leading-tight">{p.t}</h3>
                  <p className="mt-4 text-slate-body leading-relaxed flex-1">{p.d}</p>
                  <div className="hairline my-6 w-12" />
                  <p className="text-xs uppercase tracking-[0.18em] text-ink/60">{p.scope}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-ink text-ivory py-28">
        <div className="container-editorial">
          <SectionHeader eyebrow="How We Begin" title="A simple, considered process." />
          <div className="mt-16 grid gap-10 md:grid-cols-4">
            {[
              ["Discovery Call", "We listen first — your students, your goals, your constraints."],
              ["Program Design", "We propose a shape and pace tailored to your school."],
              ["Teacher Match", "We pair you with native educators who fit your community."],
              ["Launch & Iterate", "We begin, measure, and refine — together, every term."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 80}>
                <div>
                  <div className="font-display text-brass text-4xl">0{i + 1}</div>
                  <div className="hairline my-6 w-12" />
                  <h4 className="font-display text-xl text-ivory">{t}</h4>
                  <p className="mt-3 text-ivory/70 text-sm leading-relaxed">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 overflow-hidden">
        <img src={g2} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30" loading="lazy" />
        <div className="absolute inset-0 bg-ivory/80" />
        <div className="container-editorial relative z-10 text-center">
          <Reveal>
            <h2 className="font-display text-4xl md:text-6xl text-ink max-w-3xl mx-auto leading-tight">
              Ready to bring Bridges into your classrooms?
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <Link to="/contact" className="btn-primary mt-10">Partner With Us</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
