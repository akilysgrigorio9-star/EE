import { Compass, MapPinned, Sparkles } from "lucide-react";
import { TOURS, type Tour } from "../config/site";
import { buildWhatsAppUrl } from "../lib/whatsapp";
import { Button } from "./ui/Button";
import { ProvisionalBadge } from "./ui/Badge";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { TiltCard } from "./ui/TiltCard";

const ICONS: Record<string, typeof Compass> = { regiao: Compass, centro: MapPinned, "sob-medida": Sparkles };

export function Tours() {
  return (
    <section id="passeios" className="stone-texture bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Passeios e experiências"
          title="Nós reservamos o seu passeio"
          intro="A pousada reserva passeios para os hóspedes. Roteiros, duração e valores são informados no atendimento."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TOURS.map((t: Tour, i) => {
            const Icon = ICONS[t.id] ?? Compass;
            return (
              <Reveal key={t.id} delay={i * 0.1} className="h-full">
                <TiltCard className="flex flex-col gap-4 rounded-3xl border border-sand bg-white/70 p-7 shadow-soft">
                  <span className="grid size-14 place-items-center rounded-2xl bg-moss text-cream">
                    <Icon aria-hidden className="size-7" />
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-3xl font-semibold">{t.title}</h3>
                    {t.provisional && <ProvisionalBadge />}
                  </div>
                  <p className="grow text-sm leading-relaxed text-forest/75">{t.description}</p>
                  <Button
                    href={buildWhatsAppUrl(`Olá! Gostaria de informações sobre o passeio: ${t.title}.`)}
                    external
                    variant="primary"
                    ariaLabel={`Perguntar sobre ${t.title} no WhatsApp`}
                  >
                    Perguntar no WhatsApp
                  </Button>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
