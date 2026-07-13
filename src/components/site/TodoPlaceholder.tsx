import { useTranslation } from "react-i18next";

// Visible placeholder for content that is blocked / awaiting client confirmation.
// Renders clearly as a to-confirm block so nothing invented ships and the gap
// stays obvious until real copy replaces it. See docs/redesign/open-questions.md.

export function TodoPlaceholder({ label, note }: { label: string; note?: string }) {
  const { t } = useTranslation("common");
  return (
    <div
      role="note"
      className="rounded-lg border border-dashed border-brass-deep/60 bg-brass/5 px-4 py-3"
    >
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brass-deep">
        {t("todo.toConfirm")}
      </span>
      <p className="mt-1 font-medium text-ink">{label}</p>
      {note && <p className="mt-1 text-sm text-slate-body leading-relaxed">{note}</p>}
    </div>
  );
}
