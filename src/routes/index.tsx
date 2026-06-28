import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import heroImg from "@/assets/hero-classroom.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import { Reveal } from "@/components/site/Reveal";
import { StatCounter } from "@/components/site/StatCounter";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bridges Institute — English through action, confidence & connection" },
      { name: "description", content: "Authentic, immersive English programs led by native English-speaking educators. Serving Arab and Jewish communities across the Negev since 2014." },
      { property: "og:title", content: "Bridges Institute" },
      { property: "og:description", content: "Building bridges through language, confidence, and connection." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const method = [
  { n: "01", t: "Communication First", d: "Language is a living act. We prioritize the courage to speak over the fear of getting it wrong." },
  { n: "02", t: "Body Before Voice", d: "Understanding through action, rhythm, and repetition — sound comes after the body knows the shape of a word." },
  { n: "03", t: "Confidence Before Perfection", d: "Fluency is built on willingness. We celebrate attempts long before we polish them." },
  { n: "04", t: "Real-World Practice", d: "Every lesson opens a door to a native speaker, a real situation, a conversation that matters." },
];

const approach = [
  "Conversation", "Storytelling", "Games", "Role-play",
  "Movement-Based Learning", "Cultural Exchange", "Authentic Communication", "Native Speakers",
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden">
        <img
          src={heroImg}
          alt="Native English-speaking teacher leading a conversation with students"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 to-transparent" />

        <div className="container-editorial relative z-10 pb-24 pt-40 text-ivory">
          <Reveal>
            <div className="eyebrow text-brass flex items-center gap-3">
              <span className="inline-block h-px w-10 bg-brass" />
              Bridges Institute · Since 2014
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 font-display text-[2.75rem] sm:text-6xl lg:text-[5.5rem] leading-[0.98] text-ivory max-w-5xl">
              Building Bridges Through{" "}
              <em className="italic text-brass font-light">Language,</em>{" "}
              <em className="italic text-brass font-light">Confidence,</em> and{" "}
              <em className="italic text-brass font-light">Connection.</em>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-ivory/80 leading-relaxed">
              English learning through action, confidence, and real communication —
              led by native English-speaking educators across the Negev.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary" style={{ background: "var(--brass)", borderColor: "var(--brass)", color: "var(--ink)" }}>
                Partner With Us <ArrowUpRight size={16} />
              </Link>
              <Link to="/teach" className="btn-ghost">
                Teach With Bridges <ArrowUpRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-8 right-8 z-10 hidden md:flex items-center gap-3 text-ivory/60 text-xs uppercase tracking-[0.22em]">
          <span className="inline-block h-px w-10 bg-ivory/40" />
          Scroll
        </div>
      </section>

      {/* IMPACT BAND */}
      <section className="bg-ink py-24">
        <div className="container-editorial">
          <Reveal>
            <div className="eyebrow text-brass">Our Impact</div>
          </Reveal>
          <div className="mt-12 grid gap-12 md:grid-cols-4">
            <StatCounter value={11000} suffix="+" label="Students Reached" />
            <StatCounter value={50} suffix="+" label="Schools & Institutions" />
            <StatCounter value={22} label="Native English Teachers" />
            <StatCounter value={2014} label="Operating Since" />
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section className="py-32">
        <div className="container-editorial">
          <SectionHeader
            eyebrow="The Bridges Method"
            title="A pedagogy built on courage, not correctness."
            intro="We don't teach English as a subject to be memorized. We build it as a living capability — through movement, story, and the simple act of being heard."
          />

          <div className="mt-20 grid gap-8 md:grid-cols-2">
            {method.map((m, i) => (
              <Reveal key={m.n} delay={i * 80}>
                <article className="group h-full rounded-2xl bg-cream border border-border p-10 transition hover:border-brass hover:-translate-y-1 duration-500">
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-brass text-2xl">{m.n}</span>
                    <span className="hairline w-12" />
                  </div>
                  <h3 className="mt-8 font-display text-3xl text-ink leading-tight">{m.t}</h3>
                  <p className="mt-5 text-slate-body leading-relaxed">{m.d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION STRIP */}
      <section className="bg-cream border-y border-border">
        <div className="container-editorial py-28 text-center">
          <Reveal>
            <div className="eyebrow justify-center">Mission</div>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 mx-auto max-w-4xl font-display italic text-3xl md:text-5xl leading-tight text-ink">
              "Make English feel natural, useful, and possible for every student."
            </p>
          </Reveal>
        </div>
      </section>

      {/* APPROACH GRID */}
      <section className="py-32">
        <div className="container-editorial grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Our Approach" title="Eight ways into the language." />
            <Reveal delay={200}>
              <p className="mt-8 text-slate-body leading-relaxed">
                Our classrooms move. They tell stories, play games, ask questions, and try things on for size. Every method is a door — students walk through the one that feels open to them today.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {approach.map((a, i) => (
              <Reveal key={a} delay={i * 50} className="bg-cream">
                <div className="p-8 h-full flex flex-col justify-between min-h-40 transition hover:bg-ivory">
                  <span className="font-display text-brass text-xs">0{i + 1}</span>
                  <span className="font-display text-2xl text-ink mt-6">{a}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CREDIBILITY */}
      <section className="bg-ink text-ivory py-24">
        <div className="container-editorial grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="eyebrow text-brass">Recognition</div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-5 font-display text-4xl md:text-5xl text-ivory leading-tight">
                Recognized by the Israeli Ministry of Education under the GEFEN framework.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-ivory/70 max-w-xl leading-relaxed">
                Program No. 9003 — proudly serving Arab and Jewish communities across the Negev and Southern Israel.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <div className="rounded-2xl border border-ivory/15 p-10 backdrop-blur">
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow text-brass">GEFEN</span>
                  <span className="font-display text-brass">№ 9003</span>
                </div>
                <div className="hairline my-8" />
                <p className="font-display text-2xl text-ivory leading-snug">
                  Ministry of Education — State of Israel
                </p>
                <p className="mt-3 text-sm text-ivory/60">
                  Authorized provider of English-language enrichment programs.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-32">
        <div className="container-editorial">
          <SectionHeader eyebrow="Recent Highlights" title="From the classrooms of the Negev." />

          <div className="mt-16 grid grid-cols-12 gap-4 md:gap-6">
            {[
              { src: g1, span: "col-span-6 md:col-span-4 row-span-2 aspect-[3/4]", alt: "Student smiling with notebook" },
              { src: g2, span: "col-span-6 md:col-span-5 aspect-[4/3]", alt: "Students in a circle role-playing" },
              { src: g3, span: "col-span-12 md:col-span-3 aspect-square md:aspect-[3/4]", alt: "Teacher at whiteboard" },
              { src: g4, span: "col-span-7 md:col-span-5 aspect-[4/3]", alt: "Students playing outdoors" },
              { src: g5, span: "col-span-5 md:col-span-3 aspect-square", alt: "Hands pointing at a book" },
            ].map((img, i) => (
              <Reveal key={i} delay={i * 80} className={img.span}>
                <div className="group h-full w-full overflow-hidden rounded-xl">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="relative overflow-hidden bg-cream">
        <div className="container-editorial py-32 grid gap-12 lg:grid-cols-12 items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="eyebrow">Get Involved</div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-6 font-display text-5xl md:text-7xl text-ink leading-[1.02]">
                Bring Bridges to your school — or join the team that's building it.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link to="/contact" className="btn-primary justify-between">
              Partner With Us <ArrowUpRight size={16} />
            </Link>
            <Link to="/teach" className="btn-primary justify-between" style={{ background: "transparent", color: "var(--ink)" }}>
              Teach With Bridges <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
