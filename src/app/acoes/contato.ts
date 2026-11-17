"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

import { site } from "@/config/site";
import {
  type EstadoContato,
  lerFormulario,
  validarContato,
} from "@/lib/contato";
import { permitirEnvio } from "@/lib/limite-envios";

// Remetente: precisa ser de um domínio verificado no Resend. Enquanto o
// domínio não estiver verificado, o endereço de testes do Resend só entrega
// para o e-mail da própria conta.
const REMETENTE =
  process.env.EMAIL_REMETENTE ??
  `Site ${site.marcaCurta} <onboarding@resend.dev>`;

export async function enviarContato(
  _anterior: EstadoContato,
  formData: FormData,
): Promise<EstadoContato> {
  // Campo-isca: pessoas não o veem; se veio preenchido, é robô. Responde
  // como sucesso para não ensinar o robô a contornar.
  if (formData.get("site")) return { status: "sucesso" };

  const bruto = lerFormulario(formData);
  const valores = {
    nome: bruto.nome,
    email: bruto.email,
    telefone: bruto.telefone,
    area: bruto.area,
    mensagem: bruto.mensagem,
  };
  const { dados, erros } = validarContato(bruto);
  if (!dados) return { status: "invalido", erros, valores };

  const cabecalhos = await headers();
  const ip =
    cabecalhos.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "desconhecido";
  if (!permitirEnvio(ip)) return { status: "erro", valores };

  const chave = process.env.RESEND_API_KEY;
  if (!chave) return { status: "erro", valores };

  try {
    const resend = new Resend(chave);
    const { error } = await resend.emails.send({
      from: REMETENTE,
      to: site.email,
      replyTo: dados.email,
      subject: `Contato pelo site — ${dados.nome}`,
      text: [
        `Nome: ${dados.nome}`,
        `E-mail: ${dados.email}`,
        `Telefone / WhatsApp: ${dados.telefone || "não informado"}`,
        `Área de interesse: ${dados.area || "não informada"}`,
        "",
        "Mensagem:",
        dados.mensagem,
        "",
        "Consentimento: a pessoa concordou com a Política de Privacidade.",
      ].join("\n"),
    });
    if (error) return { status: "erro", valores };
  } catch {
    return { status: "erro", valores };
  }

  return { status: "sucesso" };
}
