import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;
  const { pathname } = req.nextUrl;

  const isCandidateAuthPage = pathname === "/login" || pathname === "/register";
  const isRecruiterAuthPage =
    pathname === "/recruiter/login" || pathname === "/recruiter/register";
  const isRecruiterArea = pathname.startsWith("/recruiter") && !isRecruiterAuthPage;
  const isCandidateArea = pathname.startsWith("/dashboard");

  // Isolation: a recruiter session can't reach the candidate area and vice
  // versa — same as candidate/admin isolation between the two apps.
  if (isRecruiterArea) {
    if (!isLoggedIn || role !== "recruiter") {
      const loginUrl = new URL("/recruiter/login", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return;
  }

  if (isCandidateArea) {
    if (!isLoggedIn || role !== "candidate") {
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return;
  }

  if (isLoggedIn && role === "candidate" && isCandidateAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }

  if (isLoggedIn && role === "recruiter" && isRecruiterAuthPage) {
    return NextResponse.redirect(new URL("/recruiter/dashboard", req.nextUrl.origin));
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/recruiter/:path*"],
};
