import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <Reveal>
          <div className="eyebrow flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-brass" />
            {eyebrow}
          </div>
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05]">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={160}>
          <p className="mt-6 text-lg text-slate-body max-w-2xl leading-relaxed">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
