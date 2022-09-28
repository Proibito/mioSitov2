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
  lazyLoadingImmagini,
} from "./src/functions/pluginsRemark";
import mdx from "@astrojs/mdx";
import remarkDirective from "remark-directive";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: {
        dark: "one-dark-pro",
        // light: "one-dark-pro",
      },
      langs: ["c", "js", "typescript"],
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
        codiceInline,
        ottieniSimboli,
        boxDefinizione,
      ],
      rehypePlugins: [rehypeKatex, lazyLoadingImmagini],
      extendPlugins: "astroDefaults",
    }),
  ],
});
