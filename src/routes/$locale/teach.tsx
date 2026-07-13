import { createFileRoute } from "@tanstack/react-router";
import { Teach } from "@/pages/Teach";

export const Route = createFileRoute("/$locale/teach")({
  component: Teach,
});
