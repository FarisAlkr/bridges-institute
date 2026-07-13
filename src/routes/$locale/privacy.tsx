import { createFileRoute } from "@tanstack/react-router";
import { Privacy } from "@/pages/Privacy";
import { pageHead } from "@/i18n/head";
import { type Locale } from "@/i18n";

export const Route = createFileRoute("/$locale/privacy")({
  head: ({ params }) => pageHead("privacy", "/privacy", params.locale as Locale),
  component: Privacy,
});
