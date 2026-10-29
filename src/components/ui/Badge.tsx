export function ProvisionalBadge({ light }: { light?: boolean }) {
  return (
    <span
      title="Conteúdo provisório: aguardando confirmação do proprietário"
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider ${light ? "bg-cream/20 text-cream" : "bg-beige/60 text-wood"}`}
    >
      a confirmar
    </span>
  );
}
