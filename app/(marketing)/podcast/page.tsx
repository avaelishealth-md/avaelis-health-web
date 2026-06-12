import NewsletterForm from "@/components/NewsletterForm";

export default function PodcastPage() {
  return (
    <>
      <div className="phero">
        <div className="wrap">
          <div className="breadcrumb"><a href="#home">Home</a> / Podcast</div>
          <span className="ov">The AvaElis Conversations</span>
          <h1>Longevity, <em>decoded.</em></h1>
          <p className="lede">Unhurried conversations on living well for longer, the evidence and the honest middle ground.</p>
          <div className="subscribe" style={{ marginTop: "22px" }}><a href="#">Apple Podcasts</a><a href="#">Spotify</a><a href="#">YouTube</a><a href="#">RSS</a></div>
        </div>
      </div>
      <div className="pad-s wrap">
        <a href="#episode" style={{ textDecoration: "none" }}><div className="player">
          <span className="pbtn">▶</span>
          <div className="pmeta"><span className="k">Latest · Ep. 03</span><h3>VO₂ max, decoded</h3><div className="bar"></div><div className="time"><span>14:22</span><span>42:08</span></div></div>
        </div></a>
      </div>
      <div className="pad-s wrap">
        <div className="eplist">
          <a href="#episode" className="epitem" style={{ textDecoration: "none", color: "inherit" }}><span className="num">03</span><div><b>VO₂ max, decoded</b><p>The single best predictor of a long life, what it is, how it's measured, and how to move the number.</p></div><span className="dur">42 min</span></a>
          <a href="#episode" className="epitem" style={{ textDecoration: "none", color: "inherit" }}><span className="num">02</span><div><b>The honest middle</b><p>Between “you're fine, see you next year” and “one supplement from immortality.”</p></div><span className="dur">38 min</span></a>
          <a href="#episode" className="epitem" style={{ textDecoration: "none", color: "inherit" }}><span className="num">01</span><div><b>Normal is a range</b><p>“On paper I was fine.” Why average isn't optimal, and where to begin.</p></div><span className="dur">35 min</span></a>
        </div>
      </div>
      <div className="band"><div className="pad-s wrap split">
        <div><div className="rule" style={{ background: "var(--bronze-l)" }}></div><span className="ov">The dispatch</span><h2 className="big" style={{ color: "#fff", marginTop: "12px" }}>Considered notes, on occasion.</h2><p className="lede" style={{ color: "var(--muted-l)", marginTop: "14px" }}>Evidence-led writing from Dr. Danny. No noise.</p></div>
        <NewsletterForm source="Podcast" />
      </div></div>
    </>
  );
}
