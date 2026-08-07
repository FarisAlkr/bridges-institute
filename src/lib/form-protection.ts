// Shared between the forms and /api/submit so the field name can never drift apart.
//
// A plausible-looking field that a real person never sees and never fills, but that
// form-filling bots populate because it looks like an ordinary text input. A submission
// carrying a value here is treated as spam.
export const HONEYPOT_FIELD = "company";

// Rendered inside the hidden wrapper. Bots read labels to decide what to type, so the
// field is labelled — but this is never shown to a person, which is why it is a plain
// constant rather than a translated string.
export const HONEYPOT_LABEL = "Company";

// How long the form was on screen before submit, in milliseconds. Sent by the client as
// a real elapsed measurement (not two clocks subtracted), so a wrong device clock cannot
// affect it.
export const ELAPSED_FIELD = "_ms";

// Anything faster than this was not typed by a person. The apply form has eight required
// fields; filling them in under three seconds is not physically possible, and browser
// autofill cannot produce the free-text ones (English background, degree, why). Kept
// deliberately lenient — losing one real application costs more than letting spam through.
export const MIN_FILL_MS = 3000;

// Free-text fields that a real applicant answers differently from one another. A bot that
// pastes the same token into every box (the observed spam wrote "Pranab" into english,
// degree AND why) collapses them into one value.
const DISTINCT_TEXT_FIELDS = ["english", "degree", "why", "location", "experience", "message"];
const REPEAT_THRESHOLD = 3;

// True when the same answer appears in REPEAT_THRESHOLD or more unrelated free-text
// fields. A genuine applicant does not give one word as their English background, their
// degree AND their reason for applying.
export function looksLikeRepeatedFiller(fields: Record<string, string>): boolean {
  const counts = new Map<string, number>();
  for (const name of DISTINCT_TEXT_FIELDS) {
    const value = fields[name]?.trim().toLowerCase();
    // Ignore very short answers: "no", "none", "n/a" legitimately repeat.
    if (!value || value.length < 3) continue;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  for (const n of counts.values()) if (n >= REPEAT_THRESHOLD) return true;
  return false;
}
