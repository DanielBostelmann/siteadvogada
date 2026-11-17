import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

import { Cabecalho } from "@/components/Cabecalho";
import { MovimentoGlobal } from "@/components/movimento/MovimentoGlobal";
import { ScriptMovimento } from "@/components/movimento/ScriptMovimento";
import { Rodape } from "@/components/Rodape";
import { WhatsAppFlutuante } from "@/components/WhatsAppFlutuante";
import { site } from "@/config/site";
import { metadadosDaPagina } from "@/lib/seo";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  // Fonte variável: um só arquivo cobre os pesos 400, 500 e 600.
  weight: "variable",
  style: "normal",
  display: "swap",
});

// O itálico só aparece nas palavras de destaque do título da página inicial;
// sem pré-carregamento, as outras páginas não precisam baixá-lo.
const cormorantItalico = Cormorant_Garamond({
  variable: "--font-cormorant-italico",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
  preload: false,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const TITULO =
  "Dra. Maria de Moraes Advocacia | Direito Tributário — atendimento em todo o Brasil";
const DESCRICAO =
  "Advocacia consultiva, administrativa e judicial, com especialização em Direito Tributário. Atendimento em todo o Brasil.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...metadadosDaPagina({ titulo: TITULO, descricao: DESCRICAO, caminho: "/" }),
  applicationName: site.marcaCurta,
  authors: [{ name: site.nome }],
  formatDetection: { telephone: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${cormorant.variable} ${cormorantItalico.variable} ${inter.variable} antialiased`}
    >
      <body className="flex min-h-svh flex-col">
        <ScriptMovimento />
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
        <MovimentoGlobal />
      </body>
    </html>
  );
}
