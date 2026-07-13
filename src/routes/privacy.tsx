import { createFileRoute } from "@tanstack/react-router";
import { Privacy } from "@/pages/Privacy";
import { pageHead } from "@/i18n/head";

export const Route = createFileRoute("/privacy")({
  head: () => pageHead("privacy", "/privacy", "en"),
  component: Privacy,
});
