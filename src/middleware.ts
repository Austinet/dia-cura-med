import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { JWTPayload } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const { pathname } = req.nextUrl;

  // public paths we don't protect
  const publicPaths = [
    "/",
    "/contact-us",
    "/services",
    "get-started",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
    "/api/auth/login",
    "/api/auth/register",
  ];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }
  // if (publicPaths.some((path) => pathname.startsWith(path)))
  //   return NextResponse.next();

  // If accessing protected areas without token => redirect to login
  if (!token) {
    // If trying to open a dashboard, send to login
    if (
      pathname.startsWith("/dashboard/doctor") ||
      pathname.startsWith("/dashboard/patient") ||
      pathname.startsWith("/dashboard/admin") ||
      pathname.startsWith("/onboarding/patient")
    ) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  const payload: JWTPayload | null = await verifyToken(token);
  if (!payload) {
    // invalid token -> redirect to login when hitting protected areas
    if (
      pathname.startsWith("/dashboard/doctor") ||
      pathname.startsWith("/dashboard/patient") ||
      pathname.startsWith("/dashboard/admin") ||
      pathname.startsWith("/onboarding/patient")
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  // checks if user has completed onboarding
  if (payload.role === "patient" && payload.onboarding !== "completed") {
    if (!pathname.startsWith("/onboarding/patient")) {
      return NextResponse.redirect(new URL("/onboarding/patient", req.url));
    }
  }

  // role-based guards
  if (
    pathname.startsWith("/dashboard/doctor") &&
    payload.role !== "doctor" &&
    payload.role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  if (
    pathname.startsWith("/dashboard/patient") &&
    payload.role !== "patient" &&
    payload.role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  if (pathname.startsWith("/admin") && payload.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/doctor/:path*",
    "/dashboard/patient/:path*",
    "/dashboard/admin/:path*",
    "/onboarding/patient/:path*",
  ],
};
