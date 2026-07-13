// Dependency-free source of truth for content-page paths and locale codes.
// Kept plain (no imports) so vite.config.ts can consume it in the Node context
// without pulling in i18next / import.meta.glob. src/i18n/pages.ts and the
// sitemap layer richer data (namespaces, priorities) on top of these.
export const PAGE_PATHS = [
  "/",
  "/about",
  "/schools",
  "/teach",
  "/contribute",
  "/contact",
  "/accessibility",
] as const;

export const LOCALE_CODES = ["en", "he", "ar"] as const;
export const DEFAULT_LOCALE_CODE = "en";

// Every (page × locale) URL. EN is unprefixed; HE/AR are prefixed.
export function enumerateLocalePaths(): string[] {
  const out: string[] = [];
  for (const p of PAGE_PATHS) {
    for (const l of LOCALE_CODES) {
      out.push(l === DEFAULT_LOCALE_CODE ? p : p === "/" ? `/${l}` : `/${l}${p}`);
    }
  }
  return out;
}
