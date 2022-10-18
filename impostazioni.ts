export const IMPOSTAZIONI: Impostazioni = {
	materie: [
        {nomeCartella: "probabilita", nomeVisibile: "Probabilità 🎲"},
        {nomeCartella: "sistemi-operativi", nomeVisibile: "Sistemi Operativi 💻"},
    ],
	nome: "Edoardo",
};

interface Materia {
	nomeCartella: string,
    nomeVisibile: string
}

interface Impostazioni{
    materie: Materia[],
    nome: string
}
