// Campos e tipos do formulário de contato, sem a biblioteca de validação,
// para o navegador só baixar o Zod quando alguém envia o formulário.
import { areas } from "@/content/areas";
import { contato } from "@/content/home";

export const LIMITE_MENSAGEM = 2000;

export const OPCOES_DE_AREA: readonly string[] = [
  ...areas.map((area) => area.nome),
  contato.formulario.areaOutro,
];

export type CampoContato =
  | "nome"
  | "email"
  | "telefone"
  | "area"
  | "mensagem"
  | "consentimento";

export type ErrosContato = Partial<Record<CampoContato, string>>;
export type ValoresContato = Record<
  Exclude<CampoContato, "consentimento">,
  string
>;
