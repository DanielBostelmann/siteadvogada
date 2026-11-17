import { identificacao } from "@/content/home";

export const FaixaIdentificacao = () => (
  <section
    aria-label="O escritório em resumo"
    className="border-y border-dourado/40 bg-off-white"
  >
    <ul className="container-site grid divide-y divide-dourado/40 md:grid-cols-3 md:divide-x md:divide-y-0">
      {identificacao.map((item) => (
        <li
          key={item.destaque}
          className="py-9 md:px-10 md:py-14 md:first:pl-0 md:last:pr-0"
        >
          <p className="font-serif text-[clamp(2rem,3vw,2.75rem)] leading-none font-medium text-grafite">
            {item.destaque}
          </p>
          <p className="rotulo mt-4">{item.texto}</p>
        </li>
      ))}
    </ul>
  </section>
);
