
export type AlberoDocumenti = {
	type: "root";
	children: Capitolo[];
};

export interface Capitolo {
	type: "capitolo";
	data: CapitoloData;
	children: Documento[];
}

export interface CapitoloData {
	numero: number;
	titolo: string;
}

export interface Documento {
	type: "documento";
	data: DocumentoData;
	children?: Esercizi[];
}

export interface DocumentoData {
	capitolo: string;
	titolo: string;
}

export interface Esercizi {
	type: "esercizi";
	data: EserciziData;
}

export interface EserciziData {
	titolo: string;
	capitoloRif: string;
}
