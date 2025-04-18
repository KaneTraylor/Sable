// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Define routes that should be protected
const protectedRoutes = ["/dashboard", "/account", "/profile"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // If the route isn't protected, continue as usual
  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    // Redirect to signin if no token
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/account", "/profile"],
};
