export function muoviPagina(elemento: HTMLElement): void {
  const elemTop = elemento.getBoundingClientRect().top;
  const barra = document.getElementById("barra");

  if (barra)
    window.scroll({
      top: elemTop + window.scrollY - barra.scrollHeight - 20,
      left: 0,
      behavior: "smooth",
    });
}
