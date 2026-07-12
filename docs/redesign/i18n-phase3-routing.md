# Phase 3 — i18n Routing Design (sign-off record)

> Approved by Faris. This is the agreed design for the EN/HE/AR + RTL rollout.
> Implementation must not deviate from the two guarantees below without re-approval.

## Stack (approved earlier)

`i18next` + `react-i18next`; path-segment URLs; namespaced JSON catalogs; **EN is the
source of truth**; HE/AR are stubbed with `NEEDS TRANSLATION` + EN fallback — **never**
machine-translated final copy.

## URL shape (approved)

- **EN unprefixed** — `/`, `/about`, … (existing URLs unchanged; no redirects; preserves SEO/links).
- **HE `/he/*`, AR `/ar/*`** — `lang` + `dir="rtl"` baked in.
- **Unknown prefix** (e.g. `/fr/*`) → **404** (no redirect-to-EN catch-all).
- **`/en/*`** → **301** to the unprefixed canonical.

Routing mechanism (TanStack Router, file-based): a `$locale` route layer validated to
`he|ar` renders the **same page components** as the root. To avoid duplicating markup,
each route's view is a shared component consumed by both the unprefixed (EN) route and the
`/$locale/` route.

## ✅ Guarantee (a) — prerender emits `/he` and `/ar`

Expand the `tanstackStart` `pages` list to enumerate **every route × {en, he, ar}**
explicitly (not rely on link-crawling). Build emits, per page:

```
dist/client/index.html            (en)   dist/client/he/index.html        dist/client/ar/index.html
dist/client/about/index.html      (en)   dist/client/he/about/index.html  dist/client/ar/about/index.html
… schools, teach, contact, contribute, accessibility
```

Each locale file: correct `<html lang dir>`, localized `<title>/<meta>`, and
`<link rel="alternate" hreflang>` for en/he/ar + `x-default`.

## ✅ Guarantee (b) — per-request i18next instance (no singleton)

A module-level singleton is shared across concurrent SSR/prerender renders → language
leakage + hydration mismatch. Therefore:

- **Server/prerender:** a fresh instance **per request** via
  `i18next.createInstance({ lng, resources, fallbackLng: 'en' })`, provided through a
  request-scoped `<I18nextProvider>`. The shared default export is **never** used for rendering.
- Resources are **bundled JSON (synchronous)** so SSR is deterministic (no async-load race).
- Missing-key handler **logs** (not silent-blank) and falls back to `en`.
- Result: server markup always matches the client's initial language → no hydration mismatch.
  (Client keeps one instance for its session — one user, one language — which is correct.)

## Language switcher (confirmed)

- Visible EN/HE/AR in nav + mobile; real links, `aria-current`.
- Maps to the **equivalent path in the target locale** (`/about ↔ /he/about ↔ /ar/about`),
  **preserving the current route + query** — never a redirect to the localized homepage.

## RTL

- `<html lang dir>` driven by active locale.
- Sweep remaining hard-coded `left/right` → logical properties.
- Mirror directional icons (`ArrowUpRight`, chevrons) via `[dir=rtl]`; **not** the logo/photos.

## Catalogs

- `src/i18n/en/*.json` (namespaced) — source of truth; extracted from components (no hard-coded text).
- `src/i18n/he/*` and `src/i18n/ar/*` — same keys, `NEEDS TRANSLATION` + EN fallback.

## Commit sequence (approved — keep bisectable, do NOT blend)

1. **Shared-component refactor** — pure move, zero behavior change, in its own commit.
2. **String extraction** to `src/i18n/en/*.json` + a no-hard-coded-strings lint check.
3. **Locale routing + RTL + switcher.**
4. **Prerender / hreflang / sitemap + verification.**

## Verification (Phase 3 exit)

- Assert `/he` + `/ar` HTML exist for every page; diff `lang`/`dir` + hreflang alternates.
- Grep/lint: no leftover hard-coded UI strings.
- No hydration warnings on a he/ar route (per-request instance).
- Re-run Lighthouse a11y on an RTL page.

## Phase 4 (later)

Faris supplies real HE/AR → wire in; verify no untranslated keys leak to production.
