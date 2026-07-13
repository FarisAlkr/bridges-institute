import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/pages/About";
import { pageHead } from "@/i18n/head";
import { type Locale } from "@/i18n";

export const Route = createFileRoute("/$locale/about")({
  head: ({ params }) => pageHead("about", "/about", params.locale as Locale),
  component: About,
});
