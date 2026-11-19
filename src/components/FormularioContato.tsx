"use client";

import Link from "next/link";
import { useState } from "react";

import { site } from "@/config/site";
import { contato } from "@/content/home";
import {
  type CampoContato,
  type ErrosContato,
  LIMITE_MENSAGEM,
  OPCOES_DE_AREA,
  type ValoresContato,
} from "@/lib/contato-campos";
import { linkDoFormulario } from "@/lib/whatsapp";

import { IconeWhatsApp } from "./Icones";

// O campo é o "peer" do filete de foco logo depois dele (ver ComFilete).
const CAMPO =
  "peer block w-full border-0 border-b border-grafite/30 bg-transparent px-0 py-3 text-base text-grafite focus:outline-none aria-[invalid=true]:border-grafite";
// Caixa de seleção sem a aparência nativa (moldura e seta do sistema): fica
// só com o sublinhado dos outros campos e uma seta dourada própria. Enquanto
// "Selecione" está escolhido, o texto fica mais claro, como um marcador.
const SELECAO = `${CAMPO} cursor-pointer appearance-none rounded-none pr-9 has-[option[value='']:checked]:text-grafite/75 [&>option]:text-grafite`;
// Filete dourado que cresce do centro sobre o sublinhado quando o campo
// recebe foco. Com movimento reduzido, aparece de uma vez.
const FILETE_FOCO =
  "pointer-events-none absolute inset-x-0 bottom-0 h-0.5 scale-x-0 bg-dourado-texto peer-focus:scale-x-100 motion-safe:transition-transform motion-safe:duration-(--dur-estado) motion-safe:ease-(--ease-saida)";
const ROTULO_CAMPO = "text-sm font-medium text-grafite";
const LINK = "border-b border-dourado text-grafite";
const BOTAO =
  "botao-pressionavel botao-elevado inline-flex min-h-12 items-center justify-center gap-3 rounded-moldura bg-grafite pr-8 pl-[1.875rem] text-sm font-medium tracking-wide text-branco hover:bg-grafite/90";

const ComFilete = ({ children }: { children: React.ReactNode }) => (
  <span className="relative mt-2 block">
    {children}
    <span aria-hidden="true" className={FILETE_FOCO} />
  </span>
);

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

// O validador (Zod) só é baixado quando a pessoa começa a preencher: ao
// enviar, ele já está pronto e o WhatsApp abre no mesmo clique.
const carregarValidador = () => import("@/lib/contato");

/** Abre o WhatsApp numa nova aba; se o navegador bloquear, abre nesta. */
const abrirWhatsApp = (link: string) => {
  const janela = window.open(link, "_blank");
  if (janela) janela.opener = null;
  else window.location.assign(link);
};

type Envio = { link: string; valores: ValoresContato };

/**
 * Formulário de contato. Em vez de enviar e-mail, monta uma mensagem
 * organizada com todos os dados e a abre no WhatsApp do escritório, onde a
 * pessoa confere e confirma o envio. Sem JavaScript, o formulário abre a
 * conversa com o escritório no WhatsApp.
 */
export const FormularioContato = () => {
  const [erros, setErros] = useState<ErrosContato>({});
  const [envio, setEnvio] = useState<Envio | null>(null);
  const [valores, setValores] = useState<ValoresContato | null>(null);

  const validarEAbrir = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const formulario = evento.currentTarget;

    const { lerFormulario, validarContato } = await carregarValidador();
    const { dados, erros: encontrados } = validarContato(
      lerFormulario(new FormData(formulario)),
    );

    if (!dados) {
      setErros(encontrados);
      const primeiro = Object.keys(encontrados)[0];
      formulario.querySelector<HTMLElement>(`[name="${primeiro}"]`)?.focus();
      return;
    }

    const preenchidos: ValoresContato = {
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone,
      area: dados.area,
      mensagem: dados.mensagem,
    };
    const link = linkDoFormulario(preenchidos);
    abrirWhatsApp(link);
    setErros({});
    setEnvio({ link, valores: preenchidos });
  };

  // Volta ao formulário com os dados já preenchidos.
  const editar = () => {
    if (envio) setValores(envio.valores);
    setEnvio(null);
  };

  const atributosDeErro = (campo: CampoContato) => ({
    "aria-invalid": Boolean(erros[campo]),
    "aria-describedby": erros[campo] ? `erro-${campo}` : undefined,
  });

  if (envio) {
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
        <p className="mt-4 max-w-md text-base leading-relaxed text-grafite/75">
          {contato.formulario.sucessoTexto}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={envio.link}
            target="_blank"
            rel="noopener noreferrer"
            className={BOTAO}
          >
            <IconeWhatsApp className="size-[1.125rem] shrink-0" />
            {contato.formulario.abrirDeNovo}
          </a>
          <button
            type="button"
            onClick={editar}
            className="link-dourado inline-flex min-h-11 items-center text-sm font-medium tracking-wide text-grafite"
          >
            {contato.formulario.editar}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      id="formulario"
      // Sem JavaScript: abre a conversa com o escritório no WhatsApp.
      action={`https://wa.me/${site.telefone.whatsapp}`}
      method="get"
      target="_blank"
      onSubmit={validarEAbrir}
      onFocusCapture={() => void carregarValidador()}
      noValidate
      aria-label="Formulário de contato"
      data-revelar-grupo
      // Ao voltar de "Editar a mensagem", o formulário é montado de novo
      // depois que a revelação ao rolar já aconteceu: nasce revelado, senão o
      // estado inicial do CSS o deixaria invisível.
      data-revelado={valores ? "" : undefined}
      className="rounded-moldura bg-branco p-6 shadow-(--sombra-cartao) sm:p-10"
    >
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
              className={SELECAO}
              {...atributosDeErro("area")}
            >
              <option value="">Selecione</option>
              {OPCOES_DE_AREA.map((opcao) => (
                <option key={opcao} value={opcao}>
                  {opcao}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute top-1/2 right-1 size-4 -translate-y-1/2 text-dourado-texto"
            >
              <path d="M4 6l4 4 4-4" />
            </svg>
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

      <div className="mt-7">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="consentimento"
            required
            defaultChecked={Boolean(valores)}
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

      <button type="submit" className={`${BOTAO} mt-9 w-full sm:w-auto`}>
        <IconeWhatsApp className="size-[1.125rem] shrink-0" />
        {contato.formulario.botao}
      </button>
    </form>
  );
};
