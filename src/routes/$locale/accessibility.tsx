import { createFileRoute } from "@tanstack/react-router";
import { AccessibilityStatement } from "@/pages/AccessibilityStatement";
import { pageHead } from "@/i18n/head";
import { type Locale } from "@/i18n";

export const Route = createFileRoute("/$locale/accessibility")({
  head: ({ params }) => pageHead("accessibility", "/accessibility", params.locale as Locale),
  component: AccessibilityStatement,
});
