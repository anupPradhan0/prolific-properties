import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { fullName, phone, email, interest, budget, message, consent } = await request.json();

    if (!fullName || !phone || !email || !interest || !message || !consent) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Save contact to database
    const contact = await prisma.contact.create({
      data: {
        fullName,
        phone,
        email,
        interest,
        budget,
        message,
        status: "active", // Default status
      },
    });

    console.log("New contact form submission saved:", contact);

    return NextResponse.json({
      success: true,
      message: "Thank you for your enquiry. We'll contact you shortly.",
      contactId: contact.id,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}