import { Advogada } from "@/components/Advogada";
import { AreasDeAtuacao } from "@/components/AreasDeAtuacao";
import { Contato } from "@/components/Contato";
import { Escritorio } from "@/components/Escritorio";
import { FaixaIdentificacao } from "@/components/FaixaIdentificacao";
import { Hero } from "@/components/Hero";
import { Interludio } from "@/components/Interludio";
import { Abertura } from "@/components/movimento/Abertura";
import { dadosEstruturados, serializarJsonLd } from "@/lib/seo";

export default function PaginaInicial() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializarJsonLd(dadosEstruturados) }}
      />
      <Abertura />
      <Hero />
      <Escritorio />
      <FaixaIdentificacao />
      <AreasDeAtuacao />
      <Interludio />
      <Advogada />
      <Contato />
    </>
  );
}
