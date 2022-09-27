import { Component, ReactNode } from "react";

export class SelezionaTema extends Component<any, { temaNotte: boolean; caricato: boolean }> {
  luna = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="white" height="100%">
      <path d="M26.2 46q-4.2 0-7.875-1.6t-6.4-4.325Q9.2 37.35 7.6 33.675 6 30 6 25.8q0-7.3 4.65-12.875T22.5 6q-.9 4.9.55 9.625 1.45 4.725 5 8.275 3.55 3.55 8.275 5.025Q41.05 30.4 46 29.5q-1.3 7.2-6.9 11.85Q33.5 46 26.2 46Z" />
    </svg>
  );
  sole = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="black" height="100%">
      <path d="M24 34q-4.15 0-7.075-2.925T14 24q0-4.15 2.925-7.075T24 14q4.15 0 7.075 2.925T34 24q0 4.15-2.925 7.075T24 34ZM3.5 25.5q-.65 0-1.075-.425Q2 24.65 2 24q0-.65.425-1.075Q2.85 22.5 3.5 22.5h5q.65 0 1.075.425Q10 23.35 10 24q0 .65-.425 1.075-.425.425-1.075.425Zm36 0q-.65 0-1.075-.425Q38 24.65 38 24q0-.65.425-1.075.425-.425 1.075-.425h5q.65 0 1.075.425Q46 23.35 46 24q0 .65-.425 1.075-.425.425-1.075.425ZM24 10q-.65 0-1.075-.425Q22.5 9.15 22.5 8.5v-5q0-.65.425-1.075Q23.35 2 24 2q.65 0 1.075.425.425.425.425 1.075v5q0 .65-.425 1.075Q24.65 10 24 10Zm0 36q-.65 0-1.075-.425-.425-.425-.425-1.075v-5q0-.65.425-1.075Q23.35 38 24 38q.65 0 1.075.425.425.425.425 1.075v5q0 .65-.425 1.075Q24.65 46 24 46ZM12 14.1l-2.85-2.8q-.45-.45-.425-1.075.025-.625.425-1.075.45-.45 1.075-.45t1.075.45L14.1 12q.4.45.4 1.05 0 .6-.4 1-.4.45-1.025.45-.625 0-1.075-.4Zm24.7 24.75L33.9 36q-.4-.45-.4-1.075t.45-1.025q.4-.45 1-.45t1.05.45l2.85 2.8q.45.45.425 1.075-.025.625-.425 1.075-.45.45-1.075.45t-1.075-.45ZM33.9 14.1q-.45-.45-.45-1.05 0-.6.45-1.05l2.8-2.85q.45-.45 1.075-.425.625.025 1.075.425.45.45.45 1.075t-.45 1.075L36 14.1q-.4.4-1.025.4-.625 0-1.075-.4ZM9.15 38.85q-.45-.45-.45-1.075t.45-1.075L12 33.9q.45-.45 1.05-.45.6 0 1.05.45.45.45.45 1.05 0 .6-.45 1.05l-2.8 2.85q-.45.45-1.075.425-.625-.025-1.075-.425Z" />
    </svg>
  );

  tema = false;

  constructor(props: any) {
    super(props);
    this.state = { caricato: false, temaNotte: false };
  }

  componentDidMount(): void {
    if (localStorage.getItem("temaNotte") === null) {
      this.tema = window.matchMedia("(prefers-color-scheme: dark)").matches;
    } else {
      this.tema = localStorage.getItem("temaNotte") === "true";
    }
    this.setState({ caricato: true, temaNotte: this.tema });
  }

  cambiaTema() {
    document.documentElement.classList.toggle("night");
    this.tema = !this.tema;
    localStorage.setItem("temaNotte", `${this.tema}`);
    this.setState({ temaNotte: this.tema });
  }

  render(): ReactNode {
    return (
      <div
        style={{ height: "30px", cursor: "pointer" }}
        onClick={() => this.cambiaTema()}
        suppressHydrationWarning
      >
        {this.state.caricato ? (this.state.temaNotte ? this.luna : this.sole) : null}
      </div>
    );
  }
}
