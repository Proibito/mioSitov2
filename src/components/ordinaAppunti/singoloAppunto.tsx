import { Component, ReactNode } from "react";
import type { PostPreviewType } from "../../types/types";
import stile from "./singoloAppunto.module.scss";

export class SingoloAppunto extends Component<{ post: PostPreviewType }> {
  render(): ReactNode {
    return (
      <article className={stile.articolo}>
        <a href={this.props.post?.url ?? ""} className={stile.aContent}>
          <div className={stile.rigaTitolo}>
            <span className={stile.titolo}>{this.props.post.titolo}</span>
            {this.props.post.frontmatter.capitolo ? (
              <span className={stile.ultimaModifica}>Capitolo: {this.props.post.frontmatter.capitolo}</span>
            ) : null}
            <span className={stile.ultimaModifica}>Ultima modifica - {this.props.post.ultimaModifica}</span>
          </div>
          <p className={stile.descrizione}>{this.props.post.frontmatter.descrizione}</p>
          <span className={stile.link}>Leggi tutto</span>
        </a>
      </article>
    );
  }
}
