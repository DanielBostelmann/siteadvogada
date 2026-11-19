"use client";

import { useSyncExternalStore } from "react";

// Prévia temporária das paletas propostas. Só troca o atributo data-paleta do
// <html>; as cores de cada paleta ficam em globals.css. Remover antes do
// lançamento, junto com o bloco "Prévia de paletas" do CSS e a linha que lê a
// paleta salva no ScriptMovimento.

const PALETAS = [
  { id: "original", nome: "Original", fundo: "#ffffff", destaque: "#c6a15b" },
  { id: "prata", nome: "Prata", fundo: "#f3f2f2", destaque: "#676769" },
  { id: "noite", nome: "Noite e ouro", fundo: "#0b1424", destaque: "#c6a15b" },
  { id: "grafite", nome: "Grafite e ouro", fundo: "#292929", destaque: "#ecebea" },
] as const;

type IdPaleta = (typeof PALETAS)[number]["id"];

export const CHAVE_PALETA = "paleta";

const aplicar = (id: IdPaleta) => {
  const raiz = document.documentElement;
  if (id === "original") delete raiz.dataset.paleta;
  else raiz.dataset.paleta = id;
  try {
    if (id === "original") localStorage.removeItem(CHAVE_PALETA);
    else localStorage.setItem(CHAVE_PALETA, id);
  } catch {}
};

// A paleta ativa é o próprio atributo do <html>, que o script inicial já pode
// ter definido a partir da escolha salva.
const observar = (avisar: () => void) => {
  const observador = new MutationObserver(avisar);
  observador.observe(document.documentElement, { attributeFilter: ["data-paleta"] });
  return () => observador.disconnect();
};
const lerAtiva = () => document.documentElement.dataset.paleta ?? "original";
const lerNoServidor = () => "original";

export const SeletorPaleta = () => {
  const ativa = useSyncExternalStore(observar, lerAtiva, lerNoServidor);

  return (
    <div
      role="group"
      aria-label="Prévia de paletas de cores"
      className="fixed bottom-4 left-4 z-30 flex items-center gap-1 rounded-full bg-branco/90 p-1 text-grafite shadow-(--sombra-cartao) backdrop-blur"
    >
      <span className="hidden px-3 text-xs font-medium text-grafite/75 sm:inline">Paleta</span>
      {PALETAS.map((paleta) => (
        <button
          key={paleta.id}
          type="button"
          aria-pressed={ativa === paleta.id}
          title={paleta.nome}
          onClick={() => aplicar(paleta.id)}
          className="botao-pressionavel flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full px-2 text-xs font-medium aria-pressed:bg-grafite/10 sm:px-3"
        >
          <span
            aria-hidden="true"
            className="size-5 shrink-0 rounded-full border border-grafite/30"
            style={{
              background: `linear-gradient(135deg, ${paleta.fundo} 50%, ${paleta.destaque} 50%)`,
            }}
          />
          <span className="sr-only sm:not-sr-only">{paleta.nome}</span>
        </button>
      ))}
    </div>
  );
};
