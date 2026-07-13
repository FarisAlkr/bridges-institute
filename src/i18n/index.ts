import i18next, { type i18n as I18n, type Resource } from "i18next";
import { initReactI18next } from "react-i18next";

export const LOCALES = ["en", "he", "ar"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const RTL_LOCALES: Locale[] = ["he", "ar"];
export const isLocale = (v: string): v is Locale => (LOCALES as readonly string[]).includes(v);
export const dirFor = (lng: Locale): "rtl" | "ltr" => (RTL_LOCALES.includes(lng) ? "rtl" : "ltr");

// Prefix an unprefixed (EN) path for a locale ("/about" -> "/he/about"; "/" -> "/he").
export const localizePath = (unprefixed: string, lng: Locale): string =>
  lng === DEFAULT_LOCALE ? unprefixed : unprefixed === "/" ? `/${lng}` : `/${lng}${unprefixed}`;

// The same unprefixed path across a set of locales (used for prerender enumeration).
export const withLocaleList = (unprefixed: string, locales: readonly Locale[]): string[] =>
  locales.map((l) => localizePath(unprefixed, l));

export const NAMESPACES = [
  "common",
  "home",
  "about",
  "schools",
  "teach",
  "contact",
  "contribute",
  "accessibility",
  "privacy",
] as const;
export const DEFAULT_NS = "common";

// EN is the source of truth; HE/AR are NEEDS TRANSLATION stubs (English fallback
// values) until real copy lands. Bundled synchronously so SSR/prerender is
// deterministic (no async load race). New namespaces auto-register via the glob.
const modules = import.meta.glob("./{en,he,ar}/*.json", {
  eager: true,
  import: "default",
}) as Record<string, Record<string, unknown>>;

export const resources: Resource = {};
for (const [path, mod] of Object.entries(modules)) {
  const m = path.match(/\.\/(en|he|ar)\/(.+)\.json$/);
  if (!m) continue;
  const [, lng, ns] = m;
  (resources[lng] ??= {})[ns] = mod;
}

// Metadata-only instance for building <head> titles/descriptions. getFixedT(locale, ns)
// takes an explicit locale and never mutates the instance's language, so it's safe to
// share across concurrent head() calls (unlike the mutable render instances above).
let _meta: I18n | null = null;
export function metaT(locale: Locale, ns: string) {
  if (!_meta) {
    _meta = i18next.createInstance();
    _meta.init({
      resources,
      lng: DEFAULT_LOCALE,
      fallbackLng: DEFAULT_LOCALE,
      supportedLngs: LOCALES,
      ns: NAMESPACES,
      defaultNS: DEFAULT_NS,
      interpolation: { escapeValue: false },
      returnNull: false,
    });
  }
  return _meta.getFixedT(locale, ns);
}

// Factory — one instance per call. On the server we call this PER REQUEST with the
// route's locale (never a shared singleton for rendering) so concurrent /en, /he and
// /ar renders can't leak language into one another or cause a hydration mismatch.
export function createI18n(lng: Locale = DEFAULT_LOCALE): I18n {
  const instance = i18next.createInstance();
  instance.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: LOCALES,
    ns: NAMESPACES,
    defaultNS: DEFAULT_NS,
    interpolation: { escapeValue: false },
    returnNull: false,
    // Log missing keys instead of rendering blank (see docs/redesign/i18n.md).
    saveMissing: true,
    missingKeyHandler: (_lngs, ns, key) => {
      if (typeof console !== "undefined") console.warn(`[i18n] missing key: ${ns}:${key}`);
    },
  });
  return instance;
}
