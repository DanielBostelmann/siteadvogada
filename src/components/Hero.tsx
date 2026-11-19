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
    <HeroCena className="relative flex min-h-svh flex-col lg:min-h-[min(100svh,58rem)]">
      {/* Celular: texto e identificação ocupam a primeira tela e a foto vem
          em seguida. Computador: texto e foto lado a lado, identificação ao pé. */}
      <div className="container-site relative grid flex-1 grid-cols-1 pt-24 pb-10 lg:grid-cols-12 lg:pt-28 lg:grid-rows-[1fr_auto] lg:gap-x-8 lg:pb-0">
        {/* Filete dourado vertical, que cresce com a rolagem no computador.
            Fica 2rem à esquerda do conteúdo, acompanhando a margem do
            container em qualquer largura de tela. */}
        <span
          aria-hidden="true"
          data-hero="filete"
          className="absolute top-28 bottom-8 left-[calc(clamp(1.25rem,5vw,4.5rem)-2rem)] hidden w-px origin-top bg-dourado lg:block"
        />
        <div
          data-hero="coluna-texto"
          className="flex flex-col justify-center lg:col-span-7 lg:row-start-1 lg:self-start lg:pt-6"
        >
          <p data-entrada="sobe" className="rotulo">
            {hero.rotulo}
          </p>
          <h1
            data-hero="titulo"
            data-entrada="titulo"
            style={ordem(1)}
            className="mt-6 max-w-[15ch] font-serif text-display leading-[1.02] font-medium tracking-[-0.01em] text-balance"
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
          className="relative flex h-16 items-center pr-16 sm:pr-0 lg:col-span-12 lg:row-start-2 lg:h-20"
        >
          {/* No celular, pr-16 reserva o canto do botão flutuante do WhatsApp. */}
          <p className="rotulo">
            {site.nome} ·{" "}
            <span className="whitespace-nowrap">{site.oab}</span>
          </p>
          {/* Indicador de rolagem ao centro, longe do botão flutuante. */}
          <p
            aria-hidden="true"
            className="rotulo absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 sm:flex"
          >
            Role
            <span className="indicador-rolagem block h-10 w-px bg-dourado" />
          </p>
        </div>

        {/* No celular, a foto começa logo abaixo da primeira tela e mostra só
            uma faixa estreita: assim o título continua sendo o maior elemento
            visível (LCP), o que mantém o carregamento rápido. */}
        <div
          data-hero="coluna-foto"
          className="mt-16 lg:col-span-5 lg:row-start-1 lg:mt-0 lg:self-start lg:justify-self-end"
        >
          <div className="relative mr-4 aspect-[4/5] max-w-md lg:mr-5 lg:aspect-[2/3] lg:h-[min(72svh,46rem)] lg:max-w-none">
            <Moldura
              cena="cena"
              className="translate-x-4 translate-y-4 lg:translate-x-5 lg:translate-y-5"
            />
            <div data-hero="foto" className="size-full">
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
