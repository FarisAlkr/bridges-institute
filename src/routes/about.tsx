import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/pages/About";
import { pageHead } from "@/i18n/head";

export const Route = createFileRoute("/about")({
  head: () => pageHead("about", "/about", "en"),
  component: About,
});
