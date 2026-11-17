import { advogada } from "@/content/home";

/** Pronta, mas oculta: só aparece quando houver dados de formação no conteúdo. */
export const LinhaDoTempoFormacao = () => {
  if (advogada.formacao.length === 0) return null;

  return (
    <ol className="mt-12 border-l border-dourado/50">
      {advogada.formacao.map((etapa) => (
        <li key={`${etapa.ano}-${etapa.titulo}`} className="relative pb-8 pl-7">
          <span
            aria-hidden="true"
            className="absolute top-2 -left-[3px] size-[5px] rounded-full bg-dourado"
          />
          <p className="rotulo">{etapa.ano}</p>
          <p className="mt-2 font-serif text-xl">{etapa.titulo}</p>
          <p className="mt-1 text-[0.9375rem] text-grafite/75">
            {etapa.instituicao}
          </p>
        </li>
      ))}
    </ol>
  );
};
