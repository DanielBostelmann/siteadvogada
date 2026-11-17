import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { IconeSeta } from "@/components/Icones";
import { site } from "@/config/site";
import { areas, buscarArea } from "@/content/areas";
import { paginaArea } from "@/content/pagina-area";
import { metadadosDaPagina } from "@/lib/seo";

export const generateStaticParams = () =>
  areas.map((area) => ({ slug: area.slug }));

export const generateMetadata = async ({
  params,
}: PageProps<"/areas/[slug]">): Promise<Metadata> => {
  const { slug } = await params;
  const area = buscarArea(slug);
  if (!area) return {};

  return metadadosDaPagina({
    titulo: `${area.nome} | ${site.marcaCurta}`,
    descricao: `${area.apresentacao} ${site.abrangencia}.`,
    caminho: `/areas/${area.slug}`,
  });
};

export default async function PaginaArea({
  params,
}: PageProps<"/areas/[slug]">) {
  const { slug } = await params;
  const area = buscarArea(slug);
  if (!area) notFound();

  const indice = areas.indexOf(area);
  const anterior = areas[(indice - 1 + areas.length) % areas.length];
  const seguinte = areas[(indice + 1) % areas.length];

  return (
    <article>
      <header className="relative isolate bg-branco pt-16 lg:pt-20">
        <div className="grao relative aspect-[5/4] max-h-[72svh] w-full overflow-hidden sm:aspect-[21/9]">
          <Image
            src={area.imagem.src}
            alt={area.imagem.alt}
            fill
            preload
            sizes="100vw"
            data-entrada="zoom"
            fetchPriority="high"
            className="object-cover object-[50%_55%]"
          />
          <div className="absolute inset-0 bg-linear-to-r from-branco/90 via-branco/55 to-branco/10" />
          <div className="absolute inset-0 bg-linear-to-t from-branco/80 via-transparent to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0">
          <div className="container-site pb-8 lg:pb-14" data-revelar-grupo>
            <nav aria-label="Você está em" className="rotulo">
              <Link href="/#areas" className="link-dourado inline-flex min-h-11 items-center">
                Áreas de atuação
              </Link>
            </nav>
            <p className="mt-6 flex flex-wrap items-center gap-4">
              <span className="font-serif text-2xl text-dourado-texto">
                {area.numero}
              </span>
              {area.selo ? (
                <span className="rotulo rounded-moldura border border-dourado bg-branco/70 px-2.5 py-1 text-xs">
                  {area.selo}
                </span>
              ) : null}
            </p>
            <h1 className="mt-3 max-w-[16ch] font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-none font-medium text-balance">
              {area.nome}
            </h1>
          </div>
        </div>
      </header>

      <section className="bg-branco py-20 lg:py-28">
        <div className="container-site">
          <p
            data-revelar
            className="max-w-4xl font-serif text-[clamp(1.625rem,2.8vw,2.5rem)] leading-[1.22] text-pretty"
          >
            {area.apresentacao}
          </p>

          <div className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-12 lg:gap-8">
            <h2
              data-revelar
              className="font-serif text-[clamp(2rem,3.4vw,3rem)] leading-tight font-medium lg:col-span-4"
            >
              {paginaArea.servicos}
            </h2>
            <ul
              data-revelar-grupo
              className="grid gap-x-10 border-t border-grafite/15 sm:grid-cols-2 lg:col-span-8"
            >
              {area.servicos.map((servico) => (
                <li
                  key={servico}
                  className="flex gap-4 border-b border-grafite/15 py-5 text-[1.0625rem] leading-relaxed"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.7em] h-px w-5 shrink-0 bg-dourado"
                  />
                  {servico}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-dourado/40 bg-off-white py-20 lg:py-28">
        <div className="container-site">
          <h2
            data-revelar
            className="font-serif text-[clamp(2rem,3.4vw,3rem)] leading-tight font-medium"
          >
            {paginaArea.comoAtua.titulo}
          </h2>
          <ul data-revelar-grupo className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {paginaArea.comoAtua.blocos.map((bloco) => (
              <li key={bloco.chave} className="border-t border-dourado pt-6">
                <h3 className="rotulo">{bloco.titulo}</h3>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-grafite/80">
                  {area.comoAtua[bloco.chave]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-branco py-20 lg:py-28">
        <div className="container-site" data-revelar-grupo>
          <h2 className="max-w-3xl font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] font-medium text-balance">
            {paginaArea.chamada.titulo}
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-x-9 gap-y-5">
            <BotaoWhatsApp area={area.nome}>
              {paginaArea.chamada.botaoWhatsApp}
            </BotaoWhatsApp>
            <Link
              href="/#contato"
              className="link-dourado inline-flex min-h-11 items-center text-sm font-medium tracking-wide"
            >
              {paginaArea.chamada.linkFormulario}
            </Link>
          </div>
        </div>
      </section>

      <nav
        aria-label="Outras áreas de atuação"
        className="border-t border-grafite/15 bg-branco"
      >
        <div className="container-site grid sm:grid-cols-2 sm:divide-x sm:divide-grafite/15">
          <Link
            href={`/areas/${anterior.slug}`}
            className="group flex flex-col gap-2 border-b border-grafite/15 py-9 sm:border-b-0 sm:pr-8"
          >
            <span className="rotulo flex items-center gap-2">
              <IconeSeta className="size-4 rotate-180" />
              {paginaArea.anterior}
            </span>
            <span className="font-serif text-2xl group-hover:text-dourado-texto lg:text-3xl">
              {anterior.nome}
            </span>
          </Link>
          <Link
            href={`/areas/${seguinte.slug}`}
            className="group flex flex-col gap-2 py-9 sm:items-end sm:pl-8 sm:text-right"
          >
            <span className="rotulo flex items-center gap-2">
              {paginaArea.seguinte}
              <IconeSeta className="size-4" />
            </span>
            <span className="font-serif text-2xl group-hover:text-dourado-texto lg:text-3xl">
              {seguinte.nome}
            </span>
          </Link>
        </div>
      </nav>
    </article>
  );
}
