import { toString } from "mdast-util-to-string";
import {visit} from 'unist-util-visit'


export function ottieniDescrizione() {
  return function (tree: any, { data }: { data: any }) {
    let testoDaRitornare = ""
    visit(tree, "paragraph", (paragrafi => {
      for (const figlio of paragrafi.children) {
        if(testoDaRitornare.length > 70) return 
        if(figlio.type === "text")
          testoDaRitornare  += figlio.value;  
      }
    }))
    const textOnPage = "";
    data.astro.frontmatter.descrizione = testoDaRitornare
  };
}
