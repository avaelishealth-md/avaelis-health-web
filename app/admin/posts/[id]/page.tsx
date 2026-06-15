import { notFound } from "next/navigation";
import PostEditor from "../../_components/PostEditor";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data } = await supabase.from("posts").select("*").eq("id", params.id).maybeSingle();
  if (!data) notFound();
  return <PostEditor post={data as Post} />;
}
