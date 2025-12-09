import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { connectDB } from "@/lib/db";
import { User } from "@/models/Users";
import { JwtPayload } from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    // const token = (await cookies()).get("auth_token")?.value
    const token = req.cookies.get("auth_token")?.value;
    if (!token) return NextResponse.json({ authenticated: false });

    const payload: JwtPayload | null = await verifyToken(token);
    if (!payload?.id) return NextResponse.json({ authenticated: false });

    await connectDB();
    const user = await User.findById(payload.id)
      .select("firstName lastName email role onboarding")
      .lean();
    if (!user) return NextResponse.json({ authenticated: false });
    return NextResponse.json({ authenticated: true, user });
  } catch (error) {
    console.log("me error", error);
    return NextResponse.json({ authenticated: false });
  }
}
