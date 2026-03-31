import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const reasons = [
  {
    title: "Legally screened listings",
    copy: "Every shortlist starts with cleaner paperwork checks and more trustworthy guidance.",
  },
  {
    title: "Dedicated relationship support",
    copy: "From first call to final visit, buyers get one clearer point of contact.",
  },
  {
    title: "Transparent pricing conversations",
    copy: "The experience stays readable and honest, without hidden charges buried in the process.",
  },
  {
    title: "Modern site visit planning",
    copy: "Faster scheduling, stronger shortlists, and a smoother search flow from day one.",
  },
];

const tabs = ["Buy", "Rent", "Commercial"];
const propertyTypes = ["Apartment", "Villa", "Plot", "Commercial"];

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeType, setActiveType] = useState(0);

  return (
    <section id="about" className="scroll-mt-24 py-20">
      <div className="container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Why Prolific</span>
          <h2 className="mt-4 text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95] text-foreground">
            Readable, reliable, and built around your next move.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            We rebuilt the experience around stronger readability, better contrast, and a more modern blue-led premium feel—without losing the trust a real-estate brand needs.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {reasons.map((reason, index) => (
              <div key={reason.title} className="rounded-[24px] border border-border bg-surface p-5 shadow-panel">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary">
                  0{index + 1}
                </div>
                <h3 className="mt-4 text-2xl leading-tight text-foreground">{reason.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{reason.copy}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="rounded-[32px] bg-gradient-brand p-[1px] shadow-soft"
        >
          <div id="search" className="rounded-[31px] bg-background p-6 md:p-8">
            <div className="flex flex-col gap-2">
              <span className="section-label">Search Properties</span>
              <h3 className="text-[2.3rem] leading-tight text-foreground">Set your preferences and let the shortlisting start.</h3>
              <p className="text-sm leading-6 text-muted-foreground">
                Simple filters, stronger contrast, and a cleaner flow for buyers, renters, and commercial clients.
              </p>
            </div>

            <div className="mt-8 space-y-5">
              <div className="grid gap-2 rounded-[22px] bg-surface-strong p-1 sm:grid-cols-3">
                {tabs.map((tab, index) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(index)}
                    className={`rounded-[18px] px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] transition-colors ${
                      activeTab === index ? "bg-primary text-primary-foreground shadow-panel" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <Input placeholder="Location, project, or locality" />

              <div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Budget range</span>
                  <span className="font-semibold text-primary">₹40L — ₹1.5Cr</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-secondary">
                  <div className="relative h-2 w-[62%] rounded-full bg-primary">
                    <div className="absolute -left-1 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-4 border-background bg-primary" />
                    <div className="absolute -right-1 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-4 border-background bg-primary" />
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-3 text-sm font-medium text-ink-soft">Property type</div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {propertyTypes.map((type, index) => (
                    <button
                      key={type}
                      onClick={() => setActiveType(index)}
                      className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors ${
                        activeType === index
                          ? "border-primary/20 bg-primary-soft text-primary"
                          : "border-border bg-surface text-muted-foreground hover:border-primary/20 hover:text-foreground"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <Button size="xl" className="w-full">
                Find properties
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
