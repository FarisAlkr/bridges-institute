import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const links = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/schools", key: "nav.schools" },
  { to: "/teach", key: "nav.teach" },
  { to: "/contribute", key: "nav.contribute" },
  { to: "/contact", key: "nav.contact" },
] as const;

export function Nav() {
  const { t } = useTranslation("common");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close the mobile menu on Escape (keyboard operability).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || !isHome || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "bg-ivory/95 backdrop-blur border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container-editorial flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span
            aria-hidden
            className={`inline-block h-8 w-8 rounded-full border ${
              solid ? "border-ink" : "border-ivory"
            } relative`}
          >
            <span className="absolute inset-1.5 rounded-full bg-brass" />
          </span>
          <span
            className={`font-display text-xl tracking-tight ${solid ? "text-ink" : "text-ivory"}`}
          >
            {t("brand")}
            <span className="text-brass">.</span>
          </span>
        </Link>

        <nav aria-label={t("nav.primaryLabel")} className="hidden lg:flex items-center gap-9">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`link-underline text-sm tracking-wide transition-colors ${
                  solid ? "text-ink" : "text-ivory"
                } ${active ? "font-medium" : ""}`}
              >
                {t(l.key)}
              </Link>
            );
          })}
        </nav>

        <Link
          to="/"
          hash="apply"
          className={`hidden lg:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.18em] transition ${
            solid
              ? "bg-ink text-ivory hover:bg-ink-soft"
              : "border border-ivory/60 text-ivory hover:bg-ivory hover:text-ink"
          }`}
        >
          {t("cta.applyToTeach")}
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden p-2 ${solid ? "text-ink" : "text-ivory"}`}
          aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="lg:hidden border-t border-border bg-ivory">
          <nav
            aria-label={t("nav.mobileLabel")}
            className="container-editorial flex flex-col py-6 gap-1"
          >
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="py-3 text-ink text-lg font-display border-b border-border/60"
              >
                {t(l.key)}
              </Link>
            ))}
            <Link to="/" hash="apply" className="btn-primary mt-4 self-start">
              {t("cta.applyToTeach")}
            </Link>
          </nav>
        </div>
      )}

      {/* Sticky mobile Apply action — keeps "Apply to Teach" within reach on small screens. */}
      {!open && (
        <Link
          to="/"
          hash="apply"
          className="lg:hidden fixed inset-x-0 bottom-0 z-40 flex items-center justify-center gap-2 bg-brass px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink shadow-[0_-4px_20px_rgba(0,0,0,0.18)]"
        >
          {`${t("cta.applyToTeach")} `}
          <ArrowUpRight size={16} aria-hidden />
        </Link>
      )}
    </header>
  );
}
