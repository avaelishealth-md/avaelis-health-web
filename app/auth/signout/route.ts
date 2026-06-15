import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = createClient();
  try {
    await supabase.auth.signOut();
  } catch {
    // ignore — redirect to login regardless
  }
  return NextResponse.redirect(new URL("/admin/login", new URL(request.url).origin));
}
