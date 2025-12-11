import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Patient } from "@/models/Patient";
import { signToken, verifyToken } from "@/lib/jwt";
import { JwtPayload } from "jsonwebtoken";
import { User } from "@/models/Users";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;
    if (!token)
      return NextResponse.json(
        { message: "Unauthorized: No token" },
        { status: 401 }
      );

    const payload: JwtPayload | null = await verifyToken(token);
    if (!payload?.id)
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    const body = await req.json();
    const { personalInfo, diabetesInfo } = body;

    if (!personalInfo || !diabetesInfo) {
      return NextResponse.json(
        { message: "Missing required onboarding fields" },
        { status: 400 }
      );
    }

    await connectDB();

    let patient = await Patient.findOne({ userId: payload.id });
    if (!patient) {
      patient = await Patient.create({
        userId: payload.id,
        personalInfo,
        diabetesInfo,
      });
    } else {
      patient.personalInfo = { ...patient.personalInfo, ...personalInfo };
      patient.diabetesInfo = { ...patient.diabetesInfo, ...diabetesInfo };
      await patient.save();
    }

    //profile completed
    const user = await User.findById(payload.id);
    if (user) {
      user.onboarding = "completed";
      await user.save();
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    // Generate JWT
    const newToken = signToken({
      id: user._id,
      role: user.role,
      email: user.email,
      onboarding: "completed",
    });

    // set HttpOnly cookie
    const res = NextResponse.json({
      success: true,
      message: "Profile completed successfully",
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      onboarding: user.onboarding,
    });

    res.cookies.set({
      name: "auth_token",
      value: newToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return res;
  } catch (err) {
    console.error("Onboarding error: ", err);
    return NextResponse.json(
      { message: "Internal Server Error during onboarding" },
      { status: 500 }
    );
  }
}
