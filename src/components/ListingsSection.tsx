import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

const listings = [
  {
    status: "For Sale",
    badgeTone: "border-primary/15 bg-surface text-primary",
    visualTone: "bg-surface-tint",
    category: "Villa",
    title: "Skyline Villa",
    location: "Patia, Bhubaneswar",
    price: "₹1.25 Cr",
    description: "Sunlit bedrooms, premium finishes, and a spacious family layout ready for quick walkthroughs.",
    details: ["4 BHK", "2,800 sqft", "3 Bath"],
  },
  {
    status: "For Rent",
    badgeTone: "border-primary/12 bg-primary-soft text-primary-deep",
    visualTone: "bg-surface-strong",
    category: "Apartment",
    title: "Golden Heights",
    location: "Nayapalli, Bhubaneswar",
    price: "₹35,000/mo",
    description: "A polished rental option with balanced room sizes, reliable maintenance support, and central access.",
    details: ["3 BHK", "1,600 sqft", "2 Bath"],
  },
  {
    status: "New Launch",
    badgeTone: "border-success/20 bg-surface text-success",
    visualTone: "bg-primary-soft",
    category: "Residency",
    title: "Emerald Heights",
    location: "CSPUR, Bhubaneswar",
    price: "₹85 L",
    description: "Fresh inventory with efficient floor plans, contemporary façades, and launch-stage pricing guidance.",
    details: ["2 BHK", "1,100 sqft", "2 Bath"],
  },
];

const ListingsSection = () => (
  <section id="listings" className="scroll-mt-24 py-20">
    <div className="container">
      <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <span className="section-label">Prime Listings</span>
          <h2 className="mt-4 text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.95] text-foreground">
            Homes and investments with clarity built in.
          </h2>
        </div>

        <p className="max-w-xl text-base leading-7 text-muted-foreground">
          Browse standout sale, rental, and launch-ready properties curated for better visibility, stronger trust, and a cleaner premium experience.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {listings.map((listing, index) => (
          <motion.article
            key={listing.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.1 }}
            className="group overflow-hidden rounded-[28px] border border-border bg-surface shadow-panel transition-transform duration-300 hover:-translate-y-1"
          >
            <div className={`border-b border-border p-6 ${listing.visualTone}`}>
              <div className="flex items-center justify-between gap-3">
                <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${listing.badgeTone}`}>
                  {listing.status}
                </span>
                <span className="text-sm font-medium text-muted-foreground">{listing.location}</span>
              </div>

              <div className="mt-16">
                <p className="text-xs font-bold uppercase tracking-[0.32em] text-primary/70">{listing.category}</p>
                <h3 className="mt-3 text-[2.35rem] leading-none text-foreground">{listing.title}</h3>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {listing.details.map((detail) => (
                  <span key={detail} className="rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-semibold text-ink-soft">
                    {detail}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-display text-[2.6rem] leading-none text-foreground">{listing.price}</p>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{listing.description}</p>
                </div>
                <Button variant="secondary" size="sm">Details</Button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default ListingsSection;
