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

  return (
    <>
      <div className="phero ts-hero">
        <div className="wrap">
          <span className="ov">For clinicians · Lifestyle Health Summit 2026</span>
          <h1>
            Dr. Danny&apos;s talk, <em>the full clinical summary.</em>
          </h1>
          <p className="lede">
            Longevity medicine without the hype: the diagnostics worth doing, where peptides actually
            sit, and the evidence behind it, with every reference. Enter your details to read it now,
            and we&apos;ll email you a copy.
          </p>
        </div>
      </div>

      <div className="pad-s wrap ts-wrap">
        <TalkSummaryForm teaser={post?.excerpt ?? null} />
      </div>
    </>
  );
}
