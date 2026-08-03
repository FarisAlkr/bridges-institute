import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { absoluteUrl } from "@/site-config";

// Served from a handler rather than public/robots.txt so the sitemap URL is built from
// the same SITE_URL as the sitemap, canonicals and hreflang — one line to change at the
// domain cutover instead of a static file that quietly keeps the old domain (C4a/C4b).
//
// Sitemap: must be an absolute URL; crawlers ignore a relative one.
export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const body = [
          "User-agent: *",
          "Allow: /",
          "",
          `Sitemap: ${absoluteUrl("/sitemap.xml")}`,
          "",
        ].join("\n");
        return new Response(body, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
