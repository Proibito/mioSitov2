import { defineConfig } from "astro/config";
import image from "@astrojs/image";
import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [image(), react(), mdx()],
  output: "server",
  adapter: vercel(),
  vite: {
    build: {
      rollupOptions: {
        external: ["@fontsource/Figtree"]
      }
    },
    ssr: {
      external: ["@fontsource/Figtree"]
    }
  }
});