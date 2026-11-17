"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

import { CONSULTA, CURVA, DURACAO, ESCALONAMENTO } from "@/lib/movimento";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

type InterludioCenaProps = { children: React.ReactNode; className?: string };

/** Passagem do branco ao grafite na rolagem e brilho único sobre a logomarca. */
export const InterludioCena = ({ children, className }: InterludioCenaProps) => {
  const cena = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const raiz = cena.current;
      if (!raiz) return;
      const achar = gsap.utils.selector(raiz);
      const consultas = gsap.matchMedia();

      consultas.add(CONSULTA.movimento, () => {
        const frase = achar("[data-interludio='frase']")[0];
        const linha = gsap.timeline({
          defaults: { ease: CURVA.entrada },
          scrollTrigger: { trigger: raiz, start: "top 45%", once: true },
        });
        linha
          .fromTo(
            achar("[data-interludio='logo']"),
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: DURACAO.media },
          )
          .fromTo(
            achar("[data-interludio='brilho']"),
            { xPercent: -150, autoAlpha: 1 },
            { xPercent: 450, duration: DURACAO.longa, ease: CURVA.mascara },
            0.5,
          )
          .set(achar("[data-interludio='brilho']"), { autoAlpha: 0 });

        gsap.set(frase, { autoAlpha: 1 });
        SplitText.create(frase, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (divisao) =>
            gsap.from(divisao.lines, {
              yPercent: 110,
              duration: DURACAO.longa,
              stagger: ESCALONAMENTO.linhas,
              ease: CURVA.entrada,
              scrollTrigger: { trigger: raiz, start: "top 45%", once: true },
            }),
        });
      });

      consultas.add(CONSULTA.computador, () => {
        gsap.fromTo(
          achar("[data-interludio='veu-claro']"),
          { opacity: 1 },
          {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: raiz,
              start: "top 90%",
              end: "top 35%",
              scrub: true,
            },
          },
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
