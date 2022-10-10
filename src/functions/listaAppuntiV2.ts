import { u } from "unist-builder";
import orderBy from "lodash/orderBy";
import type { AlberoDocumenti, Capitolo, Documento, Esercizi } from "../types/alberoAppunti";

export function creaListaDocumenti(
	documenti: documentoAstro[],
	esercizi: documentoAstro[]
): AlberoDocumenti {
	const albero: AlberoDocumenti = u("root", []); // Creo albero

	documenti.forEach((doc) => {
		if (doc.frontmatter.inizioCapitolo) {
			const capitolo = ottieniCapitolo(doc);
			capitolo.children = ottieniDocumentiPerCapitolo(
				documenti,
				esercizi,
				capitolo.data.numero
			);
			albero.children.push(capitolo);
		}
	});
	return albero
}

function ottieniDocumentiPerCapitolo(
	documenti: documentoAstro[],
	esercizi: documentoAstro[],
	numeroCapitolo: number
): Documento[] {
	const ritorno: Documento[] = [];
	documenti.forEach((doc) => {
		if (
			!doc.frontmatter.inizioCapitolo &&
			parseInt(doc.frontmatter.capitolo) == numeroCapitolo
		) {
			const nodo: Documento = u("documento", {
				data: {
					capitolo: doc.frontmatter.capitolo.toString(),
					titolo: getHead1(doc),
				},
			});
			nodo.children = ottieniEserciziPerDocumento(esercizi, nodo.data.capitolo);
			ritorno.push(nodo);
		}
	});
	return orderBy(ritorno, "data.capitolo", "asc");
}

function ottieniEserciziPerDocumento(
	documenti: documentoAstro[],
	numeroDocumento: string
): Esercizi[] {
	const ritorno: Esercizi[] = [];
	documenti.forEach((doc) => {
		if (doc.frontmatter.capitolo == numeroDocumento) {
			doc.frontmatter.layout = "../../../../layouts/PostsLayout.astro";
			ritorno.push(
				u("esercizi", {
					data: {
						capitoloRif: doc.frontmatter.capitolo.toString(),
						titolo: getHead1(doc),
					},
				})
			);
		}
	});
	return orderBy(ritorno, "data.capitolo", "asc");
}

function ottieniCapitolo(nodo: documentoAstro): Capitolo {
	return u(
		"capitolo",
		{
			data: {
				numero: nodo.frontmatter.capitolo,
				titolo: getHead1(nodo),
			},
		},
		[]
	);
}

function getHead1(nodo: documentoAstro): string {
	const risultati = (
		nodo.getHeadings() as { depth: number; text: string; slug: string }[]
	).filter((head) => head.depth == 1 && head.text);

	return risultati[0] ? risultati[0].text : "";
}

export type documentoAstro = Record<string, any>;