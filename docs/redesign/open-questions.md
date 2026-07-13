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
| B1 | Photo **captions** for real classroom photos (e.g. "Movement-based lesson, 3rd grade"). | §7 — **§7 now uses REAL classroom photos** pulled from the client's site `bridges-eng.com` (downsized into `src/assets/classroom-*.jpg`), replacing the stock-looking gallery images. Alt text describes the real scenes; **captions still to-confirm** with the client. |
| B2 | Optional **30–60s classroom video** (with captions/transcript). | §7 |
| B3 | **2–3 real teacher quotes** (only if real — no fabrication). | optional social proof |
| B4 | Confirm **trust-bar numbers** are final: 11,000+ students, 50+ schools, 22 native teachers. | §2 |
| B5 | **HE + AR translations** of approved copy (real speaker, not machine). Faris can supply. | i18n Phase 3–4 |

## C. Technical confirmations (from prior site review — still open)

| # | Item | Action |
|---|---|---|
| C1 | **Form submission** — does the apply/contact form actually POST anywhere, with a success state, on mobile? CV upload needs a real destination (endpoint / email / storage). | **CODE-COMPLETE, DELIVERY-UNVERIFIED.** Single canonical `/api/submit` handles both forms: server validation, CV type/size checks, then POSTs a **JSON payload to an email/automation webhook** (`SUBMISSIONS_WEBHOOK_URL`, set in Vercel — Make/Zapier/Resend). **CV embedded as base64** so it always arrives; automation decodes it into an attachment. Success shows only on real delivery; `503 not_configured` otherwise (never fakes success). **Effective file cap: 3 MB raw** — inbound multipart stays under Vercel's ~4.5 MB request limit, and the ~33%-larger base64 outbound (~4 MB) stays under typical webhook-receiver limits. **⚠ The base64-JSON payload format is NEW: only unit-tested (CV bytes proven intact via sha256 roundtrip). It has NOT been run against a real webhook that decodes `cv.base64` into an attachment — that decode is the untested link.** **NOT closed until Faris sets the env var, runs ONE live mobile submit, and personally opens the CV from the inbox as a working attachment.** |
| C2 | **Placeholder phone** `+972 (0) 00 000 0000` in footer/contact. | Fake phone **removed** (Phase 1). Checked the client's site `bridges-eng.com/contact-partnership/` — it publishes **NO phone and NO email** (contact is via an "Enquire" form + address only). **Address confirmed:** "Yehuda HaNachtom 10, Be'er Sheva" (site shows a typo'd "Yehodah HANHTOM 10, BeerSheva" — our spelling is the clean version). **Still need the real phone + email from the client directly.** Note the email domain question stays open (site is `bridges-eng.com`; repo email is `@bridgesinstitute.org`) — see C4. |
| C3 | **TikTok link** points to generic `tiktok.com`, not a profile. | Generic TikTok **removed** (Phase 1). **Verified the real socials:** `facebook.com/BridgesEng` and `instagram.com/Bridgesinst` resolve to the genuine accounts (titles "معهد جسور - Bridges Institute" / "Bridges Institute - معهد جسور @bridgesinst") — **kept**. The client's WP site's own social links are bare/unconfigured (`facebook.com/`, `instagram.com/`, `tiktok.com/`). **TikTok icon stays OUT** until the client confirms a real account exists — do not invent one. |
| C4 | **Custom domain** — site is on `bridges-institute.vercel.app` but email is `@bridgesinstitute.org`. | Point real domain before launch. |
| C4a | **i18n hreflang/canonical are root-relative** (Phase 3). `hreflang`/`canonical`/`og:url` and the sitemap emit root-relative URLs because the production domain is unconfirmed (C4). Google prefers **absolute** URLs for hreflang. | **DONE (code).** `canonical`, `og:url`, `og:image`, `hreflang` and the sitemap now build **absolute** URLs from a single `SITE_URL` constant in `src/site-config.ts`, defaulted to `https://bridges-eng.com`. **Go-live = change that one line** to the final domain. Verified absolute across EN/`/he`/`/ar` in prerendered HTML. **Live verification (real previews, Search Console hreflang) waits on DNS — the URLs only resolve once the domain points at this deployment (C4b).** |
| C4b | **Sitemap + `/en`→canonical redirect assume Vercel's routing layer is active** (Phase 3). `sitemap.xml` is a server handler and the `/en`→canonical 301 lives in `vercel.json` `redirects`; a pure-static `dist/client` serve won't run either. The in-app `$locale` guard still redirects `/en` on client navigation, but a cold hit on `/en/about` needs the edge redirect. | Confirm at deploy that the Vercel routing layer (redirects + server handler) is active on the final domain. |
| C5 | Homepage **`og:image`** missing — and as of Phase 3 the shared `pageHead()` doesn't emit `og:image`, so **About/Teach no longer have one either** (previously they did). | **DONE.** `pageHead()` emits `og:image` + `twitter:image` + `twitter:card` for every page × locale, now using **real Bridges classroom photos** (landscape, crop well to 1200×630): default = speaking-lesson; About = picture-cards; Teach = one-to-one. URLs are **absolute** (via C4a). **C5a** (nice-to-have): a purpose-built branded 1200×630 card once brand assets exist. |
| C6 | **Privacy** — forms collect personal data + CVs; no privacy policy linked. | **DONE (baseline).** `/privacy` page added (EN; HE/AR stubbed) and linked in the footer next to Accessibility. Legal entity/controller, retention period, and processor list are visible **to-confirm** placeholders pending Faris/legal input. |

## Decisions Faris owns (not the client)

- i18n stack + URL strategy (see `i18n.md`) — approve before Claude Code implements.
- Phasing / what ships per PR (see kickoff prompt).
