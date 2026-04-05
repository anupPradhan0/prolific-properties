import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import ListingsSection from "@/components/ListingsSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTAStrip from "@/components/CTAStrip";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="page-shell min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <Suspense fallback={<div className="py-20"><div className="container"><div className="h-96 animate-pulse rounded-[28px] bg-muted" /></div></div>}>
          <ListingsSection />
        </Suspense>
        <Suspense fallback={<div className="py-20"><div className="container"><div className="h-96 animate-pulse rounded-[28px] bg-muted" /></div></div>}>
          <FeaturesSection />
        </Suspense>
        <CTAStrip />
      </main>
      <Footer />
    </div>
  );
}
