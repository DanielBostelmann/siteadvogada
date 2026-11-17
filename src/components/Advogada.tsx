import { site } from "@/config/site";
import { fotos } from "@/content/fotos";
import { advogada } from "@/content/home";

import { Foto } from "./Foto";
import { LinhaDoTempoFormacao } from "./LinhaDoTempoFormacao";

export const Advogada = () => (
  <section id="advogada" className="bg-branco py-24 lg:py-40">
    <div className="container-site">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="relative mr-5 mb-5 ml-5 max-w-md lg:max-w-none">
            <span
              aria-hidden="true"
              className="absolute -top-5 -bottom-5 -left-5 w-3/4 rounded-moldura bg-champagne"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 translate-x-5 translate-y-5 rounded-moldura border border-dourado"
            />
            <Foto
              src={fotos.advogada.src}
              alt={fotos.advogada.alt}
              sizes="(min-width: 1024px) 36vw, 85vw"
              className="aspect-[4/5]"
              imagemClassName="object-cover object-[50%_22%]"
            />
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          <p className="rotulo">{advogada.rotulo}</p>
          <h2 className="mt-6 font-serif text-[clamp(2.5rem,4.6vw,4.25rem)] leading-none font-medium">
            {site.nome}
          </h2>
          <p className="mt-5 text-sm font-medium tracking-wide text-grafite">
            {site.titulo} — {site.oab}
          </p>
          <div className="mt-9 space-y-5 text-[1.0625rem] leading-relaxed text-grafite/75">
            {advogada.paragrafos.map((paragrafo) => (
              <p key={paragrafo} className="max-w-[38rem]">
                {paragrafo}
              </p>
            ))}
          </div>
          <p className="mt-8 font-serif text-2xl font-semibold">
            {advogada.destaque}
          </p>
          <LinhaDoTempoFormacao />
        </div>
      </div>

      <ul className="mt-20 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:mt-28 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:pb-0">
        {fotos.galeria.map((foto) => (
          <li
            key={foto.alt}
            className="w-[72vw] max-w-xs shrink-0 snap-start lg:w-auto lg:max-w-none"
          >
            <Foto
              src={foto.src}
              alt={foto.alt}
              sizes="(min-width: 1024px) 28vw, 72vw"
              className="aspect-[3/4]"
              imagemClassName="object-cover object-[50%_20%]"
            />
          </li>
        ))}
      </ul>
    </div>
  </section>
);
