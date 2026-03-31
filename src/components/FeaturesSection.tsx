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
          Why <em className="italic text-gold">Prolific</em><br />Properties?
        </h2>
        <p className="text-[13.5px] text-cream-muted leading-relaxed font-light mb-7 max-w-[340px]">
          We don't just sell properties. We help you find a place that reflects who you are and where you're headed.
        </p>
        <div className="flex flex-col gap-3.5">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-3.5">
              <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
              <div className="text-[13px] text-foreground/60 leading-relaxed">{f}</div>
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
        className="px-10 py-12"
        style={{ background: '#0f0d0b' }}
      >
        <h3 className="text-[11px] tracking-[2px] text-gold uppercase mb-6">Search Properties</h3>

        <div className="flex border border-foreground/10 rounded-sm overflow-hidden mb-6">
          {tabs.map((t, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`flex-1 py-2.5 text-[11px] tracking-wide font-body transition-colors ${
                activeTab === i ? "bg-gold text-primary-foreground font-medium" : "text-foreground/40 hover:text-foreground/60"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="bg-foreground/[0.04] border border-foreground/[0.09] rounded-sm px-4 py-3 flex items-center gap-2.5 mb-3.5">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-foreground/30">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            placeholder="Location, project or locality…"
            className="bg-transparent border-none outline-none text-[13px] text-foreground font-body flex-1 placeholder:text-foreground/25"
          />
        </div>

        <div className="flex justify-between text-[11px] text-foreground/35 mb-1.5">
          <span>Budget range</span>
          <span className="text-gold">₹40L – ₹1.5Cr</span>
        </div>
        <div className="h-0.5 bg-foreground/10 rounded-full relative mb-5">
          <div className="absolute left-[20%] right-[40%] top-0 h-0.5 bg-gold rounded-full" />
          <div className="absolute left-[20%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-gold rounded-full border-2 border-background" />
          <div className="absolute left-[60%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-gold rounded-full border-2 border-background" />
        </div>

        <div className="text-[11px] text-foreground/35 tracking-wide mb-2.5">Property type</div>
        <div className="grid grid-cols-2 gap-2 mb-5">
          {propTypes.map((p, i) => (
            <button
              key={i}
              onClick={() => setActiveType(i)}
              className={`py-2.5 text-[11px] text-center border rounded-sm font-body transition-colors ${
                activeType === i
                  ? "border-gold/50 text-gold bg-gold/[0.06]"
                  : "border-foreground/[0.08] text-foreground/40 bg-foreground/[0.03] hover:border-foreground/20"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button className="w-full bg-gold text-primary-foreground text-xs py-3.5 tracking-[1.5px] uppercase font-medium font-body hover:bg-gold-light transition-colors mt-1">
          Find Properties
        </button>
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
