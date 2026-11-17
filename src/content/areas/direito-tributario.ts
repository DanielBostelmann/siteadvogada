import type { Area } from "./tipos";

export const direitoTributario: Area = {
  slug: "direito-tributario",
  numero: "01",
  nome: "Direito Tributário",
  selo: "Área de especialização",
  apresentacao:
    "Assessoria consultiva e contenciosa em matéria tributária para pessoas físicas e empresas, nas esferas administrativa e judicial.",
  servicos: [
    "Ações declaratórias de inexistência de débito.",
    "Ações anulatórias de débitos fiscais.",
    "Execuções fiscais e embargos à execução.",
    "Exceção de pré-executividade.",
    "Mandado de segurança tributário.",
    "Repetição de indébito tributário.",
    "Planejamento tributário.",
    "Defesa em autos de infração.",
    "Recuperação de créditos tributários.",
    "Consultoria tributária empresarial.",
  ],
  imagem: {
    src: "/areas/direito-tributario.avif",
    largura: 896,
    altura: 1120,
    alt: "Mesa clara com relatórios de gráficos, livros encadernados, caneta dourada e uma balança ao fundo.",
  },
};
