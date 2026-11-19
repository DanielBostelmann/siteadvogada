import { ViewTransition } from "react";

/**
 * Esmaecimento curto entre páginas (classe "pagina" em globals.css). Fica em
 * cada page.tsx, e não no layout: o layout persiste entre as navegações e lá
 * a entrada e a saída nunca disparam. O cabeçalho fica parado. Sem suporte do
 * navegador, a troca é instantânea, como antes.
 */
export const TransicaoDePagina = ({ children }: { children: React.ReactNode }) => (
  <ViewTransition enter="pagina" exit="pagina" default="none">
    {children}
  </ViewTransition>
);
