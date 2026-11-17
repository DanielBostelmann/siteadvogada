import { direitoAmbiental } from "./direito-ambiental";
import { direitoCivil } from "./direito-civil";
import { direitoCriminal } from "./direito-criminal";
import { direitoPrevidenciario } from "./direito-previdenciario";
import { direitoTributario } from "./direito-tributario";
import { licitacoes } from "./licitacoes-e-contratos-administrativos";
import type { Area } from "./tipos";

// Direito Tributário vem primeiro: é a área de especialização.
export const areas: readonly Area[] = [
  direitoTributario,
  licitacoes,
  direitoCivil,
  direitoPrevidenciario,
  direitoCriminal,
  direitoAmbiental,
];

export const buscarArea = (slug: string): Area | undefined =>
  areas.find((area) => area.slug === slug);

export type { Area };
