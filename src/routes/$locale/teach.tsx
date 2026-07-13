import { createFileRoute } from "@tanstack/react-router";
import { Teach } from "@/pages/Teach";
import { pageHead } from "@/i18n/head";
import { type Locale } from "@/i18n";

export const Route = createFileRoute("/$locale/teach")({
  head: ({ params }) => pageHead("teach", "/teach", params.locale as Locale),
  component: Teach,
});
