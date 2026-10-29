import { bookingMessage, buildWhatsAppUrl } from "./whatsapp";
import type { BookingInput } from "./validation";

/**
 * Contrato do motor de reservas.
 *
 * Hoje o site usa `WhatsAppBookingProvider`: apenas ENCAMINHA uma solicitação
 * ao proprietário. Ele nunca confirma reserva, preço ou disponibilidade.
 *
 * Para integrar um motor real (Omnibees, Cloudbeds, Hospedin, Stays, Booking
 * Engine próprio etc.), implemente `BookingProvider` em um novo arquivo,
 * chame o backend/API do fornecedor (a chave NUNCA deve ficar no front-end) e
 * troque o provider exportado no final deste arquivo.
 */

export interface AvailabilityQuery {
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface RoomRate {
  roomId: string;
  available: boolean;
  /** Valor total em centavos, vindo do motor real. */
  totalCents?: number;
  currency?: "BRL";
}

export type ReservationRequestResult =
  | { status: "redirected"; url: string } // solicitação enviada ao WhatsApp (sem confirmação)
  | { status: "pending"; reference: string } // criada no motor, aguardando confirmação
  | { status: "confirmed"; reference: string; paymentUrl?: string }; // somente com motor + pagamento reais

export interface BookingProvider {
  readonly kind: "whatsapp" | "engine";
  /** Retorna `null` quando o provedor não consulta disponibilidade (caso do WhatsApp). */
  checkAvailability(query: AvailabilityQuery): Promise<RoomRate[] | null>;
  requestReservation(input: BookingInput): Promise<ReservationRequestResult>;
}

export const WhatsAppBookingProvider: BookingProvider = {
  kind: "whatsapp",
  async checkAvailability() {
    return null;
  },
  async requestReservation(input) {
    return { status: "redirected", url: buildWhatsAppUrl(bookingMessage(input)) };
  },
};

/** Troque aqui pelo provider do motor de reservas real quando contratado. */
export const bookingProvider: BookingProvider = WhatsAppBookingProvider;
