import { AnimatePresence, motion } from "motion/react";
import { BedDouble, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ROOMS, type Room } from "../config/site";
import { Button } from "./ui/Button";
import { ProvisionalBadge } from "./ui/Badge";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { SmartImage } from "./ui/SmartImage";
import { TiltCard } from "./ui/TiltCard";

function RoomModal({ room, onClose }: { room: Room; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="room-title"
      className="fixed inset-0 z-[70] grid place-items-center bg-forest/80 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, rotateX: 12, opacity: 0 }}
        animate={{ y: 0, rotateX: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-cream shadow-natural"
      >
        <div className="relative">
          <SmartImage photo={room.photos[idx]} className="aspect-[16/10] w-full" sizes="(min-width:768px) 48rem, 100vw" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar detalhes do quarto"
            autoFocus
            className="absolute right-3 top-3 grid size-11 place-items-center rounded-full bg-cream/90 text-forest shadow-soft"
          >
            <X aria-hidden />
          </button>
        </div>
        {room.photos.length > 1 && (
          <div className="flex gap-2 p-3">
            {room.photos.map((p, i) => (
              <button key={p.src + i} type="button" onClick={() => setIdx(i)} aria-label={`Ver foto ${i + 1}`} aria-pressed={i === idx} className={`h-16 w-24 overflow-hidden rounded-lg ring-2 ${i === idx ? "ring-forest" : "ring-transparent"}`}>
                <SmartImage photo={p} className="size-full" />
              </button>
            ))}
          </div>
        )}
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <h3 id="room-title" className="font-serif text-4xl font-semibold">{room.name}</h3>
            {room.provisional && <ProvisionalBadge />}
          </div>
          <p className="mt-3 leading-relaxed text-forest/75">{room.description}</p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {room.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-sm font-medium">
                <Check aria-hidden className="size-4 text-moss" /> {h}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-forest/60">Tarifas e disponibilidade são informadas pela pousada após a sua solicitação.</p>
          <Button href={`#reservas`} onClick={onClose} className="mt-6">
            Solicitar este quarto
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Rooms() {
  const [selected, setSelected] = useState<Room | null>(null);
  return (
    <section id="acomodacoes" className="relative overflow-hidden bg-forest py-24 text-cream sm:py-32">
      <div aria-hidden className="stone-texture absolute inset-0 opacity-40 invert" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          light
          eyebrow="Acomodações"
          title="Quartos para descansar de verdade"
          intro="Conheça as categorias de quarto. Descrições, fotos e capacidades finais serão atualizadas com o proprietário."
        />
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ROOMS.map((room, i) => (
            <Reveal key={room.id} delay={i * 0.1} className="h-full">
              <TiltCard className="overflow-hidden rounded-3xl bg-cream text-forest shadow-natural">
                <div className="relative">
                  <SmartImage photo={room.photos[0]} className="aspect-[4/3] w-full" sizes="(min-width:1024px) 28rem, 100vw" />
                  <div className="absolute left-4 top-4">{room.provisional && <ProvisionalBadge />}</div>
                </div>
                <div className="flex flex-col gap-4 p-6" style={{ transform: "translateZ(30px)" }}>
                  <h3 className="flex items-center gap-2 font-serif text-3xl font-semibold">
                    <BedDouble aria-hidden className="size-6 text-wood" /> {room.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-forest/75">{room.description}</p>
                  <ul className="flex flex-wrap gap-2">
                    {room.highlights.map((h) => (
                      <li key={h} className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-wood">{h}</li>
                    ))}
                  </ul>
                  <Button onClick={() => setSelected(room)} variant="primary" ariaLabel={`Ver detalhes: ${room.name}`}>
                    Ver detalhes
                  </Button>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
      <AnimatePresence>{selected && <RoomModal room={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  );
}
