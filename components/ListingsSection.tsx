"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

const listings = [
  {
    intent: "buy",
    type: "villa",
    saleBudgetLakh: 125,
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
    intent: "buy",
    type: "apartment",
    saleBudgetLakh: 85,
    status: "For Sale",
    badgeTone: "border-primary/15 bg-surface text-primary",
    visualTone: "bg-surface-tint",
    category: "Apartment",
    title: "Park View Residency",
    location: "Kharavela Nagar, Bhubaneswar",
    price: "₹85 L",
    description: "Modern 3BHK apartment with park view, modular kitchen, and premium amenities.",
    details: ["3 BHK", "1,800 sqft", "2 Bath"],
  },
  {
    intent: "rent",
    type: "apartment",
    rentBudgetK: 35,
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
    intent: "buy",
    type: "plot",
    saleBudgetLakh: 45,
    status: "For Sale",
    badgeTone: "border-primary/15 bg-surface text-primary",
    visualTone: "bg-surface-tint",
    category: "Plot",
    title: "Green Valley Plots",
    location: "Jharpada, Bhubaneswar",
    price: "₹45 L",
    description: "RCC road facing plots in a developed locality with clear legal documentation.",
    details: ["1,200 sqft", "East facing", "Corner plot"],
  },
  {
    intent: "commercial",
    type: "commercial",
    saleBudgetLakh: 210,
    status: "New Launch",
    badgeTone: "border-success/20 bg-surface text-success",
    visualTone: "bg-primary-soft",
    category: "Commercial",
    title: "Emerald Heights Business",
    location: "CSPUR, Bhubaneswar",
    price: "₹2.10 Cr",
    description: "Premium office inventory with wider frontage, modern utility planning, and launch-stage commercial pricing support.",
    details: ["3,200 sqft", "Corner block", "High footfall"],
  },
  {
    intent: "rent",
    type: "commercial",
    rentBudgetK: 150,
    status: "For Rent",
    badgeTone: "border-primary/12 bg-primary-soft text-primary-deep",
    visualTone: "bg-surface-strong",
    category: "Commercial",
    title: "Tech Hub Office Space",
    location: "Infopark, Bhubaneswar",
    price: "₹1.5 L/mo",
    description: "Fully furnished office space in IT hub with 24/7 power backup and security.",
    details: ["2,000 sqft", "Furnished", "Parking"],
  },
];

const ListingsSection = () => {
  const searchParams = useSearchParams();

  const intentFilter = searchParams.get("intent") ?? "";
  const typeFilter = searchParams.get("type") ?? "";
  const queryFilter = searchParams.get("q")?.trim().toLowerCase() ?? "";
  const minBudget = Number(searchParams.get("min"));
  const maxBudget = Number(searchParams.get("max"));

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const matchesIntent = !intentFilter || listing.intent === intentFilter;

      const matchesType = !typeFilter || listing.type === typeFilter;

      const matchesQuery =
        !queryFilter ||
        listing.title.toLowerCase().includes(queryFilter) ||
        listing.location.toLowerCase().includes(queryFilter) ||
        listing.category.toLowerCase().includes(queryFilter);

      let matchesBudget = true;
      if (Number.isFinite(minBudget) && Number.isFinite(maxBudget)) {
        if (intentFilter === "rent") {
          matchesBudget = typeof listing.rentBudgetK === "number" && listing.rentBudgetK >= minBudget && listing.rentBudgetK <= maxBudget;
        } else {
          matchesBudget =
            typeof listing.saleBudgetLakh === "number" &&
            listing.saleBudgetLakh >= minBudget &&
            listing.saleBudgetLakh <= maxBudget;
        }
      }

      return matchesIntent && matchesType && matchesQuery && matchesBudget;
    });
  }, [intentFilter, maxBudget, minBudget, queryFilter, typeFilter]);

  return (
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
            <span className="mt-3 block font-semibold text-foreground">Showing {filteredListings.length} of {listings.length} listings</span>
          </p>
        </div>

        {filteredListings.length === 0 ? (
          <div className="rounded-[28px] border border-border bg-surface p-8 shadow-panel">
            <h3 className="text-3xl leading-tight text-foreground">No listings match these filters yet.</h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Try a broader budget range or switch property type to see available homes and commercial options.
            </p>
            <Button asChild size="lg" className="mt-6">
              <a href="#search">Adjust filters</a>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {filteredListings.map((listing, index) => (
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
        )}
      </div>
    </section>
  );
};

export default ListingsSection;
