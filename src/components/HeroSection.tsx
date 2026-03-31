import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.7 } }),
};

const HeroSection = () => (
  <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
    {/* Left */}
    <div className="bg-background p-10 md:p-14 flex flex-col justify-between">
      <div>
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="flex items-center gap-2.5 mb-7">
          <div className="w-8 h-px bg-primary" />
          <span className="text-[11px] tracking-[2.5px] text-primary uppercase font-medium">Premium Real Estate</span>
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1} className="font-display text-4xl md:text-[52px] font-light leading-[1.1] text-foreground mb-5">
          Where <strong className="font-semibold italic text-primary">Luxury</strong><br />Meets<br />Living.
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2} className="text-sm text-muted-foreground leading-relaxed max-w-[360px] mb-9 font-light">
          Prolific Properties curates the finest residential and commercial spaces across Odisha — built for those who demand the extraordinary.
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="flex gap-3">
          <button className="bg-primary text-primary-foreground text-xs px-7 py-3.5 rounded tracking-widest uppercase font-medium font-body hover:bg-blue-accent-light transition-colors">
            Explore Listings
          </button>
          <button className="border border-foreground/20 text-foreground text-xs px-7 py-3.5 rounded tracking-widest uppercase font-body hover:border-primary hover:text-primary transition-colors">
            Our Story
          </button>
        </motion.div>
      </div>
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="flex gap-6 mt-10 pt-7 border-t border-border">
        {[
          { val: "₹50Cr+", label: "Total Sales Value" },
          { val: "1,200+", label: "Happy Families" },
          { val: "12 Yrs", label: "Of Excellence" },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-6">
            <div>
              <div className="font-display text-[22px] text-primary font-semibold">{s.val}</div>
              <div className="text-[10px] text-muted-foreground tracking-widest uppercase mt-0.5">{s.label}</div>
            </div>
            {i < 2 && <div className="w-px h-10 bg-border" />}
          </div>
        ))}
      </motion.div>
    </div>

    {/* Right */}
    <div className="grid grid-rows-2">
      <div className="bg-primary/5 flex items-center justify-center border-b border-border relative p-6">
        <div className="text-center z-10">
          <div className="font-display text-[13px] text-primary/60 tracking-[2px] uppercase mb-1.5">Featured</div>
          <div className="font-display text-[28px] text-foreground font-light">Skyline Villa</div>
          <div className="text-[11px] text-muted-foreground tracking-wider mt-1">Patia, Bhubaneswar</div>
        </div>
        <div className="absolute bottom-4 left-4 bg-background border border-border px-3.5 py-2.5 rounded shadow-sm">
          <div className="font-display text-xl font-semibold text-foreground">₹1.25 Cr</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">4 BHK · 2,800 sqft</div>
        </div>
      </div>
      <div className="bg-primary/[0.03] flex items-center justify-center relative p-6">
        <div className="text-center z-10">
          <div className="font-display text-[13px] text-green-accent/80 tracking-[2px] uppercase mb-1.5">New Launch</div>
          <div className="font-display text-[28px] text-foreground font-light">Emerald Heights</div>
          <div className="text-[11px] text-muted-foreground tracking-wider mt-1">Chandrasekharpur, Odisha</div>
        </div>
        <div className="absolute bottom-4 left-4 bg-background border border-border px-3.5 py-2.5 rounded shadow-sm">
          <div className="font-display text-xl font-semibold text-foreground">₹85 L</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">2 BHK · 1,100 sqft</div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
