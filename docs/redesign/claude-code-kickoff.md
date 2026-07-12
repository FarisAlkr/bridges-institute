# Claude Code — Kickoff Prompt

> Paste the block below into Claude Code at the repo root, after dropping the `redesign/` folder into the repo (e.g. `docs/redesign/`).

---

You're working on the Bridges Institute website. The client has approved a **repositioning** (not a redesign): the homepage must speak **teacher-first**, with schools as a secondary path. Full context is in `docs/redesign/` — **read all of it before doing anything**:

- `README.md` — north-star goal, main message, design guardrails, words-to-avoid, definition of done.
- `homepage.md` — section-by-section homepage spec (exact order + approved copy).
- `i18n.md` — EN/HE/AR + RTL requirements (contains an architecture decision I must approve).
- `accessibility.md` — Israeli Standard 5568 / WCAG 2.0 AA checklist.
- `open-questions.md` — blockers: content to confirm + assets + technical fixes.

## Step 0 — Discovery (do this first, then STOP for my approval)

1. Inspect the repo and report: framework, bundler, routing, styling system, component structure, and how the current homepage/stats/forms are built.
2. Propose an **i18n approach** per `i18n.md` (stack, URL strategy, message storage) — **do not implement it yet.**
3. Propose a **phase plan** matching the phasing below and list which files you'll touch in Phase 1.

Wait for my go-ahead before writing code.

## Phasing (small, reviewable PRs — one phase per branch)

- **Phase 1 — Restructure + copy + fix-first (English only).** Reorder the homepage per `homepage.md`; drop in approved copy; collapse the repeated method sections into the single §4; fix the "2,014" bug; remove any `0` stats; make "Apply to Teach" primary; move GEFEN into the trust bar; tighten mobile whitespace; sticky mobile Apply button; fewer icon cards. For `⚠ BLOCKED` items (§6, captions, video, quotes) render **visible `TODO` placeholders — do not invent content.**
- **Phase 2 — Accessibility.** Work `accessibility.md` end to end: heading structure, landmarks, keyboard + focus, alt text, form labels/errors, gold-on-cream contrast. Add the Accessibility Statement page (EN first, HE/AR stubbed).
- **Phase 3 — i18n scaffolding + RTL.** Only after my approval of the approach. Extract **all** UI strings to an English source catalog (no hard-coded text); add locale routing + `dir`/`lang` switching + logical CSS properties. HE/AR catalogs get key + English fallback + `NEEDS TRANSLATION` markers — **never ship machine-translated HE/AR as final.**
- **Phase 4 — Translations + polish.** I supply real HE/AR copy; you wire it in and verify no untranslated keys leak. Resolve remaining `open-questions.md` technical items (form submission, phone, TikTok, og:image, privacy page).

## Hard rules

- **Do not invent blocked content.** Anything marked `⚠ BLOCKED` or `TO CONFIRM` in the docs → visible placeholder, flagged in the PR description so I can chase the client.
- **Do not machine-translate final HE/AR.** Stub only.
- Follow the design guardrails in `README.md` — say the method once; fewer icons; real photos; no fake testimonials; name the Negev.
- Keep diffs scoped to the current phase. Don't refactor unrelated code.
- After each phase, run the relevant verification (Phase 1: mobile layout review; Phase 2: axe/Lighthouse + keyboard walkthrough) and summarize what you changed.

## Commits

- Author every commit as **Faris Alkrenawe**.
- **No mention of AI, Claude, or assistants** anywhere in commit messages, PR descriptions, or code comments.
- Conventional, human commit messages scoped to the change (e.g. `feat(home): teacher-first hero + trust bar`, `fix(stats): render 2014 as text, drop zero stats`).

Start with Step 0.
