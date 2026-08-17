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

// The language the form was filled in, so the applicant's confirmation email comes back
// in that language. Underscore-prefixed like the others: internal, never shown.
export const LOCALE_FIELD = "_locale";

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

// --- CV upload rules ---------------------------------------------------------------
// Shared so the browser hint, the client-side guard and the server check can never
// disagree — they were duplicated in two files and drifting was only a matter of time.

// Formats a CV realistically arrives in. Kept to documents on purpose: a reviewer has
// to be able to open and read it.
export const ALLOWED_CV_EXT = [".pdf", ".doc", ".docx", ".odt", ".rtf", ".txt"];

// The `accept` attribute filters the OS file picker. Extensions plus MIME types, because
// some platforms match on one and some on the other.
export const CV_ACCEPT = [
  ...ALLOWED_CV_EXT,
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.oasis.opendocument.text",
  "application/rtf",
  "text/plain",
].join(",");

// Raw upload cap. Two limits bind the chain and both have plenty of headroom here:
// inbound (browser → function) is raw multipart against Vercel's 100 MB request-body
// limit, and outbound (function → Resend/webhook) is JSON with the file base64-encoded,
// which inflates it ~33% — 10 MB raw is ~13.3 MB outbound, well inside Resend's cap and
// small enough that receiving mail servers will not bounce it.
export const MAX_CV_MB = 10;
export const MAX_CV_BYTES = MAX_CV_MB * 1024 * 1024;
