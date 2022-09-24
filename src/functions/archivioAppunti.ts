import type { PostPreviewType } from "../types/types";
import type { MarkdownHeading } from "astro";
//@ts-ignore
import fs from "fs";
//@ts-ignore
import moment from "moment";
moment.locale("it");

function getTitolo(headings: MarkdownHeading[]): string {
  return headings[headings.findIndex((head: any) => head.depth == 1)]?.text ?? "non ancora definito";
}

export function CreaArrayAppunti(cartella: Record<string, any>[]): PostPreviewType[] {
  const array: PostPreviewType[] = [];
  cartella.forEach((item) => {
    const elemento: PostPreviewType = {
      titolo: getTitolo(item.getHeadings()),
      frontmatter: item.frontmatter,
      url: item.url,
      ultimaModifica: moment(fs.statSync(item.file).mtime).format("DD MMMM YYYY"),
      ultimaModificaInNumeri: fs.statSync(item.file).mtime.getTime(),
    };
    array.push(elemento);
  });
  return array;
}
