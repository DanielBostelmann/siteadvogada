import { identificacao } from "@/content/home";

const FILETE = "absolute inset-x-0 h-px origin-left bg-dourado/40";

export const FaixaIdentificacao = () => (
  <section aria-label="O escritório em resumo" className="relative bg-off-white">
    {/* Filetes dourados que se desenham da esquerda ao entrar na tela. */}
    <span aria-hidden="true" data-filete className={`${FILETE} top-0`} />
    <span aria-hidden="true" data-filete className={`${FILETE} bottom-0`} />

    <ul
      data-revelar-grupo
      className="container-site grid divide-y divide-dourado/40 lg:grid-cols-3 lg:divide-x lg:divide-y-0"
    >
      {identificacao.map((item) => (
        <li
          key={item.destaque}
          className="py-9 lg:px-8 lg:py-14 lg:first:pl-0 lg:last:pr-0 xl:px-10"
        >
          <p className="font-serif text-[clamp(1.75rem,2.6vw,2.75rem)] leading-none font-medium whitespace-nowrap text-grafite">
            {item.destaque}
          </p>
          <p className="rotulo mt-4">{item.texto}</p>
        </li>
      ))}
    </ul>
  </section>
);
