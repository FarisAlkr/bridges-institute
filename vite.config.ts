import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";
import { enumerateLocalePaths } from "./src/i18n/page-list";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      customViteReactPlugin: true,
      server: { entry: "server" },
      // Explicitly enumerate every page × {en, he, ar} so the /he and /ar static
      // trees are emitted deterministically, not left to link-crawling.
      pages: enumerateLocalePaths().map((path) => ({ path })),
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoStaticPathsDiscovery: true,
      },
    }),
    // Compiles the server (SSR + /api/* + sitemap handlers) into deployable output.
    // On Vercel this emits the Build Output API so the server runs as a Function.
    nitro(),
    viteReact(),
  ],
});
