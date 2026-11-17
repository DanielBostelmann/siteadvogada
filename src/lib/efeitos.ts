import gsap from "gsap";

import { CURVA, ESCALONAMENTO } from "./movimento";

const TRACOS = [
  { nome: "topo", eixo: "scaleX" },
  { nome: "direita", eixo: "scaleY" },
  { nome: "base", eixo: "scaleX" },
  { nome: "esquerda", eixo: "scaleY" },
] as const;

/** Desenha a moldura dourada em traço: quatro filetes, um depois do outro. */
export const desenharMoldura = (moldura: Element) => {
  const linha = gsap.timeline();
  gsap.set(moldura, { visibility: "visible" });
  moldura.setAttribute("data-revelado", "");

  for (const traco of TRACOS) {
    const filete = moldura.querySelector(`[data-traco="${traco.nome}"]`);
    if (!filete) continue;
    linha.fromTo(
      filete,
      { [traco.eixo]: 0 },
      { [traco.eixo]: 1, duration: ESCALONAMENTO.traco, ease: CURVA.mascara },
    );
  }
  return linha;
};
