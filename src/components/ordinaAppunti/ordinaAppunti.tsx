import { Component } from "react";
import stile from "./ordinaAppunti.module.scss";

export interface OrdinamentoOpzioni {
  tipoDiOrdinamento?: OrdinamentoStringa;
  crescente?: boolean;
}

interface stato {
  testo: string;
  valore: number;
}

export enum OrdinamentoStringa {
  alfabetico,
  dataDiModifica,
  importanza,
}

export class OrdinaAppunti extends Component<
  { cambio: (opzioni: OrdinamentoOpzioni) => void },
  { attivo1: number; attivo2: boolean }
> {
  //
  constructor(props: any) {
    super(props);
    this.state = { attivo1: 2, attivo2: true };
  }

  opzioni: OrdinamentoOpzioni = {
    tipoDiOrdinamento: OrdinamentoStringa.importanza,
    crescente: true,
  };
  cambia(opzioni: OrdinamentoOpzioni) {
    this.opzioni = { ...this.opzioni, ...opzioni };
    this.props.cambio(this.opzioni);
  }

  qua(prova?: stato, attivo2?: boolean) {
    if (prova) this.setState({ attivo1: prova.valore });
    if (attivo2 != undefined) this.setState({ attivo2: attivo2 });
  }

  render() {
    return (
      <div className={stile.comandi}>
        <div className={stile.ordinamento}>
          {[
            { testo: "Capitolo", valore: OrdinamentoStringa.importanza },
            { testo: "Alfabetico", valore: OrdinamentoStringa.alfabetico },
            {
              testo: "Data di modifica",
              valore: OrdinamentoStringa.dataDiModifica,
            },
          ].map((menuItem) => (
            <div
              key={menuItem.valore}
              data-attivo={this.state.attivo1 === menuItem.valore ? "true" : undefined}
              onClick={() => {
                this.qua(menuItem, undefined);
                this.cambia({ tipoDiOrdinamento: menuItem.valore });
              }}
            >
              <span>{menuItem.testo}</span>
            </div>
          ))}
        </div>

        <div className={`${stile.ordinamento} ${stile.fine}`}>
          {[
            { testo: "Crescente", valore: true },
            { testo: "Decrescente", valore: false },
          ].map((menuItem) => (
            <div
              key={menuItem.testo}
              data-attivo={this.state.attivo2 === menuItem.valore ? "true" : undefined}
              onClick={() => {
                this.qua(undefined, menuItem.valore);
                this.cambia({ crescente: !!menuItem.valore });
              }}
            >
              {menuItem.testo}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
