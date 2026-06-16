import type { Metadata } from "next";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "About Dr. Danny Cai",
  description:
    "Dr. Danny Cai, a GP with over 25 years of clinical experience, focused on longevity, preventive health, and human optimisation.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Dr. Danny Cai",
    description:
      "A GP with over 25 years of clinical experience, focused on longevity and preventive health.",
    url: "/about",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* hero */}
      <div className="phero-fb">
        <div className="phero-fb-img"><img src="/assets/danny-about-hero.jpg" alt="Dr. Danny Cai" /></div>
        <div className="phero-fb-scrim"></div>
        <div className="wrap ctr">
          <div className="breadcrumb"><a href="/">Home</a> / About</div>
          <span className="ov">The doctor behind the practice</span>
          <h1>A physician, <em>first and always.</em></h1>
          <div style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
            <a className="btn btn-b" href="/#enquire">Book a consultation</a>
            <a className="btn btn-o" href="/writing">Read his writing</a>
          </div>
        </div>
      </div>
      {/* credentials */}
      <div className="pad-s wrap">
        <div className="creds">
          <div className="cred"><b>25 yrs</b><span>In clinical general practice</span></div>
          <div className="cred"><b>Gov.</b><span>Australian Government medical advisor</span></div>
          <div className="cred"><b>FRACGP</b><span>RACGP Fellow</span></div>
          <div className="cred"><b>MBBS</b><span>Medicine &amp; Surgery</span></div>
        </div>
      </div>
      {/* philosophy / narrative */}
      <div className="pad wrap split rev" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="imgph" style={{ aspectRatio: "1" }}><img src="/assets/danny-ava.jpg" alt="Dr. Danny Cai walking with his daughter" /><span className="tag">With my daughter</span></div>
        <div>
          <div className="rule"></div>
          <span className="ov">In his words</span>
          <h2 className="big" style={{ marginTop: "14px" }}>“In a space increasingly shaped by trends, my role is to provide <em>clarity and discernment.</em>”</h2>
          <div className="article" style={{ marginTop: "20px", maxWidth: "none" }}>
            <p className="lead">I&apos;m Dr. Danny Cai, a General Practitioner with over 25 years of clinical experience, focused on longevity, preventive health, and human optimisation.</p>
            <p>AvaElis carries my daughter&apos;s name, combined with the Latin for life, a reflection of how I view this work: not simply extending lifespan, but preserving vitality, clarity, and capability over time.</p>
            <p>My background spans general practice, advanced therapeutics, cosmetic medicine, government advisory, and healthcare innovation. Today, my work is centred on individuals who are often already well, but seeking to optimise how they feel, function, and age. This requires a more precise, proactive approach; one that integrates emerging science with clinical judgement and individual context.</p>
            <p>I focus on what is evidence based, what is promising, and how to apply both in a way that is measured, personalised, and effective.</p>
            <p>Alongside clinical practice, I contribute to medical education and advise on the future of healthcare. My aim is simple: to help you maintain performance, extend healthspan, and age with intention.</p>
          </div>
        </div>
      </div>
      {/* dispatch / newsletter, distinct plum section */}
      <div className="band" style={{ background: "var(--plum)" }}><div className="pad-s wrap split">
        <div><div className="rule" style={{ background: "var(--bronze-l)" }}></div><span className="ov">The dispatch</span><h2 className="big" style={{ color: "#fff", marginTop: "12px" }}>Considered notes, on occasion.</h2><p className="lede" style={{ color: "var(--muted-l)", marginTop: "14px" }}>Evidence-led writing from Dr. Danny. No noise.</p></div>
        <NewsletterForm source="About" />
      </div></div>
      {/* featured / speaking, black band, sits with the footer */}
      <div className="band"><div className="pad wrap" style={{ textAlign: "center" }}>
        <span className="ov">As featured &amp; speaking</span>
        <h2 className="big" style={{ color: "#fff", marginTop: "12px", maxWidth: "16em", marginLeft: "auto", marginRight: "auto" }}>On the record.</h2>
        <p className="lede" style={{ color: "var(--muted-l)", maxWidth: "34em", margin: "16px auto 0" }}>Speaking at the Lifestyle Health Summit 2026. Writing on precision longevity for clinicians and patients.</p>
      </div></div>
    </>
  );
}
