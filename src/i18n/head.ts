import { LOCALES, DEFAULT_LOCALE, localizePath, metaT, type Locale } from "./index";

// Builds the <head> meta for a page in a given locale: localized title/description,
// canonical, and reciprocal hreflang alternates (en/he/ar + x-default) so every
// locale variant points at the whole set. Used by both the EN routes and the
// /$locale routes, keeping SEO metadata identical across the two entry points.
//
// URLs are root-relative. Absolute hreflang would require the final production
// domain, which is still open (open-questions C4) — swap in SITE_URL there.
export function pageHead(pageNs: string, unprefixedPath: string, locale: Locale) {
  const t = metaT(locale, pageNs);
  const title = t("meta.title");
  const description = t("meta.description");
  const canonical = localizePath(unprefixedPath, locale);

  // Lowercase `hreflang` for clean, unambiguous output (TanStack serializes head
  // link keys verbatim rather than through React's camelCase→attr normalization).
  const alternates: { rel: string; hreflang: string; href: string }[] = LOCALES.map((l) => ({
    rel: "alternate",
    hreflang: l,
    href: localizePath(unprefixedPath, l),
  }));
  // x-default points at the unprefixed EN URL.
  alternates.push({
    rel: "alternate",
    hreflang: "x-default",
    href: localizePath(unprefixedPath, DEFAULT_LOCALE),
  });

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:locale", content: locale },
    ],
    links: [{ rel: "canonical", href: canonical }, ...alternates],
  };
}
