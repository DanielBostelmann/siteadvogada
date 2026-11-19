import Image from "next/image";

import { site } from "@/config/site";
import { fotos } from "@/content/fotos";
import { interludio } from "@/content/home";

import { InterludioCena } from "./movimento/InterludioCena";

/** A única seção de fundo grafite da página inicial, além do rodapé. */
export const Interludio = () => (
  <section aria-label="Compromisso do escritório" className="bg-grafite">
    <InterludioCena className="relative isolate flex min-h-[42rem] items-start overflow-hidden lg:min-h-svh lg:items-center">
      {/* Foto da Dra. com véu grafite só na metade junto ao texto: no celular,
          ela ocupa a parte de baixo da seção e o véu funde o topo; no
          computador, ocupa a metade direita e o véu cobre a metade esquerda. */}
      {/* No computador, a foto corre devagar por trás dos véus na rolagem. */}
      <div
        data-paralaxe-imagem
        className="absolute inset-x-0 bottom-0 -z-10 h-[58%] overflow-hidden lg:inset-y-0 lg:right-0 lg:left-auto lg:h-auto lg:w-1/2"
      >
        <Image
          src={fotos.interludio.src}
          alt={fotos.interludio.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-[60%_18%] opacity-85 lg:object-[50%_25%]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-grafite to-transparent to-40% lg:hidden" />
        <div className="absolute inset-0 hidden bg-linear-to-r from-grafite to-transparent to-55% lg:block" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-grafite/70 to-transparent" />
      </div>

      <div className="container-site grid pt-(--espaco-secao) pb-28 lg:grid-cols-12 lg:gap-8 lg:py-28">
        <div className="text-center lg:col-span-6 lg:text-left">
          <div
            data-interludio="logo"
            data-oculto
            className="relative mx-auto w-[min(70vw,25rem)] lg:mx-0"
          >
            <Image
              src="/logo/logo-completa.png"
              alt={site.marcaCurta}
              width={1436}
              height={777}
              sizes="(min-width: 768px) 400px, 70vw"
              className="h-auto w-full"
            />
            {/* Brilho metálico: percorre a logomarca uma única vez. */}
            <span
              aria-hidden="true"
              className="mascara-logo absolute inset-0 overflow-hidden"
            >
              <span
                data-interludio="brilho"
                className="absolute inset-y-0 left-0 w-1/4 -skew-x-12 bg-linear-to-r from-transparent via-branco/80 to-transparent opacity-0"
              />
            </span>
          </div>
          <p
            data-interludio="frase"
            data-oculto
            className="mt-16 font-serif text-destaque leading-[1.22] text-balance text-off-white"
          >
            {interludio.frase}
          </p>
        </div>
      </div>

      {/* Véu claro: some com a rolagem, fazendo a passagem do branco ao grafite. */}
      <div
        aria-hidden="true"
        data-interludio="veu-claro"
        className="pointer-events-none absolute inset-0 bg-branco opacity-0"
      />
    </InterludioCena>
  </section>
);
