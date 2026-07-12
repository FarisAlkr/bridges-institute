import { Link } from "@tanstack/react-router";
import { Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink text-ivory/80">
      <div className="container-editorial pt-14 pb-28 md:py-20">
        <div className="grid gap-10 sm:gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="inline-block h-9 w-9 rounded-full border border-ivory/40 relative">
                <span className="absolute inset-1.5 rounded-full bg-brass" />
              </span>
              <span className="font-display text-2xl text-ivory">Bridges<span className="text-brass">.</span></span>
            </div>
            <p className="mt-6 max-w-md font-display text-xl md:text-2xl leading-snug text-ivory">
              Building bridges through language, confidence, and connection.
            </p>
            <p className="mt-6 text-sm text-ivory/60 max-w-md">
              English learning through action, confidence, and real communication — across the Negev since 2014.
            </p>
          </div>

          <div className="lg:col-span-3">
            <div className="eyebrow text-brass">Visit</div>
            <p className="mt-4 text-sm leading-relaxed text-ivory/80">
              Yehuda HaNachtom 10<br />Be'er Sheva, Israel
            </p>
            <div className="hairline my-6 w-12" />
            <div className="eyebrow text-brass">Recognized</div>
            <p className="mt-4 text-sm text-ivory/80">
              Israeli Ministry of Education<br />GEFEN — Program No. 9003
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="eyebrow text-brass">Explore</div>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                ["/about", "About"],
                ["/schools", "Schools"],
                ["/teach", "Teach"],
                ["/contribute", "Contribute"],
                ["/contact", "Contact"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="link-underline text-ivory/80 hover:text-ivory">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="eyebrow text-brass">Follow</div>
            <div className="mt-4 flex gap-3">
              <a href="https://facebook.com/BridgesEng" target="_blank" rel="noreferrer"
                 aria-label="Facebook"
                 className="grid h-10 w-10 place-items-center rounded-full border border-ivory/30 hover:border-brass hover:text-brass transition">
                <Facebook size={16} />
              </a>
              <a href="https://instagram.com/Bridgesinst" target="_blank" rel="noreferrer"
                 aria-label="Instagram"
                 className="grid h-10 w-10 place-items-center rounded-full border border-ivory/30 hover:border-brass hover:text-brass transition">
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="hairline mt-12 md:mt-16 opacity-30" />
        <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 text-[0.65rem] sm:text-xs uppercase tracking-[0.18em] text-ivory/50">
          <span>© {new Date().getFullYear()} — All Rights Reserved to Bridges Institute by Mubadalah Group</span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link to="/accessibility" className="link-underline hover:text-ivory">Accessibility</Link>
            <span>Be'er Sheva · Negev · Israel</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
