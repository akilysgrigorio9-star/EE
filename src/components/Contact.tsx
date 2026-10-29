import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { SITE } from "../config/site";
import { formatPhoneBR, validateContact, type ContactInput, type FieldErrors } from "../lib/validation";
import { buildWhatsAppUrl, contactMessage } from "../lib/whatsapp";
import { Button } from "./ui/Button";
import { TextAreaField, TextField } from "./ui/Field";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const EMPTY: ContactInput = { name: "", phone: "", message: "" };

export function Contact() {
  const [v, setV] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors<ContactInput>>({});
  const [sent, setSent] = useState(false);

  const set = <K extends keyof ContactInput>(k: K, val: ContactInput[K]) => {
    setV((p) => ({ ...p, [k]: val }));
    setErrors((p) => ({ ...p, [k]: undefined }));
    setSent(false);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validateContact(v);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    window.open(buildWhatsAppUrl(contactMessage(v)), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <section id="contato" className="stone-texture bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Contato" title="Fale com a pousada" intro="Dúvidas sobre quartos, café da manhã ou passeios? Escreva e responderemos pelo WhatsApp." />
          <Reveal delay={0.2}>
            <ul className="mt-8 flex flex-col gap-4">
              {SITE.phones.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className="group inline-flex items-center gap-3 font-semibold">
                    <span className="grid size-11 place-items-center rounded-full bg-forest text-sand transition-transform group-hover:scale-110 group-hover:-rotate-6"><Phone aria-hidden className="size-5" /></span>
                    {p.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 font-semibold">
                  <span className="grid size-11 place-items-center rounded-full bg-forest text-sand transition-transform group-hover:scale-110 group-hover:-rotate-6"><Instagram aria-hidden className="size-5" /></span>
                  {SITE.instagramHandle}
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal>
          <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-3xl bg-white/80 p-6 shadow-natural sm:p-9" aria-label="Formulário de contato">
            <TextField id="ct-name" label="Nome" autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} error={errors.name} required />
            <TextField id="ct-phone" label="WhatsApp / telefone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(82) 90000-0000" value={v.phone} onChange={(e) => set("phone", formatPhoneBR(e.target.value))} error={errors.phone} required />
            <TextAreaField id="ct-message" label="Mensagem" maxLength={800} value={v.message} onChange={(e) => set("message", e.target.value)} error={errors.message} required />
            <Button type="submit" variant="whatsapp">
              <MessageCircle aria-hidden className="size-5" /> Enviar pelo WhatsApp
            </Button>
            {sent && (
              <p role="status" className="flex items-center gap-2 text-sm font-semibold text-moss">
                <Mail aria-hidden className="size-4" /> Abrimos o WhatsApp com a sua mensagem. Basta enviar por lá.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
