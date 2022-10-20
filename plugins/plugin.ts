import type { AstroIntegration } from "astro";
import { creaDizionario } from "./plugins/scriptGeneraDizionario.ts";

export function miaEstensione() {
	return {
		name: "mia utility",
		hooks: {
			"astro:config:setup": (opzioni) => {
				opzioni.injectScript(
					"head-inline",
					`if (localStorage.getItem("temaNotte") === null) {
                    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                      document.getElementsByTagName("html")[0].classList.add("night");
                    }
                  } else {
                    if (localStorage.getItem("temaNotte") == "true")
                      document.getElementsByTagName("html")[0].classList.add("night");
                  }`
				);
			},
			"astro:build:start": (opzioni) => {
				console.log("ciao");
			},
			"astro:build:setup": (opzioni) => {
				console.log(opzioni.pages);
			},
		},
	} as AstroIntegration;
}
