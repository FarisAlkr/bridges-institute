# Content Provenance — Bridges Institute site

> Paper trail for client handoff. Every block of visible copy is tagged by where it came
> from, so a human can tell approved copy from framing prose from unverified inherited text.
> **This is documentation only — it does not change any rendered copy.**

## Legend

| Tag | Meaning |
|---|---|
| **[BRIEF §x]** | Approved copy, taken verbatim / near-verbatim from `docs/redesign/homepage.md` section x. |
| **[FRAMING]** | Original connective prose written during the build (section sub-titles, alt text, input hints). No factual claims — wording only. |
| **[PLACEHOLDER]** | Deliberately blank "to confirm" content — nothing invented. Keyed to `open-questions.md`. |
| **[PRE-EXISTING]** | Text already in the repo before this project (original "marketing site" commit). **Not written or verified here.** |
| **[AUTHORED]** | Original prose written during the build for a page the brief asked us to create (Accessibility, Privacy). Flagged for review. |
| **[I18N-STUB]** | HE/AR values are English fallbacks marked `NEEDS TRANSLATION` — never machine-translated. |

---

## Homepage (`src/pages/Home.tsx`) — the repositioning target

| Section | Origin |
|---|---|
| Hero eyebrow "Teach with Bridges · The Negev" | **[FRAMING]** |
| Hero headline "Teach English that students are finally brave enough to speak." | **[BRIEF §1]** |
| Hero subheadline ("Bridges Institute brings English-speaking teachers…") | **[BRIEF §1]** |
| Buttons "Apply to Teach" / "See How We Teach" | **[BRIEF §1]** |
| Hero image alt text | **[FRAMING]** |
| Trust bar — full band incl. GEFEN line | **[BRIEF §2]** — but the **numbers are unverified**, see B4 below |
| §3 title "Meaningful work, with real support behind it." | **[FRAMING]** |
| §3 four points (Real meaning / Active classrooms / Support and structure / Room for personality) + descriptions | **[BRIEF §3]** |
| §4 title "A lesson at Bridges, step by step." | **[FRAMING]** |
| §4 pull-quote "Confidence first. Accuracy follows…" | **[BRIEF §4]** |
| §4 six numbered job steps | **[BRIEF §4]** |
| §5 title "An honest picture — so you can tell if this is you." + sr-only table caption | **[FRAMING]** |
| §5 fit / not-fit table (all 10 cells) | **[BRIEF §5]** |
| §6 title "The essentials — confirmed before we publish them." + intro | **[FRAMING]** |
| §6 four "To confirm" blocks (Hebrew / Qualifications / Schedule / Location) | **[PLACEHOLDER]** — open-questions A1–A4 |
| §6 "This is paid work, not volunteering." | **[BRIEF §6]** (the one confirmed line) |
| §7 title "Real lessons, in real Negev schools." + five photo alt texts | **[FRAMING]** |
| §7 **the five photos themselves** | **REAL** — sourced from the client's site `bridges-eng.com` (client authorized data reuse), downsized into `src/assets/classroom-*.jpg`. Replaced the earlier stock-looking gallery images. Alt text describes the actual scenes. |
| §7 "Caption to confirm with the client." (×5) + video block | **[PLACEHOLDER]** — captions/video still needed (open-questions B1, B2) |
| §8 title/intro "Three steps…", "A short form beats emailing a CV into the void." | **[BRIEF §8]** |
| §8 three apply steps | **[BRIEF §8]** |
| §8 form field labels (Name · Phone or email · Your English background · Location · Why… · CV optional) | **[BRIEF §8]** |
| §8 input placeholder hints ("e.g. native speaker…", "Which Negev town or area?", "One line is enough.") | **[FRAMING]** |
| §8 consent line "This is paid work, not volunteering. By applying, you agree to be contacted…" | **[BRIEF §6/§8]** + framing |
| §8 closing "Ready to teach with Bridges? Help students in the Negev find their voice in English." | **[BRIEF §8]** |
| §9 "For schools" paragraph + GEFEN line + "Bring Bridges to Your School" | **[BRIEF §9]** |

## Shared chrome

| Element | Origin |
|---|---|
| Nav labels (Home/About/Schools/Teach/Contribute/Contact) | **[PRE-EXISTING]** (structure); "Apply to Teach" is **[BRIEF]** (was "Apply Now") |
| Language switcher EN·עב·ع | **[FRAMING]** (added in i18n phase) |
| Footer tagline "Building bridges through language, confidence, and connection." | **[PRE-EXISTING]** |
| Footer blurb, address, "GEFEN — Program No. 9003", "© … by Mubadalah Group" | **[PRE-EXISTING]** |
| Footer Accessibility / Privacy links | **[FRAMING]** (added); fake phone + generic TikTok were **removed** |

