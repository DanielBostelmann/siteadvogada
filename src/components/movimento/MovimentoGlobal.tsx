"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import "lenis/dist/lenis.css";

import { desenharMoldura } from "@/lib/efeitos";
import {
  ABERTURA,
  CONSULTA,
  CURVA,
  DURACAO,
  ESCALONAMENTO,
  GATILHO,
} from "@/lib/movimento";

gsap.registerPlugin(useGSAP, ScrollTrigger);

declare global {
  interface Window {
    __movimentoPronto?: boolean;
  }
}

const ESCONDIDO = { autoAlpha: 0, y: 28 };
const VISIVEL = { autoAlpha: 1, y: 0, duration: DURACAO.media, ease: CURVA.entrada };

/** Rolagem suave e as revelações comuns a todas as páginas. */
export const MovimentoGlobal = () => {
  const caminho = usePathname();

  useEffect(() => {
    if (!window.matchMedia(CONSULTA.movimento).matches) return;

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

    // A abertura toca uma vez; depois disso, voltar à página inicial não a repete.
    const encerrarAbertura = window.setTimeout(
      () => delete document.documentElement.dataset.abertura,
      (ABERTURA.duracao + ABERTURA.cortina) * 1000 + 200,
    );

    return () => {
      window.clearTimeout(encerrarAbertura);
      document.removeEventListener("click", rolarAteAncora, true);
      gsap.ticker.remove(avancar);
      lenis.destroy();
    };
  }, []);

  useGSAP(
    () => {
      window.__movimentoPronto = true;
      const consultas = gsap.matchMedia();

      consultas.add(CONSULTA.movimento, () => {
        for (const elemento of gsap.utils.toArray<HTMLElement>("[data-revelar]")) {
          gsap.fromTo(elemento, ESCONDIDO, {
            ...VISIVEL,
            scrollTrigger: { trigger: elemento, start: GATILHO.entrada, once: true },
          });
        }

        for (const grupo of gsap.utils.toArray<HTMLElement>("[data-revelar-grupo]")) {
          gsap.fromTo(grupo.children, ESCONDIDO, {
            ...VISIVEL,
            duration: DURACAO.curta,
            stagger: ESCALONAMENTO.itens,
            scrollTrigger: { trigger: grupo, start: GATILHO.entrada, once: true },
          });
          grupo.setAttribute("data-revelado", "");
        }

        for (const moldura of gsap.utils.toArray<HTMLElement>(
          '[data-moldura="rolagem"]',
        )) {
          ScrollTrigger.create({
            trigger: moldura,
            start: GATILHO.cena,
            once: true,
            onEnter: () => desenharMoldura(moldura),
          });
        }

        for (const filete of gsap.utils.toArray<HTMLElement>("[data-filete]")) {
          gsap.fromTo(
            filete,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: DURACAO.longa,
              ease: CURVA.mascara,
              scrollTrigger: { trigger: filete, start: GATILHO.entrada, once: true },
            },
          );
        }

        for (const imagem of gsap.utils.toArray<HTMLElement>(
          '[data-movimento="zoom"]',
        )) {
          gsap.fromTo(
            imagem,
            { scale: 1.08 },
            { scale: 1, duration: DURACAO.longa, ease: CURVA.entrada },
          );
        }
      });

      consultas.add(CONSULTA.computador, () => {
        for (const bloco of gsap.utils.toArray<HTMLElement>("[data-paralaxe]")) {
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
      });
    },
    { dependencies: [caminho], revertOnUpdate: true },
  );

  return null;
};
