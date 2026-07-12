import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/contribute")({
  head: () => ({
    meta: [
      { title: "Contribute — Bridges Institute" },
      { name: "description", content: "Support a decade of English-language education in the Negev. Donate, sponsor a classroom, or get involved with Bridges Institute." },
      { property: "og:title", content: "Contribute — Bridges Institute" },
      { property: "og:description", content: "Help us bring native English-speaking educators to more classrooms." },
      { property: "og:url", content: "/contribute" },
    ],
    links: [{ rel: "canonical", href: "/contribute" }],
  }),
  component: Contribute,
});

const ways = [
  { t: "Sponsor a Classroom", d: "Underwrite a full year of native English instruction for a single classroom of students.", amt: "From ₪18,000" },
  { t: "Fund a Teacher", d: "Bring one additional native English-speaking educator to the Negev for a semester.", amt: "From ₪36,000" },
  { t: "Support a Student", d: "Cover one student's enrollment in an after-school or camp program.", amt: "From ₪600" },
  { t: "General Support", d: "Every contribution, of any size, sustains the program and reaches a student.", amt: "Any amount" },
];

function Contribute() {
  return (
    <>
      <section className="pt-32 pb-20 md:pt-40 md:pb-24 bg-cream border-b border-border">
        <div className="container-editorial max-w-4xl">
          <Reveal><div className="eyebrow">Contribute</div></Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-7xl text-ink leading-[1.05] md:leading-[1.02]">
              A small gift goes a <em className="italic text-brass-deep font-light">long way</em> in a classroom that's listening.
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 md:mt-8 text-base md:text-lg text-slate-body max-w-2xl leading-relaxed">
              Bridges runs on partnerships — with the Ministry of Education, with municipalities, and with individuals and foundations who believe that language is opportunity. Your support translates directly into classroom hours.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container-editorial">
          <SectionHeader eyebrow="Ways to Give" title="Find the gift that fits." />
          <div className="mt-12 md:mt-16 grid gap-6 md:gap-8 md:grid-cols-2">
            {ways.map((w, i) => (
              <Reveal key={w.t} delay={i * 80}>
                <article className="rounded-2xl bg-cream border border-border p-7 md:p-10 h-full hover:border-brass transition">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-6">
                    <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight">{w.t}</h3>
                    <span className="eyebrow shrink-0">{w.amt}</span>
                  </div>
                  <div className="hairline my-6 w-12" />
                  <p className="text-slate-body leading-relaxed">{w.d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-ivory py-20 md:py-28">
        <div className="container-editorial text-center max-w-3xl mx-auto">
          <Reveal><div className="eyebrow text-brass justify-center">Get In Touch</div></Reveal>
          <Reveal delay={120}>
            <h2 className="mt-6 font-display text-3xl sm:text-4xl md:text-5xl text-ivory leading-tight">
              Speak with our partnerships team.
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 text-ivory/70 leading-relaxed">
              We'll walk you through current needs, sponsorship structures, and how your gift can be directed.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <Link to="/contact" className="btn-ghost mt-8 md:mt-10">Contact Us</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
