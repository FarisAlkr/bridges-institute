import { createFileRoute } from "@tanstack/react-router";
import { Contribute } from "@/pages/Contribute";
import { pageHead } from "@/i18n/head";
import { type Locale } from "@/i18n";

export const Route = createFileRoute("/$locale/contribute")({
  head: ({ params }) => pageHead("contribute", "/contribute", params.locale as Locale),
  component: Contribute,
});
