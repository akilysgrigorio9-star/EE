import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { PHOTOS } from "../config/site";
import { usePrefersReducedMotion } from "../hooks/useEnv";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { SmartImage } from "./ui/SmartImage";

export function Breakfast() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : -40, reduced ? 0 : 40]);
  const rotate = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : -3, reduced ? 0 : 3]);

  return (
    <section id="cafe" ref={ref} className="relative overflow-hidden bg-sand py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <motion.div style={{ y, rotate }} className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-[2.5rem] border-8 border-cream shadow-natural">
            <SmartImage photo={PHOTOS.breakfast} className="aspect-[4/5] w-full" sizes="(min-width:1024px) 40vw, 90vw" />
          </div>
        </motion.div>
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Café da manhã"
            title="Comece o dia à mesa"
            intro="A pousada oferece café da manhã aos hóspedes. Sucos, pães, frutas e bolo aparecem nas fotos divulgadas."
          />
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-xl leading-relaxed text-forest/75">
              O cardápio e o horário de serviço serão informados pela pousada. Substitua este texto quando o proprietário confirmar os detalhes.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
