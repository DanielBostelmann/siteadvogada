import Link from "next/link";

import { site } from "@/config/site";
import { fotos } from "@/content/fotos";
import { hero } from "@/content/home";

import { BotaoWhatsApp } from "./BotaoWhatsApp";
import { Foto } from "./Foto";

export const Hero = () => (
  <section
    id="inicio"
    className="relative flex min-h-svh flex-col bg-linear-to-b from-branco to-off-white"
  >
    <div className="container-site grid flex-1 items-center gap-14 pt-28 pb-12 lg:grid-cols-12 lg:gap-8 lg:pt-28 lg:pb-10">
      <div className="lg:col-span-7">
        <p className="rotulo">{hero.rotulo}</p>
        <h1 className="mt-6 max-w-[15ch] font-serif text-[clamp(2.625rem,5.6vw,5.25rem)] leading-[1.02] font-medium tracking-[-0.01em] text-balance">
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
        <p className="mt-7 max-w-[33rem] text-lg leading-relaxed text-grafite/75">
          {hero.subtitulo}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-9 gap-y-5">
          <BotaoWhatsApp>{hero.botaoWhatsApp}</BotaoWhatsApp>
          <Link
            href="/#areas"
            className="inline-flex min-h-11 items-center border-b border-dourado text-sm font-medium tracking-wide text-grafite"
          >
            {hero.botaoAreas}
          </Link>
        </div>
      </div>

      <div className="lg:col-span-5 lg:justify-self-end">
        <div className="relative mr-4 aspect-[4/5] max-w-md lg:mr-5 lg:aspect-[2/3] lg:h-[min(72svh,46rem)] lg:max-w-none">
          <span
            aria-hidden="true"
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-moldura border border-dourado lg:translate-x-5 lg:translate-y-5"
          />
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

    <div className="container-site flex items-center justify-between gap-6 pb-7">
      <p className="rotulo">
        {site.nome} · {site.oab}
      </p>
      <p aria-hidden="true" className="rotulo flex items-center gap-3">
        Role
        <span className="block h-10 w-px bg-dourado" />
      </p>
    </div>
  </section>
);
