import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HistorienSection from "@/components/HistorienSection";
import HyttenSection from "@/components/HyttenSection";
import BruksguideSection from "@/components/BruksguideSection";
import AktiviteterSection from "@/components/AktiviteterSection";
import SoppBaerSection from "@/components/SoppBaerSection";
import JaktFiskeSection from "@/components/JaktFiskeSection";
import HusreglerSection from "@/components/HusreglerSection";
import BookingSection from "@/components/BookingSection";
import GalleriSection from "@/components/GalleriSection";
import DagbokSection from "@/components/DagbokSection";
import KontaktFooter from "@/components/KontaktFooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HistorienSection />
        <HyttenSection />
        <BruksguideSection />
        <AktiviteterSection />
        <section id="sopp">
          <SoppBaerSection />
        </section>
        <JaktFiskeSection />
        <HusreglerSection />
        <BookingSection />
        <GalleriSection />
        <DagbokSection />
      </main>
      <KontaktFooter />
    </>
  );
}
