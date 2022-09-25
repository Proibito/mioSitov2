import { visit } from "unist-util-visit";
import uniq from "lodash/uniq";
import { h } from "hastscript";
import { toHast } from "mdast-util-to-hast";

export function ottieniDescrizione() {
  return function (tree: any, { data }: { data: any }) {
    let testoDaRitornare = "";
    visit(tree, "paragraph", (paragrafi) => {
    
      
      for (const figlio of paragrafi.children) {
        if (testoDaRitornare.length > 150) return;
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
    data.astro.frontmatter.formule = uniq(matematica);
  };
}

export function boxDefinizione() {
  return (tree: any) => {
    visit(tree, "containerDirective", (node) => {
      switch (node.name) {
        case "def":
          ritornaBox(
            "definizione",
            "https://cdn.betterttv.net/emote/5d63e543375afb1da9a68a5a/2x",
            node
          );
          break;

        case "att":
          ritornaBox(
            "attenzione",
            "https://cdn.betterttv.net/emote/56e9f494fff3cc5c35e5287e/2x",
            node
          );
          break;

        case "nb":
          ritornaBox(
            "notaBene",
            "https://cdn.betterttv.net/emote/5e2914861df9195f1a4cd411/2x",
            node,
            "Nota Bene"
          );
          break;
      }
    });
  };
}

function ritornaBox(nome: string, urlImmagine: string, node: any, nomeDaVisualizzare?: string) {
  const data = node.data || (node.data = {});
  const tagName = "div";
  data.hName = tagName;
  const containerDefinizione = h(`.contenuto${nome}`, []);
  for (const child of node.children) {
    containerDefinizione.children.push(toHast(child) as any);
  }

  data.hProperties = h(`div.${nome}Container`, { class: ["conteinerSpegazioni"] }).properties;
  data.hChildren = h(`div.${nome}Wraper`, [
    h(`.boxIntestazione${nome}`, { class: ["intestazioneSpiegazione"] }, [
      h("span", nomeDaVisualizzare ?? nome),
      h(`img.immagineIntestazione${nome}`, {
        src: urlImmagine,
      }),
    ]),
    containerDefinizione,
  ]).children;
}


export function codiceInline() {
  return (tree: any) => {
    visit(tree, "inlineCode", (node) => {
      const data = node.data || (node.data = {});
      data.hProperties = h(".codeInline").properties;
    });
  };
}