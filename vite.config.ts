import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      customViteReactPlugin: true,
      server: { entry: "server" },
      pages: [
        { path: "/" },
        { path: "/about" },
        { path: "/schools" },
        { path: "/teach" },
        { path: "/contact" },
        { path: "/contribute" },
      ],
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoStaticPathsDiscovery: true,
      },
    }),
    viteReact(),
  ],
});
