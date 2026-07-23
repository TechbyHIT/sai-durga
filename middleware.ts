import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Lightweight edge security — no disk writes, no logging. */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("X-DNS-Prefetch-Control", "on");

  const path = request.nextUrl.pathname;
  if (path.includes("..") || path.includes("\\")) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|brand/|images/).*)"],
};
