import { ABERTURA } from "@/lib/movimento";

// Roda antes da primeira pintura. Aplica a paleta salva no seletor de prévia
// (temporário), liga o movimento só para quem não pediu
// movimento reduzido e decide se a abertura toca (uma vez por sessão, só na
// página inicial). Se o JavaScript do site não carregar em 4 s, desfaz tudo
// para o conteúdo nunca ficar escondido.
const SCRIPT = `(function(){try{var d=document.documentElement;
try{var p=localStorage.getItem('paleta');if(p)d.dataset.paleta=p;}catch(e){}
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
d.dataset.movimento='on';
if(location.pathname==='/'&&!sessionStorage.getItem('${ABERTURA.chaveDaSessao}')){
d.dataset.abertura='tocar';sessionStorage.setItem('${ABERTURA.chaveDaSessao}','1');}
setTimeout(function(){if(!window.__movimentoPronto){delete d.dataset.movimento;delete d.dataset.abertura;}},4000);
}catch(e){}})();`;

export const ScriptMovimento = () => (
  <script
    type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
    suppressHydrationWarning
    dangerouslySetInnerHTML={{ __html: SCRIPT }}
  />
);
