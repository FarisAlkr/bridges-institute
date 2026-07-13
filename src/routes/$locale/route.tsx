import { createFileRoute, notFound, redirect, Outlet } from "@tanstack/react-router";
import { DEFAULT_LOCALE, RTL_LOCALES } from "@/i18n";
import { stripLocale } from "@/i18n/routing";

// Locale-prefixed routes (/he/*, /ar/*) render the same shared page components as
// the unprefixed EN routes. This layout guards the prefix.
export const Route = createFileRoute("/$locale")({
  beforeLoad: ({ params, location }) => {
    const locale = params.locale;
    if (locale === DEFAULT_LOCALE) {
      // /en/* is not canonical — send it to the unprefixed path (also enforced as a
      // 301 at the edge in vercel.json for the static deploy).
      throw redirect({
        href: stripLocale(location.pathname) + location.searchStr,
        replace: true,
      });
    }
    if (!(RTL_LOCALES as readonly string[]).includes(locale)) {
      // Unknown prefix (e.g. /fr) — 404. No redirect-to-EN catch-all.
      throw notFound();
    }
  },
  component: () => <Outlet />,
});
