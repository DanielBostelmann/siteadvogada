"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";

import { navegacao, site } from "@/config/site";
import { hero } from "@/content/home";

import { BotaoWhatsApp } from "./BotaoWhatsApp";

const LIMITE_ROLAGEM = 80;

const assinarRolagem = (aoMudar: () => void) => {
  window.addEventListener("scroll", aoMudar, { passive: true });
  return () => window.removeEventListener("scroll", aoMudar);
};
const passouDoLimite = () => window.scrollY > LIMITE_ROLAGEM;
const noServidor = () => false;

export const Cabecalho = () => {
  const rolou = useSyncExternalStore(assinarRolagem, passouDoLimite, noServidor);
  const [menuAberto, setMenuAberto] = useState(false);

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

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      {/* Fundo em camada própria: a troca é uma transição de opacidade. */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 border-b border-grafite/10 bg-branco motion-safe:transition-opacity motion-safe:duration-500 ${
          solido ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="container-site relative flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link
          href="/#inicio"
          aria-label={`${site.marcaCurta} — início`}
          className="relative z-50 shrink-0"
          onClick={fecharMenu}
        >
          <Image
            src="/logo/logo-horizontal.png"
            alt={site.marcaCurta}
            width={1481}
            height={264}
            preload
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
                className={`h-px w-full bg-grafite ${menuAberto ? "translate-y-1 rotate-45" : ""}`}
              />
              <span
                className={`h-px w-full bg-grafite ${menuAberto ? "-translate-y-1 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="menu-principal"
        hidden={!menuAberto}
        className="fixed inset-0 z-40 overflow-y-auto bg-off-white xl:hidden"
      >
        <nav
          aria-label="Menu"
          className="container-site flex min-h-full flex-col justify-between gap-12 pt-28 pb-10"
        >
          <ul className="flex flex-col">
            {navegacao.map((item) => (
              <li key={item.href} className="border-b border-grafite/10">
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
          <div className="flex flex-col gap-5">
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
