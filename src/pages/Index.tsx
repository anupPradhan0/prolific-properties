import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import ListingsSection from "@/components/ListingsSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTAStrip from "@/components/CTAStrip";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="page-shell min-h-screen bg-background">
    <Navbar />
    <main>
      <HeroSection />
      <StatsBar />
      <ListingsSection />
      <FeaturesSection />
      <CTAStrip />
    </main>
    <Footer />
  </div>
);

export default Index;
