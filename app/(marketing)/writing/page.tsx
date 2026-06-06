export default function WritingPage() {
  return (
    <>
      <div className="phero">
        <div className="wrap">
          <div className="breadcrumb"><a href="/#home">Home</a> / Writing</div>
          <span className="ov">Writing &amp; insights</span>
          <h1>Education-led notes, <em>never hype.</em></h1>
          <p className="lede">Researched writing on longevity and precision wellness — the considered view, not medical advice.</p>
        </div>
      </div>
      <div className="pad-s wrap">
        <a className="feat-art" href="#article" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="imgph"><img src="https://images.pexels.com/photos/4226912/pexels-photo-4226912.jpeg?auto=compress&cs=tinysrgb&w=800" alt="DEXA scan" /></div>
          <div className="ab"><span className="cat">Featured · Diagnostics</span><h2 className="big" style={{ fontSize: "clamp(24px, 6vw, 32px)", margin: "12px 0" }}>What a DEXA scan actually tells you</h2><p className="lede" style={{ fontSize: "16px" }}>Beyond BMI: what visceral fat, lean mass and bone density reveal that the scales can't.</p><span className="mono" style={{ fontSize: "11px", color: "var(--muted)", display: "block", marginTop: "16px" }}>8 min read · Dr. Danny Cai</span></div>
        </a>
      </div>
      <div className="pad-s wrap">
        <div className="g3">
          <a className="artcard" href="#article"><div className="imgph"><img src="https://images.pexels.com/photos/20523354/pexels-photo-20523354.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" /></div><span className="cat">Fundamentals</span><h3>The five things with the strongest evidence</h3><p>Where to spend your effort first, and what to quietly ignore.</p><span className="meta">6 min read</span></a>
          <a className="artcard" href="#article"><div className="imgph"><img src="https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" /></div><span className="cat">Framework</span><h3>Three filters for cutting through hype</h3><p>Evidence, safety, upside, a simple test for any new longevity claim.</p><span className="meta">5 min read</span></a>
          <a className="artcard" href="#article"><div className="imgph"><img src="https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" /></div><span className="cat">Metabolic</span><h3>Why your fasting insulin matters more than you think</h3><p>An early-warning marker most check-ups never order.</p><span className="meta">7 min read</span></a>
        </div>
      </div>
      <div className="band"><div className="pad-s wrap split">
        <div><div className="rule" style={{ background: "var(--bronze-l)" }}></div><span className="ov">The dispatch</span><h2 className="big" style={{ color: "#fff", marginTop: "12px" }}>Considered notes, on occasion.</h2><p className="lede" style={{ color: "var(--muted-l)", marginTop: "14px" }}>Evidence-led writing from Dr. Danny. No noise.</p></div>
        <div className="form" style={{ background: "rgba(255,255,255,.04)", borderColor: "rgba(255,255,255,.16)" }}><div className="field"><label style={{ color: "var(--muted-l)" }}>Email</label><input type="email" placeholder="you@example.com" /></div><a className="btn btn-b" href="#" style={{ width: "100%", justifyContent: "center" }}>Subscribe</a></div>
      </div></div>
    </>
  );
}
