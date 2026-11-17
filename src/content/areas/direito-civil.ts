import type { Area } from "./tipos";

export const direitoCivil: Area = {
  slug: "direito-civil",
  numero: "03",
  nome: "Direito Civil",
  apresentacao:
    "Atuação em relações contratuais, patrimoniais, familiares e sucessórias, com foco na prevenção e na solução de conflitos.",
  servicos: [
    "Ações de cobrança e execução.",
    "Indenizações por danos morais e materiais.",
    "Responsabilidade civil.",
    "Ações contratuais.",
    "Rescisão e revisão de contratos.",
    "Direito de propriedade e posse.",
    "Usucapião.",
    "Direito das obrigações.",
    "Inventários e questões sucessórias.",
    "Ações de família e questões patrimoniais.",
  ],
  comoAtua: {
    consultoria:
      "Elaboração e revisão de contratos e orientação em questões patrimoniais, familiares e sucessórias.",
    administrativa:
      "Procedimentos extrajudiciais em cartório, como inventários e usucapião, nos casos em que a lei permite.",
    judicial:
      "Ações de cobrança, indenização, contratos, posse, propriedade, família e sucessões.",
  },
  imagem: {
    src: "/areas/direito-civil.avif",
    largura: 896,
    altura: 1120,
    alt: "Escrivaninha de madeira com documentos, carimbo e aliança, diante de uma janela com vista para a cidade ao entardecer.",
  },
};
