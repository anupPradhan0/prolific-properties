"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Listing {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  priceType: string;
  propertyType: string;
  location: string;
  area: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  status: string;
  featured: boolean;
  imageUrl: string | null;
}

const ListingsSection = () => {
  const searchParams = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const intentFilter = searchParams.get("intent") ?? "";
  const typeFilter = searchParams.get("type") ?? "";
  const queryFilter = searchParams.get("q")?.trim().toLowerCase() ?? "";

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("/api/listings?status=active");
        const data = await res.json();
        if (data.success) {
          setListings(data.listings);
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
      setLoading(false);
    };
    fetchListings();
  }, []);

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const matchesIntent = !intentFilter || listing.priceType === intentFilter;
      const matchesType = !typeFilter || listing.propertyType === typeFilter;
      const matchesQuery =
        !queryFilter ||
        listing.title.toLowerCase().includes(queryFilter) ||
        listing.location.toLowerCase().includes(queryFilter) ||
        listing.propertyType.toLowerCase().includes(queryFilter);

      return matchesIntent && matchesType && matchesQuery;
    });
  }, [listings, intentFilter, typeFilter, queryFilter]);

  const getBadgeTone = (listing: Listing) => {
    if (listing.featured) {
      return "border-success/20 bg-surface text-success";
    }
    if (listing.priceType === "rent") {
      return "border-primary/12 bg-primary-soft text-primary-deep";
    }
    return "border-primary/15 bg-surface text-primary";
  };

  const getStatusLabel = (listing: Listing) => {
    if (listing.featured) return "Featured";
    if (listing.priceType === "rent") return "For Rent";
    return "For Sale";
  };

  const getDetails = (listing: Listing) => {
    const details: string[] = [];
    if (listing.bedrooms) details.push(`${listing.bedrooms} BHK`);
    if (listing.area) details.push(`${listing.area} sqft`);
    if (listing.bathrooms) details.push(`${listing.bathrooms} Bath`);
    if (listing.propertyType === "commercial") {
      details.push("Commercial");
    }
    return details;
  };

  if (loading) {
    return (
      <section id="listings" className="scroll-mt-24 py-20">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 animate-pulse rounded-[28px] bg-muted" />
            ))}
          </div>
        </div>
      </section>
    );
  }

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
            <span className="mt-3 block font-semibold text-foreground">Showing {filteredListings.length} listings</span>
          </p>
        </div>

        {filteredListings.length === 0 ? (
          <div className="rounded-[28px] border border-border bg-surface p-8 shadow-panel">
            <h3 className="text-3xl leading-tight text-foreground">No listings match these filters yet.</h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Try a broader budget range or switch property type to see available homes and commercial options.
            </p>
            <Button asChild size="lg" className="mt-6">
              <Link href="#search">Adjust filters</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {filteredListings.map((listing, index) => (
              <motion.article
                key={listing.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                className="group overflow-hidden rounded-[28px] border border-border bg-surface shadow-panel transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {listing.imageUrl ? (
                    <img
                      src={listing.imageUrl}
                      alt={listing.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : null}
                  <div className={`absolute inset-0 bg-gradient-to-br from-surface-tint to-surface ${listing.imageUrl ? 'hidden' : ''}`} />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${getBadgeTone(listing)}`}>
                      {getStatusLabel(listing)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.32em] text-primary/70">{listing.propertyType}</p>
                  <h3 className="mt-2 text-2xl leading-tight text-foreground">{listing.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{listing.location}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {getDetails(listing).map((detail) => (
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
                    <Button asChild variant="secondary" size="sm" className="w-full sm:w-auto">
                      <Link href={`/buy/${listing.slug}`}>Details</Link>
                    </Button>
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
