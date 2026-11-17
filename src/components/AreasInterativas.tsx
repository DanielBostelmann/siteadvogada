"use client";

import { type ContextSafeFunc, useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import type { Area } from "@/content/areas";
import { secaoAreas } from "@/content/home";
import { comExtras, type ExtrasDeMovimento } from "@/lib/extras-de-movimento";
import { CONSULTA, CURVA, DURACAO } from "@/lib/movimento";

import { IconeSeta } from "./Icones";
import { Moldura } from "./Moldura";

gsap.registerPlugin(useGSAP);

const SERVICOS_EM_DESTAQUE = 3;
const PARALAXE_PX = 10;

type AreasInterativasProps = { areas: readonly Area[] };
type Selecao = { ativa: number; anterior: number };

const ordemDaCamada = (indice: number, { ativa, anterior }: Selecao) => {
  if (indice === ativa) return 2;
  return indice === anterior ? 1 : 0;
};

export const AreasInterativas = ({ areas }: AreasInterativasProps) => {
  const bloco = useRef<HTMLDivElement>(null);
  const [selecao, setSelecao] = useState<Selecao>({ ativa: 0, anterior: 0 });
  const { ativa } = selecao;
  const areaAtiva = areas[ativa] ?? areas[0];

  const ativar = (indice: number) =>
    setSelecao((atual) =>
      atual.ativa === indice ? atual : { ativa: indice, anterior: atual.ativa },
    );

  // Computador: o item que cruza o meio da tela fica ativo enquanto a lista
  // passa ao lado do painel fixo; o cursor desloca a imagem poucos pixels.
  useGSAP(
    (_contexto, protegido) => {
      const seguro: ContextSafeFunc = protegido ?? ((funcao) => funcao);
      const consultas = gsap.matchMedia();
      consultas.add(CONSULTA.computador, () => {
        const achar = gsap.utils.selector(bloco);

        const pararGatilhos = comExtras(
          seguro(({ ScrollTrigger }: ExtrasDeMovimento) => {
            achar("[data-area-item]").forEach((item, indice) => {
              ScrollTrigger.create({
                trigger: item,
                start: "top 55%",
                end: "bottom 55%",
                onToggle: ({ isActive }) => {
                  if (isActive) ativar(indice);
                },
              });
            });
          }),
        );

        const painel = bloco.current?.querySelector<HTMLElement>(
          "[data-area='painel']",
        );
        const camadas = achar("[data-area='camadas']")[0];
        const foco = achar("[data-area='foco']")[0];
        if (!painel || !camadas || !foco) return pararGatilhos;

        const opcoes = { duration: DURACAO.curta, ease: CURVA.entrada };
        const moverX = gsap.quickTo(camadas, "x", opcoes);
        const moverY = gsap.quickTo(camadas, "y", opcoes);
        const focoX = gsap.quickTo(foco, "x", opcoes);
        const focoY = gsap.quickTo(foco, "y", opcoes);

        const acompanhar = (evento: MouseEvent) => {
          const caixa = painel.getBoundingClientRect();
          const x = evento.clientX - caixa.left;
          const y = evento.clientY - caixa.top;
          moverX((x / caixa.width - 0.5) * -2 * PARALAXE_PX);
          moverY((y / caixa.height - 0.5) * -2 * PARALAXE_PX);
          focoX(x);
          focoY(y);
          gsap.to(foco, { autoAlpha: 1, ...opcoes });
        };
        const soltar = () => {
          moverX(0);
          moverY(0);
          gsap.to(foco, { autoAlpha: 0, ...opcoes });
        };

        painel.addEventListener("mousemove", acompanhar);
        painel.addEventListener("mouseleave", soltar);
        return () => {
          pararGatilhos();
          painel.removeEventListener("mousemove", acompanhar);
          painel.removeEventListener("mouseleave", soltar);
        };
      });
    },
    { scope: bloco },
  );

  // Troca de imagem por máscara, com leve aproximação.
  useGSAP(
    () => {
      if (selecao.ativa === selecao.anterior) return;
      const consultas = gsap.matchMedia();
      consultas.add(CONSULTA.movimento, () => {
        const camada = gsap.utils.selector(bloco)(
          `[data-area-camada="${selecao.ativa}"]`,
        );
        gsap.fromTo(
          camada,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: DURACAO.curta,
            ease: CURVA.mascara,
          },
        );
        gsap.fromTo(
          camada,
          { scale: 1.08 },
          { scale: 1, duration: DURACAO.longa, ease: CURVA.entrada },
        );
      });
    },
    { scope: bloco, dependencies: [selecao] },
  );

  return (
    <div ref={bloco} className="mt-(--espaco-bloco) lg:grid lg:grid-cols-12 lg:gap-8">
      <ol className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:block">
        {areas.map((area, indice) => {
          const estaAtiva = indice === ativa;
          return (
            <li
              key={area.slug}
              data-area-item
              className="lg:border-t lg:border-grafite/15 lg:last:border-b"
            >
              <Link
                href={`/areas/${area.slug}`}
                onMouseEnter={() => ativar(indice)}
                onFocus={() => ativar(indice)}
                data-ativa={estaAtiva}
                className="group block lg:py-6"
              >
                {/* Celular e tablet: cartão com a imagem da área. */}
                <span
                  data-revelar
                  className="grao relative block aspect-[4/3] overflow-hidden rounded-moldura bg-champagne lg:hidden"
                >
                  <Image
                    src={area.imagem.src}
                    alt={area.imagem.alt}
                    fill
                    sizes="(min-width: 1024px) 1px, (min-width: 640px) 45vw, 92vw"
                    className="object-cover"
                  />
                </span>

                <span className="mt-6 flex items-baseline gap-5 lg:mt-0">
                  <span className="rotulo w-7 shrink-0">{area.numero}</span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                      <h3 className="font-serif text-3xl lg:text-bloco leading-[1.08] font-medium text-grafite motion-safe:transition-opacity motion-safe:duration-500 lg:opacity-60 lg:group-data-[ativa=true]:opacity-100">
                        {area.nome}
                      </h3>
                      {area.selo ? (
                        <span className="rotulo rounded-moldura border border-dourado px-2.5 py-1 text-xs">
                          {area.selo}
                        </span>
                      ) : null}
                    </span>

                    <ul className="mt-3 space-y-1.5 text-base leading-relaxed text-grafite/75 motion-safe:transition-opacity motion-safe:duration-500 lg:opacity-0 lg:group-data-[ativa=true]:opacity-100 lg:[@media(hover:none)]:opacity-100">
                      {area.servicos
                        .slice(0, SERVICOS_EM_DESTAQUE)
                        .map((servico) => (
                          <li key={servico}>{servico}</li>
                        ))}
                    </ul>

                    <span className="link-dourado mt-5 inline-flex items-center gap-2 pb-1 text-sm font-medium text-grafite lg:hidden">
                      {secaoAreas.verServicos}
                      <IconeSeta className="size-4" />
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      {/* Computador: painel fixo; a imagem acompanha o item ativo. O painel
          repete os links da lista, por isso fica fora do teclado e dos leitores. */}
      <div aria-hidden="true" className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28 mr-5">
          <Moldura className="translate-x-5 translate-y-5" />
          <Link
            href={`/areas/${areaAtiva.slug}`}
            tabIndex={-1}
            data-area="painel"
            className="grao relative block aspect-[4/5] overflow-hidden rounded-moldura bg-champagne"
          >
            <span data-area="camadas" className="absolute -inset-3 block">
              {areas.map((area, indice) => (
                <span
                  key={area.slug}
                  data-area-camada={indice}
                  style={{ zIndex: ordemDaCamada(indice, selecao) }}
                  className="absolute inset-0 block"
                >
                  <Image
                    src={area.imagem.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 38vw, 1px"
                    className="object-cover"
                  />
                </span>
              ))}
            </span>
            <span className="absolute inset-0 z-10 bg-linear-to-t from-grafite/85 via-grafite/15 to-transparent" />
            {/* Foco de luz que segue o cursor sobre a fotografia. */}
            <span
              data-area="foco"
              className="pointer-events-none invisible absolute top-0 left-0 z-10 size-[28rem] -translate-1/2 rounded-full bg-radial from-branco/25 to-transparent to-70%"
            />
            <span className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-6 p-7 text-branco">
              <span>
                <span className="block text-[0.8125rem] font-medium tracking-[0.2em] text-champagne">
                  {areaAtiva.numero}
                </span>
                <span className="mt-2 block font-serif text-3xl leading-tight">
                  {areaAtiva.nome}
                </span>
              </span>
              <span className="link-dourado inline-flex shrink-0 items-center gap-2 pb-1 text-sm font-medium">
                {secaoAreas.verServicos}
                <IconeSeta className="size-4" />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
