import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, CheckCircle2, Info, Minus, Plus, ShieldAlert } from "lucide-react";
import { useMemo, useRef, useState, type FormEvent } from "react";
import { BOOKING_NOTES, ROOMS } from "../config/site";
import { bookingProvider } from "../lib/booking";
import {
  MAX_GUESTS,
  formatDateBR,
  formatPhoneBR,
  nightsBetween,
  todayISO,
  validateBooking,
  type BookingInput,
  type FieldErrors,
} from "../lib/validation";
import { Button } from "./ui/Button";
import { SelectField, TextAreaField, TextField } from "./ui/Field";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

type Step = "form" | "review" | "sent";

const EMPTY: BookingInput = { checkIn: "", checkOut: "", guests: 2, roomId: "", name: "", phone: "", email: "", notes: "" };

export function Booking() {
  const [v, setV] = useState<BookingInput>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors<BookingInput>>({});
  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const nights = useMemo(() => nightsBetween(v.checkIn, v.checkOut), [v.checkIn, v.checkOut]);
  const set = <K extends keyof BookingInput>(k: K, val: BookingInput[K]) => {
    setV((p) => ({ ...p, [k]: val }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const onReview = (e: FormEvent) => {
    e.preventDefault();
    const found = validateBooking(v);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`#bk-${first}`)?.focus();
      return;
    }
    setStep("review");
  };

  const onConfirm = async () => {
    setLoading(true);
    setFailure(null);
    try {
      const res = await bookingProvider.requestReservation(v);
      if (res.status === "redirected") {
        setUrl(res.url);
        window.open(res.url, "_blank", "noopener,noreferrer");
        setStep("sent");
      } else {
        setStep("sent");
      }
    } catch {
      setFailure("Não foi possível preparar sua solicitação. Tente novamente ou fale direto pelo WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setV(EMPTY);
    setErrors({});
    setUrl(null);
    setStep("form");
  };

  const roomName = ROOMS.find((r) => r.id === v.roomId)?.name ?? "Sem preferência";

  return (
    <section id="reservas" className="relative overflow-hidden bg-moss py-24 text-cream sm:py-32">
      <div aria-hidden className="stone-texture absolute inset-0 opacity-30 invert" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionHeading light eyebrow="Reservas" title="Solicite sua estadia" intro="Informe as datas e a pousada responde com disponibilidade e valores." />
          <Reveal delay={0.2}>
            <ul className="mt-8 flex flex-col gap-3 text-sm text-sand">
              {BOOKING_NOTES.map((n) => (
                <li key={n} className="flex gap-3">
                  <Info aria-hidden className="mt-0.5 size-4 shrink-0" /> {n}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-3">
          <div className="rounded-3xl bg-cream p-6 text-forest shadow-natural sm:p-9">
            <AnimatePresence mode="wait" initial={false}>
              {step === "form" && (
                <motion.form key="form" ref={formRef} onSubmit={onReview} noValidate initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} className="grid gap-5 sm:grid-cols-2">
                  <TextField id="bk-checkIn" label="Entrada" type="date" min={todayISO()} value={v.checkIn} onChange={(e) => set("checkIn", e.target.value)} error={errors.checkIn} required />
                  <TextField id="bk-checkOut" label="Saída" type="date" min={v.checkIn || todayISO()} value={v.checkOut} onChange={(e) => set("checkOut", e.target.value)} error={errors.checkOut} required />

                  <div className="flex flex-col gap-1.5">
                    <span id="bk-guests-label" className="text-sm font-bold">Hóspedes</span>
                    <div className="flex items-center gap-3" role="group" aria-labelledby="bk-guests-label">
                      <button type="button" aria-label="Diminuir hóspedes" onClick={() => set("guests", Math.max(1, v.guests - 1))} className="grid size-12 place-items-center rounded-full border border-beige bg-white transition active:scale-90">
                        <Minus aria-hidden className="size-4" />
                      </button>
                      <output id="bk-guests" tabIndex={-1} aria-live="polite" className="min-w-10 text-center text-2xl font-bold">{v.guests}</output>
                      <button type="button" aria-label="Aumentar hóspedes" onClick={() => set("guests", Math.min(MAX_GUESTS + 1, v.guests + 1))} className="grid size-12 place-items-center rounded-full border border-beige bg-white transition active:scale-90">
                        <Plus aria-hidden className="size-4" />
                      </button>
                    </div>
                    {errors.guests && <p role="alert" className="text-sm font-semibold text-red-800">{errors.guests}</p>}
                  </div>

                  <SelectField id="bk-roomId" label="Acomodação de preferência" optional value={v.roomId} onChange={(e) => set("roomId", e.target.value)}>
                    <option value="">Sem preferência</option>
                    {ROOMS.map((r) => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </SelectField>

                  <TextField id="bk-name" label="Nome completo" autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} error={errors.name} required />
                  <TextField id="bk-phone" label="WhatsApp / telefone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(82) 90000-0000" value={v.phone} onChange={(e) => set("phone", formatPhoneBR(e.target.value))} error={errors.phone} required />
                  <div className="sm:col-span-2">
                    <TextField id="bk-email" label="E-mail" type="email" autoComplete="email" optional value={v.email} onChange={(e) => set("email", e.target.value)} error={errors.email} />
                  </div>
                  <div className="sm:col-span-2">
                    <TextAreaField id="bk-notes" label="Observações" optional maxLength={500} hint="Crianças, horário previsto de chegada, passeios de interesse…" value={v.notes} onChange={(e) => set("notes", e.target.value)} error={errors.notes} />
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" className="w-full sm:w-auto">
                      <CalendarDays aria-hidden className="size-5" /> Revisar solicitação
                    </Button>
                  </div>
                </motion.form>
              )}

              {step === "review" && (
                <motion.div key="review" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                  <h3 className="font-serif text-3xl font-semibold">Confira os dados</h3>
                  <dl className="mt-5 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                    {[
                      ["Entrada", formatDateBR(v.checkIn)],
                      ["Saída", `${formatDateBR(v.checkOut)} (${nights} ${nights === 1 ? "noite" : "noites"})`],
                      ["Hóspedes", String(v.guests)],
                      ["Acomodação", roomName],
                      ["Nome", v.name.trim()],
                      ["Telefone", v.phone],
                      ...(v.email.trim() ? [["E-mail", v.email.trim()]] : []),
                      ...(v.notes.trim() ? [["Observações", v.notes.trim()]] : []),
                    ].map(([k, val]) => (
                      <div key={k} className="rounded-xl bg-sand/50 px-4 py-3">
                        <dt className="text-xs font-bold uppercase tracking-wider text-wood">{k}</dt>
                        <dd className="mt-0.5 break-words font-semibold">{val}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-5 flex gap-2 rounded-xl bg-beige/40 p-4 text-sm">
                    <ShieldAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-wood" />
                    Ao confirmar, abriremos o WhatsApp com esta mensagem pronta. A reserva só vale após a confirmação da pousada.
                  </p>
                  {failure && <p role="alert" className="mt-4 text-sm font-semibold text-red-800">{failure}</p>}
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button variant="whatsapp" onClick={onConfirm} loading={loading}>
                      {loading ? "Preparando…" : "Enviar pelo WhatsApp"}
                    </Button>
                    <Button variant="light" onClick={() => setStep("form")} disabled={loading} className="border border-beige">
                      Editar dados
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === "sent" && (
                <motion.div key="sent" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center" role="status">
                  <CheckCircle2 aria-hidden className="mx-auto size-14 text-moss" />
                  <h3 className="mt-4 font-serif text-3xl font-semibold">Solicitação preparada</h3>
                  <p className="mx-auto mt-3 max-w-md text-forest/75">
                    Abrimos o WhatsApp com a sua solicitação. <strong>Ela ainda não é uma reserva confirmada</strong>: aguarde o retorno da pousada com disponibilidade e valores.
                  </p>
                  <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                    {url && (
                      <Button href={url} external variant="whatsapp">
                        Abrir o WhatsApp novamente
                      </Button>
                    )}
                    <Button variant="light" onClick={reset} className="border border-beige">
                      Nova solicitação
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
