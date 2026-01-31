import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            return NextResponse.json(
                { message: "Server misconfiguration: Admin credentials not set" },
                { status: 500 }
            );
        }

        if (email === adminEmail && password === adminPassword) {
            // Set cookie
            const cookieStore = await cookies();
            cookieStore.set("admin_session", "true", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: "/",
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { message: "Invalid email or password" },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
