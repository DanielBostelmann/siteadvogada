"use client";

import { type ContextSafeFunc, useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import "lenis/dist/lenis.css";

import {
  aoEntrar,
  brilharUmaVez,
  desenharMoldura,
  revelar,
  revelarPorMascara,
} from "@/lib/efeitos";
import { carregarExtrasDeMovimento, comExtras } from "@/lib/extras-de-movimento";
import {
  ABERTURA,
  CONSULTA,
  CURVA,
  DURACAO,
  ESCALONAMENTO,
  LINHA_DE_ENTRADA,
  PROFUNDIDADE,
} from "@/lib/movimento";

gsap.registerPlugin(useGSAP);

declare global {
  interface Window {
    __movimentoPronto?: boolean;
  }
}

/** Tempo até a abertura e a entrada do hero terminarem, com folga. */
const FIM_DA_ABERTURA_MS = (ABERTURA.duracao + ABERTURA.cortina + 1.6) * 1000;

/** Rolagem suave e as revelações comuns a todas as páginas. */
export const MovimentoGlobal = () => {
  const caminho = usePathname();

  // A abertura toca uma vez. Depois dela, a entrada do hero é dada por
  // encerrada no mesmo instante, para a troca de regra no CSS não a repetir.
  useEffect(() => {
    const raiz = document.documentElement;
    if (raiz.dataset.abertura !== "tocar") return;

    const encerrar = window.setTimeout(() => {
      for (const elemento of document.querySelectorAll("[data-entrada]")) {
        elemento.setAttribute("data-entrada", "feita");
      }
      raiz.dataset.abertura = "feita";
    }, FIM_DA_ABERTURA_MS);
    return () => window.clearTimeout(encerrar);
  }, []);

  // Rolagem suave só no computador; no celular a rolagem é a nativa.
  useEffect(() => {
    if (!window.matchMedia(CONSULTA.computador).matches) return;
    let desligar = () => {};
    let ativo = true;

    void carregarExtrasDeMovimento().then(({ Lenis, ScrollTrigger }) => {
      if (!ativo) return;
      const lenis = new Lenis({ autoRaf: false });
      const avancar = (tempo: number) => lenis.raf(tempo * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(avancar);
      gsap.ticker.lagSmoothing(0);

      // Âncoras da mesma página rolam com suavidade, sem recarregar a rota.
      const rolarAteAncora = (evento: MouseEvent) => {
        const link = (evento.target as Element).closest?.("a[href*='#']");
        if (!(link instanceof HTMLAnchorElement)) return;
        const destino = new URL(link.href);
        if (destino.pathname !== window.location.pathname || !destino.hash) return;
        const alvo = document.querySelector<HTMLElement>(destino.hash);
        if (!alvo) return;

        evento.preventDefault();
        window.history.pushState(null, "", destino.hash);
        // O recuo do cabeçalho fixo vem do scroll-padding-top do CSS.
        lenis.scrollTo(alvo);
      };
      document.addEventListener("click", rolarAteAncora, true);

      desligar = () => {
        document.removeEventListener("click", rolarAteAncora, true);
        gsap.ticker.remove(avancar);
        lenis.destroy();
      };
    });

    return () => {
      ativo = false;
      desligar();
    };
  }, []);

  useGSAP(
    (_contexto, protegido) => {
      // As animações nascem depois, quando cada elemento entra na tela;
      // "seguro" as liga ao contexto, para serem desfeitas na troca de página.
      const seguro: ContextSafeFunc = protegido ?? ((funcao) => funcao);
      window.__movimentoPronto = true;
      const consultas = gsap.matchMedia();
      const todos = (seletor: string) => gsap.utils.toArray<HTMLElement>(seletor);

      consultas.add(CONSULTA.movimento, () => {
        const parar = [
          aoEntrar(
            todos("[data-revelar]"),
            LINHA_DE_ENTRADA.padrao,
            seguro((elemento: Element) => {
              revelar(elemento);
            }),
          ),
          aoEntrar(
            todos("[data-revelar-grupo]"),
            LINHA_DE_ENTRADA.padrao,
            seguro((grupo: Element) => {
              // Ao terminar, devolve opacidade e posição ao CSS, para os
              // efeitos de hover dos itens (como os da galeria) voltarem a valer.
              revelar(grupo.children, {
                duration: DURACAO.curta,
                stagger: ESCALONAMENTO.itens,
                clearProps: "opacity,transform",
              });
              // Galeria: as fotos também se aproximam de 1,05 para 1.
              if (grupo.classList.contains("galeria")) {
                gsap.fromTo(
                  grupo.querySelectorAll("img"),
                  { scale: 1.05 },
                  {
                    scale: 1,
                    duration: DURACAO.longa,
                    ease: CURVA.entrada,
                    stagger: ESCALONAMENTO.itens,
                    clearProps: "transform",
                  },
                );
              }
              grupo.setAttribute("data-revelado", "");
            }),
          ),
          aoEntrar(
            todos("[data-revelar-mascara]"),
            LINHA_DE_ENTRADA.padrao,
            seguro((bloco: Element) => {
              revelarPorMascara(bloco);
            }),
          ),
          aoEntrar(
            todos("[data-brilho]"),
            LINHA_DE_ENTRADA.padrao,
            seguro((elemento: Element) => {
              brilharUmaVez(elemento);
            }),
          ),
          aoEntrar(
            todos('[data-moldura="rolagem"]'),
            LINHA_DE_ENTRADA.cena,
            seguro((moldura: Element) => {
              desenharMoldura(moldura);
            }),
          ),
          aoEntrar(
            todos("[data-filete]"),
            LINHA_DE_ENTRADA.padrao,
            seguro((filete: Element) => {
              gsap.fromTo(
                filete,
                { opacity: 1, scaleX: 0 },
                { scaleX: 1, duration: DURACAO.longa, ease: CURVA.mascara },
              );
            }),
          ),
          // Divisórias verticais: desenham-se de cima para baixo logo depois
          // dos filetes horizontais da mesma faixa.
          aoEntrar(
            todos("[data-filete-vertical]"),
            LINHA_DE_ENTRADA.padrao,
            seguro((filete: Element) => {
              const ordem = Number(filete.getAttribute("data-filete-vertical")) || 0;
              gsap.fromTo(
                filete,
                { opacity: 1, scaleY: 0 },
                {
                  scaleY: 1,
                  duration: DURACAO.curta,
                  ease: CURVA.mascara,
                  delay: DURACAO.curta + ordem * ESCALONAMENTO.traco,
                },
              );
            }),
          ),
        ];
        return () => parar.forEach((desligar) => desligar());
      });

      consultas.add(CONSULTA.computador, () =>
        comExtras(
          seguro(() => {
            for (const bloco of todos("[data-paralaxe]")) {
              gsap.fromTo(
                bloco,
                { yPercent: 6 },
                {
                  yPercent: -6,
                  ease: "none",
                  scrollTrigger: {
                    trigger: bloco,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                },
              );
            }
            // Camada no sentido oposto, para separar planos (bloco champagne
            // atrás da foto do escritório).
            for (const camada of todos("[data-paralaxe-oposta]")) {
              gsap.fromTo(
                camada,
                { yPercent: -PROFUNDIDADE.blocoPercentual },
                {
                  yPercent: PROFUNDIDADE.blocoPercentual,
                  ease: "none",
                  scrollTrigger: {
                    trigger: camada,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                },
              );
            }
            // Foto que corre devagar dentro da própria moldura; a escala cobre
            // as bordas durante o deslocamento.
            for (const moldura of todos("[data-paralaxe-imagem]")) {
              gsap.fromTo(
                moldura.querySelector("img"),
                { yPercent: -PROFUNDIDADE.imagemPercentual, scale: 1.1 },
                {
                  yPercent: PROFUNDIDADE.imagemPercentual,
                  scale: 1.1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: moldura,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                },
              );
            }
          }),
        ),
      );
    },
    { dependencies: [caminho], revertOnUpdate: true },
  );

  return null;
};
