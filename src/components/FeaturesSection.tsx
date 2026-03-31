import { useState } from "react";
import { motion } from "framer-motion";

const features = [
  "Every listing is legally verified and RERA compliant",
  "Dedicated relationship managers from search to registration",
  "Transparent pricing with no hidden charges",
  "Virtual tours and drone walkthrough videos available",
];

const tabs = ["Buy", "Rent", "Commercial"];
const propTypes = ["Apartment", "Villa", "Plot", "Commercial"];

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeType, setActiveType] = useState(0);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border">
      {/* Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-background px-10 py-12 flex flex-col justify-center"
      >
        <h2 className="font-display text-4xl font-light text-foreground mb-3.5 leading-tight">
          Why <em className="italic text-primary">Prolific</em><br />Properties?
        </h2>
        <p className="text-[13.5px] text-muted-foreground leading-relaxed font-light mb-7 max-w-[340px]">
          We don't just sell properties. We help you find a place that reflects who you are and where you're headed.
        </p>
        <div className="flex flex-col gap-3.5">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-3.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <div className="text-[13px] text-foreground/70 leading-relaxed">{f}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right - Search */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-card px-10 py-12"
      >
        <h3 className="text-[11px] tracking-[2px] text-primary uppercase mb-6 font-medium">Search Properties</h3>

        <div className="flex border border-border rounded overflow-hidden mb-6">
          {tabs.map((t, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`flex-1 py-2.5 text-[11px] tracking-wide font-body transition-colors ${
                activeTab === i ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="bg-background border border-border rounded px-4 py-3 flex items-center gap-2.5 mb-3.5">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-muted-foreground">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            placeholder="Location, project or locality…"
            className="bg-transparent border-none outline-none text-[13px] text-foreground font-body flex-1 placeholder:text-muted-foreground/60"
          />
        </div>

        <div className="flex justify-between text-[11px] text-muted-foreground mb-1.5">
          <span>Budget range</span>
          <span className="text-primary font-medium">₹40L – ₹1.5Cr</span>
        </div>
        <div className="h-0.5 bg-border rounded-full relative mb-5">
          <div className="absolute left-[20%] right-[40%] top-0 h-0.5 bg-primary rounded-full" />
          <div className="absolute left-[20%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background" />
          <div className="absolute left-[60%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background" />
        </div>

        <div className="text-[11px] text-muted-foreground tracking-wide mb-2.5">Property type</div>
        <div className="grid grid-cols-2 gap-2 mb-5">
          {propTypes.map((p, i) => (
            <button
              key={i}
              onClick={() => setActiveType(i)}
              className={`py-2.5 text-[11px] text-center border rounded font-body transition-colors ${
                activeType === i
                  ? "border-primary/50 text-primary bg-primary/5"
                  : "border-border text-muted-foreground bg-background hover:border-primary/30"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button className="w-full bg-primary text-primary-foreground text-xs py-3.5 rounded tracking-[1.5px] uppercase font-medium font-body hover:bg-blue-accent-light transition-colors mt-1">
          Find Properties
        </button>
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
