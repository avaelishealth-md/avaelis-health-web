import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Pre-launch holding page. Flip COMING_SOON to false and push to take the full site live.
// Only the live custom domain is gated — *.vercel.app and localhost always show the full site.
const COMING_SOON = true;
const LIVE_DOMAIN = "avaelishealth.com.au";

// Paths reachable even while the coming-soon gate is on (admin/auth/lead-form + infra).
function bypassesComingSoon(pathname: string): boolean {
  return (
    pathname === "/coming-soon" ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/icon") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/talk-summary")
  );
}

// Carry any refreshed Supabase auth cookies onto a redirect/rewrite response.
function withCookies(from: NextResponse, to: NextResponse): NextResponse {
  from.cookies.getAll().forEach((c) => to.cookies.set(c));
  return to;
}

export async function middleware(req: NextRequest) {
  // 1) Always refresh the Supabase session first (every host), capturing the user.
  const { response, user } = await updateSession(req);

  const { pathname } = req.nextUrl;

  // 2) Protect /admin/* (except the login page) on every host.
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!user) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return withCookies(response, NextResponse.redirect(url));
    }
  }

  // 3) Coming-soon gate — only the live domain, only non-bypassed paths.
  const rawHost = (req.headers.get("host") || "").toLowerCase();
  const host = rawHost.split(":")[0].replace(/\.$/, ""); // strip any port + trailing dot
  const onLiveDomain = host === LIVE_DOMAIN || host === `www.${LIVE_DOMAIN}`;

  if (COMING_SOON && onLiveDomain && !bypassesComingSoon(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/coming-soon";
    return withCookies(response, NextResponse.rewrite(url));
  }

  // 4) Pass through, carrying the refreshed-cookie response.
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
