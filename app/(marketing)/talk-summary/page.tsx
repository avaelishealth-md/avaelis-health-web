import type { Metadata } from "next";
import { getTalkSummaryPost } from "@/lib/posts";
import TalkSummaryForm from "@/components/TalkSummaryForm";

// Fetch fresh so the gated summary appears as soon as Danny saves it.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Clinician talk summary",
  description: "The full clinician summary of Dr. Danny Cai's Lifestyle Health Summit talk on longevity medicine, with references.",
  // Intentionally unindexed even after launch — this is the QR landing page, not public content.
  robots: { index: false, follow: false },
};

export default async function TalkSummaryPage() {
  const post = await getTalkSummaryPost();

  // No page hero — the form leads so it sits above the fold (the QR audience is on mobile).
  return (
    <div className="wrap ts-top">
      <TalkSummaryForm teaser={post?.excerpt ?? null} />
    </div>
  );
}
