// Per-page Open Graph images (C5/C5a). Assets are imported so Vite resolves them to
// hashed, cacheable URLs; head.ts wraps the returned path with SITE_URL to make it the
// absolute URL scrapers require (C4a).
//
// These are REAL Bridges classroom photos (from bridges-eng.com). Landscape shots are
// used because previews crop to ~1.91:1 (1200×630). A purpose-built branded 1200×630
// card would be a further improvement once brand assets exist (C5a).
import speakingLesson from "@/assets/classroom-speaking-lesson.jpg";
import oneToOne from "@/assets/classroom-one-to-one.jpg";
import pictureCards from "@/assets/classroom-picture-cards.jpg";

// Default: a teacher leading an English speaking lesson at the board — a clear "what we
// do" preview for any page without a more specific image.
export const DEFAULT_OG_IMAGE = speakingLesson;

const BY_PATH: Record<string, string> = {
  "/": speakingLesson,
  "/teach": oneToOne, // a teacher helping a student one-to-one
  "/about": pictureCards, // small-group activity — community feel
  "/schools": pictureCards,
  // /contribute, /contact, /accessibility, /privacy → default
};

export const ogImageFor = (unprefixedPath: string): string =>
  BY_PATH[unprefixedPath] ?? DEFAULT_OG_IMAGE;
