import Link from "next/link";

import { site } from "@/config/site";
import { fotos } from "@/content/fotos";
import { hero } from "@/content/home";

import { BotaoWhatsApp } from "./BotaoWhatsApp";
import { Foto } from "./Foto";
import { Moldura } from "./Moldura";
import { HeroCena } from "./movimento/HeroCena";

export const Hero = () => (
  <section
    id="inicio"
    className="relative overflow-hidden bg-linear-to-b from-branco to-off-white"
  >
    <HeroCena className="relative flex min-h-svh flex-col">
      {/* Filete dourado vertical, que cresce com a rolagem no computador. */}
      <span
        aria-hidden="true"
        data-hero="filete"
        className="absolute top-28 bottom-8 left-[clamp(0.625rem,2.5vw,2.25rem)] hidden w-px origin-top bg-dourado lg:block"
      />

      <div className="container-site grid flex-1 items-center gap-14 pt-28 pb-12 lg:grid-cols-12 lg:gap-8 lg:pt-28 lg:pb-10">
        <div data-hero="coluna-texto" className="lg:col-span-7">
          <p data-hero="texto" data-oculto className="rotulo">
            {hero.rotulo}
          </p>
          <h1
            data-hero="titulo"
            data-oculto
            className="mt-6 max-w-[15ch] font-serif text-[clamp(2.625rem,5.6vw,5.25rem)] leading-[1.02] font-medium tracking-[-0.01em] text-balance"
          >
            {hero.titulo.map((trecho) =>
              "destaque" in trecho ? (
                <em key={trecho.texto} className="font-normal text-dourado-texto">
                  {trecho.texto}
                </em>
              ) : (
                trecho.texto
              ),
            )}
          </h1>
          <p
            data-hero="texto"
            data-oculto
            className="mt-7 max-w-[33rem] text-lg leading-relaxed text-grafite/75"
          >
            {hero.subtitulo}
          </p>
          <div
            data-hero="texto"
            data-oculto
            className="mt-10 flex flex-wrap items-center gap-x-9 gap-y-5"
          >
            <BotaoWhatsApp>{hero.botaoWhatsApp}</BotaoWhatsApp>
            <Link
              href="/#areas"
              className="link-dourado inline-flex min-h-11 items-center text-sm font-medium tracking-wide text-grafite"
            >
              {hero.botaoAreas}
            </Link>
          </div>
        </div>

        <div data-hero="coluna-foto" className="lg:col-span-5 lg:justify-self-end">
          <div className="relative mr-4 aspect-[4/5] max-w-md lg:mr-5 lg:aspect-[2/3] lg:h-[min(72svh,46rem)] lg:max-w-none">
            <Moldura
              cena="cena"
              className="translate-x-4 translate-y-4 lg:translate-x-5 lg:translate-y-5"
            />
            <div data-hero="foto" data-oculto className="size-full">
              <Foto
                src={fotos.hero.src}
                alt={fotos.hero.alt}
                preload
                sizes="(min-width: 1024px) 34vw, 90vw"
                className="size-full"
                imagemClassName="object-cover object-[50%_18%]"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        data-hero="rodape"
        data-oculto
        className="container-site flex items-center justify-between gap-6 pb-7"
      >
        <p className="rotulo">
          {site.nome} · {site.oab}
        </p>
        <p aria-hidden="true" className="rotulo flex items-center gap-3">
          Role
          <span className="block h-10 w-px bg-dourado" />
        </p>
      </div>
    </HeroCena>
  </section>
);
