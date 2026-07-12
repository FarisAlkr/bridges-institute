import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  onDark = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  onDark?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <Reveal>
          <div className={`eyebrow flex items-center gap-3 ${onDark ? "text-brass" : ""}`}>
            <span
              aria-hidden
              className={`inline-block h-px w-8 ${onDark ? "bg-brass" : "bg-brass-deep"}`}
            />
            {eyebrow}
          </div>
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2
          className={`mt-5 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] ${
            onDark ? "text-ivory" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={160}>
          <p
            className={`mt-5 md:mt-6 max-w-2xl text-base md:text-lg leading-relaxed ${
              onDark ? "text-ivory/80" : "text-slate-body"
            }`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
