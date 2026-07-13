import { createFileRoute } from "@tanstack/react-router";
import aboutHero from "@/assets/about-hero.jpg";
import { About } from "@/pages/About";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Bridges Institute" },
      {
        name: "description",
        content:
          "Since 2014, Bridges Institute has partnered with the Ministry of Education, municipalities, schools, and community centers across the Negev to bring authentic English learning to every student.",
      },
      { property: "og:title", content: "About — Bridges Institute" },
      {
        property: "og:description",
        content: "Our story, mission, and the value of native English-speaking educators.",
      },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: aboutHero },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});
