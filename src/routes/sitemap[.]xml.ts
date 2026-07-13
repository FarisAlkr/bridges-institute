import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { LOCALES, DEFAULT_LOCALE, localizePath } from "@/i18n";
import { PAGES } from "@/i18n/pages";

// Root-relative URLs. Absolute would require the final production domain
// (open-questions C4); swap in a SITE_URL prefix there.
const BASE_URL = "";

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
                  `    <xhtml:link rel="alternate" hreflang="${l}" href="${BASE_URL}${localizePath(page.path, l)}" />`,
              ),
              `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${localizePath(page.path, DEFAULT_LOCALE)}" />`,
            ];
            return [
              `  <url>`,
              `    <loc>${BASE_URL}${localizePath(page.path, locale)}</loc>`,
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
