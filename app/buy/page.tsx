"use client";

import { useState, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingsSection from "@/components/ListingsSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTAStrip from "@/components/CTAStrip";
import { Button } from "@/components/ui/button";

const buyFilters = [
  { label: "All", value: "all" },
  { label: "Villa", value: "villa" },
  { label: "Apartment", value: "apartment" },
  { label: "Plot", value: "plot" },
  { label: "Commercial", value: "commercial" },
];

export default function Buy() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="page-shell min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mt-4">
              <span className="section-label">Properties for Sale</span>
              <h1 className="mt-4 text-[clamp(2.2rem,5vw,4rem)] leading-tight text-foreground">
                Find Your Dream Property in Bhubaneswar
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                Explore verified villas, apartments, plots, and commercial spaces. Clear filters, transparent pricing, and guided site visits.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {buyFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`min-h-11 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
                    activeFilter === filter.value
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-surface text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </section>

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
