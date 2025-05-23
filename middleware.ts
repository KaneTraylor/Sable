// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Additional auth logic if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect dashboard routes
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          return !!token;
        }
        // Protect API routes
        if (
          req.nextUrl.pathname.startsWith("/api/") &&
          !req.nextUrl.pathname.startsWith("/api/auth/") &&
          !req.nextUrl.pathname.startsWith("/api/signup/") &&
          !req.nextUrl.pathname.startsWith("/api/leads")
        ) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/user/:path*",
    "/api/disputes/:path*",
    "/api/array/:path*",
    "/api/creditbuilder/:path*",
    "/api/popups/:path*",
  ],
};
