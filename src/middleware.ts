import { decrypt } from "@/lib";
import { NextURL } from "next/dist/server/web/next-url";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/admin/:path*", "/login"],
};

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  const session = await decrypt(sessionCookie);

  if (!session) {
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new NextURL("/login", req.nextUrl));
    }
    return NextResponse.next();
  }

  if (pathname === "/login") {
    return NextResponse.redirect(new NextURL("/admin", req.nextUrl));
  }

  return NextResponse.next();
}
