"use client";

import { type ContextSafeFunc, useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import { desenharMoldura } from "@/lib/efeitos";
import { comExtras, type ExtrasDeMovimento } from "@/lib/extras-de-movimento";
import {
  ABERTURA,
  CONSULTA,
  CURVA,
  DURACAO,
  ESCALONAMENTO,
} from "@/lib/movimento";

gsap.registerPlugin(useGSAP);

type HeroCenaProps = { children: React.ReactNode; className?: string };

/**
 * A entrada do hero é feita em CSS (ver "Entrada do hero" em globals.css),
 * para o conteúdo aparecer sem esperar o JavaScript. Aqui ficam só a moldura
 * em traço e, no computador, o título linha a linha e a paralaxe na rolagem.
 */
export const HeroCena = ({ children, className }: HeroCenaProps) => {
  const cena = useRef<HTMLDivElement>(null);

  useGSAP(
    (_contexto, protegido) => {
      const seguro: ContextSafeFunc = protegido ?? ((funcao) => funcao);
      const raiz = cena.current;
      if (!raiz) return;
      const achar = gsap.utils.selector(raiz);
      const consultas = gsap.matchMedia();
      const atraso =
        document.documentElement.dataset.abertura === "tocar"
          ? ABERTURA.duracao
          : 0.1;

      consultas.add(CONSULTA.movimento, () => {
        desenharMoldura(achar("[data-moldura='cena']")[0]).delay(atraso + 0.3);
      });

      consultas.add(CONSULTA.computador, () =>
        comExtras(
          seguro(({ SplitText }: ExtrasDeMovimento) => {
            const titulo = achar("[data-hero='titulo']")[0];
            SplitText.create(titulo, {
              type: "lines",
              mask: "lines",
              linesClass: "linha",
              autoSplit: true,
              onSplit: (divisao) => {
                titulo.setAttribute("data-dividido", "");
                return gsap.from(divisao.lines, {
                  yPercent: 135,
                  duration: DURACAO.longa,
                  stagger: ESCALONAMENTO.linhas,
                  ease: CURVA.entrada,
                  delay: atraso,
                });
              },
            });

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
