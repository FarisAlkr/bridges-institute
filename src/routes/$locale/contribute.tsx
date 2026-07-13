import { createFileRoute } from "@tanstack/react-router";
import { Contribute } from "@/pages/Contribute";

export const Route = createFileRoute("/$locale/contribute")({
  component: Contribute,
});
