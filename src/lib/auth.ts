import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default-secret-key"
);

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export interface JWTPayload {
  isAdmin: boolean;
  exp?: number;
}

export async function verifyPassword(password: string): Promise<boolean> {
  // For simple setup, compare directly
  // In production, you might want to hash the password in .env
  return password === ADMIN_PASSWORD;
}

export async function createToken(): Promise<string> {
  const token = await new SignJWT({ isAdmin: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .setIssuedAt()
    .sign(JWT_SECRET);

  return token;
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (payload && typeof payload === "object" && "isAdmin" in payload) {
      return { isAdmin: Boolean(payload.isAdmin) };
    }
    return null;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;

  if (!token) return null;

  return verifyToken(token);
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session?.isAdmin === true;
}
