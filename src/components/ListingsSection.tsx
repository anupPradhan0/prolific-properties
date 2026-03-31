import { motion } from "framer-motion";

const listings = [
  { tag: "For Sale", tagColor: "bg-primary/10 border-primary/30 text-primary", price: "₹1.25 Cr", title: "Skyline Villa, Patia", meta: ["4 BHK", "2,800 sqft", "3 Bath"] },
  { tag: "For Rent", tagColor: "bg-blue-accent-light/10 border-blue-accent-light/30 text-blue-accent", price: "₹35,000/mo", title: "Golden Heights, Nayapalli", meta: ["3 BHK", "1,600 sqft", "2 Bath"] },
  { tag: "New Launch", tagColor: "bg-green-accent/10 border-green-accent/30 text-green-accent", price: "₹85 L", title: "Emerald Residency, CSPUR", meta: ["2 BHK", "1,100 sqft", "2 Bath"] },
];

const ListingsSection = () => (
  <section className="px-9 py-12 bg-background">
    <div className="flex items-end justify-between mb-8">
      <h2 className="font-display text-[32px] font-light text-foreground">
        Prime <span className="italic text-primary">Listings</span>
      </h2>
      <a href="#" className="text-[11px] text-primary tracking-[1.5px] uppercase border-b border-primary/30 pb-0.5 hover:border-primary transition-colors">
        View all properties
      </a>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {listings.map((l, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.5 }}
          className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="h-[200px] flex items-center justify-center relative bg-muted">
            <div className="absolute top-3.5 left-3.5">
              <span className={`text-[10px] px-2.5 py-1 border rounded tracking-widest uppercase ${l.tagColor}`}>
                {l.tag}
              </span>
            </div>
          </div>
          <div className="px-5 py-4">
            <div className="font-display text-2xl font-semibold text-foreground mb-1">{l.price}</div>
            <div className="text-[13px] text-muted-foreground mb-3">{l.title}</div>
            <div className="h-px bg-border mb-3" />
            <div className="flex gap-4 text-[11px] text-muted-foreground tracking-wide">
              {l.meta.map((m, j) => <span key={j}>{m}</span>)}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default ListingsSection;
