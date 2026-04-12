import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTAStrip from "@/components/CTAStrip";
import { Button } from "@/components/ui/button";

async function getListing(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/listings/${slug}`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data.success ? data.listing : null;
  } catch (error) {
    console.error("Error fetching listing:", error);
    return null;
  }
}

async function getListings() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/listings?status=active&limit=3`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data.success ? data.listings : [];
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListing(slug);
  
  if (!listing) {
    return {
      title: "Listing Not Found",
    };
  }

  return {
    title: listing.meta_title || `${listing.title} | ${listing.location} | Prolific Properties`,
    description: listing.meta_description || `${listing.title} - ${listing.bedrooms ? listing.bedrooms + " BHK" : ""} ${listing.property_type} in ${listing.location}. ${listing.price}. Book a site visit today.`,
    openGraph: {
      title: listing.meta_title || listing.title,
      description: listing.meta_description || listing.description,
      type: "website",
    },
  };
}

export default async function ListingDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [listing, relatedListings] = await Promise.all([
    getListing(slug),
    getListings(),
  ]);

  if (!listing) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container py-20 text-center">
          <h1 className="text-4xl text-foreground">Listing Not Found</h1>
          <p className="mt-4 text-muted-foreground">The listing you're looking for doesn't exist.</p>
          <Button asChild className="mt-8">
            <Link href="/buy">Browse Listings</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const related = relatedListings.filter((l: any) => l.slug !== slug).slice(0, 3);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.title,
    description: listing.description,
    url: `https://www.prolificproperties.in/buy/${listing.slug}`,
    offers: {
      "@type": "Offer",
      price: listing.price.replace(/[^0-9.]/g, ""),
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    numberOfRooms: listing.bedrooms?.toString(),
    floorSize: {
      "@type": "QuantitativeValue",
      value: listing.area?.replace(/[^0-9]/g, ""),
      unitCode: "FTK",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: listing.location,
      addressRegion: "Odisha",
      addressCountry: "IN",
    },
  };

  return (
    <div className="page-shell min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      
      <Navbar />
      <main>
        <section className="py-12">
          <div className="container">
            <Link href="/buy" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
              ← Back to Listings
            </Link>

            <div className="mt-8 grid gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2">
                {listing.image_url ? (
                  <img
                    src={listing.image_url}
                    alt={listing.title}
                    className="aspect-[16/9] w-full rounded-[28px] object-cover"
                  />
                ) : (
                  <div className="aspect-[16/9] rounded-[28px] bg-gradient-panel" />
                )}
                
                <div className="mt-8">
                  <span className={`inline-flex rounded-full border px-4 py-1 text-sm font-semibold ${
                    listing.price_type === "rent" 
                      ? "border-primary/12 bg-primary-soft text-primary-deep" 
                      : "border-primary/15 bg-surface text-primary"
                  }`}>
                    {listing.price_type === "rent" ? "For Rent" : "For Sale"}
                  </span>
                  
                  <h1 className="mt-4 text-[clamp(2.5rem,5vw,4rem)] leading-tight text-foreground">
                    {listing.title}
                  </h1>
                  
                  <p className="mt-2 text-lg text-muted-foreground">{listing.location}</p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {listing.bedrooms && (
                      <span className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold">
                        {listing.bedrooms} BHK
                      </span>
                    )}
                    {listing.area && (
                      <span className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold">
                        {listing.area}
                      </span>
                    )}
                    {listing.bathrooms && (
                      <span className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold">
                        {listing.bathrooms} Bath
                      </span>
                    )}
                    <span className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold capitalize">
                      {listing.property_type}
                    </span>
                  </div>

                  <div className="mt-8">
                    <h2 className="text-2xl font-bold text-foreground">Description</h2>
                    <p className="mt-4 text-base leading-7 text-muted-foreground">
                      {listing.description}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="sticky top-24 rounded-[28px] border border-border bg-surface p-8 shadow-panel">
                  <p className="font-display text-5xl text-foreground">{listing.price}</p>
                  {listing.price_type === "rent" && (
                    <p className="text-sm text-muted-foreground">per month</p>
                  )}

                  <div className="mt-8 space-y-4">
                    <h3 className="font-semibold text-foreground">Property Details</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Property Type</span>
                        <span className="font-semibold capitalize">{listing.property_type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <span className="font-semibold capitalize">{listing.price_type}</span>
                      </div>
                      {listing.bedrooms && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Bedrooms</span>
                          <span className="font-semibold">{listing.bedrooms}</span>
                        </div>
                      )}
                      {listing.bathrooms && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Bathrooms</span>
                          <span className="font-semibold">{listing.bathrooms}</span>
                        </div>
                      )}
                      {listing.area && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Area</span>
                          <span className="font-semibold">{listing.area}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location</span>
                        <span className="font-semibold">{listing.location}</span>
                      </div>
                    </div>
                  </div>

                  <Button size="lg" className="mt-8 w-full">
                    Book Site Visit
                  </Button>
                  <Button size="lg" variant="outline" className="mt-3 w-full">
                    Enquire Now
                  </Button>
                </div>
              </div>
            </div>

            {related.length > 0 && (
              <div className="mt-20">
                <h2 className="text-3xl font-bold text-foreground">Related Listings</h2>
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  {related.map((l: any) => (
                    <Link
                      key={l.id}
                      href={`/buy/${l.slug}`}
                      className="rounded-[28px] border border-border bg-surface p-6 shadow-panel transition-transform hover:-translate-y-1"
                    >
                      <h3 className="text-xl text-foreground">{l.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{l.location}</p>
                      <p className="mt-2 font-display text-2xl text-foreground">{l.price}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
        <CTAStrip />
      </main>
      <Footer />
    </div>
  );
}
