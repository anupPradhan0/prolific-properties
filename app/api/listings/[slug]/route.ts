import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const listing = await prisma.listing.findUnique({
      where: { slug },
    });

    if (!listing) {
      return NextResponse.json(
        { error: "Listing not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, listing });
  } catch (error: any) {
    console.error("Error fetching listing:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch listing" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const body = await request.json();
    const {
      title, description, price, priceType, propertyType,
      location, area, bedrooms, bathrooms, status, featured, imageUrl, metaTitle, metaDescription
    } = body;

    const parsedPrice = price !== undefined 
      ? (typeof price === 'string' ? parseInt(price.replace(/[^0-9]/g, '')) : Number(price))
      : undefined;
    const parsedArea = area !== undefined
      ? (typeof area === 'string' ? parseInt(area.replace(/[^0-9]/g, '')) : Number(area))
      : undefined;

    const listing = await prisma.listing.update({
      where: { slug },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price: parsedPrice }),
        ...(priceType !== undefined && { priceType }),
        ...(propertyType !== undefined && { propertyType }),
        ...(location !== undefined && { location }),
        ...(area !== undefined && { area: parsedArea }),
        ...(bedrooms !== undefined && { bedrooms: bedrooms ? Number(bedrooms) : null }),
        ...(bathrooms !== undefined && { bathrooms: bathrooms ? Number(bathrooms) : null }),
        ...(status !== undefined && { status }),
        ...(featured !== undefined && { featured }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(metaTitle !== undefined && { metaTitle }),
        ...(metaDescription !== undefined && { metaDescription }),
      },
    });

    return NextResponse.json({ success: true, listing });
  } catch (error: any) {
    console.error("Error updating listing:", error.message);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to update listing" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    await prisma.listing.delete({
      where: { slug },
    });

    return NextResponse.json({ success: true, message: "Listing deleted" });
  } catch (error: any) {
    console.error("Error deleting listing:", error.message);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to delete listing" },
      { status: 500 }
    );
  }
}
