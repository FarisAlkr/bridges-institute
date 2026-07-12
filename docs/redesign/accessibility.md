# Accessibility — Israeli Standard 5568 / WCAG 2.0 AA

Legal and professional requirement for an education website in Israel. **Build it accessible from the start — do not rely on an accessibility overlay/plugin.** The markup itself must be accessible.

## Structure & semantics

- Exactly **one `<h1>`** per page, then logical `<h2>`/`<h3>` order — no skipped levels, no headings used for styling.
- Landmark regions: `<header>`, `<nav>`, `<main>`, `<footer>`.
- Lists are real lists; buttons are `<button>`, links are `<a>` — never a `<div>` with an onClick for interactive elements.

## Keyboard

- Menus, buttons, forms and links all operate **without a mouse**.
- Logical tab order; visible **focus states** on every interactive element (don't remove `:focus` outlines without a replacement).
- Mobile menu is keyboard-operable and closes on `Esc`.

## Screen readers

- Meaningful images have descriptive **alt text**; decorative images are marked decorative (`alt=""` / `aria-hidden`).
- Icon-only buttons have accessible names (`aria-label`).
- Buttons/links have clear names: **"Apply to Teach," "Contact Bridges," "Bring Bridges to Your School"** — not "click here."
- Per-locale language tags: `lang` on `<html>` and on any inline foreign-language text.

## Color & contrast

- Meet **AA contrast** (4.5:1 body text, 3:1 large text/UI).
- Specifically check the brand combos: **gold text on cream** and gold on navy — gold-on-cream commonly fails; darken the gold or swap the pairing where it does.

## Forms

- Every input has a **real, programmatically-associated `<label>`** (not placeholder-as-label).
- Clear, text-based **error messages** tied to their field (`aria-describedby`), announced to screen readers.
- Accessible focus + error states; don't signal errors by color alone.

## Media

- Video has **captions** or a short transcript/description.

## RTL

- Hebrew and Arabic support correct **RTL reading order** and correct **screen-reader language tags** (see `i18n.md`).

## Accessibility Statement page

- Add a dedicated **Accessibility Statement** page in **English, Hebrew, and Arabic**, with **contact details** for reporting accessibility issues (name/role, email, phone), the standard conformed to (IS 5568 / WCAG 2.0 AA), and last-reviewed date.

## Before launch — quick verification

- Run an automated pass (axe / Lighthouse a11y) — target no critical violations.
- Manual keyboard walkthrough of: nav, language switch, mobile menu, apply form, school CTA.
- Screen-reader spot check of hero, form labels/errors, and image alts.
- Automated tools catch ~30–40% only — the manual passes above are required, not optional.
