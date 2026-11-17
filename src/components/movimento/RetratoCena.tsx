"use client";

import { type ContextSafeFunc, useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import { aoEntrar, desenharMoldura } from "@/lib/efeitos";
import { CONSULTA, CURVA, DURACAO, LINHA_DE_ENTRADA } from "@/lib/movimento";

gsap.registerPlugin(useGSAP);

type RetratoCenaProps = { children: React.ReactNode; className?: string };

/** Retrato revelado de baixo para cima; bloco champagne e moldura entram depois. */
export const RetratoCena = ({ children, className }: RetratoCenaProps) => {
  const cena = useRef<HTMLDivElement>(null);

  useGSAP(
    (_contexto, protegido) => {
      const seguro: ContextSafeFunc = protegido ?? ((funcao) => funcao);
      const raiz = cena.current;
      if (!raiz) return;
      const achar = gsap.utils.selector(raiz);
      const consultas = gsap.matchMedia();

      consultas.add(CONSULTA.movimento, () => {
        const entrar = () => {
          gsap
            .timeline()
            .fromTo(
              achar("[data-retrato='foto']"),
              { opacity: 1, clipPath: "inset(100% 0% 0% 0%)" },
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
              { opacity: 0, x: -24 },
              { opacity: 1, x: 0, duration: DURACAO.media, ease: CURVA.entrada },
              0.5,
            )
            .add(desenharMoldura(achar("[data-moldura='cena']")[0]), 0.6);
        };

        return aoEntrar(
          [raiz],
          LINHA_DE_ENTRADA.cena,
          seguro(entrar),
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
