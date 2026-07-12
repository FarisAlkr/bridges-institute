import { createFileRoute } from "@tanstack/react-router";
import { Contribute } from "@/pages/Contribute";

export const Route = createFileRoute("/contribute")({
  head: () => ({
    meta: [
      { title: "Contribute — Bridges Institute" },
      { name: "description", content: "Support a decade of English-language education in the Negev. Donate, sponsor a classroom, or get involved with Bridges Institute." },
      { property: "og:title", content: "Contribute — Bridges Institute" },
      { property: "og:description", content: "Help us bring native English-speaking educators to more classrooms." },
      { property: "og:url", content: "/contribute" },
    ],
    links: [{ rel: "canonical", href: "/contribute" }],
  }),
  component: Contribute,
});
