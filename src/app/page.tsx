import { Advogada } from "@/components/Advogada";
import { AreasDeAtuacao } from "@/components/AreasDeAtuacao";
import { Contato } from "@/components/Contato";
import { Escritorio } from "@/components/Escritorio";
import { FaixaIdentificacao } from "@/components/FaixaIdentificacao";
import { Hero } from "@/components/Hero";
import { Interludio } from "@/components/Interludio";

export default function PaginaInicial() {
  return (
    <>
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
