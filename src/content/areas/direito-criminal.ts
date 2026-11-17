import type { Area } from "./tipos";

export const direitoCriminal: Area = {
  slug: "direito-criminal",
  numero: "05",
  nome: "Direito Criminal",
  apresentacao:
    "Defesa técnica em todas as fases da persecução penal, do inquérito à execução da pena.",
  servicos: [
    "Defesa em inquéritos policiais.",
    "Acompanhamento em delegacias.",
    "Defesa em ações penais.",
    "Habeas corpus.",
    "Pedidos de liberdade provisória.",
    "Revogação de prisão preventiva.",
    "Recursos criminais.",
    "Tribunal do Júri.",
    "Execução penal.",
    "Defesa em crimes patrimoniais e econômicos.",
  ],
  comoAtua: {
    consultoria:
      "Orientação jurídica sobre a situação da pessoa investigada ou acusada e sobre cada ato do procedimento.",
    administrativa:
      "Acompanhamento em delegacias e defesa na fase de inquérito policial.",
    judicial:
      "Defesa em ações penais, pedidos de liberdade, habeas corpus, recursos, Tribunal do Júri e execução penal.",
  },
  imagem: {
    src: "/areas/direito-criminal.avif",
    largura: 896,
    altura: 1120,
    alt: "Sala de audiências vazia, em madeira escura, com a tribuna iluminada pela luz das janelas.",
  },
};
