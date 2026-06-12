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
          <div className="cred"><b>Gov.</b><span>Australian Government medical advisor</span></div>
          <div className="cred"><b>FRACGP</b><span>RACGP Fellow</span></div>
          <div className="cred"><b>MBBS</b><span>Medicine &amp; Surgery</span></div>
        </div>
      </div>
      {/* philosophy / narrative */}
      <div className="pad wrap split rev" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="imgph" style={{ aspectRatio: "1" }}><img src="/assets/danny-clinic.jpg" alt="Dr. Danny at the clinic" /><span className="tag">At the clinic</span></div>
        <div>
          <div className="rule"></div>
          <span className="ov">In his words</span>
          <h2 className="big" style={{ marginTop: "14px" }}>“A doctor's most valuable offer today isn't more information — it's <em>trusted interpretation.</em>”</h2>
          <p className="lede" style={{ marginTop: "20px" }}>For years I watched people chase the next test, supplement, headline. AvaElis does the opposite: measure what matters, read it honestly, build a plan you can live.</p>
        </div>
      </div>
      {/* timeline */}
      <div className="pad wrap" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="rule"></div><span className="ov">Career</span>
        <h2 className="big" style={{ margin: "14px 0 30px" }}>A measured path.</h2>
        <div className="tl">
          <div className="row"><span className="yr">1999</span><div><b>MBBS, clinical training</b><p>Qualifies; begins hospital rotations.</p></div></div>
          <div className="row"><span className="yr">2004</span><div><b>General practice</b><p>FRACGP fellowship; long-term patient base.</p></div></div>
          <div className="row"><span className="yr">2015</span><div><b>Australian Government medical advisor</b><p>Health policy &amp; clinical standards, national level.</p></div></div>
          <div className="row"><span className="yr">2023</span><div><b>Longevity focus</b><p>Precision diagnostics &amp; healthspan.</p></div></div>
          <div className="row"><span className="yr">2026</span><div><b>Founds AvaElis Health</b><p>A boutique longevity clinic. One doctor, real data, no hype.</p></div></div>
        </div>
      </div>
      {/* featured / speaking */}
      <div className="band"><div className="pad wrap" style={{ textAlign: "center" }}>
        <span className="ov">As featured &amp; speaking</span>
        <h2 className="big" style={{ color: "#fff", marginTop: "12px", maxWidth: "16em", marginLeft: "auto", marginRight: "auto" }}>On the record.</h2>
        <p className="lede" style={{ color: "var(--muted-l)", maxWidth: "34em", margin: "16px auto 0" }}>Speaking at the Lifestyle Health Summit 2026. Writing on precision longevity for clinicians and patients.</p>
      </div></div>
      <div className="band"><div className="pad-s wrap split">
        <div><div className="rule" style={{ background: "var(--bronze-l)" }}></div><span className="ov">The dispatch</span><h2 className="big" style={{ color: "#fff", marginTop: "12px" }}>Considered notes, on occasion.</h2><p className="lede" style={{ color: "var(--muted-l)", marginTop: "14px" }}>Evidence-led writing from Dr. Danny. No noise.</p></div>
        <div className="form" style={{ background: "rgba(255,255,255,.04)", borderColor: "rgba(255,255,255,.16)" }}><div className="field"><label style={{ color: "var(--muted-l)" }}>Email</label><input type="email" placeholder="you@example.com" /></div><a className="btn btn-b" href="#" style={{ width: "100%", justifyContent: "center" }}>Subscribe</a></div>
      </div></div>
    </>
  );
}
