import { z } from "zod";

import {
  type CampoContato,
  type ErrosContato,
  LIMITE_MENSAGEM,
  OPCOES_DE_AREA,
} from "./contato-campos";

// O mesmo esquema valida no navegador e no servidor.
export const contatoSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Informe o seu nome.")
    .max(120, "O nome pode ter até 120 caracteres."),
  email: z.string().trim().pipe(z.email("Informe um e-mail válido.")),
  telefone: z
    .string()
    .trim()
    .max(30, "O telefone pode ter até 30 caracteres."),
  area: z
    .string()
    .refine(
      (valor) => valor === "" || OPCOES_DE_AREA.includes(valor),
      "Selecione uma das áreas da lista.",
    ),
  mensagem: z
    .string()
    .trim()
    .min(1, "Escreva a sua mensagem.")
    .max(
      LIMITE_MENSAGEM,
      "A mensagem pode ter até 2.000 caracteres.",
    ),
  consentimento: z.literal(
    "on",
    "Para enviar, é preciso concordar com a Política de Privacidade.",
  ),
});

export const lerFormulario = (formData: FormData) => {
  const texto = (campo: string) => {
    const valor = formData.get(campo);
    return typeof valor === "string" ? valor : "";
  };
  return {
    nome: texto("nome"),
    email: texto("email"),
    telefone: texto("telefone"),
    area: texto("area"),
    mensagem: texto("mensagem"),
    consentimento: texto("consentimento"),
  };
};

export const validarContato = (dados: ReturnType<typeof lerFormulario>) => {
  const resultado = contatoSchema.safeParse(dados);
  if (resultado.success) return { dados: resultado.data, erros: null };

  const erros: ErrosContato = {};
  for (const problema of resultado.error.issues) {
    const campo = problema.path[0] as CampoContato;
    erros[campo] ??= problema.message;
  }
  return { dados: null, erros };
};
