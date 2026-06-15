import Link from "next/link";
import "./admin.css";
import { createClient } from "@/lib/supabase/server";

// Admin is a sibling of the (marketing) group — it does NOT inherit the site header/footer.
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // May be null on the login page (which is also under /admin). Middleware guards the rest.
  let email: string | null = null;
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    email = user?.email ?? null;
  } catch {
    email = null;
  }

  return (
    <div className="adm">
      <div className="adm-bar">
        <Link className="brand" href="/admin">AvaElis · Studio</Link>
        {email && (
          <span className="who">
            <span>{email}</span>
            <a href="/auth/signout">Sign out</a>
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
