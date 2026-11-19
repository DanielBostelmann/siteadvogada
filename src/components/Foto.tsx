import Image, { type StaticImageData } from "next/image";

type FotoProps = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  /** Só a foto do hero é pré-carregada (PRD, seção 4). */
  preload?: boolean;
  /** Aproximação lenta na entrada (hero). */
  aproximar?: boolean;
  /** Revelação por máscara: o elemento pai precisa de data-revelar-mascara. */
  mascara?: boolean;
  className?: string;
  imagemClassName?: string;
};

/** Fotografia com cantos mínimos e grão de filme, recortada por object-position. */
export const Foto = ({
  src,
  alt,
  sizes,
  preload = false,
  aproximar = false,
  mascara = false,
  className = "",
  imagemClassName = "object-cover",
}: FotoProps) => {
  const imagem = (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      fetchPriority={preload ? "high" : undefined}
      data-entrada={aproximar ? "zoom" : undefined}
      placeholder="blur"
      className={imagemClassName}
    />
  );

  return (
    <div
      className={`grao relative overflow-hidden rounded-moldura bg-champagne ${className}`}
    >
      {mascara ? (
        <span data-mascara="janela" className="absolute inset-0 block overflow-hidden">
          {imagem}
        </span>
      ) : (
        imagem
      )}
    </div>
  );
};
