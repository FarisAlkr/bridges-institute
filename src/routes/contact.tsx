import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/pages/Contact";
import { pageHead } from "@/i18n/head";

export const Route = createFileRoute("/contact")({
  head: () => pageHead("contact", "/contact", "en"),
  component: Contact,
});
