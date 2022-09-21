import { toString } from "mdast-util-to-string";

export function ottieniDescrizione() {
  return function (tree: any, { data }: { data: any }) {
    const textOnPage = toString(tree).slice(0, 50);
    data.astro.frontmatter.descrizione = textOnPage + "...";
  };
}
