// MINUTA sujeita à revisão da advogada antes da publicação (PRD, seção 9).
// O prazo de guarda de 12 meses é uma proposta; confirmar com a cliente.
import { site } from "@/config/site";

export const privacidade = {
  titulo: "Política de Privacidade",
  atualizacao: "Última atualização: novembro de 2026.",
  introducao:
    "Esta política explica como são tratados os dados pessoais informados no formulário de contato deste site, conforme a Lei nº 13.709/2018, a Lei Geral de Proteção de Dados Pessoais (LGPD).",
  secoes: [
    {
      titulo: "Controladora dos dados",
      paragrafos: [
        `A controladora dos dados é ${site.nome}, advogada inscrita na ${site.oab}, responsável pela ${site.marcaCurta}.`,
      ],
    },
    {
      titulo: "Dados coletados",
      paragrafos: [
        "O formulário de contato não envia nem guarda dados no site. Ele apenas monta uma mensagem com as informações abaixo, que abre no WhatsApp para você conferir e confirmar o envio ao escritório:",
      ],
      itens: [
        "nome;",
        "e-mail;",
        "telefone ou WhatsApp, se informado;",
        "área de interesse, se selecionada;",
        "o texto da mensagem.",
      ],
      paragrafosFinais: [
        "O site não usa cookies de rastreamento nem ferramentas de publicidade.",
      ],
    },
    {
      titulo: "Finalidade",
      paragrafos: [
        "Os dados são usados exclusivamente para retornar o contato que você solicitou.",
      ],
    },
    {
      titulo: "Base legal",
      paragrafos: [
        "O tratamento se baseia no seu consentimento (art. 7º, I, da LGPD), manifestado ao marcar a caixa de concordância do formulário e ao confirmar o envio da mensagem no WhatsApp. O consentimento pode ser revogado a qualquer momento pelo canal indicado ao final desta política.",
      ],
    },
    {
      titulo: "Prazo de guarda",
      paragrafos: [
        "As mensagens recebidas pelo WhatsApp são mantidas pelo tempo necessário ao atendimento do contato e, depois disso, por até 12 meses, salvo quando a lei exigir prazo diferente ou quando houver contratação dos serviços.",
      ],
    },
    {
      titulo: "Compartilhamento",
      paragrafos: [
        "A mensagem é enviada por você pelo WhatsApp, serviço da WhatsApp LLC (grupo Meta), que tem política de privacidade própria e pode processar os dados em servidores localizados fora do Brasil.",
        "Os dados não são vendidos nem cedidos a terceiros para outras finalidades.",
      ],
    },
    {
      titulo: "Direitos do titular",
      paragrafos: [
        "Nos termos do art. 18 da Lei nº 13.709/2018, você pode solicitar:",
      ],
      itens: [
        "a confirmação da existência de tratamento;",
        "o acesso aos dados;",
        "a correção de dados incompletos, inexatos ou desatualizados;",
        "a anonimização, o bloqueio ou a eliminação de dados desnecessários ou excessivos;",
        "a portabilidade dos dados;",
        "a eliminação dos dados tratados com o seu consentimento;",
        "informações sobre o compartilhamento dos dados;",
        "informações sobre a possibilidade de não consentir e as consequências da recusa;",
        "a revogação do consentimento.",
      ],
    },
    {
      titulo: "Como exercer os seus direitos",
      paragrafos: [
        `As solicitações podem ser enviadas para o e-mail ${site.email}.`,
      ],
    },
    {
      titulo: "Aviso sobre o formulário",
      paragrafos: [
        "O envio de mensagem pelo formulário não estabelece relação entre advogada e cliente. Não envie documentos nem dados sensíveis por esse canal.",
      ],
    },
  ],
} as const;
