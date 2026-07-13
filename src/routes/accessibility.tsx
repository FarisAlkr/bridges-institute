import { createFileRoute } from "@tanstack/react-router";
import { AccessibilityStatement } from "@/pages/AccessibilityStatement";
import { pageHead } from "@/i18n/head";

export const Route = createFileRoute("/accessibility")({
  head: () => pageHead("accessibility", "/accessibility", "en"),
  component: AccessibilityStatement,
});
