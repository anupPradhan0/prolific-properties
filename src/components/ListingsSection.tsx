import { motion } from "framer-motion";

const listings = [
  { tag: "For Sale", tagColor: "bg-gold/15 border-gold/30 text-gold", price: "₹1.25 Cr", title: "Skyline Villa, Patia", meta: ["4 BHK", "2,800 sqft", "3 Bath"], bg: "#161210" },
  { tag: "For Rent", tagColor: "bg-blue-accent/10 border-blue-accent/30 text-blue-accent", price: "₹35,000/mo", title: "Golden Heights, Nayapalli", meta: ["3 BHK", "1,600 sqft", "2 Bath"], bg: "#0d1214" },
  { tag: "New Launch", tagColor: "bg-green-accent/10 border-green-accent/30 text-green-accent", price: "₹85 L", title: "Emerald Residency, CSPUR", meta: ["2 BHK", "1,100 sqft", "2 Bath"], bg: "#0e100d" },
];

const ListingsSection = () => (
  <section className="px-9 py-12" style={{ background: '#0d0d0d' }}>
    <div className="flex items-end justify-between mb-8">
      <h2 className="font-display text-[32px] font-light text-foreground">
        Prime <span className="italic text-gold">Listings</span>
      </h2>
      <a href="#" className="text-[11px] text-gold tracking-[1.5px] uppercase border-b border-gold/30 pb-0.5 hover:border-gold transition-colors">
        View all properties
      </a>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
      {listings.map((l, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.5 }}
          className="bg-card overflow-hidden"
        >
          <div className="h-[200px] flex items-center justify-center relative" style={{ background: l.bg }}>
            <div className="absolute top-3.5 left-3.5">
              <span className={`text-[10px] px-2.5 py-1 border tracking-widest uppercase ${l.tagColor}`}>
                {l.tag}
              </span>
            </div>
          </div>
          <div className="px-5 py-4">
            <div className="font-display text-2xl font-semibold text-foreground mb-1">{l.price}</div>
            <div className="text-[13px] text-foreground/70 mb-3">{l.title}</div>
            <div className="h-px bg-border mb-3" />
            <div className="flex gap-4 text-[11px] text-foreground/35 tracking-wide">
              {l.meta.map((m, j) => <span key={j}>{m}</span>)}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default ListingsSection;
