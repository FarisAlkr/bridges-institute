import { createFileRoute } from "@tanstack/react-router";
import { Schools } from "@/pages/Schools";
import { pageHead } from "@/i18n/head";

export const Route = createFileRoute("/schools")({
  head: () => pageHead("schools", "/schools", "en"),
  component: Schools,
});
