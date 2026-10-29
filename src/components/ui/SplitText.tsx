import { motion } from "motion/react";

interface Props {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}

/** Anima palavra por palavra; o texto completo fica acessível via aria-label. */
export function SplitText({ text, className, delay = 0, as = "h2" }: Props) {
  const Tag = motion[as] as typeof motion.h2;
  const words = text.split(" ");
  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "110%", opacity: 0 }, show: { y: "0%", opacity: 1 } }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
