import { createFileRoute, Link } from "@tanstack/react-router";
import aboutHero from "@/assets/about-hero.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Bridges Institute" },
      { name: "description", content: "Since 2014, Bridges Institute has partnered with the Ministry of Education, municipalities, schools, and community centers across the Negev to bring authentic English learning to every student." },
      { property: "og:title", content: "About — Bridges Institute" },
      { property: "og:description", content: "Our story, mission, and the value of native English-speaking educators." },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: aboutHero },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative min-h-[70svh] md:min-h-[80svh] flex items-end overflow-hidden">
        <img src={aboutHero} alt="A movement-based English class in the Negev" width={1600} height={1000}
             className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 to-ink/95" />
        <div className="container-editorial relative z-10 pb-16 pt-32 md:pb-20 md:pt-40 text-ivory">
          <Reveal>
            <div className="eyebrow text-brass">About Bridges</div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] max-w-4xl leading-[1.05] lg:leading-[1.02] text-ivory">
              A decade of building <em className="italic text-brass font-light">bridges</em> across the Negev.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-32">
        <div className="container-editorial grid gap-10 md:gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="eyebrow">Since 2014</div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-display text-3xl md:text-4xl text-ink leading-tight">Our Story</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8 space-y-6 text-base md:text-lg text-slate-body leading-relaxed">
            <Reveal>
              <p>
                Bridges Institute was founded in 2014 with a quiet conviction: that English, taught with care and authenticity, can open lives. From a single classroom in Be'er Sheva, we have grown into a regional program serving thousands of students each year.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <p>
                Today, we partner with the Israeli Ministry of Education, regional municipalities, schools, and community centers across the Negev — bringing native English-speaking educators from the United States into classrooms that span Arab and Jewish communities alike.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p>
                Every program we build is held to one standard: would a student walk away feeling more capable, more curious, and more connected than when they arrived?
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-cream border-y border-border py-20 md:py-28">
        <div className="container-editorial grid gap-12 md:gap-16 md:grid-cols-2">
          <Reveal>
            <div>
              <div className="eyebrow">Mission</div>
              <h3 className="mt-5 font-display text-3xl md:text-4xl text-ink leading-tight">
                To make English feel natural, useful, and possible — for every student.
              </h3>
              <div className="hairline mt-6 md:mt-8 w-16" />
              <p className="mt-6 md:mt-8 text-slate-body leading-relaxed">
                We meet students where they are. We move at the speed of their courage. We trust that fluency follows from confidence, not the other way around.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <div className="eyebrow">Vision</div>
              <h3 className="mt-5 font-display text-3xl md:text-4xl text-ink leading-tight">
                A generation of young people in Southern Israel who carry English as a second voice.
              </h3>
              <div className="hairline mt-6 md:mt-8 w-16" />
              <p className="mt-6 md:mt-8 text-slate-body leading-relaxed">
                English not as a school subject endured — but as an instrument of opportunity, friendship, and self-expression.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Challenge vs Approach */}
      <section className="py-20 md:py-32">
        <div className="container-editorial">
          <SectionHeader eyebrow="What We Do Differently" title="The challenge — and our answer." />

          <div className="mt-12 md:mt-16 grid gap-px bg-border rounded-2xl overflow-hidden border border-border md:grid-cols-2">
            <Reveal className="bg-cream">
              <div className="p-8 md:p-12 h-full">
                <div className="eyebrow text-ink/60">The Challenge</div>
                <ul className="mt-8 space-y-5 text-slate-body">
                  {[
                    "English taught primarily on paper, not in conversation.",
                    "Few opportunities to hear or speak with a native speaker.",
                    "A culture of correctness that quietly silences students.",
                    "Curricula disconnected from real-world use.",
                  ].map((t) => (
                    <li key={t} className="flex gap-4">
                      <span className="mt-2 inline-block h-px w-6 bg-ink/40 flex-none" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120} className="bg-ink text-ivory">
              <div className="p-8 md:p-12 h-full">
                <div className="eyebrow text-brass">Our Approach</div>
                <ul className="mt-8 space-y-5 text-ivory/85">
                  {[
                    "Conversation-first, taught entirely in English.",
                    "Native English-speaking educators from the United States.",
                    "Movement, games, and storytelling as primary tools.",
                    "Cultural exchange built into every lesson.",
                  ].map((t) => (
                    <li key={t} className="flex gap-4">
                      <span className="mt-2 inline-block h-px w-6 bg-brass flex-none" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why native speakers */}
      <section className="bg-cream py-20 md:py-32">
        <div className="container-editorial">
          <SectionHeader
            eyebrow="Why It Matters"
            title="Why native English-speaking educators."
            intro="A native speaker is not a credential — it's an experience the classroom can feel."
          />

          <div className="mt-12 md:mt-16 grid gap-8 md:gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Authentic Pronunciation", "Students hear the language as it actually lives — its rhythm, its swallowed syllables, its music."],
              ["Natural Vocabulary", "Idiom, slang, and everyday phrasing that no textbook captures."],
              ["Real Listening Practice", "Ears tuned to the speed and texture of real-world conversation."],
              ["Confidence to Speak", "Students learn that being understood matters more than being perfect."],
              ["Cultural Exposure", "Stories, humor, and perspective from another part of the world."],
              ["A Living Connection", "English becomes a person you know — not a subject you take."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 60}>
                <div className="border-t border-ink/15 pt-6">
                  <div className="font-display text-brass">0{i + 1}</div>
                  <h4 className="mt-3 font-display text-2xl text-ink">{t}</h4>
                  <p className="mt-3 text-slate-body leading-relaxed">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 md:py-32">
        <div className="container-editorial grid grid-cols-12 gap-3 md:gap-6">
          {[g2, g4, g5].map((src, i) => (
            <Reveal key={i} delay={i * 100} className={i === 1 ? "col-span-12 md:col-span-6" : "col-span-6 md:col-span-3"}>
              <div className="overflow-hidden rounded-xl">
                <img src={src} alt="Bridges classroom" loading="lazy" className="h-full w-full object-cover aspect-[4/5]" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink text-ivory py-16 md:py-24">
        <div className="container-editorial flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl text-ivory max-w-2xl leading-tight">
            Want to bring Bridges to your school?
          </h2>
          <Link to="/contact" className="btn-ghost self-start md:self-auto" style={{ color: "var(--ivory)" }}>Partner With Us</Link>
        </div>
      </section>
    </>
  );
}
