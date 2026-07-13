import { useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { type Locale } from "@/i18n";
import { localeFromPath, switchLocalePath } from "@/i18n/routing";

const LANGS: { code: Locale; short: string; name: string }[] = [
  { code: "en", short: "EN", name: "English" },
  { code: "he", short: "עב", name: "עברית" },
  { code: "ar", short: "ع", name: "العربية" },
];

// Switches language while staying on the same page: maps to the equivalent path in the
// target locale and preserves the current query + hash (so /#apply stays on the form).
// A full navigation is used so each locale is served by its own prerendered HTML.
export function LanguageSwitcher({
  className = "",
  tone = "solid",
}: {
  className?: string;
  tone?: "solid" | "onDark";
}) {
  const { t } = useTranslation("common");
  const { pathname, searchStr, hash } = useRouterState({
    select: (s) => ({
      pathname: s.location.pathname,
      searchStr: s.location.searchStr,
      hash: s.location.hash,
    }),
  });
  const current = localeFromPath(pathname);
  const base = tone === "onDark" ? "text-ivory/70" : "text-ink/60";

  return (
    <nav aria-label={t("nav.languageLabel")} className={className}>
      <ul className="flex items-center gap-1 text-xs font-medium uppercase tracking-[0.14em]">
        {LANGS.map(({ code, short, name }, i) => {
          const active = code === current;
          const href = switchLocalePath(pathname, code) + searchStr + (hash ? `#${hash}` : "");
          return (
            <li key={code} className="flex items-center">
              {i > 0 && (
                <span aria-hidden className={`px-1 ${base}`}>
                  ·
                </span>
              )}
              <a
                href={href}
                lang={code}
                aria-label={name}
                aria-current={active ? "true" : undefined}
                className={`rounded px-1 transition-colors ${
                  active ? "text-brass-deep" : `${base} hover:text-brass-deep`
                }`}
              >
                {short}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
