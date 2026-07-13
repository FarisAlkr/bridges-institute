import { LOCALES, DEFAULT_LOCALE, localizePath, metaT, type Locale } from "./index";
import { ogImageFor } from "./og-images";
import { absoluteUrl } from "@/site-config";

// Builds the <head> meta for a page in a given locale: localized title/description,
// canonical, and reciprocal hreflang alternates (en/he/ar + x-default) so every
// locale variant points at the whole set. Used by both the EN routes and the
// /$locale routes, keeping SEO metadata identical across the two entry points.
//
// canonical, og:url, og:image and hreflang are ABSOLUTE (built from SITE_URL) because
// social/search scrapers require it (C4a). Change SITE_URL at go-live; these resolve
// once DNS points the domain here (C4b).
export function pageHead(pageNs: string, unprefixedPath: string, locale: Locale) {
  const t = metaT(locale, pageNs);
  const title = t("meta.title");
  const description = t("meta.description");
  const canonical = absoluteUrl(localizePath(unprefixedPath, locale));
  const image = absoluteUrl(ogImageFor(unprefixedPath));

  // Lowercase `hreflang` for clean, unambiguous output (TanStack serializes head
  // link keys verbatim rather than through React's camelCase→attr normalization).
  const alternates: { rel: string; hreflang: string; href: string }[] = LOCALES.map((l) => ({
    rel: "alternate",
    hreflang: l,
    href: absoluteUrl(localizePath(unprefixedPath, l)),
  }));
  // x-default points at the unprefixed EN URL.
  alternates.push({
    rel: "alternate",
    hreflang: "x-default",
    href: absoluteUrl(localizePath(unprefixedPath, DEFAULT_LOCALE)),
  });

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:locale", content: locale },
      { property: "og:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: canonical }, ...alternates],
  };
}
