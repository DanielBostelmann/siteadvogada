// Constantes de movimento do site (PRD, seção 8). Único lugar com durações,
// curvas e atrasos: nada de valores soltos nos componentes.

export const DURACAO = {
  curta: 0.6,
  media: 0.9,
  longa: 1.2,
} as const;

export const CURVA = {
  entrada: "power3.out",
  mascara: "power2.inOut",
} as const;

export const ESCALONAMENTO = {
  linhas: 0.12,
  palavras: 0.02,
  itens: 0.07,
  traco: 0.3,
} as const;

export const ABERTURA = {
  /** Tempo da tela de carregamento até a cortina começar a abrir. */
  duracao: 1.2,
  cortina: 0.8,
  chaveDaSessao: "abertura",
} as const;

export const CONSULTA = {
  movimento: "(prefers-reduced-motion: no-preference)",
  // Fixação, paralaxe e efeitos de cursor ficam só no computador.
  computador:
    "(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)",
} as const;

/** Altura da tela (0 = topo, 1 = base) que o elemento cruza para se revelar. */
export const LINHA_DE_ENTRADA = {
  padrao: 0.88,
  cena: 0.72,
  interludio: 0.5,
} as const;
