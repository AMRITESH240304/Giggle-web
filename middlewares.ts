import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {useAuth} from "@/hooks/useAuth"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authCookie = request.cookies.get("auth-token")?.value;
  console.log("cookie",authCookie)

  // const isPublicPath =
  //   path === "/" ||
  //   path === "/sign-in" ||
  //   path === "/sign-up" ||
  //   path === "/verify-email";

  const isProtectedPath = path === "/dashboard" || path === "/onboarding";

  // no auth cookie and on protected path
  if (isProtectedPath && !authCookie) {
    console.log("1----------")
    return NextResponse.redirect(new URL("/sign-up", request.url));
  }

  if (path === "/verify-email" && !authCookie){
    console.log("2----------")
    return NextResponse.redirect(new URL("/sign-up", request.url));
  }

  //if has auth cookie and on signup
  if ((path === "/sign-up" && authCookie) || (path === "/sign-in" && authCookie)){
    console.log("3----------")
    return NextResponse.redirect(new URL("/dashboard", request.url)); 
  }else{
    return NextResponse.next()
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
