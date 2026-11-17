import Image from "next/image";

/** Tela de carregamento: monograma revelado por máscara, abrindo em cortina.
    Só aparece quando o script inicial marca data-abertura="tocar". */
export const Abertura = () => (
  <div aria-hidden="true" className="abertura">
    {/* Arquivo pequeno e sem otimizador: precisa estar pronto no primeiro instante. */}
    <Image
      src="/logo/monograma-abertura.webp"
      alt=""
      width={256}
      height={256}
      unoptimized
      loading="eager"
      className="abertura-monograma size-28 lg:size-32"
    />
  </div>
);
