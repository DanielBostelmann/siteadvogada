"use client";

import { type ContextSafeFunc, useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import { aoEntrar, revelar } from "@/lib/efeitos";
import { carregarExtrasDeMovimento } from "@/lib/extras-de-movimento";
import {
  CONSULTA,
  CURVA,
  DURACAO,
  ESCALONAMENTO,
  LINHA_DE_ENTRADA,
} from "@/lib/movimento";

gsap.registerPlugin(useGSAP);

type PalavraPorPalavraProps = { children: React.ReactNode; className?: string };

/** Revela os parágrafos marcados com data-palavras: palavra a palavra no
    computador e, no celular, com a revelação simples. */
export const PalavraPorPalavra = ({
  children,
  className,
}: PalavraPorPalavraProps) => {
  const bloco = useRef<HTMLDivElement>(null);

  useGSAP(
    (_contexto, protegido) => {
      const seguro: ContextSafeFunc = protegido ?? ((funcao) => funcao);
      const consultas = gsap.matchMedia();
      const paragrafos = gsap.utils.toArray<HTMLElement>(
        "[data-palavras]",
        bloco.current,
      );

      consultas.add(CONSULTA.movimento, () => {
        const noComputador = window.matchMedia(CONSULTA.computador).matches;

        const palavraPorPalavra = async (paragrafo: Element) => {
          const { SplitText } = await carregarExtrasDeMovimento();
          seguro(() => {
            const divisao = SplitText.create(paragrafo, { type: "words" });
            gsap.set(paragrafo, { opacity: 1 });
            gsap.from(divisao.words, {
              opacity: 0,
              y: "0.4em",
              duration: DURACAO.curta,
              stagger: ESCALONAMENTO.palavras,
              ease: CURVA.entrada,
              // Terminada a revelação, o parágrafo volta a ser texto corrido.
              onComplete: () => divisao.revert(),
            });
          })();
        };

        return aoEntrar(
          paragrafos,
          LINHA_DE_ENTRADA.padrao,
          noComputador
            ? (paragrafo: Element) => void palavraPorPalavra(paragrafo)
            : seguro((paragrafo: Element) => {
                revelar(paragrafo);
              }),
        );
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
