import { prisma } from "@/lib/prisma";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  let listingEntries: Array<{
    url: string;
    lastModified: Date;
    changeFrequency: "daily";
    priority: number;
  }> = [];

  let blogEntries: Array<{
    url: string;
    lastModified: Date;
    changeFrequency: "weekly";
    priority: number;
  }> = [];

  try {
    const [listings, blogs] = await Promise.all([
      prisma.listing.findMany({
        where: { status: "active" },
        select: { slug: true, updatedAt: true },
      }),
      prisma.blog.findMany({
        where: { status: "published" },
        select: { slug: true, updatedAt: true },
      }),
    ]);

    listingEntries = listings.map((listing: { slug: string; updatedAt: Date }) => ({
      url: `${baseUrl}/buy/${listing.slug}`,
      lastModified: listing.updatedAt,
      changeFrequency: "daily",
      priority: 0.8,
    }));

    blogEntries = blogs.map((blog: { slug: string; updatedAt: Date }) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: blog.updatedAt,
      changeFrequency: "weekly",
      priority: 0.75,
    }));
  } catch {
    // Fallback to static routes when DB is unavailable
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/buy`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...listingEntries,
    ...blogEntries,
  ];
}
