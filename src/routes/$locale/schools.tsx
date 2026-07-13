import { createFileRoute } from "@tanstack/react-router";
import { Schools } from "@/pages/Schools";
import { pageHead } from "@/i18n/head";
import { type Locale } from "@/i18n";

export const Route = createFileRoute("/$locale/schools")({
  head: ({ params }) => pageHead("schools", "/schools", params.locale as Locale),
  component: Schools,
});
