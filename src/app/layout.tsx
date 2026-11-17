import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { WhatsAppFlutuante } from "@/components/WhatsAppFlutuante";
import { site } from "@/config/site";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title:
    "Dra. Maria de Moraes Advocacia | Direito Tributário — atendimento em todo o Brasil",
  description:
    "Advocacia consultiva, administrativa e judicial, com especialização em Direito Tributário. Atendimento em todo o Brasil.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${inter.variable} antialiased`}
    >
      <body className="flex min-h-svh flex-col">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-grafite focus:px-4 focus:py-3 focus:text-branco"
        >
          Ir para o conteúdo
        </a>
        <Cabecalho />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Rodape />
        <WhatsAppFlutuante />
      </body>
    </html>
  );
}
