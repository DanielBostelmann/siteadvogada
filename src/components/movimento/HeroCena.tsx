"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

import { desenharMoldura } from "@/lib/efeitos";
import {
  ABERTURA,
  CONSULTA,
  CURVA,
  DURACAO,
  ESCALONAMENTO,
} from "@/lib/movimento";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

type HeroCenaProps = { children: React.ReactNode; className?: string };

/** Entrada do hero e paralaxe na rolagem. O conteúdo vem pronto do servidor. */
export const HeroCena = ({ children, className }: HeroCenaProps) => {
  const cena = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const raiz = cena.current;
      if (!raiz) return;
      const achar = gsap.utils.selector(raiz);
      const consultas = gsap.matchMedia();

      consultas.add(CONSULTA.movimento, () => {
        const comAbertura =
          document.documentElement.dataset.abertura === "tocar";
        const atraso = comAbertura ? ABERTURA.duracao : 0.1;

        const titulo = achar("[data-hero='titulo']")[0];
        gsap.set(titulo, { autoAlpha: 1 });
        SplitText.create(titulo, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (divisao) =>
            gsap.from(divisao.lines, {
              yPercent: 110,
              duration: DURACAO.longa,
              stagger: ESCALONAMENTO.linhas,
              ease: CURVA.entrada,
              delay: atraso,
            }),
        });

        const linha = gsap.timeline({
          delay: atraso,
          defaults: { ease: CURVA.entrada, duration: DURACAO.media },
        });
        linha
          .fromTo(
            achar("[data-hero='foto']"),
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: DURACAO.curta },
            0,
          )
          .fromTo(
            achar("[data-hero='foto'] img"),
            { scale: 1.08 },
            { scale: 1, duration: DURACAO.longa },
            0,
          )
          .fromTo(
            achar("[data-hero='texto']"),
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, stagger: ESCALONAMENTO.linhas },
            0.35,
          )
          .add(desenharMoldura(achar("[data-moldura='cena']")[0]), 0.3)
          .fromTo(
            achar("[data-hero='rodape']"),
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: DURACAO.curta },
            0.9,
          );
      });

      consultas.add(CONSULTA.computador, () => {
        const rolagem = {
          trigger: raiz,
          start: "top top",
          end: "bottom top",
          scrub: true,
        };
        gsap.to(achar("[data-hero='coluna-texto']"), {
          yPercent: -10,
          ease: "none",
          scrollTrigger: rolagem,
        });
        gsap.to(achar("[data-hero='coluna-foto']"), {
          yPercent: 7,
          ease: "none",
          scrollTrigger: rolagem,
        });
        gsap.fromTo(
          achar("[data-hero='filete']"),
          { scaleY: 0.12 },
          { scaleY: 1, ease: "none", scrollTrigger: rolagem },
        );
      });
    },
    { scope: cena },
  );

  return (
    <div ref={cena} className={className}>
      {children}
    </div>
  );
};
