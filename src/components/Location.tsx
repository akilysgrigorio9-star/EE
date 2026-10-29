import { ExternalLink, MapPin, Phone } from "lucide-react";
import { SITE } from "../config/site";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const q = encodeURIComponent(SITE.mapQuery);

export function Location() {
  return (
    <section id="localizacao" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionHeading eyebrow="Localização" title="Como chegar" />
          <Reveal delay={0.15}>
            <address className="mt-8 flex flex-col gap-5 not-italic">
              <p className="flex gap-3">
                <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-wood" />
                <span>
                  <strong>{SITE.address}</strong>
                  <br />
                  <span className="text-sm text-forest/70">{SITE.addressNote}</span>
                </span>
              </p>
              {SITE.phones.map((p) => (
                <a key={p.href} href={p.href} className="flex items-center gap-3 font-semibold hover:text-moss">
                  <Phone aria-hidden className="size-5 text-wood" /> {p.label}
                </a>
              ))}
            </address>
            <Button href={`https://www.google.com/maps/search/?api=1&query=${q}`} external variant="primary" className="mt-8">
              <ExternalLink aria-hidden className="size-4" /> Abrir no Google Maps
            </Button>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-3">
          <div className="overflow-hidden rounded-3xl border-8 border-sand shadow-natural">
            <iframe
              title="Mapa com a localização da Pousada Altemar Dutra"
              src={`https://www.google.com/maps?q=${q}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[380px] w-full sm:h-[480px]"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
