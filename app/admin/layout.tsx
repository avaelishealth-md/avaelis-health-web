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
      <header className="adm-bar">
        <Link className="brand" href="/admin">
          <span className="adm-coin" aria-hidden="true">Æ</span>
          <span className="brand-tx">AvaElis <span className="brand-sub">Studio</span></span>
        </Link>
        {email && (
          <>
            <nav className="adm-links">
              <Link href="/admin">Posts</Link>
              <Link href="/admin/posts/new">New post</Link>
              <Link href="/admin/guide">Guide</Link>
              <a href="/" target="_blank" rel="noopener">View site ↗</a>
            </nav>
            <span className="who">
              <span className="who-email">{email}</span>
              <a className="who-out" href="/auth/signout">Sign out</a>
            </span>
          </>
        )}
      </header>
      {children}
    </div>
  );
}
