# Open Questions & Blockers

Resolve with the client. Sections depending on these must **not** ship with invented content — use visible `TODO` placeholders until confirmed.

## A. Content the client must confirm (blocks §6 "What you need to apply")

| # | Question | Why it matters |
|---|---|---|
| A1 | **Hebrew required**, or do lessons run in English? | If not required → prominently state "No Hebrew required." Major draw for native English speakers in Israel. Wrong guess = liability on a hiring page. |
| A2 | **Qualifications** — degree/teaching certificate required, or are fluent, capable, energetic people welcome? | Determines who self-selects to apply. |
| A3 | **Schedule** — part/full-time, rough hours, school-year / summer / flexible? | Teachers filter hard on this. |
| A4 | **Location** — which Negev towns/areas? Own transport needed? | Same. |
| A5 | Pay — confirmed **paid, not volunteer** (no figures needed). Confirm phrasing is OK to state. | Removes a common hesitation. |

## B. Assets needed from client

| # | Asset | Used in |
|---|---|---|
| B1 | Photo **captions** for real classroom photos (e.g. "Movement-based lesson, 3rd grade"). | §7 |
| B2 | Optional **30–60s classroom video** (with captions/transcript). | §7 |
| B3 | **2–3 real teacher quotes** (only if real — no fabrication). | optional social proof |
| B4 | Confirm **trust-bar numbers** are final: 11,000+ students, 50+ schools, 22 native teachers. | §2 |
| B5 | **HE + AR translations** of approved copy (real speaker, not machine). Faris can supply. | i18n Phase 3–4 |

## C. Technical confirmations (from prior site review — still open)

| # | Item | Action |
|---|---|---|
| C1 | **Form submission** — does the apply/contact form actually POST anywhere, with a success state, on mobile? CV upload needs a real destination (endpoint / email / storage). | **CODE-COMPLETE, DELIVERY-UNVERIFIED.** Single canonical `/api/submit` handles both forms: server validation, CV type/size checks, forwards full multipart payload (incl. CV) to `SUBMISSIONS_WEBHOOK_URL`. Success shows only on real delivery; `503 not_configured` otherwise (never fakes success). Tested vs a local receiver (422/503/200 + CV). **NOT closed until Faris sets the real destination and does one live end-to-end submit that lands where it should.** Destination provider = Faris's decision (webhook / Formspree / other). |
| C2 | **Placeholder phone** `+972 (0) 00 000 0000` in footer/contact. | Replace with real number. |
| C3 | **TikTok link** points to generic `tiktok.com`, not a profile. | Fix or remove. |
| C4 | **Custom domain** — site is on `bridges-institute.vercel.app` but email is `@bridgesinstitute.org`. | Point real domain before launch. |
| C4a | **i18n hreflang/canonical are root-relative** (Phase 3). `hreflang`/`canonical`/`og:url` and the sitemap emit root-relative URLs because the production domain is unconfirmed (C4). Google prefers **absolute** URLs for hreflang. | When the custom domain goes live, set a `SITE_URL` and prefix these to absolute. Revisit at domain switch — do not let it slip. |
| C4b | **Sitemap + `/en`→canonical redirect assume Vercel's routing layer is active** (Phase 3). `sitemap.xml` is a server handler and the `/en`→canonical 301 lives in `vercel.json` `redirects`; a pure-static `dist/client` serve won't run either. The in-app `$locale` guard still redirects `/en` on client navigation, but a cold hit on `/en/about` needs the edge redirect. | Confirm at deploy that the Vercel routing layer (redirects + server handler) is active on the final domain. |
| C5 | Homepage **`og:image`** missing — and as of Phase 3 the shared `pageHead()` doesn't emit `og:image`, so **About/Teach no longer have one either** (previously they did). | **DONE.** `pageHead()` now emits `og:image` + `twitter:image` + `twitter:card` for every page × locale (per-page map + default). Verified in prerendered output (24/24 pages). Note: URLs are root-relative — making them absolute is part of C4a (domain). A purpose-built 1200×630 branded card (vs. the hero photos in use) is a nice-to-have (C5a). |
| C6 | **Privacy** — forms collect personal data + CVs; no privacy policy linked. | **DONE (baseline).** `/privacy` page added (EN; HE/AR stubbed) and linked in the footer next to Accessibility. Legal entity/controller, retention period, and processor list are visible **to-confirm** placeholders pending Faris/legal input. |

## Decisions Faris owns (not the client)

- i18n stack + URL strategy (see `i18n.md`) — approve before Claude Code implements.
- Phasing / what ships per PR (see kickoff prompt).
