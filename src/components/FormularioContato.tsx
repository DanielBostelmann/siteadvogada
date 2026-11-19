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

// O campo é o "peer" do filete de foco logo depois dele (ver ComFilete).
const CAMPO =
  "peer block w-full border-0 border-b border-grafite/30 bg-transparent px-0 py-3 text-base text-grafite focus:outline-none aria-[invalid=true]:border-grafite";
// Filete dourado que cresce do centro sobre o sublinhado quando o campo
// recebe foco. Com movimento reduzido, aparece de uma vez.
const FILETE_FOCO =
  "pointer-events-none absolute inset-x-0 bottom-0 h-0.5 scale-x-0 bg-dourado-texto peer-focus:scale-x-100 motion-safe:transition-transform motion-safe:duration-(--dur-estado) motion-safe:ease-(--ease-saida)";

const ComFilete = ({ children }: { children: React.ReactNode }) => (
  <span className="relative mt-2 block">
    {children}
    <span aria-hidden="true" className={FILETE_FOCO} />
  </span>
);
const ROTULO_CAMPO = "text-sm font-medium text-grafite";
const LINK = "border-b border-dourado text-grafite";

type ErroDoCampoProps = { campo: CampoContato; erros: ErrosContato };

const ErroDoCampo = ({ campo, erros }: ErroDoCampoProps) =>
  erros[campo] ? (
    <span id={`erro-${campo}`} className="entrada-estado mt-2 block text-sm text-grafite">
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
        className="entrada-estado rounded-moldura bg-branco p-6 shadow-(--sombra-cartao) sm:p-10"
      >
        <span aria-hidden="true" className="filete-desenhado block h-px w-12 bg-dourado" />
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
      className="rounded-moldura bg-branco p-6 shadow-(--sombra-cartao) sm:p-10"
    >
      {estado.status === "erro" ? (
        <p
          role="alert"
          className="entrada-estado mb-8 border-l border-dourado py-1 pl-5 text-base leading-relaxed text-grafite"
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
          <ComFilete>
            <input
              type="text"
              name="nome"
              required
              autoComplete="name"
              defaultValue={valores?.nome}
              className={CAMPO}
              {...atributosDeErro("nome")}
            />
          </ComFilete>
          <ErroDoCampo campo="nome" erros={erros} />
        </label>
        <label className="block">
          <span className={ROTULO_CAMPO}>E-mail *</span>
          <ComFilete>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              spellCheck={false}
              defaultValue={valores?.email}
              className={CAMPO}
              {...atributosDeErro("email")}
            />
          </ComFilete>
          <ErroDoCampo campo="email" erros={erros} />
        </label>
        <label className="block">
          <span className={ROTULO_CAMPO}>Telefone / WhatsApp</span>
          <ComFilete>
            <input
              type="tel"
              name="telefone"
              autoComplete="tel"
              defaultValue={valores?.telefone}
              className={CAMPO}
              {...atributosDeErro("telefone")}
            />
          </ComFilete>
          <ErroDoCampo campo="telefone" erros={erros} />
        </label>
        <label className="block sm:col-span-2">
          <span className={ROTULO_CAMPO}>Área de interesse</span>
          <ComFilete>
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
          </ComFilete>
          <ErroDoCampo campo="area" erros={erros} />
        </label>
        <label className="block sm:col-span-2">
          <span className={ROTULO_CAMPO}>Mensagem *</span>
          <ComFilete>
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
          </ComFilete>
          <ErroDoCampo campo="mensagem" erros={erros} />
        </label>
      </div>

      <p
        id="aviso-formulario"
        className="mt-4 text-base leading-relaxed text-grafite/70"
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
          <span className="text-base leading-relaxed text-grafite/80">
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
        className="botao-pressionavel botao-elevado mt-9 inline-flex min-h-12 w-full items-center justify-center overflow-hidden rounded-moldura bg-grafite px-8 text-sm font-medium tracking-wide text-branco hover:bg-grafite/90 disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
      >
        {/* Os dois rótulos ocupam a mesma célula: a largura do botão não muda
            quando o texto troca para "Enviando…". */}
        <span className="grid">
          <span className={`col-start-1 row-start-1 ${enviando ? "invisible" : ""}`}>
            Enviar mensagem
          </span>
          <span className={`col-start-1 row-start-1 ${enviando ? "" : "invisible"}`}>
            Enviando…
          </span>
        </span>
        {/* Enquanto envia, um filete percorre a base do botão. */}
        {enviando ? <span aria-hidden="true" className="filete-carregando" /> : null}
      </button>
    </form>
  );
};
