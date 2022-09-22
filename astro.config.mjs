import { defineConfig } from "astro/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import image from "@astrojs/image";
import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";
import { ottieniDescrizione, ottieniSimboli } from "./src/functions/ottieniDescrizione.ts";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [
    image(),
    react(),
    mdx({
      remarkPlugins: [ottieniDescrizione, remarkMath, ottieniSimboli],
      rehypePlugins: [rehypeKatex],
      extendPlugins: "astroDefaults",
    }),
  ],
  output: "server",
  adapter: vercel(),
});
