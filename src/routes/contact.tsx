import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/pages/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Partnerships — Bridges Institute" },
      {
        name: "description",
        content:
          "Get in touch with Bridges Institute in Be'er Sheva. Partnerships, programs, and general enquiries.",
      },
      { property: "og:title", content: "Contact — Bridges Institute" },
      { property: "og:description", content: "Reach our team in Be'er Sheva." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});
