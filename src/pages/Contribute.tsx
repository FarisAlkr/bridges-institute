import { Link } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";

export function Contribute() {
  const { t } = useTranslation("contribute");
  const ways = t("ways.items", { returnObjects: true }) as {
    title: string;
    body: string;
    amount: string;
  }[];

  return (
    <>
      <section className="pt-32 pb-20 md:pt-40 md:pb-24 bg-cream border-b border-border">
        <div className="container-editorial max-w-4xl">
          <Reveal>
            <div className="eyebrow">{t("hero.eyebrow")}</div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-7xl text-ink leading-[1.05] md:leading-[1.02]">
              <Trans
                t={t}
                i18nKey="hero.headline"
                components={{ em: <em className="italic text-brass-deep font-light" /> }}
              />
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 md:mt-8 text-base md:text-lg text-slate-body max-w-2xl leading-relaxed">
              {t("hero.subheadline")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container-editorial">
          <SectionHeader eyebrow={t("ways.eyebrow")} title={t("ways.title")} />
          <div className="mt-12 md:mt-16 grid gap-6 md:gap-8 md:grid-cols-2">
            {ways.map((w, i) => (
              <Reveal key={w.title} delay={i * 80}>
                <article className="rounded-2xl bg-cream border border-border p-7 md:p-10 h-full hover:border-brass-deep transition">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-6">
                    <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight">
                      {w.title}
                    </h3>
                    <span className="eyebrow shrink-0">{w.amount}</span>
                  </div>
                  <div className="hairline my-6 w-12" />
                  <p className="text-slate-body leading-relaxed">{w.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-ivory py-20 md:py-28">
        <div className="container-editorial text-center max-w-3xl mx-auto">
          <Reveal>
            <div className="eyebrow text-brass justify-center">{t("cta.eyebrow")}</div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-6 font-display text-3xl sm:text-4xl md:text-5xl text-ivory leading-tight">
              {t("cta.title")}
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 text-ivory/70 leading-relaxed">{t("cta.body")}</p>
          </Reveal>
          <Reveal delay={320}>
            <Link to="/contact" className="btn-ghost mt-8 md:mt-10">
              {t("cta.button")}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
