// Production origin — the single source of truth for absolute URLs.
//
// ⚠ GO-LIVE: change this ONE line to the final production domain at cutover.
// It currently points at the client's domain (bridges-eng.com). Absolute URLs are
// required by social/search scrapers for og:image, og:url, canonical, hreflang and the
// sitemap — root-relative URLs make link previews come out bare (C4a).
//
// These absolute URLs only resolve once DNS points this domain at this deployment, so
// live verification (real link previews, Search Console hreflang) waits on the domain
// cutover (C4b).
export const SITE_URL = "https://bridges-eng.com";

// Prefix a root-relative path with SITE_URL. Leaves already-absolute URLs untouched.
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

// Contact phone (client-confirmed). Displayed in international form for the
// English-speaking audience; the tel: link is E.164 so it dials from anywhere.
export const PHONE_DISPLAY = "+972 58-686-8850";
export const PHONE_HREF = "tel:+972586868850";

// ⚠ GO-LIVE: still the PLACEHOLDER address (open-questions C2) — the client has not
// created the inbox yet, and the domain question is open (C4). Change this ONE line
// once the real address is confirmed.
//
// It lives here rather than in the i18n catalogs because an address is not
// translatable copy — it was identical in en/he/ar, and holding it in three catalogs
// plus three literal mailto: hrefs meant six places to update, with nothing stopping
// the displayed address and the linked one from drifting apart.
export const CONTACT_EMAIL = "info@bridgesinstitute.org";
export const CONTACT_EMAIL_HREF = `mailto:${CONTACT_EMAIL}`;
