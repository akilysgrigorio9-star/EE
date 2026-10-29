import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";

interface Props {
  eyebrow: string;
  title: string;
  intro?: string;
  light?: boolean;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, intro, light, align = "left" }: Props) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <Reveal>
        <p className={`mb-3 text-xs font-bold uppercase tracking-[0.3em] ${light ? "text-beige" : "text-wood"}`}>{eyebrow}</p>
      </Reveal>
      <SplitText
        text={title}
        className={`font-serif text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl ${light ? "text-cream" : "text-forest"}`}
      />
      {intro && (
        <Reveal delay={0.15}>
          <p className={`mt-5 text-base leading-relaxed sm:text-lg ${light ? "text-sand/90" : "text-forest/75"}`}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
