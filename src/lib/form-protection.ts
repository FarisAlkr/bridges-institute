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
