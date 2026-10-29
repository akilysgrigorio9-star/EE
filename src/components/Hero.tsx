import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { lazy, Suspense, useEffect, useRef } from "react";
import { PHOTOS, SITE } from "../config/site";
import { useFinePointer, usePrefersReducedMotion, useWideScreen } from "../hooks/useEnv";
import { GENERIC_WHATSAPP_URL } from "../lib/whatsapp";
import { Button } from "./ui/Button";
import { SmartImage } from "./ui/SmartImage";
import { SplitText } from "./ui/SplitText";

const HeroScene = lazy(() => import("./HeroScene"));

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const fine = useFinePointer();
  const wide = useWideScreen(1024);
  const reduced = usePrefersReducedMotion();
  const show3D = fine && wide && !reduced;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, reduced ? 1.05 : 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Movimento sutil controlado pelo cursor (somente desktop)
  const mx = useSpring(0, { stiffness: 60, damping: 20 });
  const my = useSpring(0, { stiffness: 60, damping: 20 });
  const shiftX = useTransform(mx, (v) => v * -14);
  const shiftY = useTransform(my, (v) => v * -10);
  useEffect(() => {
    if (!fine || reduced) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [fine, reduced, mx, my]);

  return (
    <section id="topo" ref={ref} className="relative isolate flex h-[100svh] min-h-[600px] items-end overflow-hidden bg-forest sm:items-center">
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 -z-20">
        <motion.div style={{ x: shiftX, y: shiftY }} className="size-full">
          <SmartImage photo={PHOTOS.facade} priority sizes="100vw" className="size-full" />
        </motion.div>
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-forest via-forest/55 to-forest/25" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_20%,rgb(232_216_195/0.28),transparent_60%)]" />

      {show3D && (
        <div className="absolute inset-0 -z-[5]">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>
      )}

      <motion.div style={{ y: textY, opacity: textOpacity }} className="mx-auto w-full max-w-7xl px-5 pb-28 pt-24 sm:px-8 sm:pb-0">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-beige sm:text-sm"
        >
          {SITE.tagline}
        </motion.p>
        <h1 className="sr-only">{SITE.name}</h1>
        <SplitText as="p" text="Pousada" delay={0.3} className="font-serif text-6xl font-semibold leading-[0.9] text-cream sm:text-8xl lg:text-9xl" />
        <SplitText as="p" text="Altemar Dutra" delay={0.5} className="font-serif text-6xl font-semibold italic leading-[0.95] text-sand sm:text-8xl lg:text-9xl" />
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.9 }}
          className="mt-6 max-w-lg text-base leading-relaxed text-cream/90 sm:text-lg"
        >
          Acolhimento simples e caprichado, café da manhã e passeios reservados pela própria pousada.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Button href="#reservas" variant="light">
            Consultar disponibilidade
          </Button>
          <Button href={GENERIC_WHATSAPP_URL} external variant="ghost">
            <MessageCircle aria-hidden className="size-5" /> Falar no WhatsApp
          </Button>
        </motion.div>
      </motion.div>

      <motion.a
        href="#sobre"
        aria-label="Rolar para a próxima seção"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-cream/80 sm:block"
      >
        <motion.span animate={{ y: [0, 9, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="block">
          <ChevronDown aria-hidden className="size-8" />
        </motion.span>
      </motion.a>
    </section>
  );
}
