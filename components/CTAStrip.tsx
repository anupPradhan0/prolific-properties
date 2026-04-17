"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

const CTAStrip = () => (
  <section id="contact" className="scroll-mt-24 pb-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="overflow-hidden rounded-[32px] bg-gradient-brand p-8 text-primary-foreground shadow-soft md:p-10"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-primary-foreground/15 bg-background/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-primary-foreground">
              Ready when you are
            </span>
            <h2 className="mt-5 text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.96] text-primary-foreground">
              Ready to find the property that feels right?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-primary-foreground/80">
              Talk to our property experts today for a clear shortlist, walkthrough support, and pricing guidance with zero pressure.
            </p>
          </div>

          <Button asChild variant="secondary" size="xl" className="w-full min-h-11 sm:w-auto sm:min-w-[220px] bg-surface text-foreground hover:bg-surface-tint">
            <a href="mailto:hello@prolificproperties.in">Schedule a call</a>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTAStrip;
