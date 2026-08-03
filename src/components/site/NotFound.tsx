import { Link, useRouterState } from "@tanstack/react-router";
import { metaT } from "@/i18n";
import { localeFromPath, withLocale } from "@/i18n/routing";

// Locale-prefixed paths are computed at runtime; the router resolves the string href,
// so the compile-time route-id typing is satisfied with a cast at the call site.
type ToProp = Parameters<typeof Link>[0]["to"];

// Lives in its own module so it can be wired in twice: as the root route's
// notFoundComponent AND as the router's defaultNotFoundComponent. The second is what
// covers the /$locale subtree — a not-found under /he/* or /ar/* resolves against that
// layout, which has no handler of its own, so without a router-level default it fell
// through to TanStack's bare built-in "Not Found" text.
//
// Uses metaT() rather than useTranslation() because it can render in place of the root
// component that mounts the i18next provider.
export function NotFound() {
  const locale = useRouterState({ select: (s) => localeFromPath(s.location.pathname) });
  const t = metaT(locale, "common");
  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-4">
      <div className="max-w-md text-center">
        <div className="eyebrow justify-center">{t("notFound.eyebrow")}</div>
        <h1 className="mt-4 font-display text-7xl text-ink">404</h1>
        <p className="mt-4 text-slate-body">{t("notFound.body")}</p>
        <div className="mt-8">
          <Link to={withLocale("/", locale) as ToProp} className="btn-primary">
            {t("notFound.cta")}
          </Link>
        </div>
      </div>
    </div>
  );
}
