import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/Users";
import argon2 from "argon2";
import crypto from "crypto";
import { sendEmail } from "@/lib/emails";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phoneNumber, password, role } = body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !role
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to DB
    await connectDB();

    // Check if user exists
    const existing = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existing) {
      return NextResponse.json(
        { message: "Email or phone already in use" },
        { status: 400 }
      );
    }

    // Hash password and verification token
    const hashed = await argon2.hash(password);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashed,
      role,
      verificationToken,
      verificationTokenExpiry,
    });

    const verificationEmail = `
    ${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}
    `;

    const emailResponse = await sendEmail({
      to: email,
      subject: "Verify your email",
      html: `
            <p>Hi ${firstName},</p>
              <p>Thank you for registering. Plase verify your mail by clicking on the link below</p>
              <a href="${verificationEmail}">Verify Email</a>
            `,
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
        },
        emailResponse,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
