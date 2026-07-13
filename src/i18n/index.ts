import i18next, { type i18n as I18n } from "i18next";
import { initReactI18next } from "react-i18next";

import en_common from "./en/common.json";
import en_home from "./en/home.json";
import en_about from "./en/about.json";
import en_schools from "./en/schools.json";
import en_teach from "./en/teach.json";
import en_contact from "./en/contact.json";
import en_contribute from "./en/contribute.json";
import en_accessibility from "./en/accessibility.json";

export const LOCALES = ["en", "he", "ar"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const RTL_LOCALES: Locale[] = ["he", "ar"];

export const NAMESPACES = [
  "common",
  "home",
  "about",
  "schools",
  "teach",
  "contact",
  "contribute",
  "accessibility",
] as const;
export const DEFAULT_NS = "common";

// EN is the source of truth. HE/AR catalogs are added in a later phase; until then
// i18next falls back to EN. Bundled synchronously so SSR/prerender is deterministic.
export const resources = {
  en: {
    common: en_common,
    home: en_home,
    about: en_about,
    schools: en_schools,
    teach: en_teach,
    contact: en_contact,
    contribute: en_contribute,
    accessibility: en_accessibility,
  },
} as const;

// Factory — one instance per call. Commit 2 uses a single EN instance below;
// Commit 3 calls this per request with the route's locale (no shared singleton
// for rendering) to avoid SSR language leakage / hydration mismatch.
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

export const i18n = createI18n(DEFAULT_LOCALE);
