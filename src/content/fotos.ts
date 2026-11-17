import foto01 from "@/assets/fotos/foto-01.jpg";
import foto02 from "@/assets/fotos/foto-02.jpg";
import foto03 from "@/assets/fotos/foto-03.jpg";
import foto04 from "@/assets/fotos/foto-04.jpg";
import foto05 from "@/assets/fotos/foto-05.jpg";
import foto06 from "@/assets/fotos/foto-06.jpg";
import foto07 from "@/assets/fotos/foto-07.jpg";
import foto08 from "@/assets/fotos/foto-08.jpg";
import foto09 from "@/assets/fotos/foto-09.jpg";

// Distribuição aprovada pela cliente (PRD, seção 7). Cada foto aparece em uma
// única posição; nenhuma se repete na mesma tela.
export const fotos = {
  hero: {
    src: foto02,
    alt: "Dra. Maria de Moraes sentada, de blazer xadrez, olhando para a câmera.",
  },
  escritorio: {
    src: foto03,
    alt: "Dra. Maria de Moraes assinando um documento em seu escritório.",
  },
  advogada: {
    src: foto08,
    alt: "Dra. Maria de Moraes em pé em seu escritório, de blazer laranja.",
  },
  galeria: [
    {
      src: foto01,
      alt: "Dra. Maria de Moraes sentada, com o olhar voltado para o alto.",
    },
    {
      src: foto07,
      alt: "Dra. Maria de Moraes recostada no sofá, com a mão apoiada na cabeça.",
    },
    {
      src: foto09,
      alt: "Dra. Maria de Moraes lendo um documento, com a caneta na mão.",
    },
  ],
  // Decorativa: aparece sob véu grafite, atrás da logomarca.
  interludio: { src: foto05, alt: "" },
  contato: {
    src: foto04,
    alt: "Retrato da Dra. Maria de Moraes, com a mão apoiada no queixo.",
  },
  compartilhamento: { src: foto06, alt: "Retrato da Dra. Maria de Moraes." },
} as const;
