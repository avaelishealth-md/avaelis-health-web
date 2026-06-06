export default function AboutPage() {
  return (
    <>
      {/* hero */}
      <div className="phero-fb">
        <div className="phero-fb-img"><img src="/assets/danny-scrubs-stand.jpg" alt="Dr. Danny Cai" /></div>
        <div className="phero-fb-scrim"></div>
        <div className="wrap ctr">
          <div className="breadcrumb"><a href="#home">Home</a> / About</div>
          <span className="ov">The doctor behind the practice</span>
          <h1>A physician, <em>first and always.</em></h1>
          <div style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
            <a className="btn btn-b" href="#book">Book a consultation</a>
            <a className="btn btn-o" href="/writing">Read his writing</a>
          </div>
        </div>
      </div>
      {/* credentials */}
      <div className="pad-s wrap">
        <div className="creds">
          <div className="cred"><b>25 yrs</b><span>In clinical general practice</span></div>
          <div className="cred"><b>Commonwealth</b><span>Former medical advisor</span></div>
          <div className="cred"><b>FRACGP</b><span>Fellow of the College (RACGP)</span></div>
          <div className="cred"><b>MBBS</b><span>Bachelor of Medicine &amp; Surgery</span></div>
        </div>
      </div>
      {/* philosophy / narrative */}
      <div className="pad wrap split rev" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="imgph" style={{ aspectRatio: "1" }}><img src="/assets/danny-clinic.jpg" alt="Dr. Danny at the clinic" /><span className="tag">At the clinic</span></div>
        <div>
          <div className="rule"></div>
          <span className="ov">In his words</span>
          <h2 className="big" style={{ marginTop: "14px" }}>“The most valuable thing a doctor offers today isn't more information, it's <em>trusted interpretation.</em>”</h2>
          <p className="lede" style={{ marginTop: "20px" }}>I spent a career watching people chase the next test, the next supplement, the next headline. AvaElis exists to do the opposite: measure what genuinely matters, read it honestly, and build a plan you can actually live.</p>
        </div>
      </div>
      {/* timeline */}
      <div className="pad wrap" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="rule"></div><span className="ov">Career</span>
        <h2 className="big" style={{ margin: "14px 0 30px" }}>A measured path.</h2>
        <div className="tl">
          <div className="row"><span className="yr">1999</span><div><b>MBBS, clinical training</b><p>Qualifies in medicine and begins hospital rotations.</p></div></div>
          <div className="row"><span className="yr">2004</span><div><b>General practice</b><p>Enters GP practice; FRACGP fellowship; builds a long-term patient base.</p></div></div>
          <div className="row"><span className="yr">2015</span><div><b>Commonwealth medical advisor</b><p>Advises on health policy and clinical standards at a national level.</p></div></div>
          <div className="row"><span className="yr">2023</span><div><b>Longevity focus</b><p>Turns to precision diagnostics and healthspan as the frontier of preventive care.</p></div></div>
          <div className="row"><span className="yr">2026</span><div><b>Founds AvaElis Health</b><p>Opens a boutique longevity atelier, one doctor, real data, no hype.</p></div></div>
        </div>
      </div>
      {/* featured / speaking */}
      <div className="band"><div className="pad wrap" style={{ textAlign: "center" }}>
        <span className="ov">As featured &amp; speaking</span>
        <h2 className="big" style={{ color: "#fff", marginTop: "12px", maxWidth: "16em", marginLeft: "auto", marginRight: "auto" }}>Sharing the evidence-led view, on the record.</h2>
        <p className="lede" style={{ color: "var(--muted-l)", maxWidth: "34em", margin: "16px auto 0" }}>Speaking at the Lifestyle Health Summit 2026, and writing for clinicians and patients on precision longevity.</p>
      </div></div>
    </>
  );
}
