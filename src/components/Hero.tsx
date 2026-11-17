import Link from "next/link";

import { site } from "@/config/site";
import { fotos } from "@/content/fotos";
import { hero } from "@/content/home";

import { BotaoWhatsApp } from "./BotaoWhatsApp";
import { Foto } from "./Foto";
import { Moldura } from "./Moldura";
import { HeroCena } from "./movimento/HeroCena";

/** Ordem de entrada: cada passo atrasa a animação em CSS (--ordem). */
const ordem = (passo: number) => ({ "--ordem": passo }) as React.CSSProperties;

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

      {/* Celular: texto e identificação ocupam a primeira tela e a foto vem
          em seguida. Computador: texto e foto lado a lado, identificação ao pé. */}
      <div className="container-site grid flex-1 grid-cols-1 pt-28 pb-12 lg:grid-cols-12 lg:grid-rows-[1fr_auto] lg:gap-x-8 lg:pb-0">
        <div
          data-hero="coluna-texto"
          className="flex min-h-[calc(100svh-12rem)] flex-col justify-center lg:col-span-7 lg:row-start-1 lg:min-h-0"
        >
          <p data-entrada="sobe" className="rotulo">
            {hero.rotulo}
          </p>
          <h1
            data-hero="titulo"
            data-entrada="titulo"
            style={ordem(1)}
            className="mt-6 max-w-[15ch] font-serif text-[clamp(2.625rem,5.6vw,5.25rem)] leading-[1.02] font-medium tracking-[-0.01em] text-balance"
          >
            {hero.titulo.map((trecho) =>
              "destaque" in trecho ? (
                <em
                  key={trecho.texto}
                  className="font-serif-italico font-normal text-dourado-texto"
                >
                  {trecho.texto}
                </em>
              ) : (
                trecho.texto
              ),
            )}
          </h1>
          <p
            data-entrada="sobe"
            style={ordem(2)}
            className="mt-7 max-w-[33rem] text-lg leading-relaxed text-grafite/75"
          >
            {hero.subtitulo}
          </p>
          <div
            data-entrada="sobe"
            style={ordem(3)}
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

        <div
          data-entrada="sobe"
          style={ordem(5)}
          className="flex h-20 items-center justify-between gap-6 pr-16 lg:col-span-12 lg:row-start-2 lg:h-24 xl:pr-0"
        >
          <p className="rotulo">
            {site.nome} · {site.oab}
          </p>
          <p aria-hidden="true" className="rotulo hidden items-center gap-3 sm:flex">
            Role
            <span className="block h-10 w-px bg-dourado" />
          </p>
        </div>

        <div
          data-hero="coluna-foto"
          className="mt-4 lg:col-span-5 lg:row-start-1 lg:mt-0 lg:self-center lg:justify-self-end"
        >
          <div className="relative mr-4 aspect-[4/5] max-w-md lg:mr-5 lg:aspect-[2/3] lg:h-[min(72svh,46rem)] lg:max-w-none">
            <Moldura
              cena="cena"
              className="translate-x-4 translate-y-4 lg:translate-x-5 lg:translate-y-5"
            />
            <div className="size-full">
              <Foto
                src={fotos.hero.src}
                alt={fotos.hero.alt}
                preload
                aproximar
                sizes="(min-width: 1024px) 34vw, 90vw"
                className="size-full"
                imagemClassName="object-cover object-[50%_18%]"
              />
            </div>
          </div>
        </div>
      </div>
    </HeroCena>
  </section>
);
