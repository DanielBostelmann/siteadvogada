import Link from "next/link";

export default function PaginaNaoEncontrada() {
  return (
    <section className="bg-branco pt-32 pb-(--espaco-secao) lg:pt-44">
      <div className="container-site">
        <p className="rotulo">Erro 404</p>
        <h1 className="mt-6 max-w-2xl font-serif text-display leading-none font-medium">
          Página não encontrada
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-grafite/75">
          O endereço acessado não existe ou foi alterado.
        </p>
        <Link
          href="/"
          className="link-dourado mt-10 inline-flex min-h-11 items-center text-sm font-medium tracking-wide"
        >
          Voltar à página inicial
        </Link>
      </div>
    </section>
  );
}
