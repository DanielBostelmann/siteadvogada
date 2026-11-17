export type Area = {
  slug: string;
  numero: string;
  nome: string;
  selo?: string;
  apresentacao: string;
  servicos: readonly string[];
  /** Três blocos curtos de "Como o escritório atua" (PRD, seção 6). */
  comoAtua: {
    consultoria: string;
    administrativa: string;
    judicial: string;
  };
  imagem: {
    src: string;
    largura: number;
    altura: number;
    alt: string;
  };
};
