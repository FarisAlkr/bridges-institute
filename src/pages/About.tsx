import { LocaleLink } from "@/components/site/LocaleLink";
import { Trans, useTranslation } from "react-i18next";
import aboutHero from "@/assets/about-hero.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";

export function About() {
  const { t } = useTranslation("about");
  const challenge = t("difference.challenge", { returnObjects: true }) as string[];
  const approach = t("difference.approach", { returnObjects: true }) as string[];
  const whyItems = t("why.items", { returnObjects: true }) as { title: string; body: string }[];

  return (
    <>
      <section className="relative min-h-[70svh] md:min-h-[80svh] flex items-end overflow-hidden">
        <img
          src={aboutHero}
          alt={t("hero.imageAlt")}
          width={1600}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 to-ink/95" />
        <div className="container-editorial relative z-10 pb-16 pt-32 md:pb-20 md:pt-40 text-ivory">
          <Reveal>
            <div className="eyebrow text-brass">{t("hero.eyebrow")}</div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] max-w-4xl leading-[1.05] lg:leading-[1.02] text-ivory">
              <Trans
                t={t}
                i18nKey="hero.headline"
                components={{ em: <em className="italic text-brass font-light" /> }}
              />
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-32">
        <div className="container-editorial grid gap-10 md:gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="eyebrow">{t("story.eyebrow", { year: 2014 })}</div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-display text-3xl md:text-4xl text-ink leading-tight">
                {t("story.title")}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8 space-y-6 text-base md:text-lg text-slate-body leading-relaxed">
            <Reveal>
              <p>{t("story.p1")}</p>
            </Reveal>
            <Reveal delay={100}>
              <p>{t("story.p2")}</p>
            </Reveal>
            <Reveal delay={200}>
              <p>{t("story.p3")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-cream border-y border-border py-20 md:py-28">
        <div className="container-editorial grid gap-12 md:gap-16 md:grid-cols-2">
          <Reveal>
            <div>
              <div className="eyebrow">{t("mission.eyebrow")}</div>
              <h3 className="mt-5 font-display text-3xl md:text-4xl text-ink leading-tight">
                {t("mission.title")}
              </h3>
              <div className="hairline mt-6 md:mt-8 w-16" />
              <p className="mt-6 md:mt-8 text-slate-body leading-relaxed">{t("mission.body")}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <div className="eyebrow">{t("vision.eyebrow")}</div>
              <h3 className="mt-5 font-display text-3xl md:text-4xl text-ink leading-tight">
                {t("vision.title")}
              </h3>
              <div className="hairline mt-6 md:mt-8 w-16" />
              <p className="mt-6 md:mt-8 text-slate-body leading-relaxed">{t("vision.body")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Challenge vs Approach */}
      <section className="py-20 md:py-32">
        <div className="container-editorial">
          <SectionHeader eyebrow={t("difference.eyebrow")} title={t("difference.title")} />

          <div className="mt-12 md:mt-16 grid gap-px bg-border rounded-2xl overflow-hidden border border-border md:grid-cols-2">
            <Reveal className="bg-cream">
              <div className="p-8 md:p-12 h-full">
                <div className="eyebrow text-ink/60">{t("difference.challengeHeading")}</div>
                <ul className="mt-8 space-y-5 text-slate-body">
                  {challenge.map((item) => (
                    <li key={item} className="flex gap-4">
                      <span className="mt-2 inline-block h-px w-6 bg-ink/40 flex-none" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120} className="bg-ink text-ivory">
              <div className="p-8 md:p-12 h-full">
                <div className="eyebrow text-brass">{t("difference.approachHeading")}</div>
                <ul className="mt-8 space-y-5 text-ivory/85">
                  {approach.map((item) => (
                    <li key={item} className="flex gap-4">
                      <span className="mt-2 inline-block h-px w-6 bg-brass flex-none" />
                      <span>{item}</span>
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
          <SectionHeader eyebrow={t("why.eyebrow")} title={t("why.title")} intro={t("why.intro")} />

          <div className="mt-12 md:mt-16 grid gap-8 md:gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {whyItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="border-t border-ink/15 pt-6">
                  <div className="font-display text-brass-deep">0{i + 1}</div>
                  <h4 className="mt-3 font-display text-2xl text-ink">{item.title}</h4>
                  <p className="mt-3 text-slate-body leading-relaxed">{item.body}</p>
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
            <Reveal
              key={i}
              delay={i * 100}
              className={i === 1 ? "col-span-12 md:col-span-6" : "col-span-6 md:col-span-3"}
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={src}
                  alt={t("galleryAlt")}
                  loading="lazy"
                  className="h-full w-full object-cover aspect-[4/5]"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink text-ivory py-16 md:py-24">
        <div className="container-editorial flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl text-ivory max-w-2xl leading-tight">
            {t("cta.title")}
          </h2>
          <LocaleLink
            to="/contact"
            className="btn-ghost self-start md:self-auto"
            style={{ color: "var(--ivory)" }}
          >
            {t("cta.button")}
          </LocaleLink>
        </div>
      </section>
    </>
  );
}
