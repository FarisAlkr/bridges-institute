// Per-page Open Graph images (C5/C5a). Assets are imported so Vite resolves them to
// hashed, cacheable URLs. Pages without a specific image fall back to the default.
//
// URLs are root-relative; social scrapers generally want ABSOLUTE og:image URLs, so
// prefixing these with the production origin is part of the domain work (C4a). These
// are real classroom photos — a purpose-built 1200×630 branded card would be an
// improvement worth doing once brand assets exist (also C5a).
import heroClassroom from "@/assets/hero-classroom.jpg";
import teachHero from "@/assets/teach-hero.jpg";
import aboutHero from "@/assets/about-hero.jpg";
import gallery2 from "@/assets/gallery-2.jpg";

export const DEFAULT_OG_IMAGE = heroClassroom;

const BY_PATH: Record<string, string> = {
  "/": heroClassroom,
  "/about": aboutHero,
  "/teach": teachHero,
  "/schools": gallery2,
  // /contribute, /contact, /accessibility → default
};

export const ogImageFor = (unprefixedPath: string): string =>
  BY_PATH[unprefixedPath] ?? DEFAULT_OG_IMAGE;
