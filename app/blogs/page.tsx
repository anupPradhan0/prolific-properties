import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTAStrip from "@/components/CTAStrip";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Read the latest insights on real estate in Bhubaneswar - property tips, market trends, and buying guides from Prolific Properties.",
};

const categories = [
  { label: "All", value: "" },
  { label: "Buying Guide", value: "Buying Guide" },
  { label: "Market Insights", value: "Market Insights" },
  { label: "Legal Guide", value: "Legal Guide" },
  { label: "Renting Guide", value: "Renting Guide" },
];

async function getBlogs(category?: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blogs?status=published${category ? `&category=${category}` : ""}`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data.success ? data.blogs : [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function Blogs({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams;
  const blogs = await getBlogs(params.category);

  return (
    <div className="page-shell min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="py-12 md:py-16">
          <div className="container">
            <div>
              <span className="section-label">Our Blog</span>
              <h1 className="mt-4 text-[clamp(2.2rem,5vw,4rem)] leading-tight text-foreground">
                Insights & Guides
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                Expert perspectives on real estate in Bhubaneswar - from buying tips to market trends.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.value}
                  href={cat.value ? `/blogs?category=${cat.value}` : "/blogs"}
                  className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
                    params.category === cat.value || (!params.category && cat.value === "")
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-surface text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            {blogs.length === 0 ? (
              <div className="mt-16 rounded-[28px] border border-border bg-surface p-8 shadow-panel text-center">
                <h3 className="text-2xl text-foreground">No blog posts found</h3>
                <p className="mt-2 text-muted-foreground">Check back soon for new articles!</p>
              </div>
            ) : (
              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((post: any) => (
                  <article
                    key={post.id}
                    className="group overflow-hidden rounded-[28px] border border-border bg-surface shadow-panel transition-transform duration-300 hover:-translate-y-1"
                  >
                    {post.featuredImage ? (
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.innerHTML = '<div class="h-full w-full bg-gradient-panel"></div>';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="aspect-[4/3] bg-gradient-panel" />
                    )}
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
                        <span className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>
                        <Button asChild variant="link" size="sm" className="text-primary">
                          <Link href={`/blogs/${post.slug}`}>Read more →</Link>
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

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
