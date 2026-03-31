import { motion } from "framer-motion";

const CTAStrip = () => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-primary px-9 py-10 flex flex-col md:flex-row items-center justify-between gap-6"
  >
    <div>
      <h2 className="font-display text-[28px] font-semibold text-primary-foreground">
        Ready to find your perfect home?
      </h2>
      <p className="text-[13px] text-primary-foreground/70 mt-1">
        Talk to our property experts today — free, no obligation.
      </p>
    </div>
    <button className="bg-background text-foreground text-xs px-8 py-3.5 rounded tracking-widest uppercase font-body font-medium hover:bg-card transition-colors flex-shrink-0">
      Schedule a Call
    </button>
  </motion.section>
);

export default CTAStrip;
