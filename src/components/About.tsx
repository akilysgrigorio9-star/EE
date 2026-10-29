import { motion, useScroll, useTransform } from "motion/react";
import { Car, Coffee, Compass, Wifi } from "lucide-react";
import { useRef } from "react";
import { PHOTOS } from "../config/site";
import { usePrefersReducedMotion } from "../hooks/useEnv";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { SmartImage } from "./ui/SmartImage";

const FEATURES = [
  { icon: Coffee, title: "Café da manhã", text: "Hospedagem com café da manhã." },
  { icon: Compass, title: "Passeios", text: "A pousada reserva passeios para você." },
  { icon: Wifi, title: "Wi-Fi gratuito", text: "Divulgado pela pousada." },
  { icon: Car, title: "Estacionamento gratuito", text: "Divulgado pela pousada." },
] as const;

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const back = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 50, reduced ? 0 : -50]);
  const front = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : -30, reduced ? 0 : 60]);

  return (
    <section id="sobre" className="stone-texture relative bg-cream py-24 sm:py-32">
      <div ref={ref} className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="A Pousada"
            title="Pedra, madeira e acolhimento"
            intro="A Pousada Altemar Dutra oferece hospedagem com café da manhã e cuida da reserva dos seus passeios. Aqui você encontra um lugar tranquilo para descansar entre um roteiro e outro."
          />
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-xl leading-relaxed text-forest/75">
              Texto institucional provisório: o proprietário pode enviar a história da pousada, o diferencial do atendimento e fotos originais para substituir este trecho.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <li key={f.title}>
                <Reveal delay={0.1 * i} className="group flex gap-4 rounded-2xl border border-sand bg-cream/80 p-4 shadow-soft transition-shadow hover:shadow-natural">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-forest text-sand transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    <f.icon aria-hidden className="size-6" />
                  </span>
                  <div>
                    <p className="font-bold">{f.title}</p>
                    <p className="text-sm text-forest/70">{f.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto h-[460px] w-full max-w-lg sm:h-[560px]">
          <motion.div style={{ y: back }} className="absolute right-0 top-0 h-[78%] w-[72%] overflow-hidden rounded-[2rem] shadow-natural">
            <SmartImage photo={PHOTOS.facade} className="size-full" sizes="(min-width:1024px) 30vw, 70vw" />
          </motion.div>
          <motion.div style={{ y: front }} className="absolute bottom-0 left-0 h-[55%] w-[56%] overflow-hidden rounded-[2rem] border-8 border-cream shadow-natural">
            <SmartImage photo={PHOTOS.view} className="size-full" sizes="(min-width:1024px) 22vw, 50vw" />
          </motion.div>
          <div aria-hidden className="wood-grain absolute -bottom-3 right-6 h-3 w-40 rounded-full opacity-90" />
        </div>
      </div>
    </section>
  );
}
