# Homepage Specification

Build the homepage in **exactly this section order**. Copy below is **approved** unless marked `⚠ BLOCKED` (see `open-questions.md`). Do not invent copy for blocked items — render a clearly-marked placeholder instead.

**Guiding rule:** say the method **once**, well. The current site repeats it across several sections — collapse that. Prefer real photos + concrete examples over icon cards.

---

## Fix-first (do these regardless of section work)

1. **Kill the "2,014" bug.** The operating-since stat currently renders like a number ("2,014 operating since"). Make it plain text: **"Serving the Negev since 2014."** — never a counted/formatted number.
2. **Never render `0`.** If a stat's real number isn't available, **remove that stat** — do not show `0`, `0+`, or a placeholder animating from zero.
3. **Primary CTA = "Apply to Teach"** everywhere it competes with the school CTA. School CTA is visually secondary.
4. **GEFEN moves up** into the trust bar near the top (see §2).
5. **Mobile whitespace:** remove oversized empty cream blocks; tighten vertical rhythm so each scroll reveals content.

---

## 1. Hero — teacher-first

- **Headline:** Teach English that students are finally brave enough to speak.
- **Subheadline:** Bridges Institute brings English-speaking teachers into schools across the Negev to lead active speaking lessons — movement, games, stories, role-play and real conversation.
- **Primary button:** Apply to Teach → application form (§8 / apply route)
- **Secondary button:** See How We Teach → anchors to §4
- Background: a real classroom photo (reuse existing hero asset), with an overlay that keeps text contrast AA-compliant.

## 2. Trust bar (directly under hero)

One horizontal band, high on the page:

> Serving the Negev since 2014 · Recognized by the Israeli Ministry of Education, GEFEN Program No. 9003 · 11,000+ students · 50+ schools & institutions · 22 native English-speaking teachers

- Numbers (`11,000+`, `50+`, `22`) are **client-provided** — wire as real values, no zero-animation fallback. ⚠ Confirm final before launch (`open-questions.md`).
- "since 2014" here is **text**, not a counter.

## 3. Why teach with Bridges

Four points. Plain, not poetic. Minimal/no icons — short headline + one line each.

- **Real meaning** — You help kids who freeze up in English actually open their mouths.
- **Active classrooms** — You're on your feet: games, stories, role-play, movement. Not reading from a textbook.
- **Support and structure** — Teachers get lesson frameworks, activities and routines. You bring the energy; we provide the structure.
- **Room for personality** — Warmth, presence and reliability matter here. Teachers bring themselves into the room.

## 4. What the job actually is  *(combines old "what a lesson looks like" + "how we teach" — this is the ONLY method section)*

Plain and concrete. Helps a teacher self-select.

- Students first listen and respond with their bodies before they're asked to speak.
- They repeat useful words and phrases out loud, together.
- Then they play, act, choose, answer and talk.
- Younger students: TPR, pictures, objects, rhythm, movement, stories.
- Older students: opinions, role-play, interviews, real-life situations, conversation tasks.
- Every student leaves the room having used English out loud.

**Key method line (pull-quote):**
> Confidence first. Accuracy follows. Students speak first; we polish later.

## 5. Who we're looking for  *(two-column: good fit / not the right fit)*

Keep this — it filters wrong applicants before the interview.

| Good fit | Probably not the right fit |
|---|---|
| Confident, fluent or near-native English | Wants quiet, textbook-only teaching |
| Comfortable leading a room of children or teens | Dislikes movement, noise, games or group energy |
| Warm, responsible and reliable | Uncomfortable leading and managing a class |
| Enjoys active teaching — speaking, movement, games | Unreliable with schedule or communication |
| Understands many students are nervous and need confidence first | Only wants to teach grammar from a book |

## 6. What you need to apply  ⚠ BLOCKED — see `open-questions.md`

Short requirements box. Good candidates don't apply when they can't tell if they qualify — so this must be **accurate**, not guessed. Until the client confirms, render each line as a visible `TODO` placeholder, not invented text:

- Hebrew requirement — *TO CONFIRM.* If not required, state prominently: **"No Hebrew required."** (major selling point)
- Qualifications — *TO CONFIRM* (degree/cert vs. fluent+capable+energetic)
- Schedule — *TO CONFIRM* (part/full-time, rough hours, school-year/summer/flexible)
- Location — *TO CONFIRM* (which Negev towns; own transport needed?)
- **This is paid work, not volunteering** — state clearly. (confirmed; pay figures not required)

## 7. Real classroom photos, with captions

- Use the real photos already on the site.
- Short caption under each: e.g. "Movement-based lesson, 3rd grade" / "Students practicing a role-play." ⚠ Captions needed from client.
- If a real 30–60s classroom clip exists, embed it here (captioned — see `accessibility.md`). ⚠ Asset from client.

## 8. How to apply

Simple, mobile-friendly. A **short on-page form beats "email us your CV."**

Three steps:
1. Fill in a short form — name, phone/email, English background, location, one line on why you want to teach with Bridges.
2. Have a short conversation with us.
3. If it's a good fit, join a Bridges teaching placement.

**Form fields (minimum):** Name · Phone/Email · English background · Location · "Why Bridges" (one line). Optional CV upload.
⚠ **The form must actually submit** (endpoint/email/storage) and show a success state — verify end-to-end on mobile. CV upload needs a real destination. See `open-questions.md`.

**Final CTA block:**
> **Ready to teach with Bridges?** Help students in the Negev find their voice in English.
> Button: **Apply to Teach**

## 9. For schools — secondary path

Clearly lower on the page, visually secondary to the teacher path.

> Bridges Institute brings English-speaking teachers into schools and learning centers across the Negev. Our programs help students build spoken English confidence through active, communication-based lessons.
> Recognized under the Israeli Ministry of Education's GEFEN framework, Program No. 9003.
> Button: **Bring Bridges to Your School**

## 10. Languages + accessibility + footer/contact

- Language switcher (EN / HE / AR) — visible, easy on mobile. See `i18n.md`.
- Link to the Accessibility Statement page. See `accessibility.md`.
- Footer/contact: keep existing address + real contact details. ⚠ Replace placeholder phone `+972 (0) 00 000 0000` and fix the generic TikTok link (points to `tiktok.com`, not a profile).
