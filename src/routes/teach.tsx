import { createFileRoute } from "@tanstack/react-router";
import { Teach } from "@/pages/Teach";
import { pageHead } from "@/i18n/head";

export const Route = createFileRoute("/teach")({
  head: () => pageHead("teach", "/teach", "en"),
  component: Teach,
});
