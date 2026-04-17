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

    // For now, we'll just log the contact submission
    // In a real application, you might want to:
    // 1. Save to database
    // 2. Send email notification
    // 3. Integrate with CRM system

    console.log("New contact form submission:", {
      fullName,
      phone,
      email,
      interest,
      budget,
      message,
      consent,
      timestamp: new Date().toISOString(),
    });

    // You could save to database here if you add a Contact model to Prisma schema
    // const contact = await prisma.contact.create({
    //   data: { fullName, phone, email, interest, budget, message },
    // });

    return NextResponse.json({
      success: true,
      message: "Thank you for your enquiry. We'll contact you shortly.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}