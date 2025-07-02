import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // const isPublicPath =
  //   path === "/" ||
  //   path === "/sign-in" ||
  //   path === "/sign-up" ||
  //   path === "/verify-email";

  const isProtectedPath = path === "/dashboard" || path === "/onboarding";

  const authCookie = request.cookies.get("auth-token")?.value;

  if (isProtectedPath && !authCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg).*)",
  ],
};
