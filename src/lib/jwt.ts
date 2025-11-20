import jwt, { SignOptions } from "jsonwebtoken";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET || JWT_SECRET.length === 0)
  throw new Error("JWT_SECRET is not defined in .env");

export function signToken(
  payload: object,
  options: SignOptions = { expiresIn: "7d" }
) {
  return jwt.sign(payload, JWT_SECRET, options);
}

export async function verifyToken(token: string) {
  const secret = new TextEncoder().encode(JWT_SECRET);
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.log("JWT verification failed");
    return null;
  }
  // return jwt.verify(token, JWT_SECRET);
}
