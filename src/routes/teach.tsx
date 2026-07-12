import { createFileRoute } from "@tanstack/react-router";
import teachHero from "@/assets/teach-hero.jpg";
import { Teach } from "@/pages/Teach";

export const Route = createFileRoute("/teach")({
  head: () => ({
    meta: [
      { title: "Apply to Teach — Bridges Institute" },
      {
        name: "description",
        content:
          "Apply to teach English with Bridges Institute — active speaking lessons in schools across the Negev. A short form, a short conversation, then a teaching placement.",
      },
      { property: "og:title", content: "Apply to Teach — Bridges Institute" },
      {
        property: "og:description",
        content:
          "We hire English-speaking teachers to help students in the Negev speak with confidence. Apply in a few minutes.",
      },
      { property: "og:url", content: "/teach" },
      { property: "og:image", content: teachHero },
    ],
    links: [{ rel: "canonical", href: "/teach" }],
  }),
  component: Teach,
});
