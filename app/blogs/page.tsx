import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTAStrip from "@/components/CTAStrip";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Read the latest insights on real estate in Bhubaneswar - property tips, market trends, and buying guides from Prolific Properties.",
};

const blogPosts = [
  {
    slug: "first-home-guide-2026",
    title: "A Complete Guide to Buying Your First Home in Bhubaneswar",
    excerpt: "From budget planning to site visits - everything first-time buyers need to know about purchasing property in Bhubaneswar.",
    category: "Buying Guide",
    date: "March 15, 2026",
    readTime: "8 min read",
  },
  {
    slug: "bhubaneswar-neighborhoods",
    title: "Top 5 Neighborhoods in Bhubaneswar for Home Buyers",
    excerpt: "Exploring the best localities - from Patia to Chandrasekharpur - and what makes each area unique for different buyer needs.",
    category: "Market Insights",
    date: "March 8, 2026",
    readTime: "6 min read",
  },
  {
    slug: "villa-vs-apartment",
    title: "Villa or Apartment: Which is Right for You?",
    excerpt: "A detailed comparison of villas and apartments in Bhubaneswar covering lifestyle, investment potential, and maintenance aspects.",
    category: "Buying Guide",
    date: "February 28, 2026",
    readTime: "5 min read",
  },
  {
    slug: "commercial-real-estate-trends",
    title: "Commercial Real Estate Trends in Bhubaneswar 2026",
    excerpt: "Analyzing the growth of commercial spaces, office demand, and retail opportunities in the Odisha capital.",
    category: "Market Insights",
    date: "February 20, 2026",
    readTime: "7 min read",
  },
  {
    slug: "property-documents-checklist",
    title: "Essential Documents Checklist for Property Purchase",
    excerpt: "Don't get caught without these documents. A comprehensive checklist for hassle-free property transactions in Odisha.",
    category: "Legal Guide",
    date: "February 12, 2026",
    readTime: "4 min read",
  },
  {
    slug: "renting-in-bhubaneswar",
    title: "The Complete Renter's Guide to Bhubaneswar",
    excerpt: "From rental agreements to deposits - everything tenants need to know about renting in Bhubaneswar.",
    category: "Renting Guide",
    date: "February 5, 2026",
    readTime: "6 min read",
  },
];

export default function Blogs() {
  return (
    <div className="page-shell min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mt-4">
              <span className="section-label">Our Blog</span>
              <h1 className="mt-4 text-[clamp(2.2rem,5vw,4rem)] leading-tight text-foreground">
                Insights & Guides
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                Expert perspectives on real estate in Bhubaneswar - from buying tips to market trends.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group overflow-hidden rounded-[28px] border border-border bg-surface shadow-panel transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] bg-gradient-panel" />
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs font-semibold">
                      <span className="rounded-full bg-primary-soft px-3 py-1 text-primary">{post.category}</span>
                      <span className="text-muted-foreground">{post.readTime}</span>
                    </div>
                    <h2 className="mt-4 text-xl leading-tight text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-sm text-muted-foreground">{post.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                      <Button variant="link" size="sm" className="text-primary">
                        Read more →
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Button size="lg" variant="outline" className="rounded-full">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        <CTAStrip />
      </main>
      <Footer />
    </div>
  );
}
