import { MotionConfig } from "motion/react";
import { About } from "./components/About";
import { Booking } from "./components/Booking";
import { Breakfast } from "./components/Breakfast";
import { Contact } from "./components/Contact";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Location } from "./components/Location";
import { Rooms } from "./components/Rooms";
import { Tours } from "./components/Tours";

export default function App() {
  return (
    // reducedMotion="user": desativa animações de transformação para quem pediu menos movimento
    <MotionConfig reducedMotion="user">
      <a href="#sobre" className="sr-only z-[100] rounded-full bg-cream px-4 py-2 font-bold focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Pular para o conteúdo
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <Rooms />
        <Breakfast />
        <Tours />
        <Gallery />
        <Location />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </MotionConfig>
  );
}
