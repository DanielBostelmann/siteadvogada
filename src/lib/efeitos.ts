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
 * Revelação por máscara feita só com transform: a janela ([data-mascara=
 * "janela"]) sobe enquanto a imagem desce na mesma medida, então a foto parece
 * parada enquanto é descoberta; em seguida ela se aproxima devagar.
 */
export const revelarPorMascara = (bloco: Element) => {
  const janela = bloco.querySelector("[data-mascara='janela']");
  const imagem = janela?.querySelector("img");
  const linha = gsap.timeline();
  linha.to(bloco, { opacity: 1, duration: DURACAO.curta / 2 }, 0);
  if (!janela || !imagem) return linha;

  linha
    // y: 0 descarta o translateY(100%) do estado inicial em CSS, que o GSAP
    // leria como pixels fixos e somaria ao percentual.
    .fromTo(
      janela,
      { y: 0, yPercent: 100 },
      { y: 0, yPercent: 0, duration: DURACAO.media, ease: CURVA.mascara },
      0,
    )
    .fromTo(
      imagem,
      { yPercent: -100 },
      { yPercent: 0, duration: DURACAO.media, ease: CURVA.mascara },
      0,
    )
    .fromTo(
      imagem,
      { scale: 1.06 },
      { scale: 1, duration: DURACAO.longa, ease: CURVA.entrada },
      0,
    );
  return linha;
};

/** Um brilho atravessa o elemento uma única vez ([data-brilho-faixa]). */
export const brilharUmaVez = (elemento: Element) => {
  const faixa = elemento.querySelector("[data-brilho-faixa]");
  if (!faixa) return;
  gsap.fromTo(
    faixa,
    { xPercent: -100, opacity: 1 },
    {
      xPercent: 400,
      duration: DURACAO.longa,
      ease: CURVA.mascara,
      delay: 0.4,
      onComplete: () => {
        gsap.set(faixa, { opacity: 0 });
      },
    },
  );
};

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
