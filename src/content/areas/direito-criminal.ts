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
  imagem: {
    src: "/areas/direito-criminal.avif",
    largura: 896,
    altura: 1120,
    alt: "Sala de audiências vazia, em madeira escura, com a tribuna iluminada pela luz das janelas.",
  },
};
