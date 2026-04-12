import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEMO_LISTINGS = [
  { id: 1, title: "Modern Downtown Apartment", slug: "modern-downtown-apartment", price: 450000, priceType: "sale", propertyType: "apartment", location: "Downtown Metro City", area: 1200, bedrooms: 2, bathrooms: 2, featured: true, imageUrl: null, status: "active" },
  { id: 2, title: "Cozy Suburban Family Home", slug: "cozy-suburban-family-home", price: 3500, priceType: "rent", propertyType: "house", location: "Peaceful Meadows", area: 2000, bedrooms: 4, bathrooms: 3, featured: true, imageUrl: null, status: "active" },
  { id: 3, title: "Luxury Penthouse Suite", slug: "luxury-penthouse-suite", price: 1200000, priceType: "sale", propertyType: "penthouse", location: "Waterfront District", area: 3500, bedrooms: 4, bathrooms: 4, featured: true, imageUrl: null, status: "active" },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const priceType = searchParams.get("priceType");
    const featured = searchParams.get("featured");
    const status = searchParams.get("status") || "active";
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where: any = { status };
    if (type) where.propertyType = type;
    if (priceType) where.priceType = priceType;
    if (featured === "true") where.featured = true;

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        take: limit,
        skip: offset,
      }),
      prisma.listing.count({ where: { status: "active" } }),
    ]);

    return NextResponse.json({
      success: true,
      listings,
      total,
    });
  } catch (error: any) {
    console.error("Error fetching listings:", error.message);
    return NextResponse.json({
      success: true,
      listings: DEMO_LISTINGS,
      total: DEMO_LISTINGS.length,
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
      title, slug, description, price, priceType, propertyType,
      location, area, bedrooms, bathrooms, featured, imageUrl, metaTitle, metaDescription
    } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }

    const parsedPrice = typeof price === 'string' ? parseInt(price.replace(/[^0-9]/g, '')) : Number(price);
    const parsedArea = area ? (typeof area === 'string' ? parseInt(area.replace(/[^0-9]/g, '')) : Number(area)) : null;

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return NextResponse.json(
        { error: "Price must be a valid number" },
        { status: 400 }
      );
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        slug,
        description,
        price: parsedPrice,
        priceType: priceType || "sale",
        propertyType: propertyType || "apartment",
        location,
        area: parsedArea,
        bedrooms: bedrooms ? Number(bedrooms) : null,
        bathrooms: bathrooms ? Number(bathrooms) : null,
        featured: featured || false,
        imageUrl,
        metaTitle,
        metaDescription,
      },
    });

    return NextResponse.json({ success: true, listing });
  } catch (error: any) {
    console.error("Error creating listing:", error.message);
    return NextResponse.json(
      { error: "Failed to create listing", details: error.message },
      { status: 500 }
    );
  }
}
