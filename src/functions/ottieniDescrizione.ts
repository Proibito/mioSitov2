import { visit } from "unist-util-visit";

export function ottieniDescrizione() {
  return function (tree: any, { data }: { data: any }) {
    let testoDaRitornare = "";
    visit(tree, "paragraph", (paragrafi) => {
      for (const figlio of paragrafi.children) {
        if (testoDaRitornare.length > 70) return;
        if (figlio.type === "text") testoDaRitornare += figlio.value;
      }
    });
    data.astro.frontmatter.descrizione = testoDaRitornare;
  };
}

export function ottieniSimboli() {
  return function (tree: any, { data }: { data: any }) {
    const matematica: string[] = [];
    visit(tree, "inlineMath", (paragrafi) => {
      matematica.push(paragrafi.value);
    });
    data.astro.frontmatter.formule = matematica;
  };
}
