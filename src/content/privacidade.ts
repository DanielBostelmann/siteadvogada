// MINUTA sujeita à revisão da advogada antes da publicação (PRD, seção 9).
// O prazo de guarda de 12 meses é uma proposta; confirmar com a cliente.
import { site } from "@/config/site";

export const privacidade = {
  titulo: "Política de Privacidade",
  atualizacao: "Última atualização: novembro de 2026.",
  introducao:
    "Esta política explica como são tratados os dados pessoais enviados pelo formulário de contato deste site, conforme a Lei nº 13.709/2018, a Lei Geral de Proteção de Dados Pessoais (LGPD).",
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
        "O site coleta apenas os dados que você informa no formulário de contato:",
      ],
      itens: [
        "nome;",
        "e-mail;",
        "telefone ou WhatsApp, se informado;",
        "área de interesse, se selecionada;",
        "o texto da mensagem.",
      ],
      paragrafosFinais: [
        "Para evitar envios automatizados, o endereço IP de quem envia o formulário é usado de forma temporária para limitar envios repetidos e não é guardado.",
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
        "O tratamento se baseia no seu consentimento (art. 7º, I, da LGPD), manifestado ao marcar a caixa de concordância do formulário. O consentimento pode ser revogado a qualquer momento pelo canal indicado ao final desta política.",
      ],
    },
    {
      titulo: "Prazo de guarda",
      paragrafos: [
        "As mensagens são mantidas pelo tempo necessário ao atendimento do contato e, depois disso, por até 12 meses, salvo quando a lei exigir prazo diferente ou quando houver contratação dos serviços.",
      ],
    },
    {
      titulo: "Compartilhamento",
      paragrafos: [
        "Os dados são compartilhados somente com os provedores de hospedagem do site e de envio e recebimento de e-mail, que atuam em nome do escritório. Esses provedores podem processar os dados em servidores localizados fora do Brasil.",
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
