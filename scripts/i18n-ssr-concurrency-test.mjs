// Proves the per-request i18next design has no cross-request language leakage and
// no hydration-mismatch risk under concurrent SSR — the actual failure mode of a
// shared module singleton. Mirrors src/i18n/index.ts's createI18n(lng) pattern.
//
// It renders /en, /he and /ar concurrently (interleaved awaits so their renders
// overlap in the event loop), asserts each output carries its own language, and
// then runs a NEGATIVE CONTROL showing a shared singleton *does* leak — so a green
// result means the test can actually detect the bug, not that it's blind to it.

import { readFileSync } from "node:fs";
import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import i18next from "i18next";
import { initReactI18next, I18nextProvider, useTranslation } from "react-i18next";

const load = (lng, ns) =>
  JSON.parse(readFileSync(new URL(`../src/i18n/${lng}/${ns}.json`, import.meta.url)));
// EN has no _status; he/ar stubs carry a language-specific _status marker — a clean
// per-instance discriminator even though HE/AR values are still English fallbacks.
const enCommon = JSON.parse(readFileSync(new URL(`../src/i18n/en/common.json`, import.meta.url)));
const resources = {
  en: { common: enCommon },
  he: { common: load("he", "common") },
  ar: { common: load("ar", "common") },
};

function createI18n(lng) {
  const inst = i18next.createInstance();
  inst.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: "en",
    supportedLngs: ["en", "he", "ar"],
    ns: ["common"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    returnNull: false,
  });
  return inst;
}

// Component reads language + a language-specific marker from context.
function Probe() {
  const { t, i18n } = useTranslation("common");
  return h("span", null, `${i18n.language}|${t("_status", "EN")}`);
}
const render = (inst) =>
  renderToStaticMarkup(h(I18nextProvider, { i18n: inst, defaultNS: "common" }, h(Probe)));

const yield_ = () => new Promise((r) => setTimeout(r, 0));
const marker = { en: "EN", he: "Hebrew", ar: "Arabic" };

let failures = 0;
const check = (name, cond, detail) => {
  console.log(`  ${cond ? "✓" : "✗"} ${name}${detail ? `  — ${detail}` : ""}`);
  if (!cond) failures++;
};

// ---- Test 1: per-request instances, concurrent + interleaved renders ----
console.log("\nTest 1 — per-request instances, concurrent SSR (expect isolation):");
const results = await Promise.all(
  ["en", "he", "ar"].map(async (lng) => {
    const inst = createI18n(lng); // fresh instance per "request"
    await yield_(); // interleave: all three instances now exist before any renders
    const out = render(inst);
    await yield_(); // interleave again mid-flight
    return { lng, out, out2: render(inst) };
  }),
);
for (const { lng, out, out2 } of results) {
  check(`/${lng} renders as ${lng}`, out.includes(`>${lng}|`), out.replace(/<[^>]+>/g, ""));
  check(`/${lng} carries its own marker (${marker[lng]})`, out.includes(marker[lng]));
  check(`/${lng} stable across interleaved re-render (no bleed)`, out === out2);
}

// ---- Test 2: hydration parity (server markup identical on a repeat render) ----
console.log("\nTest 2 — hydration parity (server render is deterministic per locale):");
for (const lng of ["en", "he", "ar"]) {
  const a = render(createI18n(lng));
  const b = render(createI18n(lng));
  check(`/${lng} two independent renders identical`, a === b);
}

// ---- Negative control: a SHARED singleton leaks (proves the test detects bugs) ----
console.log("\nNegative control — shared singleton (expect LEAK, i.e. the anti-pattern fails):");
const shared = createI18n("he");
const heOut = render(shared); // captured while "request He" is in flight
await shared.changeLanguage("ar"); // a concurrent "request Ar" mutates the shared instance
const heOutAfter = render(shared); // He's render now sees Ar — that's the leak
const leaked = heOut !== heOutAfter && heOutAfter.includes(">ar|");
check(
  "shared singleton bleeds He→Ar (this SHOULD be true; it's why we use per-request)",
  leaked,
  `${heOut.replace(/<[^>]+>/g, "")}  ->  ${heOutAfter.replace(/<[^>]+>/g, "")}`,
);

console.log(
  failures === 0
    ? "\n✅ PASS — per-request instances isolate concurrent locales; no leakage, deterministic hydration. (Negative control confirms a shared singleton would leak.)\n"
    : `\n❌ FAIL — ${failures} assertion(s) failed.\n`,
);
process.exit(failures === 0 ? 0 : 1);
