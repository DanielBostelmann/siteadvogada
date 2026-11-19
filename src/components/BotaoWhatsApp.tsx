import { linkWhatsApp } from "@/lib/whatsapp";

import { IconeWhatsApp } from "./Icones";

type Variante = "preenchido" | "contorno";

type BotaoWhatsAppProps = {
  children: React.ReactNode;
  variante?: Variante;
  area?: string;
  className?: string;
};

const ESTILOS: Record<Variante, string> = {
  preenchido: "botao-elevado bg-grafite text-branco hover:bg-grafite/90",
  contorno: "botao-varredura border border-dourado text-grafite",
};

export const BotaoWhatsApp = ({
  children,
  variante = "preenchido",
  area,
  className = "",
}: BotaoWhatsAppProps) => (
  <a
    href={linkWhatsApp(area)}
    target="_blank"
    rel="noopener noreferrer"
    // pl 22 px / pr 24 px: o lado do ícone fica 2 px mais estreito, para o
    // botão parecer centrado (alinhamento óptico).
    className={`botao-pressionavel inline-flex min-h-12 items-center justify-center gap-3 rounded-moldura pr-6 pl-[1.375rem] text-sm font-medium tracking-wide ${ESTILOS[variante]} ${className}`}
  >
    <IconeWhatsApp className="size-[1.125rem] shrink-0" />
    {children}
  </a>
);
