type MolduraProps = {
  className?: string;
  /** "cena": desenhada pela cena que a contém; "rolagem": ao entrar na tela. */
  cena?: "cena" | "rolagem";
};

const TRACO = "absolute bg-dourado";

/** Moldura fina dourada, deslocada atrás das fotos. Quatro filetes de 1 px. */
export const Moldura = ({ className = "", cena = "rolagem" }: MolduraProps) => (
  <span
    aria-hidden="true"
    data-moldura={cena}
    className={`absolute inset-0 ${className}`}
  >
    <span data-traco="topo" className={`${TRACO} inset-x-0 top-0 h-px origin-left`} />
    <span data-traco="direita" className={`${TRACO} inset-y-0 right-0 w-px origin-top`} />
    <span data-traco="base" className={`${TRACO} inset-x-0 bottom-0 h-px origin-right`} />
    <span data-traco="esquerda" className={`${TRACO} inset-y-0 left-0 w-px origin-bottom`} />
  </span>
);
