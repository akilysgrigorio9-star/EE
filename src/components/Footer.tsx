import { Instagram, MapPin, Phone } from "lucide-react";
import { NAV, SITE } from "../config/site";

export function Footer() {
  return (
    <footer className="relative bg-forest pt-16 text-sand">
      <div aria-hidden className="wood-grain absolute inset-x-0 top-0 h-2" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-10 sm:px-8 md:grid-cols-3">
        <div>
          <p className="font-serif text-3xl font-semibold text-cream">{SITE.name}</p>
          <p className="mt-2 text-sm">{SITE.tagline}</p>
        </div>
        <nav aria-label="Rodapé">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-beige">Navegue</p>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="hover:text-cream hover:underline">{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-3 text-sm">
          <p className="mb-0 text-xs font-bold uppercase tracking-[0.25em] text-beige">Contato</p>
          <p className="flex gap-2"><MapPin aria-hidden className="mt-0.5 size-4 shrink-0" /> {SITE.address}</p>
          {SITE.phones.map((p) => (
            <a key={p.href} href={p.href} className="flex items-center gap-2 hover:text-cream"><Phone aria-hidden className="size-4" /> {p.label}</a>
          ))}
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cream"><Instagram aria-hidden className="size-4" /> {SITE.instagramHandle}</a>
        </div>
      </div>
      <div className="border-t border-cream/15 py-5 text-center text-xs text-sand/80">
        © {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
