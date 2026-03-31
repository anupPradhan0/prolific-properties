import { motion } from "framer-motion";

const stats = [
  { num: "1,200+", label: "Listings" },
  { num: "850+", label: "Deals Closed" },
  { num: "98%", label: "Satisfaction" },
  { num: "12 Yrs", label: "Experience" },
];

const StatsBar = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 border-b border-border">
    {stats.map((s, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1, duration: 0.5 }}
        className="px-8 py-6 border-r border-border last:border-r-0"
      >
        <div className="font-display text-[32px] font-semibold text-gold">{s.num}</div>
        <div className="text-[11px] text-foreground/40 tracking-widest uppercase mt-1">{s.label}</div>
      </motion.div>
    ))}
  </div>
);

export default StatsBar;
