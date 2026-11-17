import { site } from "@/config/site";

/** Link do WhatsApp com a mensagem padrão; nas páginas de área, inclui a área. */
export const linkWhatsApp = (area?: string): string => {
  const mensagem = area
    ? `${site.whatsappMensagem} Área: ${area}.`
    : site.whatsappMensagem;
  return `https://wa.me/${site.telefone.whatsapp}?text=${encodeURIComponent(mensagem)}`;
};
