import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTAStrip from "@/components/CTAStrip";
import { Button } from "@/components/ui/button";

async function getBlog(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blogs/${slug}`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data.success ? data.blog : null;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

async function getBlogs(category?: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blogs?status=published${category ? `&category=${category}` : ""}&limit=3`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data.success ? data.blogs : [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  
  if (!blog) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: blog.meta_title || `${blog.title} | Prolific Properties Blog`,
    description: blog.meta_description || blog.excerpt,
    openGraph: {
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.excerpt,
      type: "article",
      publishedTime: blog.created_at,
      authors: [blog.author],
    },
  };
}

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [blog, relatedBlogs] = await Promise.all([
    getBlog(slug),
    getBlogs(),
  ]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container py-20 text-center">
          <h1 className="text-4xl text-foreground">Blog Post Not Found</h1>
          <p className="mt-4 text-muted-foreground">The article you're looking for doesn't exist.</p>
          <Button asChild className="mt-8">
            <Link href="/blogs">Browse Blogs</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const related = relatedBlogs.filter((b: any) => b.slug !== slug).slice(0, 3);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt,
    author: {
      "@type": "Organization",
      name: blog.author || "Prolific Properties",
    },
    publisher: {
      "@type": "Organization",
      name: "Prolific Properties",
      logo: {
        "@type": "ImageObject",
        url: "https://www.prolificproperties.in/logo.png",
      },
    },
    datePublished: blog.created_at,
    dateModified: blog.updated_at,
  };

  return (
    <div className="page-shell min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      
      <Navbar />
      <main>
        <article className="py-12">
          <div className="container max-w-4xl">
            <Link href="/blogs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
              ← Back to Blogs
            </Link>

            <div className="mt-8">
              <span className="rounded-full bg-primary-soft px-4 py-1 text-sm font-semibold text-primary">
                {blog.category}
              </span>

              <h1 className="mt-6 text-[clamp(2.5rem,5vw,4rem)] leading-tight text-foreground">
                {blog.title}
              </h1>

              <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                <span>By {blog.author}</span>
                <span>•</span>
                <span>{new Date(blog.created_at).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>
                <span>•</span>
                <span>{blog.read_time}</span>
              </div>
            </div>

            <div className="mt-10 aspect-[16/9] rounded-[28px] bg-gradient-panel" />

            <div 
              className="prose prose-lg max-w-none mt-10"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            <div className="mt-12 flex flex-wrap gap-3">
              <span className="text-sm text-muted-foreground">Share:</span>
              <Button variant="outline" size="sm" className="rounded-full">
                Facebook
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Twitter
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                LinkedIn
              </Button>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="py-12">
            <div className="container">
              <h2 className="text-3xl font-bold text-foreground">Related Articles</h2>
              <div className="mt-8 grid gap-8 md:grid-cols-3">
                {related.map((b: any) => (
                  <Link
                    key={b.id}
                    href={`/blogs/${b.slug}`}
                    className="rounded-[28px] border border-border bg-surface p-6 shadow-panel transition-transform hover:-translate-y-1"
                  >
                    <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                      {b.category}
                    </span>
                    <h3 className="mt-4 text-xl leading-tight text-foreground">{b.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{b.excerpt}</p>
                    <p className="mt-4 text-xs text-muted-foreground">{b.read_time}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTAStrip />
      </main>
      <Footer />
    </div>
  );
}
