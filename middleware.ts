import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
    const cookies = req.cookies.get("token");
    if (!cookies || !cookies.value) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/space",
        "/space/:id",
    ],
};
