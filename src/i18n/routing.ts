import { DEFAULT_LOCALE, isLocale, type Locale } from "./index";

// The active locale for a pathname. EN is unprefixed, so only a leading
// /he or /ar counts; everything else (including /en) resolves to EN.
export function localeFromPath(pathname: string): Locale {
  const seg = pathname.split("/")[1] ?? "";
  return isLocale(seg) && seg !== DEFAULT_LOCALE ? seg : DEFAULT_LOCALE;
}

// Strip a leading locale segment, returning the unprefixed (EN) path.
//
// This strips /en as well as /he and /ar. It must: the $locale layout redirects the
// non-canonical /en/* to stripLocale(pathname), so leaving /en in place made that a
// redirect to the same URL — an infinite loop for every /en/* address. In production
// the vercel.json edge rule sends /en/* to the canonical path before a function ever
// runs, which hid the loop, but the app must not depend on that single config file.
export function stripLocale(pathname: string): string {
  const seg = pathname.split("/")[1] ?? "";
  if (isLocale(seg)) {
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
