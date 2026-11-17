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
  <section id="contato" className="bg-off-white py-24 lg:py-36">
    <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-8">
      <div data-revelar-grupo className="lg:col-span-5">
        <p className="rotulo">Contato</p>
        <h2 className="mt-6 font-serif text-[clamp(2.25rem,4.2vw,3.75rem)] leading-[1.05] font-medium text-balance">
          {contato.titulo}
        </h2>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-grafite/75">
          {contato.texto}
        </p>

        <dl className="mt-10 border-t border-grafite/15">
          {CANAIS.map((canal) => (
            <div
              key={canal.rotulo}
              className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-grafite/15 py-4"
            >
              <div className="min-w-0">
                <dt className="rotulo">{canal.rotulo}</dt>
                <dd className="mt-1">
                  <a
                    href={canal.href}
                    className="link-dourado link-dourado-oculto pb-0.5 font-serif text-xl break-all text-grafite sm:text-2xl"
                  >
                    {canal.valor}
                  </a>
                </dd>
              </div>
              <BotaoCopiar valor={canal.valor} descricao={canal.descricao} />
            </div>
          ))}
        </dl>

        <BotaoWhatsApp className="mt-9">{contato.botaoWhatsApp}</BotaoWhatsApp>

        <div className="relative mt-14 mr-4 hidden w-56 lg:block">
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
