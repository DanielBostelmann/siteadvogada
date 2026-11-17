import Image from "next/image";
import Link from "next/link";

import { navegacao, site } from "@/config/site";
import { areas } from "@/content/areas";

const TITULO_COLUNA =
  "text-[0.8125rem] font-medium tracking-[0.2em] text-dourado uppercase";
const LINK = "text-[0.9375rem] text-off-white/80 hover:text-off-white";

const AnoCorrente = async () => {
  "use cache";
  return <>{new Date().getFullYear()}</>;
};

export const Rodape = () => (
  <footer className="bg-grafite text-off-white">
    <div className="container-site grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-24">
      <div className="sm:col-span-2 lg:col-span-3">
        <Image
          src="/logo/logo-completa.png"
          alt={site.marcaCurta}
          width={1436}
          height={777}
          sizes="260px"
          className="h-auto w-56 lg:w-64"
        />
        <p className="mt-8 text-[0.9375rem] text-off-white/80">
          {site.nome} · {site.oab}
        </p>
        <p className="mt-2 text-[0.9375rem] text-off-white/80">
          {site.abrangencia}
        </p>
      </div>

      <nav aria-label="Rodapé" className="lg:col-span-2 lg:col-start-5">
        <h2 className={TITULO_COLUNA}>Navegação</h2>
        <ul className="mt-6 space-y-3">
          {navegacao.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={LINK}>
                {item.rotulo}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-label="Áreas de atuação" className="lg:col-span-3">
        <h2 className={TITULO_COLUNA}>Áreas de atuação</h2>
        <ul className="mt-6 space-y-3">
          {areas.map((area) => (
            <li key={area.slug}>
              <Link href={`/areas/${area.slug}`} className={LINK}>
                {area.nome}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="lg:col-span-3">
        <h2 className={TITULO_COLUNA}>Contato</h2>
        <ul className="mt-6 space-y-3">
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
      <div className="container-site flex flex-col gap-3 py-7 pr-20 text-sm text-off-white/70 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © <AnoCorrente /> {site.marcaCurta}
        </p>
        <Link
          href="/politica-de-privacidade"
          className="hover:text-off-white"
        >
          Política de Privacidade
        </Link>
      </div>
    </div>
  </footer>
);
