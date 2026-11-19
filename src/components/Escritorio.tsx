import { fotos } from "@/content/fotos";
import { escritorio } from "@/content/home";

import { Foto } from "./Foto";
import { PalavraPorPalavra } from "./movimento/PalavraPorPalavra";

export const Escritorio = () => {
  const [abertura, ...demais] = escritorio.paragrafos;

  return (
    <section id="escritorio" className="bg-branco secao">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
        <PalavraPorPalavra className="lg:col-span-7">
          <h2 data-revelar className="rotulo">
            {escritorio.titulo}
          </h2>
          <p
            data-palavras
            className="mt-8 font-serif text-destaque leading-[1.2] text-pretty"
          >
            {abertura}
          </p>
          {demais.map((paragrafo) => (
            <p
              key={paragrafo}
              data-palavras
              className="mt-8 max-w-[38rem] text-lg leading-relaxed text-grafite/75"
            >
              {paragrafo}
            </p>
          ))}
          <p data-palavras className="mt-8 font-serif text-2xl font-semibold">
            {escritorio.destaque}
          </p>
        </PalavraPorPalavra>

        <div className="lg:col-span-4 lg:col-start-9">
          <div
            data-paralaxe
            className="relative ml-4 max-w-sm lg:ml-5 lg:max-w-none"
          >
            {/* Bloco champagne: no computador, corre contra a foto na rolagem. */}
            <span
              aria-hidden="true"
              data-revelar
              data-paralaxe-oposta
              className="absolute inset-0 -translate-x-4 translate-y-4 rounded-moldura bg-champagne lg:-translate-x-5 lg:translate-y-5"
            />
            <div data-revelar-mascara>
              <Foto
                mascara
                src={fotos.escritorio.src}
                alt={fotos.escritorio.alt}
                sizes="(min-width: 1024px) 28vw, 80vw"
                className="aspect-[3/4]"
                imagemClassName="object-cover object-[60%_30%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
