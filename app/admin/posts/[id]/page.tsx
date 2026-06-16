import { notFound } from "next/navigation";
import PostEditor from "../../_components/PostEditor";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data } = await supabase.from("posts").select("*").eq("id", params.id).maybeSingle();
  if (!data) notFound();
  // Previous/next post for in-editor navigation (same order as the dashboard list).
  const { data: ordered } = await supabase
    .from("posts")
    .select("id")
    .order("updated_at", { ascending: false });
  const ids = (ordered ?? []).map((r: { id: string }) => r.id);
  const idx = ids.indexOf(params.id);
  const prevId = idx > 0 ? ids[idx - 1] : undefined;
  const nextId = idx >= 0 && idx < ids.length - 1 ? ids[idx + 1] : undefined;
  return <PostEditor post={data as Post} prevId={prevId} nextId={nextId} />;
}
