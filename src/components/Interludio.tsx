import Image from "next/image";

import { site } from "@/config/site";
import { fotos } from "@/content/fotos";
import { interludio } from "@/content/home";

/** A única seção de fundo grafite da página inicial, além do rodapé. */
export const Interludio = () => (
  <section
    aria-label="Compromisso do escritório"
    className="relative isolate flex min-h-svh items-center overflow-hidden bg-grafite"
  >
    {/* Foto sob véu grafite: textura no celular, retrato em penumbra no computador. */}
    <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[46%]">
      <Image
        src={fotos.interludio.src}
        alt={fotos.interludio.alt}
        fill
        sizes="(min-width: 1024px) 46vw, 100vw"
        className="object-cover object-top opacity-20 lg:opacity-55"
      />
      <div className="absolute inset-0 bg-linear-to-b from-grafite/10 via-grafite/90 via-45% to-grafite" />
      <div className="absolute inset-0 hidden bg-linear-to-r from-grafite via-grafite/50 to-transparent lg:block" />
    </div>

    <div className="container-site grid py-28 lg:grid-cols-12 lg:gap-8">
      <div className="text-center lg:col-span-8 lg:text-left">
        <Image
          src="/logo/logo-completa.png"
          alt={site.marcaCurta}
          width={1436}
          height={777}
          sizes="(min-width: 768px) 400px, 70vw"
          className="mx-auto h-auto w-[min(70vw,25rem)] lg:mx-0"
        />
        <p className="mt-16 font-serif text-[clamp(1.625rem,3.2vw,3rem)] leading-[1.22] text-balance text-off-white">
          {interludio.frase}
        </p>
      </div>
    </div>
  </section>
);
