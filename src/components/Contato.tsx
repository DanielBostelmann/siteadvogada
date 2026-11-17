import { site } from "@/config/site";
import { fotos } from "@/content/fotos";
import { contato } from "@/content/home";

import { BotaoCopiar } from "./BotaoCopiar";
import { BotaoWhatsApp } from "./BotaoWhatsApp";
import { FormularioContato } from "./FormularioContato";
import { Foto } from "./Foto";
import { Moldura } from "./Moldura";

const CANAIS = [
  {
    rotulo: "E-mail",
    valor: site.email,
    href: `mailto:${site.email}`,
    descricao: "o e-mail",
  },
  {
    rotulo: "Telefone",
    valor: site.telefone.exibicao,
    href: `tel:${site.telefone.tel}`,
    descricao: "o telefone",
  },
] as const;

export const Contato = () => (
  <section id="contato" className="bg-off-white secao">
    <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
      <div data-revelar-grupo className="lg:col-span-5">
        <p className="rotulo">Contato</p>
        <h2 className="mt-6 font-serif text-secao leading-[1.05] font-medium text-balance">
          {contato.titulo}
        </h2>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-grafite/75">
          {contato.texto}
        </p>

        <ul className="mt-10 border-t border-grafite/15">
          {CANAIS.map((canal) => (
            <li
              key={canal.rotulo}
              className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-grafite/15 py-4"
            >
              <p className="min-w-0">
                <span className="rotulo block">{canal.rotulo}</span>
                <a
                  href={canal.href}
                  className="link-dourado link-dourado-oculto inline-flex min-h-11 items-center font-serif text-lg break-all text-grafite sm:text-2xl"
                >
                  {canal.valor}
                </a>
              </p>
              <BotaoCopiar valor={canal.valor} descricao={canal.descricao} />
            </li>
          ))}
        </ul>

        <BotaoWhatsApp className="mt-9">{contato.botaoWhatsApp}</BotaoWhatsApp>

        <div className="relative mt-12 mr-4 hidden w-56 lg:block">
          <Moldura className="translate-x-4 translate-y-4" />
          <Foto
            src={fotos.contato.src}
            alt={fotos.contato.alt}
            sizes="224px"
            className="aspect-[4/5]"
            imagemClassName="object-cover object-[50%_15%]"
          />
        </div>
      </div>

      <div className="lg:col-span-6 lg:col-start-7">
        <FormularioContato />
      </div>
    </div>
  </section>
);
