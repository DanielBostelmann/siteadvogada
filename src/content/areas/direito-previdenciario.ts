import type { Area } from "./tipos";

export const direitoPrevidenciario: Area = {
  slug: "direito-previdenciario",
  numero: "04",
  nome: "Direito Previdenciário",
  apresentacao:
    "Orientação e representação de segurados perante o INSS e o Judiciário na concessão e na revisão de benefícios.",
  servicos: [
    "Concessão de aposentadorias.",
    "Revisão de benefícios previdenciários.",
    "Aposentadoria por idade e tempo de contribuição.",
    "Aposentadoria especial.",
    "Benefício por incapacidade temporária.",
    "Aposentadoria por incapacidade permanente.",
    "Pensão por morte.",
    "Auxílio-acidente.",
    "Benefício assistencial BPC/LOAS.",
    "Recursos administrativos e ações previdenciárias.",
  ],
  comoAtua: {
    consultoria:
      "Análise do histórico de contribuições e orientação sobre os benefícios aplicáveis a cada situação.",
    administrativa:
      "Requerimentos, acompanhamento de processos e recursos perante o INSS.",
    judicial:
      "Ações de concessão e de revisão de benefícios previdenciários e assistenciais.",
  },
  imagem: {
    src: "/areas/direito-previdenciario.avif",
    largura: 896,
    altura: 1120,
    alt: "Mãos de uma pessoa idosa repousadas sobre a mesa, ao lado de óculos, caneta-tinteiro e documentos.",
  },
};
