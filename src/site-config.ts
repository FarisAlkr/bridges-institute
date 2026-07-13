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
