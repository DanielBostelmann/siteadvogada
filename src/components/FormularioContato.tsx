import Link from "next/link";

import { areas } from "@/content/areas";
import { contato } from "@/content/home";

const LIMITE_MENSAGEM = 2000;

const CAMPO =
  "mt-2 block w-full border-0 border-b border-grafite/30 bg-transparent px-0 py-3 text-base text-grafite placeholder:text-grafite/40 focus:border-dourado-texto focus:outline-none";
const ROTULO_CAMPO = "text-sm font-medium text-grafite";

export const FormularioContato = () => (
  <form
    id="formulario"
    aria-label="Formulário de contato"
    className="rounded-moldura border border-grafite/10 bg-branco p-6 shadow-[0_24px_60px_-40px] shadow-grafite/25 sm:p-10"
  >
    <div className="grid gap-7 sm:grid-cols-2">
      <label className="block sm:col-span-2">
        <span className={ROTULO_CAMPO}>Nome *</span>
        <input
          type="text"
          name="nome"
          required
          autoComplete="name"
          className={CAMPO}
        />
      </label>
      <label className="block">
        <span className={ROTULO_CAMPO}>E-mail *</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className={CAMPO}
        />
      </label>
      <label className="block">
        <span className={ROTULO_CAMPO}>Telefone / WhatsApp</span>
        <input
          type="tel"
          name="telefone"
          autoComplete="tel"
          className={CAMPO}
        />
      </label>
      <label className="block sm:col-span-2">
        <span className={ROTULO_CAMPO}>Área de interesse</span>
        <select name="area" defaultValue="" className={CAMPO}>
          <option value="" disabled>
            Selecione
          </option>
          {areas.map((area) => (
            <option key={area.slug} value={area.nome}>
              {area.nome}
            </option>
          ))}
          <option value={contato.formulario.areaOutro}>
            {contato.formulario.areaOutro}
          </option>
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className={ROTULO_CAMPO}>Mensagem *</span>
        <textarea
          name="mensagem"
          required
          rows={5}
          maxLength={LIMITE_MENSAGEM}
          aria-describedby="aviso-formulario"
          className={`${CAMPO} resize-y`}
        />
      </label>
    </div>

    <p
      id="aviso-formulario"
      className="mt-4 text-sm leading-relaxed text-grafite/70"
    >
      {contato.formulario.aviso}
    </p>

    <label className="mt-7 flex items-start gap-3">
      <input
        type="checkbox"
        name="consentimento"
        required
        className="mt-1 size-5 shrink-0 accent-dourado-texto"
      />
      <span className="text-sm leading-relaxed text-grafite/80">
        Li e concordo com a{" "}
        <Link
          href="/politica-de-privacidade"
          className="border-b border-dourado text-grafite"
        >
          Política de Privacidade
        </Link>{" "}
        e autorizo o uso dos meus dados para retorno deste contato.
      </span>
    </label>

    <button
      type="submit"
      className="mt-9 inline-flex min-h-12 w-full items-center justify-center rounded-moldura bg-grafite px-8 text-sm font-medium tracking-wide text-branco hover:bg-grafite/90 sm:w-auto"
    >
      Enviar mensagem
    </button>
  </form>
);
