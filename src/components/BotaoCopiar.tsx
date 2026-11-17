"use client";

import { useState } from "react";

const TEMPO_CONFIRMACAO_MS = 2000;

type BotaoCopiarProps = { valor: string; descricao: string };

export const BotaoCopiar = ({ valor, descricao }: BotaoCopiarProps) => {
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(valor);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), TEMPO_CONFIRMACAO_MS);
    } catch {
      // Sem acesso à área de transferência: o link ao lado continua funcionando.
    }
  };

  return (
    <button
      type="button"
      onClick={copiar}
      aria-label={`Copiar ${descricao}`}
      className="botao-pressionavel inline-flex min-h-11 min-w-20 items-center justify-center rounded-moldura border border-grafite/20 px-3 text-xs font-medium tracking-[0.12em] text-grafite uppercase hover:border-dourado"
    >
      <span aria-live="polite">{copiado ? "Copiado" : "Copiar"}</span>
    </button>
  );
};
