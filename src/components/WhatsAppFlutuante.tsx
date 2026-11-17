import { hero } from "@/content/home";
import { linkWhatsApp } from "@/lib/whatsapp";

import { IconeWhatsApp } from "./Icones";

export const WhatsAppFlutuante = () => (
  <a
    href={linkWhatsApp()}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={hero.botaoWhatsApp}
    className="botao-pressionavel fixed right-4 bottom-4 z-30 inline-flex size-14 items-center justify-center rounded-full border border-dourado/60 bg-grafite text-champagne shadow-[0_10px_30px_-12px] shadow-grafite/50 hover:bg-grafite/90 lg:right-6 lg:bottom-6"
  >
    <IconeWhatsApp className="size-6" />
  </a>
);
