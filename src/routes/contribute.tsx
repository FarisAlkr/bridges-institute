import { createFileRoute } from "@tanstack/react-router";
import { Contribute } from "@/pages/Contribute";
import { pageHead } from "@/i18n/head";

export const Route = createFileRoute("/contribute")({
  head: () => pageHead("contribute", "/contribute", "en"),
  component: Contribute,
});
