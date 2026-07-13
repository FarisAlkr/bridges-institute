import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";

import appCss from "../styles.css?url";
import { Nav } from "../components/site/Nav";
import { Footer } from "../components/site/Footer";
import { i18n } from "../i18n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-4">
      <div className="max-w-md text-center">
        <div className="eyebrow justify-center">Page Not Found</div>
        <h1 className="mt-4 font-display text-7xl text-ink">404</h1>
        <p className="mt-4 text-slate-body">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn-primary">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-ink">This page didn't load</h1>
        <p className="mt-3 text-sm text-slate-body">
          Something went wrong on our end. You can try again or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary"
          >
            Try again
          </button>
          <a
            href="/"
            className="btn-primary"
            style={{ background: "transparent", color: "var(--ink)" }}
          >
            Go home
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
          "Authentic, immersive English programs led by native English-speaking educators. Serving Arab and Jewish communities across the Negev since 2014.",
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
          "Authentic, immersive English programs led by native English-speaking educators. Serving Arab and Jewish communities across the Negev since 2014.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Bridges Institute — English through action, confidence & connection",
      },
      {
        name: "twitter:description",
        content:
          "Authentic, immersive English programs led by native English-speaking educators. Serving Arab and Jewish communities across the Negev since 2014.",
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
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ivory"
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
