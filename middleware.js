import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export function middleware(request) {
  let session = request.cookies.get("next-auth.session-token");

  if (!session) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
}

export const config = { matcher: ["/auth/dashboard", "/"] };
