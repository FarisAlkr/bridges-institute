import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/pages/Home";
import { pageHead } from "@/i18n/head";
import { type Locale } from "@/i18n";

export const Route = createFileRoute("/$locale/")({
  head: ({ params }) => pageHead("home", "/", params.locale as Locale),
  component: Home,
});
