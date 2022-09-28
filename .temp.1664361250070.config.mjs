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
import rehypePrettyCode from "rehype-pretty-code";

const options = {
  // Use one of Shiki's packaged themes
  theme: {
    dark: "one-dark*",
    light: "min-light",
  },

  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },

  onVisitHighlightedLine(node) {
    node.properties.className.push("pippone");
  },

  onVisitHighlightedWord(node) {
    node.properties.className = ["word"];
  },
};

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: false,
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
      rehypePlugins: [
        rehypeKatex,
        lazyLoadingImmagini,
        [rehypePrettyCode, options],
      ],
      extendPlugins: "astroDefaults",
    }),
  ],
});
