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
      <div className="adm-page-head">
        <div>
          <h1>Your writing</h1>
          <p className="sub">Draft, edit and publish articles for the AvaElis site.</p>
        </div>
        <Link className="adm-btn" href="/admin/posts/new">+ New post</Link>
      </div>
      <p className="adm-help"><b>Tip:</b> “Public” posts appear on your Writing page. “Clinician” posts stay unlisted and open only by direct link. Use <b>Preview</b> to check a draft before publishing, and <b>View site ↗</b> (top right) to see your live website.</p>

      {posts.length === 0 ? (
        <div className="adm-empty">
          <h3>No posts yet</h3>
          <p>Write your first article, or send one over from the content engine.</p>
          <Link className="adm-btn" href="/admin/posts/new">+ New post</Link>
        </div>
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
                  <span className="cell-title-wrap">
                    {p.cover_image ? (
                      <img className="adm-thumb" src={p.cover_image} alt="" />
                    ) : (
                      <span className="adm-thumb ph" aria-hidden="true">Æ</span>
                    )}
                    <Link className="title" href={`/admin/posts/${p.id}`}>
                      {p.title}
                    </Link>
                  </span>
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
