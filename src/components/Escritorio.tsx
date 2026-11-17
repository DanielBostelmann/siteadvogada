import { fotos } from "@/content/fotos";
import { escritorio } from "@/content/home";

import { Foto } from "./Foto";

export const Escritorio = () => {
  const [abertura, ...demais] = escritorio.paragrafos;

  return (
    <section id="escritorio" className="bg-branco py-24 lg:py-40">
      <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h2 className="rotulo">{escritorio.titulo}</h2>
          <p className="mt-8 font-serif text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.2] text-pretty">
            {abertura}
          </p>
          {demais.map((paragrafo) => (
            <p
              key={paragrafo}
              className="mt-8 max-w-[38rem] text-lg leading-relaxed text-grafite/75"
            >
              {paragrafo}
            </p>
          ))}
          <p className="mt-8 font-serif text-2xl font-semibold">
            {escritorio.destaque}
          </p>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <div className="relative ml-4 max-w-sm lg:ml-5 lg:max-w-none">
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-4 translate-y-4 rounded-moldura bg-champagne lg:-translate-x-5 lg:translate-y-5"
            />
            <Foto
              src={fotos.escritorio.src}
              alt={fotos.escritorio.alt}
              sizes="(min-width: 1024px) 28vw, 80vw"
              className="aspect-[3/4]"
              imagemClassName="object-cover object-[60%_30%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
