import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const blog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blog });
  } catch (error: any) {
    console.error("Error fetching blog:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
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
      title, excerpt, content, category,
      featuredImage, status, author, readTime, metaTitle, metaDescription
    } = body;

    // If a new slug is provided, check if it already exists
    if (body.slug && body.slug !== slug) {
      const existingBlog = await prisma.blog.findUnique({
        where: { slug: body.slug },
      });

      if (existingBlog) {
        return NextResponse.json(
          { error: "A blog post with this slug already exists. Please choose a different slug." },
          { status: 409 }
        );
      }
    }

    const updateData: any = {
      ...(title !== undefined && { title }),
      ...(excerpt !== undefined && { excerpt }),
      ...(content !== undefined && { content }),
      ...(category !== undefined && { category }),
      ...(featuredImage !== undefined && { featuredImage }),
      ...(status !== undefined && { status }),
      ...(author !== undefined && { author }),
      ...(readTime !== undefined && { readTime }),
      ...(metaTitle !== undefined && { metaTitle }),
      ...(metaDescription !== undefined && { metaDescription }),
    };

    // Include slug update if provided
    if (body.slug && body.slug !== slug) {
      updateData.slug = body.slug;
    }

    const blog = await prisma.blog.update({
      where: { slug },
      data: updateData,
    });

    return NextResponse.json({ success: true, blog });
  } catch (error: any) {
    console.error("Error updating blog:", error.message);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to update blog" },
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
    await prisma.blog.delete({
      where: { slug },
    });

    return NextResponse.json({ success: true, message: "Blog deleted" });
  } catch (error: any) {
    console.error("Error deleting blog:", error.message);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
