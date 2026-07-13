import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { LOCALES, DEFAULT_LOCALE, localizePath } from "@/i18n";
import { PAGES } from "@/i18n/pages";
import { absoluteUrl } from "@/site-config";

// Absolute URLs (built from SITE_URL) — sitemaps require full URLs (C4a). They resolve
// once DNS points the domain at this deployment (C4b).

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // One <url> per (page × locale), each carrying reciprocal hreflang
        // alternates for the whole locale set plus x-default.
        const urls = PAGES.flatMap((page) =>
          LOCALES.map((locale) => {
            const alternates = [
              ...LOCALES.map(
                (l) =>
                  `    <xhtml:link rel="alternate" hreflang="${l}" href="${absoluteUrl(localizePath(page.path, l))}" />`,
              ),
              `    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(localizePath(page.path, DEFAULT_LOCALE))}" />`,
            ];
            return [
              `  <url>`,
              `    <loc>${absoluteUrl(localizePath(page.path, locale))}</loc>`,
              ...alternates,
              `    <changefreq>${page.changefreq}</changefreq>`,
              `    <priority>${page.priority}</priority>`,
              `  </url>`,
            ].join("\n");
          }),
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
