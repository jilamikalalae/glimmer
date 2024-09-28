// middleware.js

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// This is the secret you used in your NextAuth.js config
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
  const token = await getToken({ req, secret });

  // If the token doesn't exist, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next(); // Proceed to the next middleware or the requested page
}

export const config = {
  matcher: ["/api/portal/:path*"],
};
