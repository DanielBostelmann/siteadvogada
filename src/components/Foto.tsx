import Image, { type StaticImageData } from "next/image";

type FotoProps = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  /** Só a foto do hero é pré-carregada (PRD, seção 4). */
  preload?: boolean;
  className?: string;
  imagemClassName?: string;
};

/** Fotografia com cantos mínimos e grão de filme, recortada por object-position. */
export const Foto = ({
  src,
  alt,
  sizes,
  preload = false,
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
      placeholder="blur"
      className={imagemClassName}
    />
  </div>
);
