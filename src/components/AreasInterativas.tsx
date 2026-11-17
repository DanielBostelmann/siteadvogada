"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { Area } from "@/content/areas";
import { secaoAreas } from "@/content/home";

import { IconeSeta } from "./Icones";

const SERVICOS_EM_DESTAQUE = 3;

type AreasInterativasProps = { areas: readonly Area[] };

export const AreasInterativas = ({ areas }: AreasInterativasProps) => {
  const [ativa, setAtiva] = useState(0);
  const areaAtiva = areas[ativa] ?? areas[0];

  return (
    <div className="mt-14 lg:mt-20 lg:grid lg:grid-cols-12 lg:gap-8">
      <ol className="grid gap-12 sm:grid-cols-2 lg:col-span-7 lg:block">
        {areas.map((area, indice) => {
          const estaAtiva = indice === ativa;
          return (
            <li key={area.slug} className="lg:border-t lg:border-grafite/15 lg:last:border-b">
              <Link
                href={`/areas/${area.slug}`}
                onMouseEnter={() => setAtiva(indice)}
                onFocus={() => setAtiva(indice)}
                data-ativa={estaAtiva}
                className="group block lg:py-8"
              >
                {/* Celular e tablet: cartão com a imagem da área. */}
                <span className="grao relative block aspect-[4/3] overflow-hidden rounded-moldura bg-champagne lg:hidden">
                  <Image
                    src={area.imagem.src}
                    alt={area.imagem.alt}
                    fill
                    sizes="(min-width: 640px) 45vw, 92vw"
                    className="object-cover"
                  />
                </span>

                <span className="mt-6 flex items-baseline gap-5 lg:mt-0">
                  <span className="rotulo w-7 shrink-0">{area.numero}</span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                      <h3 className="font-serif text-[clamp(1.75rem,3.1vw,2.875rem)] leading-[1.08] font-medium text-grafite lg:text-grafite/60 lg:group-data-[ativa=true]:text-grafite">
                        {area.nome}
                      </h3>
                      {area.selo ? (
                        <span className="rotulo rounded-moldura border border-dourado px-2.5 py-1 text-[0.6875rem]">
                          {area.selo}
                        </span>
                      ) : null}
                    </span>

                    <ul className="mt-4 space-y-1.5 text-[0.9375rem] leading-relaxed text-grafite/75 lg:opacity-0 lg:group-data-[ativa=true]:opacity-100 lg:[@media(hover:none)]:opacity-100">
                      {area.servicos
                        .slice(0, SERVICOS_EM_DESTAQUE)
                        .map((servico) => (
                          <li key={servico}>{servico}</li>
                        ))}
                    </ul>

                    <span className="mt-5 inline-flex items-center gap-2 border-b border-dourado pb-1 text-sm font-medium text-grafite lg:hidden">
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

      {/* Computador: painel fixo; a imagem acompanha o item ativo. */}
      <div aria-hidden="true" className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28 mr-5">
          <span className="absolute inset-0 translate-x-5 translate-y-5 rounded-moldura border border-dourado" />
          <div className="grao relative aspect-[4/5] overflow-hidden rounded-moldura bg-champagne">
            {areas.map((area, indice) => (
              <Image
                key={area.slug}
                src={area.imagem.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 36vw, 0px"
                className={`object-cover ${indice === ativa ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <div className="absolute inset-0 bg-linear-to-t from-grafite/85 via-grafite/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7 text-branco">
              <p>
                <span className="block text-[0.8125rem] font-medium tracking-[0.2em] text-champagne">
                  {areaAtiva.numero}
                </span>
                <span className="mt-2 block font-serif text-3xl leading-tight">
                  {areaAtiva.nome}
                </span>
              </p>
              <span className="inline-flex shrink-0 items-center gap-2 border-b border-dourado pb-1 text-sm font-medium">
                {secaoAreas.verServicos}
                <IconeSeta className="size-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
