import { Component, ReactNode } from "react";
import type { AlberoDocumenti } from "../../types/alberoAppunti";

interface input {
	albero: AlberoDocumenti;
}

export class ListaAppuntiV2 extends Component<input, any> {
	render(): ReactNode {
		return (
			<div>
				{this.props.albero.children.map((capitolo, id) => (
					<>
						<div key={id}>{capitolo.data.titolo}</div>
						<div className="bambini">
							{capitolo.children.map((documento, indx) => (
								<>
									<p key={indx}>{documento.data.titolo}</p>
									<div className="esercizi">
										{documento.children?.map((esercizio, ind) => (
											<pre key={ind}>{esercizio.data.titolo}</pre>
										))}
									</div>
								</>
							))}
						</div>
					</>
				))}
			</div>
		);
	}
}
