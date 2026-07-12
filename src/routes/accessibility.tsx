import { createFileRoute } from "@tanstack/react-router";
import { AccessibilityStatement } from "@/pages/AccessibilityStatement";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility Statement — Bridges Institute" },
      {
        name: "description",
        content:
          "Bridges Institute's accessibility statement — our commitment to Israeli Standard 5568 / WCAG 2.0 Level AA, and how to report an accessibility problem.",
      },
      { property: "og:title", content: "Accessibility Statement — Bridges Institute" },
      { property: "og:url", content: "/accessibility" },
    ],
    links: [{ rel: "canonical", href: "/accessibility" }],
  }),
  component: AccessibilityStatement,
});
