import { useEffect } from "react";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import ListingsSection from "@/components/ListingsSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTAStrip from "@/components/CTAStrip";
import Footer from "@/components/Footer";

const upsertMeta = (selector: string, attr: "name" | "property", key: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
};

const Index = () => {
  useEffect(() => {
    const title = "Prolific Properties | Premium Real Estate in Bhubaneswar";
    const description =
      "Discover premium villas, apartments, rentals, and commercial spaces in Bhubaneswar with Prolific Properties. Verified listings, transparent pricing, and guided site visits.";
    const canonicalUrl = `${window.location.origin}/`;

    document.title = title;

    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta(
      'meta[name="robots"]',
      "name",
      "robots",
      "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    );
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertCanonical(canonicalUrl);
  }, []);

  return (
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
};

export default Index;
