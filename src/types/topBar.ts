export interface topBar{
    elementiDestra: elementoDestra[]
    elementiSinistra: elementoSinistra[]
}

export interface elementoDestra extends elemento{
    icona?: string
}

export interface elementoSinistra extends elemento{}

export interface elemento{
    testo: string,
    link: string
}