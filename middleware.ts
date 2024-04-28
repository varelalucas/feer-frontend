import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { API } from "./lib/API";

export async function middleware(request: NextRequest) {
  if (request.url.includes("/auth/login")) {
    if (!!request.cookies.get("auth:token")?.value) {
      return NextResponse.redirect(new URL("/panel", request.url));
    }
  }

  if (request.url.includes("/panel")) {
    if (!request.cookies.get("auth:token")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", request.nextUrl.pathname);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/panel/:path*", "/auth/:path*"],
};
