import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { NotFound } from "./components/site/NotFound";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Covers subtrees that define no notFoundComponent of their own — notably
    // /$locale, where a bad path under /he/* or /ar/* otherwise rendered TanStack's
    // bare built-in "Not Found" instead of the localized 404 page.
    defaultNotFoundComponent: NotFound,
  });

  return router;
};
