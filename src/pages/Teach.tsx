import { Link } from "@tanstack/react-router";
import teachHero from "@/assets/teach-hero.jpg";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ApplyForm } from "@/components/site/ApplyForm";


const applySteps = [
  "Fill in the short form below — name, phone or email, English background, location, and one line on why you want to teach with Bridges.",
  "Have a short conversation with us.",
  "If it's a good fit, join a Bridges teaching placement.",
];

export function Teach() {
  return (
    <>
      <section className="relative flex min-h-[55svh] items-end overflow-hidden md:min-h-[65svh]">
        <img
          src={teachHero}
          alt="A Bridges teacher leading a lesson"
          width={1600}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/55 to-ink/95" />
        <div className="container-editorial relative z-10 pb-16 pt-32 text-ivory md:pb-20 md:pt-40">
          <Reveal>
            <div className="eyebrow text-brass">Teach with Bridges</div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] text-ivory sm:text-5xl md:text-6xl lg:leading-[1.02]">
              Apply to teach with <em className="font-light italic text-brass">Bridges.</em>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-2xl text-base text-ivory/85 md:mt-8 md:text-lg">
              We bring English-speaking teachers into schools across the Negev to lead active
              speaking lessons — movement, games, stories, role-play and real conversation.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="apply" className="scroll-mt-24 bg-cream py-16 md:py-24">
        <div className="container-editorial">
          <SectionHeader
            eyebrow="How to apply"
            title="Three steps to teaching with Bridges."
            intro="A short form beats emailing a CV into the void. Fill it in and we'll take it from there."
          />

          <ol className="mt-10 grid list-none gap-6 md:mt-12 md:grid-cols-3">
            {applySteps.map((step, i) => (
              <li key={i}>
                <Reveal delay={i * 70} className="border-t border-border pt-4">
                  <span className="font-display text-2xl text-brass-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-slate-body leading-relaxed">{step}</p>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal delay={120}>
            <div className="mt-12 rounded-2xl border border-border bg-ivory p-6 sm:p-8 md:mt-16 md:p-10">
              <ApplyForm />
            </div>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 text-sm text-slate-body">
              Want the full picture first?{" "}
              <Link to="/" hash="method" className="link-underline font-medium text-ink">
                See how we teach and who we&apos;re looking for
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
