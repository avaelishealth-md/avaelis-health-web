import type { Metadata } from "next";
import TalkSummaryForm from "@/components/TalkSummaryForm";

export const metadata: Metadata = {
  title: "Clinician talk summary",
  description: "Get the clinician summary of Dr. Danny Cai's talk on peptide therapeutics.",
  // Intentionally unindexed even after launch — this is the QR landing page, not public content.
  robots: { index: false, follow: false },
};

export default function TalkSummaryPage() {
  return (
    <>
      <div className="phero">
        <div className="wrap">
          <span className="ov">For clinicians</span>
          <h1>The summary of Dr. Danny&apos;s talk, <em>in your inbox.</em></h1>
          <p className="lede">
            Enter your details and we&apos;ll send you the clinician summary, the evidence,
            classifications and regulatory considerations on peptide therapeutics, plus a way to
            stay in touch.
          </p>
        </div>
      </div>

      <div className="pad-s wrap split">
        <div>
          <div className="rule"></div>
          <span className="ov">What you&apos;ll get</span>
          <h2 className="big" style={{ marginTop: "12px" }}>Evidence, not hype.</h2>
          <p className="lede" style={{ marginTop: "14px", fontSize: "16px" }}>
            A considered, referenced overview written for clinicians, the same honest framework
            Dr. Danny uses in practice. No noise, no product pitches.
          </p>
        </div>
        <TalkSummaryForm />
      </div>
    </>
  );
}
