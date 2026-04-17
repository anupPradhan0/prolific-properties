"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

const trustStats = [
  { value: "₹50Cr+", label: "Closed value" },
  { value: "1,200+", label: "Happy families" },
  { value: "12 yrs", label: "Local expertise" },
];

const quickFacts = [
  { title: "2,800 sqft", subtitle: "Wide premium layout" },
  { title: "4 BHK", subtitle: "Family-first planning" },
  { title: "Ready visits", subtitle: "Fast shortlisting support" },
];

const HeroSection = () => (
  <section id="top" className="scroll-mt-24 pb-16 pt-8 md:pb-20 md:pt-12">
    <div className="container grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <span className="section-label">Premium Real Estate</span>

        <h1 className="mt-6 max-w-[11ch] text-[clamp(3.4rem,8vw,6.4rem)] leading-[0.92] text-foreground">
          Where <em className="not-italic font-semibold text-primary">Luxury</em>
          <br />
          Meets Living.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          Prolific Properties helps buyers, renters, and investors discover premium homes across Odisha with verified listings, clear pricing, and modern guidance from first visit to final paperwork.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button asChild size="xl" className="w-full sm:w-auto">
            <a href="#listings">Explore listings</a>
          </Button>
          <Button asChild variant="outline" size="xl" className="w-full sm:w-auto">
            <a href="#about">Our story</a>
          </Button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {trustStats.map((stat) => (
            <div key={stat.label} className="rounded-[24px] border border-border bg-surface p-5 shadow-panel">
              <div className="font-display text-[2rem] leading-none text-primary">{stat.value}</div>
              <div className="mt-2 text-sm font-medium text-ink-soft">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.12 }}
        className="relative"
      >
        <div className="pointer-events-none absolute right-2 top-6 h-44 w-44 rounded-full bg-primary/12 blur-3xl" />

        <div className="relative rounded-[32px] border border-border/70 bg-surface p-4 shadow-soft md:p-6">
          <div className="hero-mesh fine-grid rounded-[28px] border border-primary/10 p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="section-label">Featured Collection</span>
              <p className="text-sm font-semibold text-ink-soft">Cleaner layout, stronger contrast, premium feel.</p>
            </div>

            <div className="mt-10 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="max-w-lg">
                <p className="text-xs font-bold uppercase tracking-[0.34em] text-primary/70">Patia · Bhubaneswar</p>
                <h2 className="mt-4 text-[clamp(2.2rem,4vw,3.4rem)] leading-none text-foreground">Skyline Villa</h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  A bright four-bedroom villa with open living spaces, landscaped frontage, and a smoother buyer experience from shortlist to site visit.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[24px] bg-primary-deep p-5 text-primary-foreground shadow-panel">
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground/70">Featured home</div>
                  <div className="mt-4 font-display text-[2.2rem] leading-none">₹1.25 Cr</div>
                  <div className="mt-2 text-sm text-primary-foreground/78">4 BHK · curated interiors · immediate visits</div>
                </div>

                <div className="rounded-[24px] border border-border bg-surface p-5 shadow-panel">
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-success">New launch</div>
                  <div className="mt-4 font-display text-[2rem] leading-none text-foreground">Emerald Heights</div>
                  <div className="mt-2 text-sm text-muted-foreground">2 BHK residences with compact, modern layouts and clear pricing guidance.</div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {quickFacts.map((fact) => (
                <div key={fact.title} className="rounded-2xl border border-border/80 bg-background/70 p-4 backdrop-blur-sm">
                  <div className="text-lg font-semibold text-foreground">{fact.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{fact.subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
