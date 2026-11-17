import gsap from "gsap";

/**
 * ScrollTrigger, SplitText e Lenis só são usados no computador (fixação,
 * paralaxe, texto linha a linha e rolagem suave). Carregados sob demanda,
 * não pesam no celular, onde nunca são baixados.
 */
const carregar = async () => {
  const [{ ScrollTrigger }, { SplitText }, { default: Lenis }] =
    await Promise.all([
      import("gsap/ScrollTrigger"),
      import("gsap/SplitText"),
      import("lenis"),
    ]);
  gsap.registerPlugin(ScrollTrigger, SplitText);
  return { ScrollTrigger, SplitText, Lenis };
};

export type ExtrasDeMovimento = Awaited<ReturnType<typeof carregar>>;

let extras: Promise<ExtrasDeMovimento> | undefined;

export const carregarExtrasDeMovimento = () => (extras ??= carregar());

/**
 * Dentro de um gsap.matchMedia: carrega os extras e roda `montar` quando
 * chegarem, a menos que a consulta já tenha sido desfeita. Devolve a limpeza.
 */
export const comExtras = (montar: (extras: ExtrasDeMovimento) => void) => {
  let ativo = true;
  void carregarExtrasDeMovimento().then((carregados) => {
    if (ativo) montar(carregados);
  });
  return () => {
    ativo = false;
  };
};
