import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTAStrip from "@/components/CTAStrip";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Prolific Properties - premium real estate advisory in Bhubaneswar with verified listings and dedicated property support.",
};

export default function AboutUs() {
  return (
    <div className="page-shell min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="py-20 md:py-28">
          <div className="container max-w-4xl">
            <div className="mt-4">
              <span className="section-label">About Us</span>
              <h1 className="mt-4 text-[clamp(2.2rem,5vw,4rem)] leading-tight text-foreground">
                Your trusted partner in finding the perfect property
              </h1>
              <p className="mt-6 text-base leading-7 text-muted-foreground">
                Prolific Properties is a premium real estate advisory firm based in Bhubaneswar, Odisha. We specialize in helping buyers, renters, and investors discover verified properties that match their needs and budget.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2">
              <div className="rounded-[28px] border border-border bg-surface p-8 shadow-panel">
                <h2 className="text-3xl leading-tight text-foreground">Our Mission</h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  To provide transparent, reliable property advisory services that simplify the real estate journey for our clients. We believe everyone deserves clarity and confidence when making property decisions.
                </p>
              </div>
              <div className="rounded-[28px] border border-border bg-surface p-8 shadow-panel">
                <h2 className="text-3xl leading-tight text-foreground">Our Vision</h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  To become Odisha&apos;s most trusted real estate platform—known for verified listings, honest guidance, and exceptional customer experience.
                </p>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-[clamp(2rem,4vw,3rem)] leading-tight text-foreground">Why Choose Us</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: "Verified Listings", desc: "Every property is screened for legal clarity and documentation." },
                  { title: "Expert Guidance", desc: "Dedicated advisors guide you from search to site visit." },
                  { title: "Transparent Pricing", desc: "No hidden charges. Clear conversations at every step." },
                  { title: "Wide Selection", desc: "Villas, apartments, plots, and commercial spaces." },
                  { title: "Local Expertise", desc: "Deep knowledge of Bhubaneswar neighborhoods." },
                  { title: "End-to-End Support", desc: "From inquiry to final handover, we stay with you." },
                ].map((item) => (
                  <div key={item.title} className="rounded-[24px] border border-border bg-gradient-panel p-6 shadow-panel">
                    <h3 className="text-xl leading-tight text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 rounded-[28px] border border-border bg-surface p-8 shadow-panel">
              <h2 className="text-3xl leading-tight text-foreground">Our Stats</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                <div className="text-center">
                  <p className="font-display text-5xl text-primary">1,200+</p>
                  <p className="mt-2 text-sm text-muted-foreground">Active Listings</p>
                </div>
                <div className="text-center">
                  <p className="font-display text-5xl text-primary">850+</p>
                  <p className="mt-2 text-sm text-muted-foreground">Happy Clients</p>
                </div>
                <div className="text-center">
                  <p className="font-display text-5xl text-primary">5+</p>
                  <p className="mt-2 text-sm text-muted-foreground">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTAStrip />
      </main>
      <Footer />
    </div>
  );
}
