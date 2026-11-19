"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { hero } from "@/content/home";
import { linkWhatsApp } from "@/lib/whatsapp";

import { IconeWhatsApp } from "./Icones";

/**
 * Botão flutuante do WhatsApp. Na página inicial só aparece depois do hero,
 * para não competir com o botão de lá; em qualquer página some enquanto o
 * formulário de contato está no meio da tela, para não cobri-lo.
 */
export const WhatsAppFlutuante = () => {
  const caminho = usePathname();
  // A chave recomeça o estado a cada página: o hero só existe na inicial.
  return <BotaoFlutuante key={caminho} comHero={caminho === "/"} />;
};

const BotaoFlutuante = ({ comHero }: { comHero: boolean }) => {
  const [heroNaTela, setHeroNaTela] = useState(comHero);
  const [formularioNaTela, setFormularioNaTela] = useState(false);

  useEffect(() => {
    const observar = (
      seletor: string,
      margem: string,
      aoMudar: (visivel: boolean) => void,
    ) => {
      const alvo = document.querySelector(seletor);
      if (!alvo) return () => {};
      const observador = new IntersectionObserver(
        ([entrada]) => aoMudar(Boolean(entrada?.isIntersecting)),
        { rootMargin: margem },
      );
      observador.observe(alvo);
      return () => observador.disconnect();
    };

    // O hero "sai" quando o rodapé dele sobe acima de 40% da altura da tela.
    const pararHero = observar("#inicio", "0px 0px -60% 0px", setHeroNaTela);
    const pararFormulario = observar(
      "#formulario",
      "-20% 0px -20% 0px",
      setFormularioNaTela,
    );
    return () => {
      pararHero();
      pararFormulario();
    };
  }, []);

  const visivel = !heroNaTela && !formularioNaTela;

  return (
    <a
      href={linkWhatsApp()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={hero.botaoWhatsApp}
      inert={!visivel}
      className={`botao-pressionavel fixed right-4 bottom-4 z-30 inline-flex size-14 items-center justify-center rounded-full border border-dourado/60 bg-grafite text-champagne shadow-[0_10px_30px_-12px] shadow-grafite/50 hover:bg-grafite/90 motion-safe:transition-[opacity,translate,transform,background-color] motion-safe:duration-(--dur-estado) motion-safe:ease-(--ease-saida) lg:right-6 lg:bottom-6 ${
        visivel ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <IconeWhatsApp className="size-6" />
    </a>
  );
};
