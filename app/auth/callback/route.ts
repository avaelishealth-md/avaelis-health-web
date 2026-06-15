import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAllowed } from "@/lib/auth/allowlist";

// Exchanges the magic-link code for a session, then enforces the admin allow-list.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/admin";

  const loginWith = (err: string) =>
    NextResponse.redirect(new URL(`/admin/login?error=${err}`, url.origin));

  if (!code) return loginWith("missing-code");

  const supabase = createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return loginWith("auth");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAllowed(user?.email)) {
    await supabase.auth.signOut();
    return loginWith("not-allowed");
  }

  return NextResponse.redirect(new URL(next, url.origin));
}
