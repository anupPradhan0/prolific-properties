import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateToken, comparePassword } from "@/lib/auth";

const DEMO_USERS = [
  { id: 1, email: "abhilash.panda8383@gmail.com", password: "abhilash8383" }
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    let user = null;

    try {
      const dbUser = await prisma.user.findUnique({
        where: { email },
      });

      if (dbUser) {
        const isValidPassword = await comparePassword(password, dbUser.password);
        if (isValidPassword) {
          user = dbUser;
        }
      }
    } catch (dbError) {
      console.log("Database not available, using demo mode");
      user = DEMO_USERS.find(u => u.email === email && u.password === password);
    }

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = generateToken(user.id, user.email);

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
