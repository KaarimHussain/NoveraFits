import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const isAdminPath = request.nextUrl.pathname.startsWith("/admin");
    const isLoginPath = request.nextUrl.pathname === "/admin/login";

    // If it's an admin path but not login
    if (isAdminPath && !isLoginPath) {
        const adminSession = request.cookies.get("admin_session");

        // If no session cookie, redirect to login
        if (!adminSession) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    // If user is already logged in and tries to go to login page, redirect to dashboard
    if (isLoginPath) {
        const adminSession = request.cookies.get("admin_session");
        if (adminSession) {
            return NextResponse.redirect(new URL("/admin/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
