import { defineConfig } from "astro/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import image from "@astrojs/image";
import react from "@astrojs/react";
import {
  ottieniDescrizione,
  ottieniSimboli,
  boxDefinizione,
  codiceInline,
} from "./src/functions/pluginsRemark";
import mdx from "@astrojs/mdx";
import remarkDirective from "remark-directive";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: "min-light",
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
  },
  integrations: [
    image(),
    react(),
    mdx({
      remarkPlugins: [
        ottieniDescrizione,
        remarkMath,
        ottieniSimboli,
        remarkDirective,
        ottieniSimboli,
        boxDefinizione,
        codiceInline,
      ],
      rehypePlugins: [rehypeKatex],
      extendPlugins: "astroDefaults",
    }),
  ],
});
