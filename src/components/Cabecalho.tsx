"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

import { navegacao, site } from "@/config/site";
import { hero } from "@/content/home";

import { BotaoWhatsApp } from "./BotaoWhatsApp";

const LIMITE_ROLAGEM = 80;
/** No celular, o cabeçalho só se recolhe depois de passar desta altura. */
const LIMITE_RECOLHER = 160;
/** Variações menores que isso (rolagem trêmula) não mudam o cabeçalho. */
const TOLERANCIA_ROLAGEM = 6;
const CONSULTA_CELULAR = "(max-width: 1023px)";

const assinarRolagem = (aoMudar: () => void) => {
  window.addEventListener("scroll", aoMudar, { passive: true });
  return () => window.removeEventListener("scroll", aoMudar);
};
const passouDoLimite = () => window.scrollY > LIMITE_ROLAGEM;
const noServidor = () => false;

export const Cabecalho = () => {
  const rolou = useSyncExternalStore(assinarRolagem, passouDoLimite, noServidor);
  const [menuAberto, setMenuAberto] = useState(false);
  const [escondido, setEscondido] = useState(false);
  const caminho = usePathname();

  // Celular: o cabeçalho sobe ao rolar para baixo e volta ao rolar para cima.
  useEffect(() => {
    const celular = window.matchMedia(CONSULTA_CELULAR);
    let ultima = window.scrollY;
    const aoRolar = () => {
      const atual = window.scrollY;
      if (Math.abs(atual - ultima) < TOLERANCIA_ROLAGEM) return;
      const descendo = atual > ultima;
      ultima = atual;
      setEscondido(celular.matches && descendo && atual > LIMITE_RECOLHER);
    };
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    if (!menuAberto) return;
    const fecharComEsc = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") setMenuAberto(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", fecharComEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", fecharComEsc);
    };
  }, [menuAberto]);

  const fecharMenu = () => setMenuAberto(false);
  const solido = rolou || menuAberto;
  const recolhido = escondido && !menuAberto;
  const ultimoItem = navegacao.length - 1;

  return (
    <header
      // Fica parado durante a troca de páginas (ver globals.css).
      style={{ viewTransitionName: "cabecalho" }}
      // Com foco do teclado dentro dele, o cabeçalho nunca fica recolhido.
      onFocusCapture={() => setEscondido(false)}
      className={`fixed inset-x-0 top-0 z-40 motion-safe:transition-transform motion-safe:duration-(--dur-estado) motion-safe:ease-(--ease-saida) ${
        recolhido ? "-translate-y-full" : ""
      }`}
    >
      {/* Fundo em camada própria: a troca é uma transição de opacidade. O
          vidro (fundo translúcido com desfoque) deixa o conteúdo sugerido. */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 border-b border-grafite/10 bg-branco/85 backdrop-blur-md motion-safe:transition-opacity motion-safe:duration-500 ${
          solido ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Progresso de leitura nas páginas internas: filete dourado que
          acompanha a rolagem (só com suporte do navegador). */}
      {caminho !== "/" ? (
        <span
          aria-hidden="true"
          className="progresso-leitura absolute inset-x-0 bottom-0 h-px bg-dourado"
        />
      ) : null}
      <div className="container-site relative flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link
          href="/#inicio"
          aria-label={`${site.marcaCurta} — início`}
          className="relative z-50 flex min-h-11 shrink-0 items-center"
          onClick={fecharMenu}
        >
          <Image
            src="/logo/logo-horizontal.png"
            alt={site.marcaCurta}
            width={1481}
            height={264}
            loading="eager"
            sizes="250px"
            className="h-8 w-auto lg:h-11"
          />
        </Link>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-9">
            {navegacao.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-dourado link-dourado-oculto py-2 text-sm text-grafite"
                >
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <BotaoWhatsApp variante="contorno">{hero.botaoWhatsApp}</BotaoWhatsApp>
          </div>
          <button
            type="button"
            aria-expanded={menuAberto}
            aria-controls="menu-principal"
            onClick={() => setMenuAberto((aberto) => !aberto)}
            className="relative z-50 inline-flex size-11 items-center justify-center xl:hidden"
          >
            <span className="sr-only">
              {menuAberto ? "Fechar menu" : "Abrir menu"}
            </span>
            <span aria-hidden="true" className="flex w-6 flex-col gap-[7px]">
              <span
                className={`h-px w-full bg-grafite motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-(--ease-saida) ${menuAberto ? "translate-y-1 rotate-45" : ""}`}
              />
              <span
                className={`h-px w-full bg-grafite motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-(--ease-saida) ${menuAberto ? "-translate-y-1 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Menu do celular: o painel desce do topo e os links entram em
          sequência; ao fechar, saem na ordem inversa. Fechado, fica inerte
          (fora do teclado e dos leitores de tela). */}
      <div
        id="menu-principal"
        inert={!menuAberto}
        data-aberto={menuAberto}
        className={`group/menu fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-off-white motion-safe:transition-[opacity,translate,visibility] motion-safe:duration-(--dur-estado) motion-safe:ease-(--ease-saida) xl:hidden ${
          menuAberto ? "visible opacity-100" : "invisible -translate-y-4 opacity-0"
        }`}
      >
        <nav
          aria-label="Menu"
          className="container-site flex min-h-full flex-col justify-between gap-12 pt-28 pb-10"
        >
          <ul className="flex flex-col">
            {navegacao.map((item, indice) => (
              <li
                key={item.href}
                style={
                  {
                    "--ordem": indice,
                    "--ordem-inversa": ultimoItem - indice,
                  } as React.CSSProperties
                }
                className="translate-y-3 border-b border-grafite/10 opacity-0 [transition-delay:calc(var(--ordem-inversa)*25ms)] group-data-[aberto=true]/menu:translate-y-0 group-data-[aberto=true]/menu:opacity-100 group-data-[aberto=true]/menu:[transition-delay:calc(80ms+var(--ordem)*40ms)] motion-safe:transition-[opacity,translate] motion-safe:duration-(--dur-estado) motion-safe:ease-(--ease-saida)"
              >
                <Link
                  href={item.href}
                  onClick={fecharMenu}
                  className="block py-5 font-serif text-3xl text-grafite"
                >
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-5 opacity-0 group-data-[aberto=true]/menu:opacity-100 group-data-[aberto=true]/menu:delay-300 motion-safe:transition-opacity motion-safe:duration-(--dur-estado)">
            <BotaoWhatsApp>{hero.botaoWhatsApp}</BotaoWhatsApp>
            <p className="rotulo">
              {site.nome} · {site.oab}
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
};
