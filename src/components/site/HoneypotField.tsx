import { HONEYPOT_FIELD, HONEYPOT_LABEL } from "@/lib/form-protection";

// Spam trap for the public forms. Hidden from sight, removed from the accessibility
// tree (aria-hidden), and skipped by keyboard navigation (tabIndex -1) — so it is
// invisible to real applicants but tempting to bots. /api/submit drops any submission
// that arrives with this field filled in.
//
// Positioned with the clip technique rather than `left: -9999px` so it stays neutral
// in RTL, and marked autoComplete="off" so browsers never helpfully fill it in.
export function HoneypotField() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        overflow: "hidden",
        clipPath: "inset(50%)",
        whiteSpace: "nowrap",
      }}
    >
      <label htmlFor={HONEYPOT_FIELD}>{HONEYPOT_LABEL}</label>
      <input
        id={HONEYPOT_FIELD}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
