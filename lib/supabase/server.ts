import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Server client for RSC / route handlers / server actions. Reads the auth session from
// cookies. Writing cookies from a pure Server Component throws, so setAll is wrapped in
// try/catch — middleware (updateSession) is what actually refreshes the auth cookie.
export function createClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server Component context: cannot set cookies here. Middleware handles refresh.
          }
        },
      },
    },
  );
}
