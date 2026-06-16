import type { Metadata } from "next";
import { getTalkSummaryPost } from "@/lib/posts";
import TalkSummaryForm from "@/components/TalkSummaryForm";

// Fetch fresh so the gated summary appears as soon as Danny saves it.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Clinician talk summary",
  description: "Get the clinician summary of Dr. Danny Cai's talk on peptide therapeutics.",
  // Intentionally unindexed even after launch — this is the QR landing page, not public content.
  robots: { index: false, follow: false },
};

export default async function TalkSummaryPage() {
  const post = await getTalkSummaryPost();

  return (
    <>
      <div className="phero ts-hero">
        <div className="wrap">
          <span className="ov">For clinicians</span>
          <h1>
            Dr. Danny&apos;s talk, <em>summarised for clinicians.</em>
          </h1>
          <p className="lede">
            The evidence, classifications and regulatory considerations from the talk. Enter your
            details to read it here, and we&apos;ll email you a copy too.
          </p>
        </div>
      </div>

      <div className="pad-s wrap ts-wrap">
        <TalkSummaryForm teaser={post?.excerpt ?? null} />
      </div>
    </>
  );
}
