import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEMO_BLOGS = [
  { id: 1, title: "Top 10 Real Estate Trends in 2026", slug: "top-10-real-estate-trends-2026", excerpt: "Discover the latest trends shaping the real estate market this year.", category: "Market Trends", status: "published" },
  { id: 2, title: "How to Stage Your Home for a Quick Sale", slug: "stage-home-quick-sale", excerpt: "Expert tips on preparing your property to attract buyers.", category: "Selling Tips", status: "published" },
  { id: 3, title: "First-Time Home Buyer's Guide", slug: "first-time-buyer-guide", excerpt: "Everything you need to know before buying your first home.", category: "Buying Guide", status: "published" },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status") || "published";
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where: any = { status };
    if (category) where.category = category;

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.blog.count({ where: { status: "published" } }),
    ]);

    return NextResponse.json({
      success: true,
      blogs,
      total,
    });
  } catch (error: any) {
    console.error("Error fetching blogs:", error.message);
    return NextResponse.json({
      success: true,
      blogs: DEMO_BLOGS,
      total: DEMO_BLOGS.length,
      demo: true,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title, slug, excerpt, content, category,
      featuredImage, status, author, readTime, metaTitle, metaDescription
    } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        category: category || "General",
        featuredImage,
        status: status || "draft",
        author: author || "Prolific Properties",
        readTime: readTime || "5 min read",
        metaTitle,
        metaDescription,
      },
    });

    return NextResponse.json({ success: true, blog });
  } catch (error: any) {
    console.error("Error creating blog:", error.message);
    return NextResponse.json(
      { error: "Failed to create blog", details: error.message },
      { status: 500 }
    );
  }
}
