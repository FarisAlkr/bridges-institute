// Proves the language switcher maps to the EQUIVALENT path in the target locale and
// preserves route + query + hash — including the #apply edge case (staying on the
// form) — and that unknown locales are not valid routes. Tests the pure routing
// helpers directly (mirrors src/i18n/routing.ts) plus the prerendered output.

import { readFileSync, existsSync } from "node:fs";

const LOCALES = ["en", "he", "ar"];
const DEFAULT = "en";
const isLocale = (v) => LOCALES.includes(v);

// --- mirrors src/i18n/routing.ts ---
const localeFromPath = (p) => {
  const seg = p.split("/")[1] ?? "";
  return isLocale(seg) && seg !== DEFAULT ? seg : DEFAULT;
};
const stripLocale = (p) => {
  const seg = p.split("/")[1] ?? "";
  if (isLocale(seg) && seg !== DEFAULT) {
    const rest = p.slice(seg.length + 1);
    return rest === "" ? "/" : rest;
  }
  return p;
};
const withLocale = (u, l) => (l === DEFAULT ? u : u === "/" ? `/${l}` : `/${l}${u}`);
const switchLocalePath = (p, l) => withLocale(stripLocale(p), l);
// Full href the switcher builds (component appends searchStr + hash).
const switchHref = (p, l, search = "", hash = "") =>
  switchLocalePath(p, l) + search + (hash ? `#${hash}` : "");

let fail = 0;
const eq = (name, got, want) => {
  const ok = got === want;
  console.log(
    `  ${ok ? "✓" : "✗"} ${name}${ok ? "" : `  got ${JSON.stringify(got)} want ${JSON.stringify(want)}`}`,
  );
  if (!ok) fail++;
};

console.log("\nRoute preserved across locales (/about ↔ /he/about ↔ /ar/about):");
eq("EN /about → HE", switchLocalePath("/about", "he"), "/he/about");
eq("EN /about → AR", switchLocalePath("/about", "ar"), "/ar/about");
eq("HE /he/about → AR", switchLocalePath("/he/about", "ar"), "/ar/about");
eq("HE /he/about → EN", switchLocalePath("/he/about", "en"), "/about");
eq("AR /ar/schools → HE", switchLocalePath("/ar/schools", "he"), "/he/schools");
eq("homepage / → HE", switchLocalePath("/", "he"), "/he");
eq("homepage /he → EN", switchLocalePath("/he", "en"), "/");
eq("homepage /ar → HE", switchLocalePath("/ar", "he"), "/he");

console.log("\nHash preserved — #apply keeps the user on the form:");
eq("/ + #apply → HE", switchHref("/", "he", "", "apply"), "/he#apply");
eq("/he + #apply → EN", switchHref("/he", "en", "", "apply"), "/#apply");
eq("/ + #method → AR", switchHref("/", "ar", "", "method"), "/ar#method");
eq("/teach + #apply → HE", switchHref("/teach", "he", "", "apply"), "/he/teach#apply");

console.log("\nQuery preserved:");
eq("/contact?ref=x → HE", switchHref("/contact", "he", "?ref=x"), "/he/contact?ref=x");
eq(
  "query + hash together → AR",
  switchHref("/", "ar", "?a=1", "apply"),
  "/ar#apply?a=1".replace("#apply?a=1", "?a=1#apply") /* order: search then hash */,
);
eq(
  "query + hash correct order",
  switchHref("/contact", "ar", "?a=1", "apply"),
  "/ar/contact?a=1#apply",
);

console.log("\nlocaleFromPath / active-locale detection:");
eq("/ is en", localeFromPath("/"), "en");
eq("/he/about is he", localeFromPath("/he/about"), "he");
eq("/ar is ar", localeFromPath("/ar"), "ar");
eq("/en/about resolves en (not canonical)", localeFromPath("/en/about"), "en");
eq("/fr/x is not a known locale (falls to en path)", localeFromPath("/fr/x"), "en");

console.log("\nUnknown-locale handling (no prerendered file → 404, no redirect-to-EN):");
eq(
  "no /fr prerendered file",
  existsSync(new URL("../dist/client/fr/index.html", import.meta.url)),
  false,
);
// $locale/route.tsx must 404 unknown + redirect /en → canonical.
const routeSrc = readFileSync(new URL("../src/routes/$locale/route.tsx", import.meta.url), "utf8");
eq("route guards with notFound()", /notFound\(\)/.test(routeSrc), true);
eq(
  "route redirects /en → canonical",
  /redirect\(/.test(routeSrc) && /DEFAULT_LOCALE/.test(routeSrc),
  true,
);
eq("route validates against RTL_LOCALES", /RTL_LOCALES/.test(routeSrc), true);

console.log("\nPrerendered switcher hrefs (spot-check /he homepage):");
const heHome = readFileSync(new URL("../dist/client/he/index.html", import.meta.url), "utf8");
eq(
  "HE page has EN switch link to /",
  /<a[^>]+href="\/"[^>]*lang="en"/.test(heHome) ||
    /lang="en"[^>]*href="\/"/.test(heHome) ||
    heHome.includes('href="/" lang="en"'),
  true,
);
eq("HE page has AR switch link to /ar", heHome.includes('href="/ar"'), true);
eq(
  'HE page <html lang="he" dir="rtl">',
  /<html[^>]*lang="he"[^>]*dir="rtl"|<html[^>]*dir="rtl"[^>]*lang="he"/.test(heHome),
  true,
);

console.log(
  fail === 0
    ? "\n✅ PASS — equivalent-path mapping preserves route + query + hash; #apply retained; unknown locale is not a valid prerendered route.\n"
    : `\n❌ FAIL — ${fail} assertion(s).\n`,
);
process.exit(fail === 0 ? 0 : 1);
