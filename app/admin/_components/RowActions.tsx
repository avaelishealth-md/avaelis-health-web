"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setPublished, deletePost } from "../posts/actions";

export default function RowActions({
  id,
  slug,
  status,
}: {
  id: string;
  slug: string;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function toggle() {
    setBusy(true);
    try {
      await setPublished(id, status !== "published");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setBusy(true);
    try {
      await deletePost(id);
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
      {status === "published" && (
        <a className="adm-btn ghost" href={`/writing/${slug}`} target="_blank" rel="noopener">
          View
        </a>
      )}
      <a className="adm-btn ghost" href={`/writing/${slug}?preview=1`} target="_blank" rel="noopener">
        Preview
      </a>
      <button className="adm-btn ghost" type="button" disabled={busy} onClick={toggle}>
        {status === "published" ? "Unpublish" : "Publish"}
      </button>
      <button className="adm-btn danger" type="button" disabled={busy} onClick={remove}>
        Delete
      </button>
    </div>
  );
}
