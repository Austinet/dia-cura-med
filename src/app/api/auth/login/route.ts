import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/Users";
import argon2 from "argon2";
import { signToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check if email is verified
    // if (["doctor", "patient"].includes(user.role) && !user.isVerified) {
    //   return NextResponse.json(
    //     { message: "Please verify your email before logging in" },
    //     { status: 403 }
    //   );
    // }

    // Check password
    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = signToken({
      id: user._id,
      role: user.role,
      email: user.email,
      onboarding: user.onboarding,
    });

    // set HttpOnly cookie
    const res = NextResponse.json({
      success: true,
      role: user.role,
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      onboarding: user.onboarding,
    });

    res.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
