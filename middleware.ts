// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /staff routes, but allow /staff/login
  if (!pathname.startsWith("/staff") || pathname.startsWith("/staff/login")) {
    return NextResponse.next();
  }

  const isStaff = req.cookies.get("staff")?.value === "1";
  if (isStaff) return NextResponse.next();

  const url = new URL("/staff/login", req.url);
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/staff/:path*"],
};