## Other pages — **inherited, not verified here**

| Page | Origin |
|---|---|
| **About** (`src/pages/About.tsx`) — story, mission, vision, "why native speakers", challenge/approach | **[PRE-EXISTING]** in full. Only extracted to i18n (content-identical). |
| **Schools** (`src/pages/Schools.tsx`) — six programs + scopes, process steps | **[PRE-EXISTING]** in full. |
| **Contribute** (`src/pages/Contribute.tsx`) — four giving tiers + ₪ amounts | **[PRE-EXISTING]** in full. |
| **Contact** (`src/pages/Contact.tsx`) — address, email, map, social links | **[PRE-EXISTING]**; fake phone + generic TikTok **removed**. |

## Pages authored during the build (brief asked us to create them)

| Page | Origin |
|---|---|
| **Accessibility Statement** (`src/pages/AccessibilityStatement.tsx`) | **[AUTHORED]** prose, but it *describes real work actually done* (landmarks, focus, contrast). Coordinator name/phone + HE/AR are **[PLACEHOLDER]**. |
| **Privacy Policy** (`src/pages/Privacy.tsx`) | **[AUTHORED] BASELINE DRAFT — requires client/legal review.** Generic policy describing what the forms collect. Legal entity/controller, retention period, and processor list are **[PLACEHOLDER]**. Must not be treated as finalized legal text. |

## Translations

All **HE/AR** catalogs (`src/i18n/he/*`, `src/i18n/ar/*`) are **[I18N-STUB]** — English fallback values with a `NEEDS TRANSLATION` marker. No machine translation. Real copy is supplied by Faris (Phase 4).

---

# ⚠ MUST CONFIRM WITH CLIENT BEFORE LAUNCH

**Every factual claim below was either client-provided-via-brief or inherited from the
original site and was NOT independently verified during the build.** A human must confirm
each with Bridges Institute before launch.

### Statistics (trust bar) — open-questions **B4**
- **11,000+ students** — unverified.
- **50+ schools & institutions** — unverified.
- **22 native English-speaking teachers** — unverified.
- "**Serving the Negev since 2014**" / founding year 2014 — unverified (also stated on About).

### Accreditation / identity
- "**Recognized by the Israeli Ministry of Education, GEFEN Program No. 9003**" — provided in the brief; confirm the program number and wording are current/correct.
- "© … **by Mubadalah Group**" (footer) — inherited; confirm the operating entity.
- Address "**Yehuda HaNachtom 10, Be'er Sheva**" — **confirmed** against the client's site (typo'd there as "Yehodah HANHTOM 10, BeerSheva").
- Email "**info@bridgesinstitute.org**" — **still unconfirmed**; the client's site publishes no email, and its domain (`bridges-eng.com`) differs from the repo email domain (`@bridgesinstitute.org`). Confirm which is correct (see C4).
- **Phone** — the client's site has **no phone**; a real number must come from the client (C2).
- Social profiles **facebook.com/BridgesEng**, **instagram.com/Bridgesinst** — **VERIFIED real** (resolved the profiles directly: "Bridges Institute / معهد جسور"). TikTok left out — no real account confirmed (C3).

### About page (inherited claims)
- Founded **2014**, "from a single classroom in Be'er Sheva," "serving **thousands of students each year**."
- Educators are "**native English-speaking educators from the United States**."
- Partners: "**Israeli Ministry of Education, regional municipalities, schools, and community centers**," serving "**Arab and Jewish communities**."
- Mission and Vision statements — confirm these are the official ones.

### Schools page (inherited program claims)
Confirm each program is real and the scope is accurate:
- In-School English Immersion — Grades 3–12 · Year-long
- After-School Enrichment — All ages · Semester-based
- English Camps & Intensives — Children & teens · 1–2 weeks
- Teacher Co-Teaching — Custom · Ongoing
- Community Center Programs — All ages · Year-round
- Bespoke Partnerships — Tailored · By request

### Contribute page (inherited amounts) — **money figures, verify carefully**
- Sponsor a Classroom — **From ₪18,000**
- Fund a Teacher — **From ₪36,000**
- Support a Student — **From ₪600**
- General Support — Any amount

### Blocked content (already flagged, not invented) — open-questions
- §6 What you need to apply: Hebrew requirement (A1), Qualifications (A2), Schedule (A3), Location (A4).
- §7 Photo captions (B1), classroom video (B2).
- Real teacher quotes if any (B3) — none used; no fake testimonials.

### Legal / policy pages
- **Privacy Policy** — baseline draft; confirm data controller/legal entity, retention period, and processor list, and have it legally reviewed.
- **Accessibility Statement** — confirm the accessibility coordinator name/role and phone.
