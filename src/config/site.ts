// Dados da cliente. Único lugar do projeto com contatos e valores provisórios
// (PRD, seção 2). Tudo marcado com CONFIRMAR é pendência aberta.

const TITULO_ESPECIALISTA = "Advogada | Especialista em Direito Tributário";
// Alternativa pronta caso a formação de especialista não seja confirmada.
const TITULO_ALTERNATIVO = "Atuação com ênfase em Direito Tributário";

// CONFIRMAR: a formação que sustenta o título de especialista.
const TITULO_CONFIRMADO = true;

// CONFIRMAR: o número informado, (69) 9259-3775, tem 8 dígitos após o DDD.
// Celulares têm 9; o dígito 9 foi acrescentado como provisório.
const WHATSAPP_NUMERO = "5569992593775";
const TELEFONE_EXIBICAO = "(69) 99259-3775";

export const site = {
  nome: "Maria de Moraes",
  marca: "Dra. Maria de Moraes — Advocacia",
  marcaCurta: "Dra. Maria de Moraes Advocacia",
  rotulo: "Dra. Maria de Moraes · Advocacia",
  titulo: TITULO_CONFIRMADO ? TITULO_ESPECIALISTA : TITULO_ALTERNATIVO,
  // CONFIRMAR: só foi informado "OAB 16013"; a seccional RO é provisória.
  oab: "OAB/RO 16.013",
  // Poderá ser trocado por contato@mariademoraes.adv.br após o registro do domínio.
  email: "advogadamariademoraes@gmail.com",
  telefone: {
    exibicao: TELEFONE_EXIBICAO,
    tel: `+${WHATSAPP_NUMERO}`,
    whatsapp: WHATSAPP_NUMERO,
  },
  abrangencia: "Atendimento em todo o Brasil",
  dominio: "mariademoraes.adv.br",
  url: "https://mariademoraes.adv.br",
  whatsappMensagem:
    "Olá, Dra. Maria de Moraes. Gostaria de agendar um atendimento.",
} as const;

export const navegacao = [
  { rotulo: "Início", href: "/#inicio" },
  { rotulo: "O escritório", href: "/#escritorio" },
  { rotulo: "Áreas de atuação", href: "/#areas" },
  { rotulo: "Conheça a advogada", href: "/#advogada" },
  { rotulo: "Contato", href: "/#contato" },
] as const;
