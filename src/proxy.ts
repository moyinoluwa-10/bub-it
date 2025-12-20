// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const PROTECTED_PREFIXES = ["/urls"];

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const isLoggedIn = !!req.nextauth.token;

    // Prevent logged-in users from seeing auth pages
    if (isLoggedIn && pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/urls", req.url));
    }

    // otherwise continue
    return NextResponse.next();
  },
  {
    // Decide what requires a session (no per-route boilerplate)
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Public paths (always allowed)
        const isPublic =
          pathname === "/" ||
          pathname.startsWith("/auth") ||
          pathname.startsWith("/api/auth") ||
          pathname.startsWith("/_next") ||
          pathname.startsWith("/favicon.ico") ||
          pathname.match(/\.(png|jpg|jpeg|svg|gif|ico|css|js|map)$/);

        if (isPublic) return true;

        // Check if path matches any protected prefix
        const needsAuth = PROTECTED_PREFIXES.some((p) =>
          pathname.startsWith(p)
        );

        return needsAuth ? !!token : true;
      },
    },
  }
);

// 4) Run middleware only where it matters
export const config = {
  matcher: ["/auth/:path*", "/urls/:path*"],
};
