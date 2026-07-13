import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/pages/Home";
import { pageHead } from "@/i18n/head";

export const Route = createFileRoute("/")({
  head: () => pageHead("home", "/", "en"),
  component: Home,
});
