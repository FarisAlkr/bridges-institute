import { LocaleLink } from "@/components/site/LocaleLink";
import { ArrowUpRight } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";
import heroImg from "@/assets/hero-classroom.jpg";
// Real Bridges classroom photos (sourced from the client's site bridges-eng.com,
// downsized). Order below is chosen to fit each gallery slot's aspect ratio.
import photoYoungGame from "@/assets/classroom-young-game.jpg";
import photoSpeaking from "@/assets/classroom-speaking-lesson.jpg";
import photoSmallGroup from "@/assets/classroom-small-group.jpg";
import photoPictureCards from "@/assets/classroom-picture-cards.jpg";
import photoOneToOne from "@/assets/classroom-one-to-one.jpg";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ApplyForm } from "@/components/site/ApplyForm";
import { TodoPlaceholder } from "@/components/site/TodoPlaceholder";

const whyKeys = ["meaning", "active", "support", "personality"] as const;
const photoSrc = [photoYoungGame, photoSpeaking, photoSmallGroup, photoPictureCards, photoOneToOne];
const photoSpan = [
  "col-span-6 md:col-span-4 row-span-2 aspect-[3/4]",
  "col-span-6 md:col-span-5 aspect-[4/3]",
  "col-span-12 md:col-span-3 aspect-square md:aspect-[3/4]",
  "col-span-7 md:col-span-5 aspect-[4/3]",
  "col-span-5 md:col-span-3 aspect-square",
];

