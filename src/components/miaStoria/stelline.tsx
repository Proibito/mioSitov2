import { Component, ReactNode } from "react";
import stile from "./stile.module.scss";

export class Stelline extends Component {
  numeroStelle = 10;
  intervallo = 200;

  render() {
    const array = [...new Array(15)];

    return (
      <>
        <div style={{ height: "100%", overflow: "hidden", position: "relative", marginBottom: "10px" }}>
          {array.map((el, indx) => {
            return <Stellina key={indx} />;
          })}
        </div>
      </>
    );
  }
}

class Stellina extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { durata: 0, delay: 0 };
  }

  componentDidMount(): void {
    this.setState(this.generaValori());
  }

  anima() {
    this.setState(this.generaValori());
  }

  generaValori() {
    return {
      durata: Math.random() * 5 + 1,
      delay: Math.random() * 3,
      top: Math.random() * 100,
      left: Math.random() * 100,
    };
  }

  render(): ReactNode {
    return (
      <>
        <div
          key={+new Date()}
          onAnimationEnd={() => this.anima()}
          style={{
            color: "yellow",
            animationDuration: `${this.state.durata}s`,
            animationDelay: `${this.state.delay}s`,
            top: `${this.state.top}%`,
            left: `${this.state.left}%`,
            display: "inline-flex",
          }}
          className={stile.stella}
        >
          <Stella></Stella>
        </div>
      </>
    );
  }
}

function Stella() {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66.05 66.05" className={stile.stellina}>
        <path d="M33 66.05c-4-20.4-5.42-23.31-7.28-25.75C23.31 38.44 20.4 37 0 33c20.4-4 23.31-5.42 25.75-7.28C27.61 23.31 29 20.4 33 0c4 20.4 5.41 23.31 7.27 25.75C42.74 27.61 45.65 29 66.05 33c-20.4 4-23.31 5.41-25.75 7.27-1.86 2.47-3.3 5.38-7.3 25.78Z" />
      </svg>
    </>
  );
}
