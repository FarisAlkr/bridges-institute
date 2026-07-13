import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/site/Reveal";
import { TodoPlaceholder } from "@/components/site/TodoPlaceholder";

export function Privacy() {
  const { t } = useTranslation(["privacy", "common"]);
  const collectItems = t("collect.items", { returnObjects: true }) as string[];
  const useItems = t("use.items", { returnObjects: true }) as string[];

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
            <h2 className="font-display text-2xl text-ink md:text-3xl">{t("collect.title")}</h2>
            <p className="mt-4 text-slate-body leading-relaxed">{t("collect.intro")}</p>
            <ul className="mt-4 space-y-3 text-slate-body leading-relaxed">
              {collectItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">{t("use.title")}</h2>
            <ul className="mt-4 space-y-3 text-slate-body leading-relaxed">
              {useItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">{t("sharing.title")}</h2>
            <p className="mt-4 text-slate-body leading-relaxed">{t("sharing.body")}</p>
            <div className="mt-6">
              <TodoPlaceholder
                label={t("sharing.processorsLabel")}
                note={t("sharing.processorsNote")}
              />
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">{t("retention.title")}</h2>
            <p className="mt-4 text-slate-body leading-relaxed">{t("retention.body")}</p>
            <div className="mt-6">
              <TodoPlaceholder
                label={t("retention.periodLabel")}
                note={t("retention.periodNote")}
              />
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">{t("rights.title")}</h2>
            <p className="mt-4 text-slate-body leading-relaxed">{t("rights.body")}</p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">{t("contact.title")}</h2>
            <p className="mt-4 text-slate-body leading-relaxed">{t("contact.body")}</p>
            <ul className="mt-4 space-y-2 text-slate-body leading-relaxed">
              <li>
                {t("contact.emailLabel")}{" "}
                <a
                  href="mailto:info@bridgesinstitute.org"
                  className="link-underline font-medium text-ink"
                >
                  {t("common:contactEmail")}
                </a>
              </li>
              <li>{t("contact.address")}</li>
            </ul>
            <div className="mt-6">
              <TodoPlaceholder
                label={t("contact.controllerLabel")}
                note={t("contact.controllerNote")}
              />
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">{t("updated.title")}</h2>
            <p className="mt-4 text-slate-body leading-relaxed">{t("updated.date")}.</p>
          </div>
        </div>
      </section>
    </>
  );
}