export function Home() {
  const { t } = useTranslation(["home", "common"]);
  const jobFlow = t("job.flow", { returnObjects: true }) as string[];
  const fitRows = t("fit.rows", { returnObjects: true }) as { good: string; bad: string }[];
  const applySteps = t("common:applyHow.steps", { returnObjects: true }) as string[];
  const photoAlts = t("photos.alt", { returnObjects: true }) as string[];

  return (
    <>
      {/* §1 — HERO (teacher-first) */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <img
          src={heroImg}
          alt={t("hero.imageAlt")}
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
              {t("hero.eyebrow")}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 max-w-4xl font-display text-[2.25rem] leading-[1.05] text-ivory sm:text-5xl sm:leading-[1.02] md:text-6xl lg:text-[4.75rem]">
              <Trans
                t={t}
                i18nKey="hero.headline"
                components={{ em: <em className="font-light italic text-brass" /> }}
              />
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/85 md:mt-8 md:text-xl">
              {t("hero.subheadline")}
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
                {`${t("common:cta.applyToTeach")} `}
                <ArrowUpRight size={16} aria-hidden />
              </a>
              <a href="#method" className="btn-ghost">
                {`${t("hero.seeHowWeTeach")} `}
                <ArrowUpRight size={16} aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* §2 — TRUST BAR */}
      <section className="bg-ink text-ivory">
        <div className="container-editorial py-6 md:py-7">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center text-sm md:text-base">
            <TrustItem>{t("trust.since", { year: 2014 })}</TrustItem>
            <TrustItem>{t("trust.gefen", { program: "9003" })}</TrustItem>
            <TrustItem>
              <Trans
                t={t}
                i18nKey="trust.students"
                count={11000}
                components={{ b: <strong className="font-semibold text-brass" /> }}
              />
            </TrustItem>
            <TrustItem>
              <Trans
                t={t}
                i18nKey="trust.schools"
                count={50}
                components={{ b: <strong className="font-semibold text-brass" /> }}
              />
            </TrustItem>
            <TrustItem last>
              <Trans
                t={t}
                i18nKey="trust.teachers"
                count={22}
                components={{ b: <strong className="font-semibold text-brass" /> }}
              />
            </TrustItem>
          </ul>
        </div>
      </section>

      {/* §3 — WHY TEACH WITH BRIDGES */}
      <section className="py-16 md:py-24">
        <div className="container-editorial">
          <SectionHeader eyebrow={t("why.eyebrow")} title={t("why.title")} />
          <div className="mt-10 grid gap-x-10 gap-y-8 md:mt-14 md:grid-cols-2">
            {whyKeys.map((k, i) => (
              <Reveal key={k} delay={i * 60}>
                <div className="border-t border-border pt-5">
                  <h3 className="font-display text-xl text-ink md:text-2xl">
                    {t(`why.points.${k}.title`)}
                  </h3>
                  <p className="mt-2 text-slate-body leading-relaxed">
                    {t(`why.points.${k}.body`)}
                  </p>
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
            <SectionHeader eyebrow={t("job.eyebrow")} title={t("job.title")} />
            <Reveal delay={160}>
              <blockquote className="mt-8 border-s-2 border-brass-deep ps-5 font-display text-xl italic leading-snug text-ink md:mt-10 md:text-2xl">
                {t("job.quote")}
              </blockquote>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <ul className="list-none space-y-4 md:space-y-5">
              {jobFlow.map((line, i) => (
                <li key={line}>
                  <Reveal delay={i * 50} className="flex gap-4 border-b border-border pb-4 md:pb-5">
                    <span className="font-display text-brass-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-ink/90 leading-relaxed">{line}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* §5 — WHO WE'RE LOOKING FOR */}
      <section className="py-16 md:py-24">
        <div className="container-editorial">
          <SectionHeader eyebrow={t("fit.eyebrow")} title={t("fit.title")} />
          <Reveal delay={120}>
            <div className="mt-10 overflow-hidden rounded-2xl border border-border md:mt-14">
              <table className="w-full border-collapse text-start">
                <caption className="sr-only">{t("fit.caption")}</caption>
                <thead>
                  <tr className="bg-cream">
                    <th
                      scope="col"
                      className="w-1/2 border-b border-border p-4 font-display text-base text-ink md:p-5 md:text-lg"
                    >
                      {t("fit.goodHeading")}
                    </th>
                    <th
                      scope="col"
                      className="w-1/2 border-b border-s border-border p-4 font-display text-base text-slate-body md:p-5 md:text-lg"
                    >
                      {t("fit.badHeading")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fitRows.map((row) => (
                    <tr key={row.good} className="align-top">
                      <td className="border-b border-border p-4 text-sm text-ink/90 md:p-5 md:text-base">
                        {row.good}
                      </td>
                      <td className="border-b border-s border-border p-4 text-sm text-slate-body md:p-5 md:text-base">
                        {row.bad}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* §6 — WHAT YOU NEED TO APPLY (Hebrew + quals + schedule confirmed; location to confirm) */}
      <section className="bg-cream py-16 md:py-24">
        <div className="container-editorial">
          <SectionHeader
            eyebrow={t("requirements.eyebrow")}
            title={t("requirements.title")}
            intro={t("requirements.intro")}
          />

          {/* No Hebrew required — the headline draw */}
          <Reveal>
            <div className="mt-10 rounded-2xl border border-brass-deep/40 bg-ivory p-7 md:mt-12 md:p-10">
              <p className="font-display text-3xl leading-tight text-ink md:text-4xl">
                {t("requirements.noHebrewTitle")}
              </p>
              <p className="mt-4 max-w-2xl text-slate-body leading-relaxed">
                {t("requirements.noHebrewBody")}
              </p>
            </div>
          </Reveal>

          {/* Other confirmed essentials */}
          <div className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2">
            <Reveal>
              <div className="border-t border-border pt-5">
                <h3 className="font-display text-xl text-ink md:text-2xl">
                  {t("requirements.qualsTitle")}
                </h3>
                <p className="mt-2 text-slate-body leading-relaxed">
                  {t("requirements.qualsBody")}
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="border-t border-border pt-5">
                <h3 className="font-display text-xl text-ink md:text-2xl">
                  {t("requirements.scheduleTitle")}
                </h3>
              </div>
            </Reveal>
          </div>

          {/* Still to confirm */}
          <div className="mt-8 max-w-xl">
            <TodoPlaceholder
              label={t("requirements.locationLabel")}
              note={t("requirements.locationNote")}
            />
          </div>

          <Reveal delay={120}>
            <p className="mt-8 font-medium text-ink">{t("requirements.paid")}</p>
          </Reveal>
        </div>
      </section>

      {/* §7 — REAL CLASSROOM PHOTOS (captions awaiting client) */}
      <section className="py-16 md:py-24">
        <div className="container-editorial">
          <SectionHeader eyebrow={t("photos.eyebrow")} title={t("photos.title")} />
          <div className="mt-10 grid grid-cols-12 gap-3 md:mt-14 md:gap-6">
            {photoSrc.map((src, i) => (
              <Reveal key={i} delay={i * 60} className={photoSpan[i]}>
                <figure className="h-full w-full">
                  <div className="h-full w-full overflow-hidden rounded-xl">
                    <img
                      src={src}
                      alt={photoAlts[i]}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 text-xs text-slate-body">
                    {t("photos.caption")}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 max-w-xl">
            <TodoPlaceholder label={t("photos.videoLabel")} note={t("photos.videoNote")} />
          </div>
        </div>
      </section>

      {/* §8 — HOW TO APPLY */}
      <section id="apply" className="scroll-mt-24 bg-cream py-16 md:py-24">
        <div className="container-editorial">
          <SectionHeader
            eyebrow={t("common:applyHow.eyebrow")}
            title={t("common:applyHow.title")}
            intro={t("common:applyHow.intro")}
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
            <div className="mt-10 text-center">
              <p className="mx-auto max-w-2xl font-display text-2xl leading-snug text-ink md:text-3xl">
                {t("apply.closing")}
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
                <div className="eyebrow text-brass">{t("schools.eyebrow")}</div>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ivory/85 md:text-xl">
                  {t("schools.body")}
                </p>
                <p className="mt-4 text-sm text-ivory/60">{t("schools.gefen")}</p>
              </div>
              <div className="lg:col-span-4 lg:justify-self-end">
                <LocaleLink to="/schools" className="btn-ghost">
                  {`${t("schools.cta")} `}
                  <ArrowUpRight size={16} aria-hidden />
                </LocaleLink>
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
