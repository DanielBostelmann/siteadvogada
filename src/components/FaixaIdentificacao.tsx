import { identificacao } from "@/content/home";

const FILETE = "absolute inset-x-0 h-px origin-left bg-dourado/40";

export const FaixaIdentificacao = () => (
  <section aria-label="O escritório em resumo" className="relative bg-off-white">
    {/* Filetes dourados que se desenham da esquerda ao entrar na tela. */}
    <span aria-hidden="true" data-filete className={`${FILETE} top-0`} />
    <span aria-hidden="true" data-filete className={`${FILETE} bottom-0`} />

    <ul
      data-revelar-grupo
      className="container-site grid divide-y divide-dourado/40 xl:grid-cols-3 xl:divide-y-0"
    >
      {identificacao.map((item, indice) => (
        <li
          key={item.destaque}
          className="relative py-6 xl:px-8 xl:py-10 xl:first:pl-0 xl:last:pr-0"
        >
          {/* Divisórias verticais (computador): desenham-se de cima para
              baixo logo depois dos filetes horizontais. */}
          {indice > 0 ? (
            <span
              aria-hidden="true"
              data-filete-vertical={indice - 1}
              className="absolute inset-y-0 left-0 hidden w-px origin-top bg-dourado/40 xl:block"
            />
          ) : null}
          <p className="font-serif text-destaque leading-none font-medium whitespace-nowrap text-grafite">
            {item.destaque}
          </p>
          <p className="rotulo mt-4">{item.texto}</p>
        </li>
      ))}
    </ul>
  </section>
);
