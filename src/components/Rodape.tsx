import Image from "next/image";
import { cacheLife } from "next/cache";
import Link from "next/link";

import { navegacao, site } from "@/config/site";
import { areas } from "@/content/areas";

const TITULO_COLUNA =
  "text-[0.8125rem] font-medium tracking-[0.2em] text-dourado uppercase";
// min-h-11: área de toque de 44 px (PRD, seção 9).
const LINK =
  "inline-flex min-h-11 min-w-11 items-center text-base text-off-white/80 hover:text-off-white";

const AnoCorrente = async () => {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
};

export const Rodape = () => (
  <footer className="bg-grafite text-off-white">
    {/* Duas colunas até 1280 px; a partir daí, quatro colunas com a largura
        do próprio conteúdo, para nenhum item quebrar linha. */}
    <div className="container-site grid gap-10 py-12 sm:grid-cols-2 lg:py-20 xl:grid-cols-[repeat(4,auto)] xl:justify-between xl:gap-x-12">
      <div className="sm:col-span-2 xl:col-span-1">
        <Image
          src="/logo/logo-completa.png"
          alt={site.marcaCurta}
          width={1436}
          height={777}
          sizes="260px"
          className="h-auto w-56 lg:w-64"
        />
        <p className="mt-6 text-base text-off-white/80">
          {site.nome} · {site.oab}
        </p>
        <p className="mt-2 text-base text-off-white/80">
          {site.abrangencia}
        </p>
      </div>

      <nav aria-label="Rodapé">
        <h2 className={TITULO_COLUNA}>Navegação</h2>
        <ul className="mt-4">
          {navegacao.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={LINK}>
                {item.rotulo}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-label="Áreas de atuação">
        <h2 className={TITULO_COLUNA}>Áreas de atuação</h2>
        <ul className="mt-4">
          {areas.map((area) => (
            <li key={area.slug}>
              <Link href={`/areas/${area.slug}`} className={LINK}>
                {area.nome}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <h2 className={TITULO_COLUNA}>Contato</h2>
        <ul className="mt-4">
          <li>
            <a href={`mailto:${site.email}`} className={`${LINK} break-all`}>
              {site.email}
            </a>
          </li>
          <li>
            <a href={`tel:${site.telefone.tel}`} className={LINK}>
              {site.telefone.exibicao}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-off-white/15">
      <div className="container-site flex flex-col gap-x-8 py-5 pr-20 text-sm text-off-white/70 sm:flex-row sm:items-center">
        <p>
          © <AnoCorrente /> {site.marcaCurta}
        </p>
        <Link
          href="/politica-de-privacidade"
          className="inline-flex min-h-11 items-center hover:text-off-white"
        >
          Política de Privacidade
        </Link>
      </div>
    </div>
  </footer>
);
