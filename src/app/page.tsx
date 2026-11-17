import { Advogada } from "@/components/Advogada";
import { AreasDeAtuacao } from "@/components/AreasDeAtuacao";
import { Contato } from "@/components/Contato";
import { Escritorio } from "@/components/Escritorio";
import { FaixaIdentificacao } from "@/components/FaixaIdentificacao";
import { Hero } from "@/components/Hero";
import { Interludio } from "@/components/Interludio";
import { Abertura } from "@/components/movimento/Abertura";

export default function PaginaInicial() {
  return (
    <>
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
