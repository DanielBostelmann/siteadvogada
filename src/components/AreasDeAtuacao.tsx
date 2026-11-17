import { areas } from "@/content/areas";
import { secaoAreas } from "@/content/home";

import { AreasInterativas } from "./AreasInterativas";

export const AreasDeAtuacao = () => (
  <section id="areas" className="bg-branco py-24 lg:py-36">
    <div className="container-site">
      <header data-revelar-grupo className="max-w-2xl">
        <h2 className="font-serif text-[clamp(2.25rem,4.2vw,3.75rem)] leading-[1.05] font-medium">
          {secaoAreas.titulo}
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-grafite/75">
          {secaoAreas.apoio}
        </p>
      </header>
      <AreasInterativas areas={areas} />
    </div>
  </section>
);
