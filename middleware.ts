import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Pre-launch holding page.
// Flip COMING_SOON to false and push to take the full site live on the domain.
// Only the live custom domain is gated — *.vercel.app and localhost always show
// the full site, so the team can keep reviewing it.
const COMING_SOON = true;
const LIVE_DOMAIN = "avaelishealth.com.au";

export function middleware(req: NextRequest) {
  const rawHost = (req.headers.get("host") || "").toLowerCase();
  const host = rawHost.split(":")[0].replace(/\.$/, ""); // strip any port + trailing dot
  const onLiveDomain = host === LIVE_DOMAIN || host === `www.${LIVE_DOMAIN}`;

  if (!COMING_SOON || !onLiveDomain) {
    return NextResponse.next();
  }

  const { pathname } = req.nextUrl;
  if (
    pathname === "/coming-soon" ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/icon") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/coming-soon";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
