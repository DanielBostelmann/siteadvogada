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
      {/* No celular só o ícone, para o e-mail caber na mesma linha. Os dois
          ícones ficam sobrepostos e se cruzam: o de confirmação entra com
          escala de 0,8 para 1. */}
      <span aria-hidden="true" className="grid sm:hidden">
        <IconeCopiar
          className={`col-start-1 row-start-1 size-5 motion-safe:transition-[opacity,scale] motion-safe:duration-(--dur-rapida) motion-safe:ease-(--ease-saida) ${
            copiado ? "scale-80 opacity-0" : "scale-100 opacity-100"
          }`}
        />
        <IconeConfirmado
          className={`col-start-1 row-start-1 size-5 text-dourado-texto motion-safe:transition-[opacity,scale] motion-safe:duration-(--dur-rapida) motion-safe:ease-(--ease-saida) ${
            copiado ? "scale-100 opacity-100" : "scale-80 opacity-0"
          }`}
        />
      </span>
      <span aria-live="polite" className="sr-only sm:not-sr-only">
        {/* "Copiado" entra com o mesmo movimento dos outros estados. */}
        <span
          key={copiado ? "copiado" : "copiar"}
          className={copiado ? "entrada-estado inline-block" : "inline-block"}
        >
          {copiado ? "Copiado" : "Copiar"}
        </span>
      </span>
    </button>
  );
};
