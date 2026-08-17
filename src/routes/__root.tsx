import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode, useEffect, useState } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
// Generic React entry point, not the /next one — this is TanStack Start.
import { Analytics } from "@vercel/analytics/react";

import appCss from "../styles.css?url";
import { Nav } from "../components/site/Nav";
import { Footer } from "../components/site/Footer";
import { NotFound } from "../components/site/NotFound";
import { createI18n, dirFor, metaT } from "../i18n";
import { localeFromPath, withLocale } from "../i18n/routing";

// This screen can render in place of RootComponent, i.e. without the
// <I18nextProvider> it mounts. metaT() takes an explicit locale and needs no React
// context, so it stays localized either way (useTranslation would fall back to an
// uninitialized instance and render raw keys). Same reasoning in NotFound.

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const locale = useRouterState({ select: (s) => localeFromPath(s.location.pathname) });
  const t = metaT(locale, "common");

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-ink">{t("errorPage.title")}</h1>
        <p className="mt-3 text-sm text-slate-body">{t("errorPage.body")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary"
          >
            {t("errorPage.retry")}
          </button>
          <a
            href={withLocale("/", locale)}
            className="btn-primary"
            style={{ background: "transparent", color: "var(--ink)" }}
          >
            {t("errorPage.home")}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bridges Institute — English through action, confidence & connection" },
      {
        name: "description",
        content:
          "Authentic, immersive English programs led by qualified native English-speaking teachers. Serving Arab and Jewish communities across the Negev since 2014.",
      },
      { name: "author", content: "Bridges Institute" },
      { property: "og:site_name", content: "Bridges Institute" },
      { property: "og:type", content: "website" },
      {
        property: "og:title",
        content: "Bridges Institute — English through action, confidence & connection",
      },
      {
        property: "og:description",
        content:
          "Authentic, immersive English programs led by qualified native English-speaking teachers. Serving Arab and Jewish communities across the Negev since 2014.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Bridges Institute — English through action, confidence & connection",
      },
      {
        name: "twitter:description",
        content:
          "Authentic, immersive English programs led by qualified native English-speaking teachers. Serving Arab and Jewish communities across the Negev since 2014.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  // lang/dir are baked into each prerendered locale's HTML.
  const locale = useRouterState({ select: (s) => localeFromPath(s.location.pathname) });
  return (
    <html lang={locale} dir={dirFor(locale)}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        {/* Cookieless page-view counts (Vercel Web Analytics). No cookies and no
            cross-site identifier, so it needs no consent banner — but it IS disclosed
            in the privacy policy, because the page promises to say what we collect. */}
        <Analytics />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const locale = useRouterState({ select: (s) => localeFromPath(s.location.pathname) });
  // Fresh i18next instance per SSR request (never a shared singleton for rendering),
  // so concurrent /en, /he and /ar renders can't leak language or mismatch on hydrate.
  // Stable across the client session; changeLanguage handles client-side locale nav.
  const [i18n] = useState(() => createI18n(locale));
  useEffect(() => {
    if (i18n.language !== locale) i18n.changeLanguage(locale);
  }, [i18n, locale]);
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n} defaultNS="common">
        <AppShell />
      </I18nextProvider>
    </QueryClientProvider>
  );
}

function AppShell() {
  const { t } = useTranslation("common");
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ivory"
      >
        {t("skipToContent")}
      </a>
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
