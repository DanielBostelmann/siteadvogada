export type Area = {
  slug: string;
  numero: string;
  nome: string;
  selo?: string;
  apresentacao: string;
  servicos: readonly string[];
  imagem: {
    src: string;
    largura: number;
    altura: number;
    alt: string;
  };
};
