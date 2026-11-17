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
  preenchido: "bg-grafite text-branco hover:bg-grafite/90",
  contorno: "border border-dourado text-grafite hover:bg-champagne/40",
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
    className={`inline-flex min-h-12 items-center justify-center gap-3 rounded-moldura px-6 text-sm font-medium tracking-wide ${ESTILOS[variante]} ${className}`}
  >
    <IconeWhatsApp className="size-[1.125rem] shrink-0" />
    {children}
  </a>
);
