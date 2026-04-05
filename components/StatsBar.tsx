"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "1,200+", label: "Active listings", note: "Premium sale, rent, and launch inventory" },
  { value: "850+", label: "Deals closed", note: "Guided with faster local follow-through" },
  { value: "98%", label: "Client satisfaction", note: "Built on clarity, trust, and support" },
  { value: "48 hrs", label: "Shortlist turnaround", note: "Quick recommendations for serious buyers" },
];

const StatsBar = () => (
  <section className="pb-20">
    <div className="container grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.article
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          className="rounded-[26px] border border-border bg-surface p-6 shadow-panel"
        >
          <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary/70">{stat.label}</div>
          <div className="mt-4 font-display text-[3rem] leading-none text-foreground">{stat.value}</div>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{stat.note}</p>
        </motion.article>
      ))}
    </div>
  </section>
);

export default StatsBar;
