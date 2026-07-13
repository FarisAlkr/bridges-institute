import { Trans, useTranslation } from "react-i18next";
import { Reveal } from "@/components/site/Reveal";
import { TodoPlaceholder } from "@/components/site/TodoPlaceholder";

export function AccessibilityStatement() {
  const { t } = useTranslation(["accessibility", "common"]);
  const doneItems = t("done.items", { returnObjects: true }) as string[];

  return (
    <>
      <section className="border-b border-border bg-cream pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-editorial max-w-4xl">
          <Reveal>
            <div className="eyebrow">{t("hero.eyebrow")}</div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] text-ink sm:text-5xl md:text-6xl">
              {t("hero.title")}
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-body md:text-lg">
              {t("hero.intro")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-editorial max-w-3xl space-y-12">
          <div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">{t("standard.title")}</h2>
            <p className="mt-4 text-slate-body leading-relaxed">
              <Trans t={t} i18nKey="standard.body" components={{ b: <strong /> }} />
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">{t("done.title")}</h2>
            <ul className="mt-4 space-y-3 text-slate-body leading-relaxed">
              {doneItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">{t("ongoing.title")}</h2>
            <p className="mt-4 text-slate-body leading-relaxed">{t("ongoing.body")}</p>
            <div className="mt-6">
              <TodoPlaceholder label={t("ongoing.todoLabel")} note={t("ongoing.todoNote")} />
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">{t("report.title")}</h2>
            <p className="mt-4 text-slate-body leading-relaxed">{t("report.body")}</p>
            <ul className="mt-4 space-y-2 text-slate-body leading-relaxed">
              <li>
                {t("report.emailLabel")}{" "}
                <a
                  href="mailto:info@bridgesinstitute.org"
                  className="link-underline font-medium text-ink"
                >
                  {t("common:contactEmail")}
                </a>
              </li>
              <li>{t("report.address")}</li>
            </ul>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <TodoPlaceholder
                label={t("report.coordinatorLabel")}
                note={t("report.coordinatorNote")}
              />
              <TodoPlaceholder label={t("report.phoneLabel")} note={t("report.phoneNote")} />
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">{t("reviewed.title")}</h2>
            <p className="mt-4 text-slate-body leading-relaxed">{t("reviewed.date")}.</p>
          </div>
        </div>
      </section>
    </>
  );
}
