import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEMO_CONTACTS = [
  {
    id: 1,
    fullName: "John Doe",
    phone: "+91 9876543210",
    email: "john@example.com",
    interest: "buy",
    budget: "₹50L - ₹80L",
    message: "Looking for a 3BHK apartment in Kharavela Nagar",
    status: "active",
    createdAt: new Date("2026-04-15T10:30:00Z"),
    updatedAt: new Date("2026-04-15T10:30:00Z"),
  },
  {
    id: 2,
    fullName: "Jane Smith",
    phone: "+91 9876543211",
    email: "jane@example.com",
    interest: "rent",
    budget: "₹25K - ₹40K",
    message: "Need a furnished 2BHK for family",
    status: "inprocess",
    createdAt: new Date("2026-04-14T15:20:00Z"),
    updatedAt: new Date("2026-04-16T09:15:00Z"),
  },
  {
    id: 3,
    fullName: "Mike Johnson",
    phone: "+91 9876543212",
    email: "mike@example.com",
    interest: "commercial",
    budget: "₹2Cr - ₹3Cr",
    message: "Looking for office space in Infopark",
    status: "completed",
    createdAt: new Date("2026-04-10T11:45:00Z"),
    updatedAt: new Date("2026-04-18T14:30:00Z"),
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    let contacts;
    let total;

    try {
      // Try to fetch from database
      const whereClause = status && status !== "all" ? { status } : {};

      contacts = await prisma.contact.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      });

      total = await prisma.contact.count({
        where: whereClause,
      });
    } catch (dbError) {
      console.log("Database not available, using demo contacts");
      // Fallback to demo data if database is not available
      const filteredContacts = status && status !== "all"
        ? DEMO_CONTACTS.filter(c => c.status === status)
        : DEMO_CONTACTS;

      contacts = filteredContacts.slice(offset, offset + limit);
      total = filteredContacts.length;
    }

    return NextResponse.json({
      contacts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "Contact ID and status are required" },
        { status: 400 }
      );
    }

    const validStatuses = ["active", "inprocess", "completed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be: active, inprocess, or completed" },
        { status: 400 }
      );
    }

    try {
      const updatedContact = await prisma.contact.update({
        where: { id: parseInt(id) },
        data: { status, updatedAt: new Date() },
      });

      return NextResponse.json({
        success: true,
        contact: updatedContact,
      });
    } catch (dbError) {
      console.log("Database not available, cannot update contact");
      return NextResponse.json(
        { error: "Database not available" },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}