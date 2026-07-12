import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import heroImg from "@/assets/hero-classroom.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ApplyForm } from "@/components/site/ApplyForm";
import { TodoPlaceholder } from "@/components/site/TodoPlaceholder";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Teach English in the Negev — Bridges Institute" },
      {
        name: "description",
        content:
          "Bridges Institute hires English-speaking teachers to lead active speaking lessons in schools across the Negev — movement, games, stories, role-play and real conversation. Apply to teach.",
      },
      { property: "og:title", content: "Teach English in the Negev — Bridges Institute" },
      {
        property: "og:description",
        content:
          "We hire English-speaking educators to help students in the Negev speak with confidence. See how we teach and apply.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

// §3 — Why teach with Bridges. Plain, not poetic; minimal/no icons.
const whyPoints = [
  {
    t: "Real meaning",
    d: "You help kids who freeze up in English actually open their mouths.",
  },
  {
    t: "Active classrooms",
    d: "You're on your feet: games, stories, role-play, movement. Not reading from a textbook.",
  },
  {
    t: "Support and structure",
    d: "Teachers get lesson frameworks, activities and routines. You bring the energy; we provide the structure.",
  },
  {
    t: "Room for personality",
    d: "Warmth, presence and reliability matter here. Teachers bring themselves into the room.",
  },
];

// §4 — What the job actually is. The single method section.
const jobFlow = [
  "Students first listen and respond with their bodies before they're asked to speak.",
  "They repeat useful words and phrases out loud, together.",
  "Then they play, act, choose, answer and talk.",
  "Younger students: TPR, pictures, objects, rhythm, movement, stories.",
  "Older students: opinions, role-play, interviews, real-life situations, conversation tasks.",
  "Every student leaves the room having used English out loud.",
];

// §5 — Who we're looking for.
const fitRows: [string, string][] = [
  ["Confident, fluent or near-native English", "Wants quiet, textbook-only teaching"],
  [
    "Comfortable leading a room of children or teens",
    "Dislikes movement, noise, games or group energy",
  ],
  ["Warm, responsible and reliable", "Uncomfortable leading and managing a class"],
  [
    "Enjoys active teaching — speaking, movement, games",
    "Unreliable with schedule or communication",
  ],
  [
    "Understands many students are nervous and need confidence first",
    "Only wants to teach grammar from a book",
  ],
];

// §8 — How to apply.
const applySteps = [
  "Fill in the short form below — name, phone or email, English background, location, and one line on why you want to teach with Bridges.",
  "Have a short conversation with us.",
  "If it's a good fit, join a Bridges teaching placement.",
];

// §7 — Real classroom photos. Captions are awaiting client confirmation (open-questions B1).
const photos = [
  {
    src: g1,
    span: "col-span-6 md:col-span-4 row-span-2 aspect-[3/4]",
    alt: "Student smiling with a notebook in class",
  },
  {
    src: g2,
    span: "col-span-6 md:col-span-5 aspect-[4/3]",
    alt: "Students standing in a circle during a role-play activity",
  },
  {
    src: g3,
    span: "col-span-12 md:col-span-3 aspect-square md:aspect-[3/4]",
    alt: "Teacher working with students at a whiteboard",
  },
  {
    src: g4,
    span: "col-span-7 md:col-span-5 aspect-[4/3]",
    alt: "Students playing an active game outdoors",
  },
  {
    src: g5,
    span: "col-span-5 md:col-span-3 aspect-square",
    alt: "Hands pointing at words in a book",
  },
];

function Home() {
  return (
    <>
      {/* §1 — HERO (teacher-first) */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <img
          src={heroImg}
          alt="A teacher leading an active English speaking lesson with students in the Negev"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Overlay tuned for AA text contrast over the photo. */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/55 to-ink/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent" />

        <div className="container-editorial relative z-10 pb-24 pt-32 text-ivory md:pb-28 md:pt-40">
          <Reveal>
            <div className="eyebrow flex items-center gap-3 text-brass">
              <span className="inline-block h-px w-10 bg-brass" />
              Teach with Bridges · The Negev
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 max-w-4xl font-display text-[2.25rem] leading-[1.05] text-ivory sm:text-5xl sm:leading-[1.02] md:text-6xl lg:text-[4.75rem]">
              Teach English that students are finally{" "}
              <em className="font-light italic text-brass">brave enough to speak.</em>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/85 md:mt-8 md:text-xl">
              Bridges Institute brings English-speaking teachers into schools across the Negev to
              lead active speaking lessons — movement, games, stories, role-play and real
              conversation.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-8 flex flex-wrap gap-3 md:mt-10 md:gap-4">
              <a
                href="#apply"
                className="btn-primary"
                style={{
                  background: "var(--brass)",
                  borderColor: "var(--brass)",
                  color: "var(--ink)",
                }}
              >
                Apply to Teach <ArrowUpRight size={16} aria-hidden />
              </a>
              <a href="#method" className="btn-ghost">
                See How We Teach <ArrowUpRight size={16} aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* §2 — TRUST BAR */}
      <section className="bg-ink text-ivory">
        <div className="container-editorial py-6 md:py-7">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center text-sm md:text-base">
            <TrustItem>Serving the Negev since 2014</TrustItem>
            <TrustItem>
              Recognized by the Israeli Ministry of Education, GEFEN Program No. 9003
            </TrustItem>
            <TrustItem>
              <strong className="font-semibold text-brass">11,000+</strong> students
            </TrustItem>
            <TrustItem>
              <strong className="font-semibold text-brass">50+</strong> schools &amp; institutions
            </TrustItem>
            <TrustItem last>
              <strong className="font-semibold text-brass">22</strong> native English-speaking
              teachers
            </TrustItem>
          </ul>
        </div>
      </section>

      {/* §3 — WHY TEACH WITH BRIDGES */}
      <section className="py-16 md:py-24">
        <div className="container-editorial">
          <SectionHeader
            eyebrow="Why teach with Bridges"
            title="Meaningful work, with real support behind it."
          />
          <div className="mt-10 grid gap-x-10 gap-y-8 md:mt-14 md:grid-cols-2">
            {whyPoints.map((p, i) => (
              <Reveal key={p.t} delay={i * 60}>
                <div className="border-t border-border pt-5">
                  <h3 className="font-display text-xl text-ink md:text-2xl">{p.t}</h3>
                  <p className="mt-2 text-slate-body leading-relaxed">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* §4 — WHAT THE JOB ACTUALLY IS (the only method section) */}
      <section id="method" className="scroll-mt-24 bg-cream py-16 md:py-24">
        <div className="container-editorial grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="What the job actually is"
              title="A lesson at Bridges, step by step."
            />
            <Reveal delay={160}>
              <blockquote className="mt-8 border-l-2 border-brass-deep pl-5 font-display text-xl italic leading-snug text-ink md:mt-10 md:text-2xl">
                Confidence first. Accuracy follows. Students speak first; we polish later.
              </blockquote>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <ul className="space-y-4 md:space-y-5">
              {jobFlow.map((line, i) => (
                <Reveal key={line} delay={i * 50}>
                  <li className="flex gap-4 border-b border-border pb-4 md:pb-5">
                    <span className="font-display text-brass-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-ink/90 leading-relaxed">{line}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* §5 — WHO WE'RE LOOKING FOR */}
      <section className="py-16 md:py-24">
        <div className="container-editorial">
          <SectionHeader
            eyebrow="Who we're looking for"
            title="An honest picture — so you can tell if this is you."
          />
          <Reveal delay={120}>
            <div className="mt-10 overflow-hidden rounded-2xl border border-border md:mt-14">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">
                  Who is a good fit to teach with Bridges, and who is probably not.
                </caption>
                <thead>
                  <tr className="bg-cream">
                    <th
                      scope="col"
                      className="w-1/2 border-b border-border p-4 font-display text-base text-ink md:p-5 md:text-lg"
                    >
                      Good fit
                    </th>
                    <th
                      scope="col"
                      className="w-1/2 border-b border-l border-border p-4 font-display text-base text-slate-body md:p-5 md:text-lg"
                    >
                      Probably not the right fit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fitRows.map(([good, bad]) => (
                    <tr key={good} className="align-top">
                      <td className="border-b border-border p-4 text-sm text-ink/90 md:p-5 md:text-base">
                        {good}
                      </td>
                      <td className="border-b border-l border-border p-4 text-sm text-slate-body md:p-5 md:text-base">
                        {bad}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* §6 — WHAT YOU NEED TO APPLY (blocked — visible placeholders, nothing invented) */}
      <section className="bg-cream py-16 md:py-24">
        <div className="container-editorial">
          <SectionHeader
            eyebrow="What you need to apply"
            title="The essentials — confirmed before we publish them."
            intro="We'd rather leave these blank than guess. Details below are being confirmed with the school and will replace these notes before launch."
          />
          <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2">
            <TodoPlaceholder
              label="Hebrew requirement"
              note="Is Hebrew required, or do lessons run in English? If not required, this becomes a prominent “No Hebrew required.” (open-questions A1)"
            />
            <TodoPlaceholder
              label="Qualifications"
              note="Degree / teaching certificate, or fluent-capable-energetic welcome? (open-questions A2)"
            />
            <TodoPlaceholder
              label="Schedule"
              note="Part- or full-time, rough hours, school-year / summer / flexible? (open-questions A3)"
            />
            <TodoPlaceholder
              label="Location"
              note="Which Negev towns/areas, and is your own transport needed? (open-questions A4)"
            />
          </div>
          <Reveal delay={120}>
            <p className="mt-6 font-medium text-ink">This is paid work, not volunteering.</p>
          </Reveal>
        </div>
      </section>

      {/* §7 — REAL CLASSROOM PHOTOS (captions awaiting client) */}
      <section className="py-16 md:py-24">
        <div className="container-editorial">
          <SectionHeader
            eyebrow="Inside the classroom"
            title="Real lessons, in real Negev schools."
          />
          <div className="mt-10 grid grid-cols-12 gap-3 md:mt-14 md:gap-6">
            {photos.map((img, i) => (
              <Reveal key={i} delay={i * 60} className={img.span}>
                <figure className="h-full w-full">
                  <div className="h-full w-full overflow-hidden rounded-xl">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 text-xs text-slate-body">
                    Caption to confirm with the client.
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 max-w-xl">
            <TodoPlaceholder
              label="Optional 30–60s classroom video"
              note="If a real clip exists, embed it here with captions/transcript. Asset from client (open-questions B2)."
            />
          </div>
        </div>
      </section>

      {/* §8 — HOW TO APPLY */}
      <section id="apply" className="scroll-mt-24 bg-cream py-16 md:py-24">
        <div className="container-editorial">
          <SectionHeader
            eyebrow="How to apply"
            title="Three steps to teaching with Bridges."
            intro="A short form beats emailing a CV into the void. Fill it in and we'll take it from there."
          />

          <ol className="mt-10 grid gap-6 md:mt-12 md:grid-cols-3">
            {applySteps.map((step, i) => (
              <Reveal key={i} delay={i * 70}>
                <li className="border-t border-border pt-4">
                  <span className="font-display text-2xl text-brass-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-slate-body leading-relaxed">{step}</p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={120}>
            <div className="mt-12 rounded-2xl border border-border bg-ivory p-6 sm:p-8 md:mt-16 md:p-10">
              <ApplyForm />
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-10 text-center">
              <p className="mx-auto max-w-2xl font-display text-2xl leading-snug text-ink md:text-3xl">
                Ready to teach with Bridges? Help students in the Negev find their voice in English.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* §9 — FOR SCHOOLS (secondary path) */}
      <section className="py-16 md:py-24">
        <div className="container-editorial">
          <div className="rounded-2xl border border-border bg-ink px-6 py-12 text-ivory md:px-12 md:py-16">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="lg:col-span-8">
                <div className="eyebrow text-brass">For schools</div>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ivory/85 md:text-xl">
                  Bridges Institute brings English-speaking teachers into schools and learning
                  centers across the Negev. Our programs help students build spoken English
                  confidence through active, communication-based lessons.
                </p>
                <p className="mt-4 text-sm text-ivory/60">
                  Recognized under the Israeli Ministry of Education&apos;s GEFEN framework, Program
                  No. 9003.
                </p>
              </div>
              <div className="lg:col-span-4 lg:justify-self-end">
                <Link to="/schools" className="btn-ghost">
                  Bring Bridges to Your School <ArrowUpRight size={16} aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function TrustItem({ children, last }: { children: React.ReactNode; last?: boolean }) {
  return (
    <li className="flex items-center gap-x-5 text-ivory/85">
      <span>{children}</span>
      {!last && (
        <span aria-hidden className="text-brass/60">
          ·
        </span>
      )}
    </li>
  );
}
