import type { Metadata } from "next";
import TalkSummaryForm from "@/components/TalkSummaryForm";

export const metadata: Metadata = {
  title: "Clinician talk summary",
  description:
    "Request the clinician summary of Dr. Danny Cai's Lifestyle Health Summit talk on longevity medicine. Sent to verified health practitioners after AHPRA verification.",
  // Intentionally unindexed even after launch. This is the QR landing page, not public content.
  robots: { index: false, follow: false },
};

export default function TalkSummaryPage() {
  // No page hero and no database read: the form leads (above the fold for the QR mobile audience),
  // and nothing clinical is fetched here. The summary is sent manually after AHPRA verification.
  return (
    <div className="wrap ts-top">
      <TalkSummaryForm />
    </div>
  );
}
