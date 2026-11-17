// Limite de envios por IP, em memória (o PRD não prevê banco de dados).
// Em hospedagem serverless cada instância tem a sua própria contagem, então
// o limite é uma barreira simples contra abuso, não uma garantia.
const JANELA_MS = 10 * 60 * 1000;
const MAXIMO_POR_JANELA = 5;

const enviosPorIp = new Map<string, number[]>();

export const permitirEnvio = (ip: string, agora = Date.now()): boolean => {
  const recentes = (enviosPorIp.get(ip) ?? []).filter(
    (instante) => agora - instante < JANELA_MS,
  );
  if (recentes.length >= MAXIMO_POR_JANELA) {
    enviosPorIp.set(ip, recentes);
    return false;
  }
  enviosPorIp.set(ip, [...recentes, agora]);
  return true;
};
