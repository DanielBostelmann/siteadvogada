"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { desenharMoldura } from "@/lib/efeitos";
import { CONSULTA, CURVA, DURACAO, GATILHO } from "@/lib/movimento";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type RetratoCenaProps = { children: React.ReactNode; className?: string };

/** Retrato revelado de baixo para cima; bloco champagne e moldura entram depois. */
export const RetratoCena = ({ children, className }: RetratoCenaProps) => {
  const cena = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const raiz = cena.current;
      if (!raiz) return;
      const achar = gsap.utils.selector(raiz);
      const consultas = gsap.matchMedia();

      consultas.add(CONSULTA.movimento, () => {
        const linha = gsap.timeline({
          scrollTrigger: { trigger: raiz, start: GATILHO.cena, once: true },
        });
        linha
          .fromTo(
            achar("[data-retrato='foto']"),
            { autoAlpha: 1, clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: DURACAO.longa,
              ease: CURVA.mascara,
            },
          )
          .fromTo(
            achar("[data-retrato='foto'] img"),
            { scale: 1.08 },
            { scale: 1, duration: DURACAO.longa, ease: CURVA.entrada },
            0,
          )
          .fromTo(
            achar("[data-retrato='bloco']"),
            { autoAlpha: 0, x: -24 },
            { autoAlpha: 1, x: 0, duration: DURACAO.media, ease: CURVA.entrada },
            0.5,
          )
          .add(desenharMoldura(achar("[data-moldura='cena']")[0]), 0.6);
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
