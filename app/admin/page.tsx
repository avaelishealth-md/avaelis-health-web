import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/types";
import RowActions from "./_components/RowActions";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const supabase = createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("updated_at", { ascending: false });
  const posts = (data as Post[]) ?? [];

  return (
    <div className="adm-wrap">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <div>
          <h1>Posts</h1>
          <p className="sub">Draft, edit and publish your writing.</p>
        </div>
        <Link className="adm-btn" href="/admin/posts/new">New post</Link>
      </div>

      {posts.length === 0 ? (
        <p className="adm-note">No posts yet. Create your first one with “New post”.</p>
      ) : (
        <table className="adm-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Audience</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id}>
                <td>
                  <Link className="title" href={`/admin/posts/${p.id}`}>
                    {p.title}
                  </Link>
                </td>
                <td>
                  <span className={`adm-tag ${p.status === "published" ? "pub" : "draft"}`}>
                    {p.status}
                  </span>
                </td>
                <td>{p.audience}</td>
                <td>{new Date(p.updated_at).toLocaleDateString("en-AU")}</td>
                <td>
                  <RowActions id={p.id} slug={p.slug} status={p.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
