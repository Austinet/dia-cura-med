import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/Users";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Invalid verification token" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({
      verificationToken: token,
    });
    // verificationTokenExpiry: { $gt: new Date() },
    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.verificationToken = "";
    await user.save();

    return NextResponse.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("Verification error", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
