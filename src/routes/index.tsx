import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/pages/Home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Teach English in the Negev — Bridges Institute" },
      {
        name: "description",
        content:
          "Bridges Institute hires English-speaking teachers to lead active speaking lessons in schools across the Negev — movement, games, stories, role-play and real conversation. Apply to teach.",
      },
      { property: "og:title", content: "Teach English in the Negev — Bridges Institute" },
      {
        property: "og:description",
        content:
          "We hire English-speaking educators to help students in the Negev speak with confidence. See how we teach and apply.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});
