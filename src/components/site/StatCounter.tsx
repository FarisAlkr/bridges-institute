import { useEffect, useRef, useState } from "react";

export function StatCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  // Initialise to the real value so SSR / no-JS render the true number — never a 0 in the
  // prerendered HTML. On the client we reset to 0 and count up when scrolled into view.
  const [n, setN] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Respect reduced-motion: keep the final number, skip the count-up.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(eased * value));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl sm:text-6xl md:text-7xl text-ivory tracking-tight tabular-nums leading-none">
        {/* Pin to en-US so the separator is always a comma (11,000) — exact across every
            viewer locale, and identical on server + client (no hydration mismatch). */}
        {n.toLocaleString("en-US")}
        <span className="text-brass">{suffix}</span>
      </div>
      <div className="mt-3 text-xs sm:text-sm uppercase tracking-[0.2em] text-ivory/70">
        {label}
      </div>
    </div>
  );
}
