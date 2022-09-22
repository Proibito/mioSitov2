import { Component, ReactNode, MouseEvent } from "react";
import { muoviPagina } from "../../functions/muoviAllaPosizione";
import stile from "./sideBarHeading.module.scss";

import { throttle } from "lodash";
export class SideBarHeadings extends Component<{ headings: { depth: number; slug: string; text: string }[] }> {
  headings = this.props.headings.filter(
    (elemento) => elemento.depth == 2 || elemento.depth == 3 || elemento.depth == 1
  );
  precedente: HTMLElement | null = null;

  cliccato(clickEvent: MouseEvent<HTMLAnchorElement>, destinazione: string) {
    clickEvent.preventDefault();
    const destinazioneLink = document.getElementById(destinazione);

    muoviPagina(destinazioneLink as HTMLElement);
  }

  componentDidMount(): void {
    console.log(this.props);

    window.addEventListener("scroll", throttle(this.scrolla, 500));
  }

  componentWillUnmount(): void {
    window.removeEventListener("scroll", this.scrolla);
  }

  scrolla() {
    const headers = document.querySelectorAll("h1, h2, h3");
    const filtrati = Array.prototype.slice.call(headers).filter((elem) => {
      return window.innerHeight - elem.getBoundingClientRect().top > 0;
    });
    const elemento = filtrati[filtrati.length - 1] as HTMLElement;
    const id = elemento.id;
    const menu = document.querySelector(`*[href="#${id}"]`) as HTMLElement;

    if (this.precedente && this.precedente != menu) {
      this.precedente.removeAttribute("attivo");
    }
    this.precedente = menu;
    menu.setAttribute("attivo", "true");
  }

  render(): ReactNode {
    return (
      <div className={stile.wrapper}>
        {this.headings.map((head) => {
          return (
            <a
              key={head.slug}
              style={{ paddingLeft: `${head.depth - 1}em` }}
              onClick={(e) => this.cliccato(e, head.slug)}
              href={`#${head.slug}`}
            >
              {head.text}
            </a>
          );
        })}
      </div>
    );
  }
}
