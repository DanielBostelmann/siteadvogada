// Textos definitivos da página inicial (PRD, seção 5). Não reescrever.

export const hero = {
  rotulo: "Dra. Maria de Moraes · Advocacia",
  // O trecho em itálico é só destaque tipográfico; a redação é a do PRD.
  titulo: [
    { texto: "Advocacia com " },
    { texto: "rigor técnico", destaque: true },
    { texto: " e análise individual de cada caso." },
  ],
  subtitulo:
    "Atuação consultiva, administrativa e judicial, com especialização em Direito Tributário. Atendimento em todo o Brasil.",
  botaoWhatsApp: "Falar pelo WhatsApp",
  botaoAreas: "Conhecer as áreas de atuação",
} as const;

export const escritorio = {
  titulo: "O escritório",
  paragrafos: [
    "A Dra. Maria de Moraes Advocacia atua nas áreas de Direito Tributário, Licitações e Contratos Administrativos, Direito Civil, Direito Previdenciário, Direito Criminal e Direito Ambiental.",
    "Com especialização em Direito Tributário, desenvolvemos uma atuação voltada à análise jurídica estratégica, à prevenção de conflitos e à defesa dos direitos e interesses de nossos clientes.",
  ],
  destaque: "Atendimento em todo o Brasil.",
} as const;

// Sem contagem de casos, clientes ou êxitos (PRD, seções 5.4 e 10).
export const identificacao = [
  { destaque: "6", texto: "áreas de atuação" },
  { destaque: "Direito Tributário", texto: "como área de especialização" },
  { destaque: "Todo o Brasil", texto: "em atendimento" },
] as const;

export const secaoAreas = {
  titulo: "Nossas áreas de atuação",
  apoio: "Conheça os serviços jurídicos de cada especialidade.",
  verServicos: "Ver serviços",
} as const;

export const interludio = {
  frase:
    "Ética, responsabilidade técnica, atualização jurídica e análise individualizada de cada demanda.",
} as const;

export const advogada = {
  rotulo: "Conheça a advogada",
  paragrafos: [
    "Maria de Moraes é advogada e atua em diferentes áreas do Direito, com especialização em Direito Tributário.",
    "Sua atuação profissional contempla demandas consultivas, administrativas e judiciais, envolvendo pessoas físicas, empresas e questões relacionadas à Administração Pública.",
    "Com uma visão multidisciplinar, o escritório oferece assessoria jurídica nas áreas tributária, civil, previdenciária, criminal, ambiental e de licitações e contratos administrativos.",
    "O compromisso profissional está pautado na ética, na responsabilidade técnica, na atualização jurídica e na análise individualizada de cada demanda.",
  ],
  destaque: "Atendimento jurídico em todo o território nacional.",
  // Linha do tempo de formação: componente pronto, oculto enquanto a lista
  // estiver vazia. Preencher quando houver dados (graduação, especialização).
  formacao: [] as { ano: string; titulo: string; instituicao: string }[],
};

export const contato = {
  titulo: "Atendimento em todo o Brasil",
  texto: "Entre em contato pelos nossos canais profissionais.",
  botaoWhatsApp: "Atendimento pelo WhatsApp",
  formulario: {
    areaOutro: "Outro assunto",
    consentimento:
      "Li e concordo com a Política de Privacidade e autorizo o uso dos meus dados para retorno deste contato.",
    aviso:
      "Ao enviar, a mensagem com os seus dados abre no WhatsApp para você conferir e confirmar o envio. Não envie documentos nem dados sensíveis por este formulário. O envio não estabelece relação entre advogada e cliente.",
    botao: "Enviar pelo WhatsApp",
    sucesso: "Sua mensagem foi aberta no WhatsApp.",
    sucessoTexto:
      "Confira os dados e toque em enviar para concluir. Se o WhatsApp não abriu, use o botão abaixo.",
    abrirDeNovo: "Abrir o WhatsApp",
    editar: "Editar a mensagem",
  },
} as const;
