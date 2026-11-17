"use client";

import { type ContextSafeFunc, useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import { aoEntrar, revelar } from "@/lib/efeitos";
import {
  carregarExtrasDeMovimento,
  comExtras,
  type ExtrasDeMovimento,
} from "@/lib/extras-de-movimento";
import {
  CONSULTA,
  CURVA,
  DURACAO,
  ESCALONAMENTO,
  LINHA_DE_ENTRADA,
} from "@/lib/movimento";

gsap.registerPlugin(useGSAP);

type InterludioCenaProps = { children: React.ReactNode; className?: string };

/** Passagem do branco ao grafite na rolagem e brilho único sobre a logomarca. */
export const InterludioCena = ({ children, className }: InterludioCenaProps) => {
  const cena = useRef<HTMLDivElement>(null);

  useGSAP(
    (_contexto, protegido) => {
      const seguro: ContextSafeFunc = protegido ?? ((funcao) => funcao);
      const raiz = cena.current;
      if (!raiz) return;
      const achar = gsap.utils.selector(raiz);
      const consultas = gsap.matchMedia();

      consultas.add(CONSULTA.movimento, () => {
        const noComputador = window.matchMedia(CONSULTA.computador).matches;

        const entrar = () => {
          const frase = achar("[data-interludio='frase']")[0];
          const brilho = achar("[data-interludio='brilho']");

          gsap
            .timeline()
            .add(revelar(achar("[data-interludio='logo']")))
            .fromTo(
              brilho,
              { xPercent: -150, opacity: 1 },
              { xPercent: 450, duration: DURACAO.longa, ease: CURVA.mascara },
              0.5,
            )
            .set(brilho, { opacity: 0 });

          if (!noComputador) {
            revelar(frase, { delay: 0.2 });
            return;
          }
          void carregarExtrasDeMovimento().then(
            seguro(({ SplitText }: ExtrasDeMovimento) => {
              const divisao = SplitText.create(frase, {
                type: "lines",
                mask: "lines",
                linesClass: "linha",
              });
              gsap.set(frase, { opacity: 1 });
              gsap.from(divisao.lines, {
                yPercent: 135,
                duration: DURACAO.longa,
                stagger: ESCALONAMENTO.linhas,
                ease: CURVA.entrada,
                onComplete: () => divisao.revert(),
              });
            }),
          );
        };

        return aoEntrar(
          [raiz],
          LINHA_DE_ENTRADA.interludio,
          seguro(entrar),
        );
      });

      consultas.add(CONSULTA.computador, () =>
        comExtras(
          seguro(() => {
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
          }),
        ),
      );
    },
    { scope: cena },
  );

  return (
    <div ref={cena} className={className}>
      {children}
    </div>
  );
};
