import { createFileRoute } from "@tanstack/react-router";
import { Schools } from "@/pages/Schools";

export const Route = createFileRoute("/schools")({
  head: () => ({
    meta: [
      { title: "Schools & Institutions — Bridges Institute" },
      { name: "description", content: "Programs for schools, community centers, and municipalities across the Negev. Native English-speaking educators delivering measurable, joyful results." },
      { property: "og:title", content: "Schools — Bridges Institute" },
      { property: "og:description", content: "Bring Bridges to your school." },
      { property: "og:url", content: "/schools" },
    ],
    links: [{ rel: "canonical", href: "/schools" }],
  }),
  component: Schools,
});
