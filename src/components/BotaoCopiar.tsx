"use client";

import { useState } from "react";

import { IconeConfirmado, IconeCopiar } from "./Icones";

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
      className="botao-pressionavel inline-flex size-11 shrink-0 items-center justify-center rounded-moldura border border-grafite/20 text-xs font-medium tracking-[0.12em] text-grafite uppercase hover:border-dourado sm:w-auto sm:min-w-20 sm:px-3"
    >
      {/* No celular só o ícone, para o e-mail caber na mesma linha. */}
      {copiado ? (
        <IconeConfirmado className="size-5 text-dourado-texto sm:hidden" />
      ) : (
        <IconeCopiar className="size-5 sm:hidden" />
      )}
      <span aria-live="polite" className="sr-only sm:not-sr-only">
        {copiado ? "Copiado" : "Copiar"}
      </span>
    </button>
  );
};
