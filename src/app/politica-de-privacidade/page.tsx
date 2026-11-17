import type { Metadata } from "next";

import { site } from "@/config/site";
import { privacidade } from "@/content/privacidade";
import { metadadosDaPagina } from "@/lib/seo";

export const metadata: Metadata = metadadosDaPagina({
  titulo: `${privacidade.titulo} | ${site.marcaCurta}`,
  descricao:
    "Como são tratados os dados pessoais enviados pelo formulário de contato, conforme a LGPD.",
  caminho: "/politica-de-privacidade",
});

// O texto é uma minuta: ver o aviso em src/content/privacidade.ts.
export default function PoliticaDePrivacidade() {
  return (
    <article className="bg-branco pt-32 pb-24 lg:pt-44 lg:pb-36">
      <div className="container-site">
        <div className="max-w-3xl">
          <p className="rotulo">{site.marcaCurta}</p>
          <h1 className="mt-6 font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-none font-medium">
            {privacidade.titulo}
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-grafite/80">
            {privacidade.introducao}
          </p>

          {privacidade.secoes.map((secao) => (
            <section key={secao.titulo} className="mt-14 border-t border-grafite/15 pt-8">
              <h2 className="font-serif text-3xl font-medium">{secao.titulo}</h2>
              {secao.paragrafos.map((paragrafo) => (
                <p
                  key={paragrafo}
                  className="mt-5 text-[1.0625rem] leading-relaxed text-grafite/80"
                >
                  {paragrafo}
                </p>
              ))}
              {"itens" in secao ? (
                <ul className="mt-5 space-y-2.5 text-[1.0625rem] leading-relaxed text-grafite/80">
                  {secao.itens.map((item) => (
                    <li key={item} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="mt-[0.7em] h-px w-5 shrink-0 bg-dourado"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
              {"paragrafosFinais" in secao
                ? secao.paragrafosFinais.map((paragrafo) => (
                    <p
                      key={paragrafo}
                      className="mt-5 text-[1.0625rem] leading-relaxed text-grafite/80"
                    >
                      {paragrafo}
                    </p>
                  ))
                : null}
            </section>
          ))}

          <p className="mt-14 text-sm text-grafite/70">
            {privacidade.atualizacao}
          </p>
        </div>
      </div>
    </article>
  );
}
