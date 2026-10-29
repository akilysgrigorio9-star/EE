/**
 * Fonte única de conteúdo do site.
 * Itens marcados com `provisional: true` NÃO foram confirmados pelo proprietário
 * e aparecem no site com o selo "a confirmar". Nenhum preço, avaliação ou
 * disponibilidade é inventado: tarifas e vagas são tratadas por WhatsApp
 * até a integração de um motor de reservas (ver src/lib/booking.ts).
 */

export const WHATSAPP_NUMBER: string =
  (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined)?.replace(/\D/g, "") || "5582981440618";

export const SITE = {
  name: "Pousada Altemar Dutra",
  tagline: "Hospedagem com café da manhã",
  instagram: "https://www.instagram.com/pousada_altemar_dutra_/",
  instagramHandle: "@pousada_altemar_dutra_",
  phones: [
    { label: "(82) 98144-0618", href: "tel:+5582981440618" },
    { label: "(82) 98818-2680", href: "tel:+5582988182680" },
  ],
  // Endereço divulgado nas publicações da pousada — confirmar o texto final com o proprietário.
  address: "Rodovia Altemar Dutra, Piranhas – AL",
  addressNote: "Cerca de 3 km do centro histórico de Piranhas (informação divulgada pela pousada).",
  mapQuery: "Pousada Altemar Dutra, Piranhas, Alagoas",
} as const;

export const NAV = [
  { id: "sobre", label: "A Pousada" },
  { id: "acomodacoes", label: "Acomodações" },
  { id: "cafe", label: "Café da manhã" },
  { id: "passeios", label: "Passeios" },
  { id: "galeria", label: "Galeria" },
  { id: "localizacao", label: "Localização" },
  { id: "contato", label: "Contato" },
] as const;

export interface Photo {
  src: string;
  alt: string;
  /** Foto provisória (recorte do Instagram) — substituir por originais em alta resolução. */
  provisional?: boolean;
}

export const PHOTOS = {
  facade: { src: "/photos/fachada.jpg", alt: "Fachada da Pousada Altemar Dutra com pedra, madeira e telhado aparente", provisional: true },
  view: { src: "/photos/vista-piranhas.jpg", alt: "Vista ao entardecer sobre o rio e as casas da cidade", provisional: true },
  breakfast: { src: "/photos/cafe-da-manha.jpg", alt: "Mesa do café da manhã com suco, frutas, pães e bolo", provisional: true },
} satisfies Record<string, Photo>;

export const GALLERY: Photo[] = [PHOTOS.facade, PHOTOS.view, PHOTOS.breakfast];

export interface Room {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  photos: Photo[];
  provisional: boolean;
}

export const ROOMS: Room[] = [
  {
    id: "casal",
    name: "Quarto para casal",
    description: "Descrição provisória. O proprietário deve confirmar camas, metragem e capacidade.",
    highlights: ["Ar-condicionado", "Wi-Fi gratuito"],
    photos: [PHOTOS.facade],
    provisional: true,
  },
  {
    id: "familia",
    name: "Quarto para família",
    description: "A pousada divulga quartos para família. Descrição final e capacidade a confirmar.",
    highlights: ["Ar-condicionado", "Wi-Fi gratuito", "Estacionamento gratuito"],
    photos: [PHOTOS.view],
    provisional: true,
  },
  {
    id: "outros",
    name: "Demais categorias",
    description: "Espaço reservado para outras categorias de quarto, conforme o proprietário definir.",
    highlights: ["Café da manhã"],
    photos: [PHOTOS.breakfast],
    provisional: true,
  },
];

export interface Tour {
  id: string;
  title: string;
  description: string;
  provisional: boolean;
}

export const TOURS: Tour[] = [
  {
    id: "regiao",
    title: "Passeios pela região",
    description: "A pousada reserva passeios para os hóspedes. Roteiros, duração e valores serão informados pelo WhatsApp.",
    provisional: true,
  },
  {
    id: "centro",
    title: "Centro histórico",
    description: "O centro histórico fica a cerca de 3 km da pousada, segundo a divulgação da própria pousada.",
    provisional: true,
  },
  {
    id: "sob-medida",
    title: "Experiência sob medida",
    description: "Conte o que você gostaria de fazer e receba as opções disponíveis na sua data.",
    provisional: true,
  },
];

export const BOOKING_NOTES = [
  "Esta é uma solicitação: a reserva só é confirmada pela pousada, por escrito, após consulta de disponibilidade.",
  "Valores e condições (tarifas, política de cancelamento, horários) são informados pela pousada no atendimento.",
] as const;
