import { DEFAULT_LOCALE, isLocale, type Locale } from "./index";

// The active locale for a pathname. EN is unprefixed, so only a leading
// /he or /ar counts; everything else (including /en) resolves to EN.
export function localeFromPath(pathname: string): Locale {
  const seg = pathname.split("/")[1] ?? "";
  return isLocale(seg) && seg !== DEFAULT_LOCALE ? seg : DEFAULT_LOCALE;
}

// Strip a leading /he or /ar, returning the unprefixed (EN) path.
export function stripLocale(pathname: string): string {
  const seg = pathname.split("/")[1] ?? "";
  if (isLocale(seg) && seg !== DEFAULT_LOCALE) {
    const rest = pathname.slice(seg.length + 1);
    return rest === "" ? "/" : rest;
  }
  return pathname;
}

// Add the locale prefix to an unprefixed path ("/about" -> "/he/about", "/" -> "/he").
export function withLocale(unprefixed: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return unprefixed;
  return unprefixed === "/" ? `/${locale}` : `/${locale}${unprefixed}`;
}

// Equivalent path in `locale` for the current pathname — preserves the route
// (the switcher keeps you on the same page, not the localized homepage).
export function switchLocalePath(pathname: string, locale: Locale): string {
  return withLocale(stripLocale(pathname), locale);
}
