import { Link } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";
import teachHero from "@/assets/teach-hero.jpg";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ApplyForm } from "@/components/site/ApplyForm";

export function Teach() {
  const { t } = useTranslation(["teach", "common"]);
  const applySteps = t("common:applyHow.steps", { returnObjects: true }) as string[];

  return (
    <>
      <section className="relative flex min-h-[55svh] items-end overflow-hidden md:min-h-[65svh]">
        <img
          src={teachHero}
          alt={t("hero.imageAlt")}
          width={1600}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/55 to-ink/95" />
        <div className="container-editorial relative z-10 pb-16 pt-32 text-ivory md:pb-20 md:pt-40">
          <Reveal>
            <div className="eyebrow text-brass">{t("hero.eyebrow")}</div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] text-ivory sm:text-5xl md:text-6xl lg:leading-[1.02]">
              <Trans
                t={t}
                i18nKey="hero.headline"
                components={{ em: <em className="font-light italic text-brass" /> }}
              />
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-2xl text-base text-ivory/85 md:mt-8 md:text-lg">
              {t("hero.subheadline")}
            </p>
          </Reveal>
        </div>
      </section>

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
            <p className="mt-8 text-sm text-slate-body">
              <Trans
                t={t}
                i18nKey="fullPicture"
                components={{
                  a: <Link to="/" hash="method" className="link-underline font-medium text-ink" />,
                }}
              />
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
