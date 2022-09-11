import type { RefObject } from "react";

export function interagisciConScorrimento(
  opzioni: { margini: number },
  funzione: (callback: number) => any,
  ref: RefObject<any>
) {
  const options: IntersectionObserverInit = {
    rootMargin: `-${opzioni.margini}% 0px`,
    threshold: 0,
  };

  const observer = new IntersectionObserver((evento) => {
    evento.forEach((elemento: any) => {
      if (elemento.isIntersecting) {
        window.addEventListener("scroll", overload, true);
      } else {
        window.removeEventListener("scroll", overload, true);
      }
    });
  }, options);
  observer.observe(ref.current);

  function overload() {
    funzione(percentualePosizione(opzioni.margini, ref));
  }
}

export function interagisciInvertito(
  opzioni: { margini: number },
  funzione: (callback: number) => any,
  ref: RefObject<any>
) {
  const options: IntersectionObserverInit = {
    // rootMargin: `15% 0px 15% 0%`,
    threshold: 0,
  };

  const observer = new IntersectionObserver((evento) => {
    evento.forEach((elemento: IntersectionObserverEntry) => {
      if (elemento.isIntersecting) {
        window.addEventListener("scroll", overload, true);
      } else {
        window.removeEventListener("scroll", overload, true);
      }
    });
  }, options);
  observer.observe(ref.current);

  function overload() {
    funzione(invertito(opzioni.margini, ref));
  }
}

function invertito(margini: number, ref: RefObject<any>): number {
  const elemento = ref.current as HTMLElement;
  const elementoDimensioni = elemento.getBoundingClientRect();
  const altezzaMargini = (window.innerHeight * margini) / 100;

  if (elementoDimensioni.top < altezzaMargini) {
    const perc = elementoDimensioni.top / altezzaMargini;
    return perc < 0 ? 0 : perc;
  }
  if (window.innerHeight - elementoDimensioni.bottom < altezzaMargini) {
    const posizione = window.innerHeight - elementoDimensioni.bottom;
    const perc = posizione / altezzaMargini;
    return perc < 0 ? 0 : perc;
  }
  return 1;
}

function percentualePosizione(margini: number, ref: RefObject<any>): number {
  const altezzaSchermoConMargini = window.innerHeight - ((window.innerHeight * margini) / 100) * 2;
  const elemento = ref.current as HTMLElement;
  const elementoDimensioni = elemento.getBoundingClientRect();

  const posizioneRelativaElemento = elementoDimensioni.top - (window.innerHeight * margini) / 100;
  const dimensioniSchermoCorrette = altezzaSchermoConMargini - elementoDimensioni.height;

  let posizione = 1 - posizioneRelativaElemento / dimensioniSchermoCorrette;

  if (posizione > 1) {
    return 1;
  } else if (posizione < 0) {
    return 0;
  } else {
    return posizione;
  }
}
