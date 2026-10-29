import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { GENERIC_WHATSAPP_URL } from "../lib/whatsapp";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={GENERIC_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Pousada Altemar Dutra no WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.6, type: "spring", stiffness: 200, damping: 14 }}
      whileHover={{ scale: 1.1, rotate: -6 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#1f8f55] text-white shadow-natural sm:bottom-7 sm:right-7 sm:size-16"
    >
      <span aria-hidden className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#1f8f55]/40 [animation-duration:3s]" />
      <MessageCircle aria-hidden className="size-7 sm:size-8" />
    </motion.a>
  );
}
