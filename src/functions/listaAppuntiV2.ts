import orderBy from "lodash/orderBy";
import { u } from "unist-builder";
import type {
	AlberoDocumenti,
	Capitolo,
	Documento,
	DocumentoData,
	Esercizio,
} from ".../pages/appuntitypes/alberoAppunti";

export function creaListaDocumenti(
	documenti: documentoAstro[],
	esercizi: documentoAstro[]
): AlberoDocumenti {
	const albero: AlberoDocumenti = u("root", []); // Creo albero
	let documentiOrdinati = documenti;
	documenti.forEach((value) => {
		if (value.frontmatter.capitolo) {
			value.frontmatter.capitolo = value.frontmatter.capitolo.toString();
			value.frontmatter.ordinaCapitolo = parseInt(value.frontmatter.capitolo);
		} else {
			value.frontmatter.capitolo = "-1";
		}
	});
	documentiOrdinati = ordinaDocumenti(documenti);

	const capitoliCapi = ritornoCapoCapitoli(documentiOrdinati);

	capitoliCapi.map((capitolo) => {
		const cap = ottieniCapitolo(capitolo);
		cap.children = ottieniDocumentiPerCapitolo(
			documenti,
			esercizi,
			capitolo.frontmatter.capitolo
		);
		albero.children.push(cap);
	});
	return albero;
}

function ritornoCapoCapitoli(documenti: documentoAstro[]): documentoAstro[] {
	let numeroPrecedente = 0;
	let numeroAttuale = 0;
	const capoCapitoli = [];
	for (let i = 0; i < documenti.length; i++) {
		const documento: documentoAstro = documenti[i];

		numeroAttuale = parseInt(documento.frontmatter.capitolo);
		if (numeroAttuale != numeroPrecedente && numeroAttuale != -1) {
			numeroPrecedente = numeroAttuale;
			capoCapitoli.push(documento);
		}
	}
	return capoCapitoli;
}

function ordinaDocumenti(documenti: documentoAstro[]): documentoAstro[] {
	const ausiliaria: any[] = [];
	const daOrdinare: number[] = [];
	let maxIndex = 0;

	for (const el of documenti) {
		const push = el.frontmatter.capitolo.split(".");
		ausiliaria.push(push);
		maxIndex = push.length > maxIndex ? push.length : maxIndex;
	}

	for (const el of ausiliaria) {
		let pusha = 0;
		for (let i = 0; i < maxIndex; i++) {
			pusha *= 10;
			if (el[i]) {
				pusha += parseInt(el[i]);
			}
		}
		daOrdinare.push(pusha);
	}

	for (let i = 0; i < daOrdinare.length; i++) {
		let indicePiccolo = i;
		let k = i
		for (; k < daOrdinare.length; k++) {
			if (daOrdinare[indicePiccolo] > daOrdinare[k]) indicePiccolo = k
		}
		const b = daOrdinare[indicePiccolo]
		daOrdinare[indicePiccolo] = daOrdinare[i]
		daOrdinare[i] = b

		const a = documenti[indicePiccolo]
		documenti[indicePiccolo] = documenti[i]
		documenti[i] = a
	}

	return documenti;
}




function ottieniDocumentiPerCapitolo(
	documenti: documentoAstro[],
	esercizi: documentoAstro[],
	numeroCapitolo: string
): Documento[] {
	const ritorno: Documento[] = [];
	for (let index = 0; index < documenti.length; index++) {
		const documento: documentoAstro = documenti[index];
		if (parseInt(documento.frontmatter.capitolo) === parseInt(numeroCapitolo)) {
			const nodo: Documento = u(
				"documento",
				{
					data: {
						url: documento.url,
						capitolo: documento.frontmatter.capitolo.toString(),
						titolo: getHead1(documento),
					} as DocumentoData,
				},
				[]
			);
			nodo.children = ottieniEserciziPerDocumento(esercizi, nodo.data.capitolo);
			ritorno.push(nodo);
		}
	}

	return orderBy(ritorno, "data.capitolo", "asc");
}

function ottieniEserciziPerDocumento(
	documenti: documentoAstro[],
	numeroDocumento: string
): Esercizio[] {
	const ritorno: Esercizio[] = [];
	documenti.forEach((doc) => {
		if (doc.frontmatter.capitolo == numeroDocumento) {
			ritorno.push(
				u("esercizi", {
					data: {
						capitoloRif: doc.frontmatter.capitolo.toString(),
						titolo: getHead1(doc),
						url: doc.url,
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
				capitolo: nodo.frontmatter.capitolo.toString(),
				titolo: getHead1(nodo),
				url: nodo.url,
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

export async function creaAlbero(materia: string): Promise<AlberoDocumenti> {
	let cartella: any;
	let esercizi: any;

	switch (materia) {
		//

		case "probabilita":
			cartella = await import.meta.glob("../pages/appunti/probabilita/*.mdx");
			esercizi = await import.meta.glob(
				"../pages/appunti/probabilita/esercizi/*.mdx"
			);
			break;

		case "compilatore":
			cartella = await import.meta.glob("../pages/appunti/compilatore/*.mdx");
			break;

		case "sistemi-operativi-lab":
			cartella = await import.meta.glob(
				"../pages/appunti/sistemi-operativi-lab/*.mdx"
			);
			break;

		case "C":
			cartella = await import.meta.glob("../pages/appunti/C/*.mdx");
			break;

		case "sistemi-operativi":
			cartella = await import.meta.glob(
				"../pages/appunti/sistemi-operativi/*.mdx"
			);
			break;
	}

	const listaCartella = [];
	const listaEsercizi = [];
	for (const property in cartella) {
		listaCartella.push(await cartella[property]());
	}
	for (const property in esercizi) {
		listaEsercizi.push(await esercizi[property]());
	}

	return creaListaDocumenti(listaCartella, listaEsercizi);
}

export type documentoAstro = Record<string, any>;
