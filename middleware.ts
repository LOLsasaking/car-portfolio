import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage =
    pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");
  const isProtectedApi =
    (pathname.startsWith("/api/vehicles") ||
      pathname.startsWith("/api/upload") ||
      pathname.startsWith("/api/documents")) &&
    request.method !== "GET";

  if (!isAdminPage && !isProtectedApi) return NextResponse.next();

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const valid = await verifySessionToken(token);
  if (valid) return NextResponse.next();

  if (isProtectedApi) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const loginUrl = new URL("/admin/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/vehicles/:path*", "/api/upload/:path*", "/api/documents/:path*"],
};
