import { WHATSAPP_NUMBER } from "../config/site";
import { ROOMS } from "../config/site";
import { formatDateBR, nightsBetween, type BookingInput, type ContactInput } from "./validation";

export const buildWhatsAppUrl = (text: string, number: string = WHATSAPP_NUMBER): string =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export const GENERIC_WHATSAPP_URL = buildWhatsAppUrl("Olá! Vim pelo site da Pousada Altemar Dutra e gostaria de mais informações.");

export function bookingMessage(v: BookingInput): string {
  const nights = nightsBetween(v.checkIn, v.checkOut);
  const room = ROOMS.find((r) => r.id === v.roomId)?.name ?? "Sem preferência";
  const lines = [
    "Olá! Gostaria de consultar disponibilidade e solicitar uma reserva (pelo site):",
    "",
    `• Nome: ${v.name.trim()}`,
    `• Telefone: ${v.phone}`,
    v.email.trim() ? `• E-mail: ${v.email.trim()}` : null,
    `• Entrada: ${formatDateBR(v.checkIn)}`,
    `• Saída: ${formatDateBR(v.checkOut)} (${nights} ${nights === 1 ? "noite" : "noites"})`,
    `• Hóspedes: ${v.guests}`,
    `• Acomodação de preferência: ${room}`,
    v.notes.trim() ? `• Observações: ${v.notes.trim()}` : null,
    "",
    "Aguardo retorno com disponibilidade e valores. Obrigado!",
  ];
  return lines.filter((l): l is string => l !== null).join("\n");
}

export function contactMessage(v: ContactInput): string {
  return [`Olá! Mensagem enviada pelo site da Pousada Altemar Dutra.`, "", `Nome: ${v.name.trim()}`, `Telefone: ${v.phone}`, "", v.message.trim()].join("\n");
}
