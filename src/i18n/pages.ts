import { LOCALES, withLocaleList } from "./index";
import { PAGE_PATHS } from "./page-list";

// Content pages with the extra data the sitemap/hreflang need. Paths come from the
// shared dependency-free list (page-list.ts) so the prerender config and this stay
// in sync. `ns` is the i18n namespace holding that page's meta.title/description.
const PAGE_META: Record<
  (typeof PAGE_PATHS)[number],
  { ns: string; changefreq: string; priority: string }
> = {
  "/": { ns: "home", changefreq: "weekly", priority: "1.0" },
  "/about": { ns: "about", changefreq: "monthly", priority: "0.8" },
  "/schools": { ns: "schools", changefreq: "monthly", priority: "0.8" },
  "/teach": { ns: "teach", changefreq: "monthly", priority: "0.9" },
  "/contribute": { ns: "contribute", changefreq: "monthly", priority: "0.7" },
  "/contact": { ns: "contact", changefreq: "monthly", priority: "0.7" },
  "/accessibility": { ns: "accessibility", changefreq: "yearly", priority: "0.3" },
};

export const PAGES = PAGE_PATHS.map((path) => ({ path, ...PAGE_META[path] }));

// Every (page × locale) URL — the explicit prerender/enumeration list.
export const allLocalePaths = (): string[] => PAGE_PATHS.flatMap((p) => withLocaleList(p, LOCALES));
