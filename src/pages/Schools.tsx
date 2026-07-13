import { LocaleLink } from "@/components/site/LocaleLink";
import { Trans, useTranslation } from "react-i18next";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import g2 from "@/assets/gallery-2.jpg";

export function Schools() {
  const { t } = useTranslation("schools");
  const programs = t("programs", { returnObjects: true }) as {
    title: string;
    body: string;
    scope: string;
  }[];
  const steps = t("process.steps", { returnObjects: true }) as { title: string; body: string }[];

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-cream border-b border-border">
        <div className="container-editorial grid gap-10 md:gap-12 lg:grid-cols-12 items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="eyebrow">{t("hero.eyebrow")}</div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] text-ink leading-[1.05] lg:leading-[1.02]">
                <Trans
                  t={t}
                  i18nKey="hero.headline"
                  components={{ em: <em className="italic text-brass-deep font-light" /> }}
                />
              </h1>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={200}>
              <p className="text-base md:text-lg text-slate-body leading-relaxed">
                {t("hero.aside")}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 md:py-32">
        <div className="container-editorial">
          <SectionHeader
            eyebrow={t("programsSection.eyebrow")}
            title={t("programsSection.title")}
          />
          <div className="mt-12 md:mt-16 grid gap-px bg-border rounded-2xl overflow-hidden border border-border md:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <Reveal key={p.title} delay={i * 60} className="bg-cream">
                <div className="p-7 md:p-10 h-full flex flex-col">
                  <span className="font-display text-brass-deep text-sm">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-xl md:text-2xl text-ink leading-tight">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-slate-body leading-relaxed flex-1">{p.body}</p>
                  <div className="hairline my-6 w-12" />
                  <p className="text-xs uppercase tracking-[0.18em] text-ink/60">{p.scope}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-ink text-ivory py-20 md:py-28">
        <div className="container-editorial">
          <SectionHeader eyebrow={t("process.eyebrow")} title={t("process.title")} onDark />
          <div className="mt-12 md:mt-16 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div>
                  <div className="font-display text-brass text-4xl">0{i + 1}</div>
                  <div className="hairline my-6 w-12" />
                  <h4 className="font-display text-xl text-ivory">{s.title}</h4>
                  <p className="mt-3 text-ivory/70 text-sm leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-32 overflow-hidden">
        <img
          src={g2}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-ivory/80" />
        <div className="container-editorial relative z-10 text-center">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-ink max-w-3xl mx-auto leading-tight">
              {t("cta.title")}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <LocaleLink to="/contact" className="btn-primary mt-8 md:mt-10">
              {t("cta.button")}
            </LocaleLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
