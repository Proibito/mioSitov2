import { defineConfig } from "astro/config";
import image from "@astrojs/image";
import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";
import { ottieniDescrizione } from "./src/functions/ottieniDescrizione.ts";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [image(), react(), mdx({ remarkPlugins: [ottieniDescrizione], extendPlugins: "astroDefaults" })],
  output: "server",
  adapter: vercel(),
});
