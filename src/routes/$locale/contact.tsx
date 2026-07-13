import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/pages/Contact";
import { pageHead } from "@/i18n/head";
import { type Locale } from "@/i18n";

export const Route = createFileRoute("/$locale/contact")({
  head: ({ params }) => pageHead("contact", "/contact", params.locale as Locale),
  component: Contact,
});
