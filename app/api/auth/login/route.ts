import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/lib/auth";

// Demo mode - works without database
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

    // Try database first, fallback to demo mode
    let user = null;
    
    try {
      const { query } = await import("@/lib/db");
      const { comparePassword } = await import("@/lib/auth");
      
      const result = await query(
        "SELECT id, email, password FROM users WHERE email = $1",
        [email]
      );

      if (result.rows.length > 0) {
        const dbUser = result.rows[0];
        const isValidPassword = await comparePassword(password, dbUser.password);
        if (isValidPassword) {
          user = dbUser;
        }
      }
    } catch (dbError) {
      // Database not available, use demo mode
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
