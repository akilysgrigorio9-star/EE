import { motion } from "motion/react";
import type { ReactNode } from "react";

type Variant = "primary" | "light" | "ghost" | "whatsapp";

interface Props {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}

const styles: Record<Variant, string> = {
  primary: "bg-forest text-cream hover:bg-moss shadow-soft",
  light: "bg-cream text-forest hover:bg-sand shadow-soft",
  ghost: "border border-cream/70 text-cream hover:bg-cream/15 backdrop-blur-sm",
  whatsapp: "bg-[#1f8f55] text-white hover:bg-[#177a47] shadow-soft",
};

export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  type = "button",
  disabled,
  loading,
  external,
  className = "",
  ariaLabel,
}: Props) {
  const base = `relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 text-sm font-semibold tracking-wide transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`;
  const motionProps = disabled ? {} : { whileHover: { y: -2 }, whileTap: { scale: 0.95 } };
  const inner = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      {loading && <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
      {children}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        className={`group ${base}`}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...motionProps}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-label={ariaLabel}
      className={`group ${base}`}
      {...motionProps}
    >
      {inner}
    </motion.button>
  );
}
