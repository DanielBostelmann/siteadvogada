import { site } from "@/config/site";

const linkComTexto = (texto: string): string =>
  `https://wa.me/${site.telefone.whatsapp}?text=${encodeURIComponent(texto)}`;

/** Link do WhatsApp com a mensagem padrão; nas páginas de área, inclui a área. */
export const linkWhatsApp = (area?: string): string =>
  linkComTexto(
    area ? `${site.whatsappMensagem} Área: ${area}.` : site.whatsappMensagem,
  );

type DadosDoFormulario = {
  nome: string;
  email: string;
  telefone: string;
  area: string;
  mensagem: string;
};

/**
 * Mensagem do formulário de contato, organizada para leitura no WhatsApp:
 * saudação, um campo por linha com o rótulo em negrito (*texto*) e a mensagem
 * em bloco próprio. Campos opcionais em branco ficam de fora.
 */
export const mensagemDoFormulario = (dados: DadosDoFormulario): string => {
  const campos = [
    ["Nome", dados.nome],
    ["E-mail", dados.email],
    ["Telefone / WhatsApp", dados.telefone],
    ["Área de interesse", dados.area],
  ]
    .filter(([, valor]) => valor.trim() !== "")
    .map(([rotulo, valor]) => `*${rotulo}:* ${valor.trim()}`);

  return [
    `Olá, Dra. ${site.nome}. Vim pelo site e gostaria de um atendimento.`,
    "",
    ...campos,
    "",
    "*Mensagem:*",
    dados.mensagem.trim(),
  ].join("\n");
};

/** Link do WhatsApp com a mensagem montada a partir do formulário. */
export const linkDoFormulario = (dados: DadosDoFormulario): string =>
  linkComTexto(mensagemDoFormulario(dados));
