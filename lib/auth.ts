import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "lara_admin_session";
const SESSION_HOURS = 12;

function getSecret(): Uint8Array {
  const secret =
    process.env.ADMIN_SESSION_SECRET ?? "dev-only-insecure-secret-change-me";
  return new TextEncoder().encode(secret);
}

export const ADMIN_COOKIE = COOKIE_NAME;

export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_HOURS}h`)
    .sign(getSecret());
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.role === "admin";
  } catch {
    return false;
  }
}
