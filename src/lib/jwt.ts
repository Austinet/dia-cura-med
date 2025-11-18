import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET || JWT_SECRET.length === 0)
  throw new Error("JWT_SECRET is not defined in .env");

export function signToken(
  payload: object,
  options: SignOptions = { expiresIn: "7d" }
) {
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
