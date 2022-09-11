import { defineConfig } from "astro/config";
import image from "@astrojs/image";
import vercel from "@astrojs/vercel/serverless";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [image(), react()],
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