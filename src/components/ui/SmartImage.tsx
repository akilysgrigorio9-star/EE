import { useState } from "react";
import { ImageOff } from "lucide-react";
import type { Photo } from "../../config/site";

interface Props {
  photo: Photo;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Imagem com lazy-loading, decodificação assíncrona, placeholder enquanto carrega
 * e fallback acessível se o arquivo não existir.
 */
export function SmartImage({ photo, className = "", priority, sizes }: Props) {
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  return (
    <div className={`relative overflow-hidden bg-sand ${className}`}>
      {state !== "ok" && (
        <div className="stone-texture absolute inset-0 grid place-items-center bg-gradient-to-br from-sand to-beige text-wood" role={state === "error" ? "img" : undefined} aria-label={state === "error" ? `${photo.alt} (imagem indisponível)` : undefined}>
          {state === "error" ? <ImageOff aria-hidden className="size-8 opacity-70" /> : <span aria-hidden className="size-6 animate-pulse rounded-full bg-wood/30" />}
        </div>
      )}
      {state !== "error" && (
        <img
          src={photo.src}
          alt={photo.alt}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={() => setState("ok")}
          onError={() => setState("error")}
          className={`size-full object-cover transition-opacity duration-700 ${state === "ok" ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
