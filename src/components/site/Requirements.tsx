import { useTranslation } from "react-i18next";
import { Reveal } from "./Reveal";

// Client-approved teacher requirements + how the roles are described.
//
// The client asked for the SAME requirements on the homepage, the About page and the
// apply page. Both the copy (the shared `common` namespace) and this markup are
// therefore shared, so the three can never drift apart.
//
// Always render this under a section heading (h2) — the headings here are h3.
export function Requirements() {
  const { t } = useTranslation("common");
  return (
    <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
      <Reveal>
        <div className="border-t border-border pt-5">
          <h3 className="font-display text-xl text-ink md:text-2xl">{t("requirements.title")}</h3>
          <p className="mt-2 text-slate-body leading-relaxed">{t("requirements.body")}</p>
        </div>
      </Reveal>
      <Reveal delay={80}>
        <div className="border-t border-border pt-5">
          <h3 className="font-display text-xl text-ink md:text-2xl">{t("roles.title")}</h3>
          <p className="mt-2 text-slate-body leading-relaxed">{t("roles.body")}</p>
        </div>
      </Reveal>
    </div>
  );
}
