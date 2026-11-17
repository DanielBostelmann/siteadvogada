"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

import {
  CONSULTA,
  CURVA,
  DURACAO,
  ESCALONAMENTO,
  GATILHO,
} from "@/lib/movimento";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

type PalavraPorPalavraProps = { children: React.ReactNode; className?: string };

/** Revela palavra a palavra os parágrafos marcados com data-palavras. */
export const PalavraPorPalavra = ({
  children,
  className,
}: PalavraPorPalavraProps) => {
  const bloco = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const consultas = gsap.matchMedia();
      consultas.add(CONSULTA.movimento, () => {
        for (const paragrafo of gsap.utils.toArray<HTMLElement>(
          "[data-palavras]",
          bloco.current,
        )) {
          const divisao = SplitText.create(paragrafo, { type: "words" });
          gsap.set(paragrafo, { autoAlpha: 1 });
          gsap.from(divisao.words, {
            autoAlpha: 0,
            y: "0.4em",
            duration: DURACAO.curta,
            stagger: ESCALONAMENTO.palavras,
            ease: CURVA.entrada,
            scrollTrigger: {
              trigger: paragrafo,
              start: GATILHO.entrada,
              once: true,
            },
          });
        }
      });
    },
    { scope: bloco },
  );

  return (
    <div ref={bloco} className={className}>
      {children}
    </div>
  );
};
