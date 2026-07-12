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
| C1 | **Form submission** — does the apply/contact form actually POST anywhere, with a success state, on mobile? CV upload needs a real destination (endpoint / email / storage). | Wire + verify end-to-end. |
| C2 | **Placeholder phone** `+972 (0) 00 000 0000` in footer/contact. | Replace with real number. |
| C3 | **TikTok link** points to generic `tiktok.com`, not a profile. | Fix or remove. |
| C4 | **Custom domain** — site is on `bridges-institute.vercel.app` but email is `@bridgesinstitute.org`. | Point real domain before launch. |
| C5 | Homepage **`og:image`** missing (About/Teach have one). | Add for link previews. |
| C6 | **Privacy** — forms collect personal data + CVs; no privacy policy linked. | Add a basic policy page (pairs with the accessibility statement). |

## Decisions Faris owns (not the client)

- i18n stack + URL strategy (see `i18n.md`) — approve before Claude Code implements.
- Phasing / what ships per PR (see kickoff prompt).
