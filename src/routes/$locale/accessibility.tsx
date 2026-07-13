import { createFileRoute } from "@tanstack/react-router";
import { AccessibilityStatement } from "@/pages/AccessibilityStatement";

export const Route = createFileRoute("/$locale/accessibility")({
  component: AccessibilityStatement,
});
