import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { GALLERY } from "../config/site";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { SmartImage } from "./ui/SmartImage";

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const total = GALLERY.length;

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + total) % total)), [total]);

  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, go]);

  return (
    <section id="galeria" className="bg-sand py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Galeria" title="Um olhar sobre a pousada" intro="Toque em uma foto para ampliar. Estas imagens são provisórias e serão trocadas por fotos originais em alta resolução." />
        <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 sm:auto-rows-[280px] lg:grid-cols-3">
          {GALLERY.map((p, i) => (
            <Reveal key={p.src} delay={i * 0.08} className={`h-full ${i === 0 ? "col-span-2 row-span-2 lg:col-span-1" : ""}`}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Ampliar foto: ${p.alt}`}
                className="group relative block size-full overflow-hidden rounded-3xl shadow-soft"
              >
                <SmartImage photo={p} className="size-full transition-transform duration-700 group-hover:scale-110" sizes="(min-width:1024px) 30vw, 50vw" />
                <span className="absolute inset-0 grid place-items-center bg-forest/0 text-cream opacity-0 transition-all duration-300 group-hover:bg-forest/40 group-hover:opacity-100 group-focus-visible:bg-forest/40 group-focus-visible:opacity-100">
                  <Expand aria-hidden className="size-8" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Galeria ampliada, foto ${open + 1} de ${total}`}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-forest/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button type="button" onClick={close} aria-label="Fechar galeria" autoFocus className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-cream/15 text-cream">
              <X aria-hidden />
            </button>
            {total > 1 && (
              <>
                <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Foto anterior" className="absolute left-3 grid size-12 place-items-center rounded-full bg-cream/15 text-cream sm:left-6">
                  <ChevronLeft aria-hidden />
                </button>
                <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Próxima foto" className="absolute right-3 grid size-12 place-items-center rounded-full bg-cream/15 text-cream sm:right-6">
                  <ChevronRight aria-hidden />
                </button>
              </>
            )}
            <motion.figure
              key={open}
              initial={{ opacity: 0, scale: 0.94, rotateY: 8 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.4 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(1);
                else if (info.offset.x > 80) go(-1);
              }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88svh] max-w-4xl"
            >
              <img src={GALLERY[open].src} alt={GALLERY[open].alt} className="max-h-[80svh] w-auto rounded-2xl object-contain shadow-natural" draggable={false} />
              <figcaption className="mt-3 text-center text-sm text-sand">{GALLERY[open].alt}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
