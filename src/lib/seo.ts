import type { Metadata } from "next";

import { site } from "@/config/site";
import { areas } from "@/content/areas";

type DadosDaPagina = { titulo: string; descricao: string; caminho: string };

const IMAGEM_DE_COMPARTILHAMENTO = {
  url: "/compartilhamento.jpg",
  width: 1200,
  height: 630,
  alt: "Logomarca da Dra. Maria de Moraes Advocacia ao lado de um retrato da advogada.",
};

/** Metadados completos de uma página. O Open Graph é repetido por inteiro
    porque o Next substitui o objeto todo, em vez de mesclar campo a campo. */
export const metadadosDaPagina = ({
  titulo,
  descricao,
  caminho,
}: DadosDaPagina): Metadata => ({
  title: titulo,
  description: descricao,
  alternates: { canonical: caminho },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.marcaCurta,
    title: titulo,
    description: descricao,
    url: caminho,
    images: [IMAGEM_DE_COMPARTILHAMENTO],
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: descricao,
    images: [IMAGEM_DE_COMPARTILHAMENTO],
  },
});

const ID_ESCRITORIO = `${site.url}/#escritorio`;
const ID_ADVOGADA = `${site.url}/#advogada`;
const nomesDasAreas = areas.map((area) => area.nome);

/** Dados estruturados: o escritório (LegalService) e a advogada (Person).
    Sem endereço, preços ou avaliações: não foram informados nem cabem na
    publicidade da advocacia. */
export const dadosEstruturados = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      "@id": ID_ESCRITORIO,
      name: site.marcaCurta,
      url: site.url,
      image: `${site.url}${IMAGEM_DE_COMPARTILHAMENTO.url}`,
      logo: `${site.url}/logo/logo-completa.png`,
      email: site.email,
      telephone: site.telefone.tel,
      areaServed: { "@type": "Country", name: "BR" },
      knowsAbout: nomesDasAreas,
      founder: { "@id": ID_ADVOGADA },
    },
    {
      "@type": "Person",
      "@id": ID_ADVOGADA,
      name: site.nome,
      jobTitle: "Advogada",
      description: site.titulo,
      url: site.url,
      email: site.email,
      telephone: site.telefone.tel,
      knowsAbout: nomesDasAreas,
      worksFor: { "@id": ID_ESCRITORIO },
      identifier: { "@type": "PropertyValue", name: "OAB", value: site.oab },
    },
  ],
};

/** Serializa para <script type="application/ld+json"> sem abrir brecha de XSS. */
export const serializarJsonLd = (dados: unknown): string =>
  JSON.stringify(dados).replace(/</g, "\\u003c");
