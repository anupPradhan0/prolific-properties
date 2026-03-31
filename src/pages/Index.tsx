import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import ListingsSection from "@/components/ListingsSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTAStrip from "@/components/CTAStrip";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <StatsBar />
    <ListingsSection />
    <FeaturesSection />
    <CTAStrip />
    <Footer />
  </div>
);

export default Index;
