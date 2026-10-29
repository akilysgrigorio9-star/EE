import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV, SITE } from "../config/site";
import { Button } from "./ui/Button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter((e): e is HTMLElement => e !== null);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "bg-cream/90 shadow-soft backdrop-blur-md" : "bg-gradient-to-b from-forest/60 to-transparent"
      }`}
    >
      <nav aria-label="Navegação principal" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <a href="#topo" className={`font-serif text-xl font-bold leading-none sm:text-2xl ${solid ? "text-forest" : "text-cream"}`}>
          {SITE.name.replace("Pousada ", "Pousada ")}
        </a>

        <ul className="hidden items-center gap-7 xl:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? "true" : undefined}
                className={`relative py-1 text-sm font-semibold transition-colors ${solid ? "text-forest" : "text-cream"} after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-beige after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=true]:after:scale-x-100`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Button href="#reservas" variant={solid ? "primary" : "light"} className="!min-h-10 !px-5">
              Solicitar reserva
            </Button>
          </div>
          <button
            type="button"
            className={`grid size-11 place-items-center rounded-full xl:hidden ${solid ? "text-forest" : "text-cream"}`}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "calc(100svh - 4rem)", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-cream xl:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-6">
              {NAV.map((n, i) => (
                <motion.li key={n.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.05 }}>
                  <a href={`#${n.id}`} onClick={() => setOpen(false)} className="block border-b border-sand py-4 font-serif text-3xl font-semibold text-forest">
                    {n.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-6">
                <Button href="#reservas" onClick={() => setOpen(false)} className="w-full">
                  Solicitar reserva
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
