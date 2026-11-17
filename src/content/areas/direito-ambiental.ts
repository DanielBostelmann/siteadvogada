import type { Area } from "./tipos";

export const direitoAmbiental: Area = {
  slug: "direito-ambiental",
  numero: "06",
  nome: "Direito Ambiental",
  apresentacao:
    "Defesa e consultoria para produtores rurais e empresas em questões de regularidade, licenciamento e responsabilidade ambiental.",
  servicos: [
    "Defesa em autos de infração ambiental.",
    "Embargos ambientais.",
    "Ações civis públicas.",
    "Responsabilidade por danos ambientais.",
    "Licenciamento ambiental.",
    "Regularização ambiental de propriedades.",
    "Defesa em processos administrativos ambientais.",
    "Consultoria para atividades rurais e empresariais.",
    "Questões relacionadas ao CAR e à legislação ambiental.",
  ],
  comoAtua: {
    consultoria:
      "Orientação sobre licenciamento, regularização de propriedades, CAR e legislação ambiental.",
    administrativa:
      "Defesas em autos de infração, embargos e processos administrativos ambientais.",
    judicial:
      "Atuação em ações civis públicas e em demandas sobre responsabilidade por danos ambientais.",
  },
  imagem: {
    src: "/areas/direito-ambiental.avif",
    largura: 896,
    altura: 1120,
    alt: "Mãos segurando um mapa de propriedade rural, com mata e lavouras iluminadas pelo sol ao fundo.",
  },
};
