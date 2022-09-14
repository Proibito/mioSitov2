import { Component, ReactNode } from "react";
import { createPortal } from "react-dom";
import stile from "./stileMenu.module.scss";
import { topBar } from "../../types/topBar";
import { topBarImpostazioni } from "../../settings/topBar";

export class HamburgerMobile extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { visibile: false };
  }

  chiudi() {
    this.setState({ visibile: false });
  }

  render(): ReactNode {
    return (
      <>
        <svg
          onClick={() => {
            this.setState({ visibile: true });
          }}
          xmlns="http://www.w3.org/2000/svg"
          className="menuHamburger"
          style={{ width: "32px", height: "32px", transform: "rotate(0deg)" }}
        >
          <line
            x1="4.8"
            y1="9.6"
            x2="27.2"
            y2="9.6"
            stroke="var(--color-text)"
            strokeWidth="3"
            strokLinecap="round"
          ></line>
          <line
            x1="27.2"
            y1="22.4"
            x2="4.8"
            y2="22.4"
            stroke="var(--color-text)"
            strokeWidth="3"
            strokLinecap="round"
          ></line>
        </svg>
        <span>{this.state.visibile}</span>
        {this.state.visibile ? (
          <PortalNav>
            <Menu
              chiudi={() => {
                this.chiudi();
              }}
            ></Menu>
          </PortalNav>
        ) : null}
      </>
    );
  }
}

class Menu extends Component<{ chiudi: any }> {
  render(): ReactNode {
    return (
      <div className={stile.wrapper}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "32px", height: "32px", transform: "rotate(-45deg)" }}
          onClick={() => {
            this.props.chiudi();
          }}
          className={stile.bottone}
        >
          <line x1="16" y1="0" x2="16" y2="32" stroke="var(--color-text)" strokeWidth="3" strokeLinecap="round"></line>
          <line x1="0" y1="16" x2="32" y2="16" stroke="var(--color-text)" strokeWidth="3" strokeLinecap="round"></line>
        </svg>
        <div className={stile.menu}>
          Menu
          {topBarImpostazioni.elementiSinistra.map((elemento) => (
            <a href={elemento.link}>{elemento.testo}</a>
          ))}
        </div>
      </div>
    );
  }
}

class PortalNav extends Component<any, any> {
  el: HTMLElement;
  appendiA = document.getElementById("portalNav");
  constructor(props: any) {
    super(props);
    this.el = document.createElement("div");
    this.el.style.width = "100%";
    this.el.style.height = "100%";
    this.el.style.position = "fixed";
    this.el.style.zIndex = "101";

    const body = document.getElementsByTagName("body")[0];
    body.style.position = "fixed";
  }

  componentDidMount() {
    this.appendiA!.appendChild(this.el);
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    this.appendiA!.removeChild(this.el);
    const body = document.getElementsByTagName("body")[0];
    body.style.position = "initial";
  }

  render() {
    return createPortal(this.props.children, this.el);
  }
}
