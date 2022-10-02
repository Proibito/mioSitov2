import type { AstroIntegration } from "astro"; 
import {creaDizionario} from "./plugins/scriptGeneraDizionario.ts"

export function miaEstensione(){
    return{
        name: "mia utility",
        hooks: {
            'astro:build:start': (opzioni) => {
                console.log("ciao");
                
            }

        }
    } as AstroIntegration
}