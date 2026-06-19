"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { savePost } from "../posts/actions";
import Editor from "./Editor";
import type { Post } from "@/lib/types";

export default function PostEditor({ post, prevId, nextId }: { post?: Post; prevId?: string; nextId?: string }) {
  const router = useRouter();
  const [id, setId] = useState(post?.id);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [cover, setCover] = useState(post?.cover_image ?? "");
  const [audience, setAudience] = useState<"public" | "clinician">(post?.audience ?? "public");
  const [tags, setTags] = useState((post?.tags ?? []).join(", "));
  const [seoTitle, setSeoTitle] = useState(post?.seo_title ?? "");
  const [seoDesc, setSeoDesc] = useState(post?.seo_description ?? "");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function uploadFile(file: File): Promise<string | null> {
    if (file.size > 8 * 1024 * 1024) {
      setErr("Image must be under 8 MB.");
      return null;
    }
    const supabase = createClient();
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const key = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("post-images").upload(key, file, {
      contentType: file.type || undefined,
    });
    if (error) {
      setErr(error.message);
      return null;
    }
    return supabase.storage.from("post-images").getPublicUrl(key).data.publicUrl;
  }

  // Opens a file picker, uploads, and returns the public URL (with loading state).
  function pickAndUpload(): Promise<string | null> {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async () => {
        const f = input.files?.[0];
        if (!f) return resolve(null);
        setErr("");
        setUploading(true);
        try {
          resolve(await uploadFile(f));
        } finally {
          setUploading(false);
        }
      };
      input.click();
    });
  }

  async function save(publish: boolean) {
    if (busy) return;
    setBusy(true);
    setErr("");
    setMsg("");
    try {
      const res = await savePost({
        id,
        title,
        slug,
        excerpt,
        body,
        cover_image: cover,
        audience,
        tags,
        seo_title: seoTitle,
        seo_description: seoDesc,
        publish,
      });
      setId(res.id);
      setSlug(res.slug);
      if (publish) {
        router.push("/admin");
        router.refresh();
      } else {
        setMsg("Saved.");
        if (!id) router.replace(`/admin/posts/${res.id}`);
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="adm-wrap">
      <div className="adm-nav">
        <a className="adm-btn ghost" href="/admin">All posts</a>
        {(prevId || nextId) && (
          <div className="adm-nav-pager">
            {prevId && (
              <a className="adm-btn ghost" href={`/admin/posts/${prevId}`}>Previous</a>
            )}
            {nextId && (
              <a className="adm-btn ghost" href={`/admin/posts/${nextId}`}>Next</a>
            )}
          </div>
        )}
      </div>
      <h1>{id ? "Edit post" : "New post"}</h1>

      <div className="adm-card">
      <div className="adm-field">
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" />
      </div>

      <div className="adm-row">
        <div className="adm-field">
          <label>Slug (URL)</label>
          <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto from title" />
        </div>
        <div className="adm-field">
          <label>Audience</label>
          <select value={audience} onChange={(e) => setAudience(e.target.value as "public" | "clinician")}>
            <option value="public">Public (listed on Writing)</option>
            <option value="clinician">Clinician (unlisted, link only)</option>
          </select>
        </div>
      </div>

      <div className="adm-field">
        <label>Excerpt</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          placeholder="One or two lines, shown on the index and as the article lead."
        />
      </div>

      <div className="adm-field">
        <label>Cover image</label>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          {cover && <img src={cover} alt="" style={{ height: 48, borderRadius: 6 }} />}
          <button
            type="button"
            className="adm-btn ghost"
            disabled={uploading}
            onClick={async () => {
              const u = await pickAndUpload();
              if (u) setCover(u);
            }}
          >
            {uploading ? (<><span className="rt-spinner" aria-hidden="true" /> Uploading…</>) : cover ? "Replace" : "Upload"}
          </button>
          {cover && !uploading && (
            <button type="button" className="adm-btn ghost" onClick={() => setCover("")}>
              Remove
            </button>
          )}
        </div>
      </div>

      <div className="adm-field">
        <label>Body</label>
        <Editor value={body} onChange={setBody} onPickImage={pickAndUpload} uploading={uploading} />
      </div>

      <div className="adm-field">
        <label>Tags (comma separated)</label>
        <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Diagnostics, Metabolic" />
      </div>

      <h2>SEO</h2>
      <div className="adm-field">
        <label>SEO title</label>
        <input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder="Defaults to the post title" />
      </div>
      <div className="adm-field">
        <label>SEO description</label>
        <textarea value={seoDesc} onChange={(e) => setSeoDesc(e.target.value)} rows={2} />
      </div>

      </div>

      <div className="adm-actions">
        <button className="adm-btn publish" type="button" disabled={busy} onClick={() => save(true)}>
          Publish
        </button>
        <button className="adm-btn ghost" type="button" disabled={busy} onClick={() => save(false)}>
          {busy ? "Saving…" : "Save draft"}
        </button>
        {id && slug && (
          <a className="adm-btn ghost" href={`/writing/${slug}?preview=1`} target="_blank" rel="noopener">
            Preview
          </a>
        )}
        <a className="adm-btn ghost" href="/admin">Back</a>
        {msg && <span className="adm-ok">{msg}</span>}
        {err && <span className="adm-error">{err}</span>}
      </div>

      {uploading && (
        <div className="rt-upload-toast" role="status" aria-live="polite">
          <span className="rt-spinner" aria-hidden="true" /> Uploading image…
        </div>
      )}
    </div>
  );
}
