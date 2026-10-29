import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import type { ReactNode, PointerEvent } from "react";
import { useFinePointer, usePrefersReducedMotion } from "../../hooks/useEnv";

interface Props {
  children: ReactNode;
  className?: string;
  max?: number;
}

/** Cartão com perspectiva 3D e brilho que segue o cursor. Inerte em toque / movimento reduzido. */
export function TiltCard({ children, className = "", max = 9 }: Props) {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 160, damping: 18 });
  const sy = useSpring(py, { stiffness: 160, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const glareX = useTransform(sx, [0, 1], [0, 100]);
  const glareY = useTransform(sy, [0, 1], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.28), transparent 55%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div style={{ perspective: 1100 }} className="h-full">
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={enabled ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
        className={`relative h-full will-change-transform ${className}`}
      >
        {children}
        {enabled && (
          <motion.div aria-hidden style={{ background: glare }} className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light" />
        )}
      </motion.div>
    </div>
  );
}
