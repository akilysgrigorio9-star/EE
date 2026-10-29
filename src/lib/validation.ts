export interface BookingInput {
  checkIn: string; // yyyy-mm-dd
  checkOut: string;
  guests: number;
  roomId: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export const todayISO = (): string => {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
};

const parse = (iso: string): Date | null => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d ? date : null;
};

export const nightsBetween = (a: string, b: string): number => {
  const da = parse(a);
  const db = parse(b);
  if (!da || !db) return 0;
  return Math.round((db.getTime() - da.getTime()) / 86_400_000);
};

export const formatDateBR = (iso: string): string => {
  const d = parse(iso);
  return d ? d.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "long", year: "numeric" }) : iso;
};

/** Aceita DDD + 8/9 dígitos, com ou sem +55. */
export const isValidBRPhone = (value: string): boolean => {
  const digits = value.replace(/\D/g, "");
  const local = digits.startsWith("55") && digits.length > 11 ? digits.slice(2) : digits;
  return /^[1-9]{2}9?\d{8}$/.test(local);
};

export const formatPhoneBR = (value: string): string => {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

export const MAX_GUESTS = 12;

export function validateBooking(v: BookingInput): FieldErrors<BookingInput> {
  const e: FieldErrors<BookingInput> = {};
  const today = todayISO();

  if (!parse(v.checkIn)) e.checkIn = "Informe a data de entrada.";
  else if (v.checkIn < today) e.checkIn = "A entrada não pode ser no passado.";

  if (!parse(v.checkOut)) e.checkOut = "Informe a data de saída.";
  else if (parse(v.checkIn) && nightsBetween(v.checkIn, v.checkOut) < 1)
    e.checkOut = "A saída deve ser depois da entrada.";

  if (!Number.isInteger(v.guests) || v.guests < 1) e.guests = "Informe ao menos 1 hóspede.";
  else if (v.guests > MAX_GUESTS) e.guests = `Para grupos acima de ${MAX_GUESTS}, fale conosco pelo WhatsApp.`;

  if (v.name.trim().length < 3) e.name = "Informe seu nome completo.";
  if (!isValidBRPhone(v.phone)) e.phone = "Informe um telefone válido com DDD.";
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "E-mail inválido.";
  if (v.notes.length > 500) e.notes = "Máximo de 500 caracteres.";

  return e;
}

export interface ContactInput {
  name: string;
  phone: string;
  message: string;
}

export function validateContact(v: ContactInput): FieldErrors<ContactInput> {
  const e: FieldErrors<ContactInput> = {};
  if (v.name.trim().length < 3) e.name = "Informe seu nome.";
  if (!isValidBRPhone(v.phone)) e.phone = "Informe um telefone válido com DDD.";
  if (v.message.trim().length < 5) e.message = "Escreva sua mensagem.";
  else if (v.message.length > 800) e.message = "Máximo de 800 caracteres.";
  return e;
}
