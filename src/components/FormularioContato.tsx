"use client";

import Link from "next/link";
import { startTransition, useActionState, useState } from "react";

import { enviarContato } from "@/app/acoes/contato";
import { site } from "@/config/site";
import { contato } from "@/content/home";
import {
  type CampoContato,
  type ErrosContato,
  type EstadoContato,
  LIMITE_MENSAGEM,
  OPCOES_DE_AREA,
} from "@/lib/contato-campos";
import { linkWhatsApp } from "@/lib/whatsapp";

const ESTADO_INICIAL: EstadoContato = { status: "inicial" };

const CAMPO =
  "mt-2 block w-full border-0 border-b border-grafite/30 bg-transparent px-0 py-3 text-base text-grafite focus:border-dourado-texto focus:outline-none aria-[invalid=true]:border-grafite";
const ROTULO_CAMPO = "text-sm font-medium text-grafite";
const LINK = "border-b border-dourado text-grafite";

type ErroDoCampoProps = { campo: CampoContato; erros: ErrosContato };

const ErroDoCampo = ({ campo, erros }: ErroDoCampoProps) =>
  erros[campo] ? (
    <span id={`erro-${campo}`} className="mt-2 block text-sm text-grafite">
      <span aria-hidden="true" className="mr-2 text-dourado-texto">
        —
      </span>
      {erros[campo]}
    </span>
  ) : null;

export const FormularioContato = () => {
  const [estado, enviar, enviando] = useActionState(
    enviarContato,
    ESTADO_INICIAL,
  );
  const [errosNoNavegador, setErrosNoNavegador] = useState<ErrosContato | null>(
    null,
  );

  const erros: ErrosContato =
    errosNoNavegador ?? (estado.status === "invalido" ? estado.erros : {});
  const valores = "valores" in estado ? estado.valores : null;

  // Valida no navegador antes de enviar. O validador (Zod) é baixado só
  // neste momento; sem JavaScript, o formulário segue direto para o servidor,
  // que valida de novo.
  const validarEEnviar = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const formulario = evento.currentTarget;
    const dados = new FormData(formulario);

    const { lerFormulario, validarContato } = await import("@/lib/contato");
    const { erros: encontrados } = validarContato(lerFormulario(dados));
    setErrosNoNavegador(encontrados);

    if (encontrados) {
      const primeiro = Object.keys(encontrados)[0];
      formulario.querySelector<HTMLElement>(`[name="${primeiro}"]`)?.focus();
      return;
    }
    startTransition(() => enviar(dados));
  };

  const atributosDeErro = (campo: CampoContato) => ({
    "aria-invalid": Boolean(erros[campo]),
    "aria-describedby": erros[campo] ? `erro-${campo}` : undefined,
  });

  if (estado.status === "sucesso") {
    return (
      <div
        id="formulario"
        role="status"
        className="rounded-moldura border border-grafite/10 bg-branco p-8 sm:p-12"
      >
        <span aria-hidden="true" className="block h-px w-12 bg-dourado" />
        <p className="mt-8 font-serif text-3xl leading-tight">
          {contato.formulario.sucesso}
        </p>
      </div>
    );
  }

  return (
    <form
      id="formulario"
      action={enviar}
      onSubmit={validarEEnviar}
      noValidate
      aria-label="Formulário de contato"
      data-revelar-grupo
      className="rounded-moldura border border-grafite/10 bg-branco p-6 shadow-[0_24px_60px_-40px] shadow-grafite/25 sm:p-10"
    >
      {estado.status === "erro" ? (
        <p
          role="alert"
          className="mb-8 border-l border-dourado py-1 pl-5 text-[0.9375rem] leading-relaxed text-grafite"
        >
          Não foi possível enviar a mensagem agora. Fale com o escritório pelo{" "}
          <a
            href={linkWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK}
          >
            WhatsApp
          </a>{" "}
          ou pelo e-mail{" "}
          <a href={`mailto:${site.email}`} className={`${LINK} break-all`}>
            {site.email}
          </a>
          .
        </p>
      ) : null}

      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className={ROTULO_CAMPO}>Nome *</span>
          <input
            type="text"
            name="nome"
            required
            autoComplete="name"
            defaultValue={valores?.nome}
            className={CAMPO}
            {...atributosDeErro("nome")}
          />
          <ErroDoCampo campo="nome" erros={erros} />
        </label>
        <label className="block">
          <span className={ROTULO_CAMPO}>E-mail *</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            defaultValue={valores?.email}
            className={CAMPO}
            {...atributosDeErro("email")}
          />
          <ErroDoCampo campo="email" erros={erros} />
        </label>
        <label className="block">
          <span className={ROTULO_CAMPO}>Telefone / WhatsApp</span>
          <input
            type="tel"
            name="telefone"
            autoComplete="tel"
            defaultValue={valores?.telefone}
            className={CAMPO}
            {...atributosDeErro("telefone")}
          />
          <ErroDoCampo campo="telefone" erros={erros} />
        </label>
        <label className="block sm:col-span-2">
          <span className={ROTULO_CAMPO}>Área de interesse</span>
          <select
            name="area"
            defaultValue={valores?.area ?? ""}
            className={CAMPO}
            {...atributosDeErro("area")}
          >
            <option value="">Selecione</option>
            {OPCOES_DE_AREA.map((opcao) => (
              <option key={opcao} value={opcao}>
                {opcao}
              </option>
            ))}
          </select>
          <ErroDoCampo campo="area" erros={erros} />
        </label>
        <label className="block sm:col-span-2">
          <span className={ROTULO_CAMPO}>Mensagem *</span>
          <textarea
            name="mensagem"
            required
            rows={5}
            maxLength={LIMITE_MENSAGEM}
            defaultValue={valores?.mensagem}
            className={`${CAMPO} resize-y`}
            aria-invalid={Boolean(erros.mensagem)}
            aria-describedby={
              erros.mensagem
                ? "erro-mensagem aviso-formulario"
                : "aviso-formulario"
            }
          />
          <ErroDoCampo campo="mensagem" erros={erros} />
        </label>
      </div>

      <p
        id="aviso-formulario"
        className="mt-4 text-[0.9375rem] leading-relaxed text-grafite/70"
      >
        {contato.formulario.aviso}
      </p>

      {/* Campo-isca contra robôs: fora da tela, do teclado e dos leitores de tela. */}
      <div aria-hidden="true" className="absolute -left-[200vw] size-px overflow-hidden">
        <label>
          Site
          <input type="text" name="site" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-7">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="consentimento"
            required
            className="mt-1 size-5 shrink-0 accent-dourado-texto"
            {...atributosDeErro("consentimento")}
          />
          <span className="text-[0.9375rem] leading-relaxed text-grafite/80">
            Li e concordo com a{" "}
            <Link href="/politica-de-privacidade" className={LINK}>
              Política de Privacidade
            </Link>{" "}
            e autorizo o uso dos meus dados para retorno deste contato.
          </span>
        </label>
        <ErroDoCampo campo="consentimento" erros={erros} />
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="botao-pressionavel mt-9 inline-flex min-h-12 w-full items-center justify-center rounded-moldura bg-grafite px-8 text-sm font-medium tracking-wide text-branco hover:bg-grafite/90 disabled:opacity-60 sm:w-auto"
      >
        {enviando ? "Enviando…" : "Enviar mensagem"}
      </button>
    </form>
  );
};
