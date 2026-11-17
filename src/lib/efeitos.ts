import gsap from "gsap";

import { CURVA, DURACAO, ESCALONAMENTO } from "./movimento";

const TRACOS = [
  { nome: "topo", eixo: "scaleX" },
  { nome: "direita", eixo: "scaleY" },
  { nome: "base", eixo: "scaleX" },
  { nome: "esquerda", eixo: "scaleY" },
] as const;

/** Desenha a moldura dourada em traço: quatro filetes, um depois do outro. */
export const desenharMoldura = (moldura: Element) => {
  const linha = gsap.timeline();
  linha.set(moldura, { opacity: 1 });

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

/** Revelação simples: o elemento sobe alguns pixels enquanto aparece. */
export const revelar = (
  alvos: gsap.TweenTarget,
  opcoes: gsap.TweenVars = {},
) =>
  gsap.fromTo(
    alvos,
    { opacity: 0, y: 28 },
    { opacity: 1, y: 0, duration: DURACAO.media, ease: CURVA.entrada, ...opcoes },
  );

/**
 * Chama a função uma vez, quando o elemento entra na tela. Usa
 * IntersectionObserver, que não mede o layout no carregamento, ao contrário
 * de um gatilho de rolagem por elemento. `linha` é a altura da tela, de 0
 * (topo) a 1 (base), que o topo do elemento precisa cruzar.
 */
export const aoEntrar = (
  elementos: Element[],
  linha: number,
  aoCruzar: (elemento: Element) => void,
) => {
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        observador.unobserve(entrada.target);
        aoCruzar(entrada.target);
      }
    },
    { rootMargin: `0px 0px -${Math.round((1 - linha) * 100)}% 0px` },
  );
  for (const elemento of elementos) observador.observe(elemento);
  return () => observador.disconnect();
};
