import Image, { type StaticImageData } from "next/image";

type FotoProps = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  /** Só a foto do hero é pré-carregada (PRD, seção 4). */
  preload?: boolean;
  /** Aproximação lenta na entrada (hero). */
  aproximar?: boolean;
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
  className = "",
  imagemClassName = "object-cover",
}: FotoProps) => (
  <div
    className={`grao relative overflow-hidden rounded-moldura bg-champagne ${className}`}
  >
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
  </div>
);
