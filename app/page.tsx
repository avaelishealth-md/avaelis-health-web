"use client";

import "./home.css";
import HomeInteractions from "./HomeInteractions";

export default function HomePage() {
  return (
    <>
      <header className="nav">
        <div className="wrap nav-in">
          <a className="brand" href="/#top"><span className="em">A</span><span>AvaElis Health<span className="sub">Longevity Clinic</span></span></a>
          <nav className="lk">
            <a href="/#services">Services</a>
            <a href="/#approach">The Science</a>
            <a href="/#index">Evidence</a>
            <a href="/about">Dr. Danny</a>
            <a href="/podcast">Podcast</a>
            <a href="/writing">Writing</a>
            <a href="/#enquire" className="navbook">Book a consultation</a>
          </nav>
          <button className="navtoggle" id="navToggle" type="button" aria-label="Open menu">☰</button>
          <a href="/#enquire" className="nbtn">Book a consultation</a>
        </div>
      </header>

      <main>
        <section className="hero-fb">
          <div className="hero-fb-img"><img src="/assets/danny-navy.jpg" alt="Dr. Danny Cai" /></div>
          <div className="hero-fb-scrim"></div>
          <div className="wrap hero-fb-in">
            <div className="reveal">
              <h1>More years <em>thriving</em>, less years declining.</h1>
              <p className="lede">A boutique longevity practice, led personally by a credentialled doctor. Rigorous, evidence-led, the considered alternative to hype.</p>
              <div className="acts">
                <a href="/#enquire" className="btn btn-f">Book a consultation</a>
                <a href="/#index" className="btn btn-l">The evidence</a>
              </div>
              <p className="hero-creds">MBBS · FRACGP · Former Commonwealth medical advisor</p>
            </div>
          </div>
          <div className="hero-ann-wrap">
            <a className="hero-ann" href="https://www.eventbrite.com.au/e/lifestyle-health-summit-2026-for-gps-and-health-professionals-tickets-1989061056163" target="_blank" rel="noopener">
              <span className="ann-key">Speaking</span>
              <span className="ann-event">Lifestyle Health Summit 2026</span>
              <span className="ann-cta">View event <span className="ann-arr">→</span></span>
            </a>
          </div>
        </section>
        <div className="hero-marqwrap">
          <div className="wrap">
            <div className="hero-marq">
              <div className="hm-tr">
                <span>MBBS, FRACGP</span><span>Former Commonwealth medical advisor</span><span>DHF26 keynote, Science vs Hype</span><span>YPO longevity address</span><span>25 years in medicine</span>
                <span>MBBS, FRACGP</span><span>Former Commonwealth medical advisor</span><span>DHF26 keynote, Science vs Hype</span><span>YPO longevity address</span><span>25 years in medicine</span>
              </div>
            </div>
          </div>
        </div>

        <section id="services">
          <div className="wrap">
            <div className="sec-h reveal"><h2>Listed openly, <em>the honest filter.</em></h2><p>Consultations and diagnostics are priced openly. Personalised treatment is discussed in consultation.</p></div>
            <div className="svc-carousel">
              <div className="svc-track" id="svcTrack">
                <article className="qcard"><figure className="qimg"><img src="https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=700" alt="Consultation" loading="lazy" /></figure><div className="qbody"><h3>Longevity consultation</h3><p>A full, unhurried clinical consult with Dr. Danny, history, goals and an evidence-led plan.</p><div className="qprice">$450<small>initial · 75 min</small></div></div></article>
                <article className="qcard"><figure className="qimg"><img src="https://images.pexels.com/photos/17183648/pexels-photo-17183648.jpeg?auto=compress&cs=tinysrgb&w=700" alt="Body composition" loading="lazy" /></figure><div className="qbody"><h3>Full-body DEXA</h3><p>DEXA quantifies visceral fat, lean mass and bone density in ~10 minutes — where change gets real.</p><div className="qprice">$190<small>per scan</small></div></div></article>
                <article className="qcard"><figure className="qimg"><img src="https://images.pexels.com/photos/20523354/pexels-photo-20523354.jpeg?auto=compress&cs=tinysrgb&w=700" alt="VO2 max test" loading="lazy" /></figure><div className="qbody"><h3>VO₂ max assessment</h3><p>The strongest predictor of all-cause mortality — stronger than smoking or blood pressure.</p><div className="qprice">$320<small>per test</small></div></div></article>
                <article className="qcard"><figure className="qimg"><img src="https://images.pexels.com/photos/4226912/pexels-photo-4226912.jpeg?auto=compress&cs=tinysrgb&w=700" alt="Biomarker panel" loading="lazy" /></figure><div className="qbody"><h3>Comprehensive biomarker panel</h3><p>A deep read across metabolic, cardiovascular, hormonal and inflammatory markers, interpreted with you.</p><div className="qprice">$590<small>panel + review</small></div></div></article>
                <article className="qcard prog"><figure className="qimg"><img src="/assets/danny-clinic.jpg" alt="Dr. Danny Cai with a colleague at the clinic" loading="lazy" /></figure><div className="qbody"><h3>Precision Longevity Program</h3><p>Ongoing optimisation, re-testing and personalised care across the year, emerging therapies discussed only in consultation.</p><div className="qprice">From $3,900<small>per year</small></div><a href="/#enquire" className="btn btn-f" style={{ marginTop: "16px" }}>Enquire</a></div></article>
              </div>
              <div className="svc-nav"><button className="svc-prev" type="button" aria-label="Previous service">←</button><button className="svc-next" type="button" aria-label="Next service">→</button></div>
              <p className="svc-note">Diagnostics and consultations are listed freely. No prescription medicines are advertised or priced.</p>
            </div>
          </div>
        </section>

        <section className="who" id="who">
          <div className="wrap">
            <div className="sec-h reveal"><h2>Three people we're built for.</h2></div>
            <div className="triad">
              <div className="tc reveal"><div className="nm">i. Patients</div><h3>The proactive optimiser</h3><p>Health-literate optimisers who invest in high-touch, data-backed care.</p></div>
              <div className="tc reveal d1"><div className="nm">ii. Clinicians</div><h3>Doctors &amp; students</h3><p>Doctors who want to practise evidence-led longevity — plus those awaiting certification.</p></div>
              <div className="tc reveal d2"><div className="nm">iii. Partners</div><h3>Collaborators</h3><p>Investors and operators building serious, clinical longevity.</p></div>
            </div>
          </div>
        </section>

        <section className="manifesto">
          <div className="wrap">
            <div className="man-grid">
              <div>
                <p className="man-q">Between <em>“you're fine, see you next year”</em> and <em>“one pill from immortality”</em> sits the honest middle.</p>
                <p className="man-sub">In an era of infinite information, the most valuable thing a clinician offers isn't more information, it's <strong>trusted interpretation.</strong></p>
              </div>
              <a className="pod-tile" href="/podcast">
                <span className="pt-top"><span className="pt-lab">Listen</span><span className="pt-play">▶</span></span>
                <span className="pt-mid"><span className="pt-k">The AvaElis Conversations</span><span className="pt-t">Ep. 03, VO₂ max, decoded</span></span>
                <span className="pt-foot">Apple · Spotify · YouTube</span>
              </a>
            </div>
          </div>
        </section>

        <section className="journey" id="approach">
          <div className="wrap">
            <div className="sec-h reveal"><h2>How it works.</h2><p>One continuous path, measured, multidisciplinary and ongoing. Evidence first, always.</p></div>
            <div className="track reveal">
              <div className="jline"></div>
              <div className="jn"><div className="dot">1</div><h4>Enquire</h4><p>A short, qualifying enquiry — your plan starts here.</p></div>
              <div className="jn"><div className="dot">2</div><h4>Consult</h4><p>An unhurried consult with Dr. Danny.</p></div>
              <div className="jn"><div className="dot">3</div><h4>Measure</h4><p>Diagnostics establish your honest baseline.</p></div>
              <div className="jn"><div className="dot">4</div><h4>Plan</h4><p>A personalised plan, built with a team around you.</p></div>
              <div className="jn"><div className="dot">5</div><h4>Optimise</h4><p>Re-test, review, refine — never single consults.</p></div>
            </div>
            <div className="flow-cycle reveal d2"><span className="cyc-lab">↻&nbsp;&nbsp;Ongoing, we measure again, and refine</span></div>
          </div>
        </section>

        <section className="index-sec" id="index">
          <div className="wrap">
            <div className="sec-h ctr reveal"><h2>The Evidence Index.</h2><p>Every popular longevity intervention, weighted by the strength of evidence behind it.</p></div>
            <div className="gauges">
              <div className="gcol g-strong reveal">
                <div className="gwrap">
                  <div className="gauge"><svg width="96" height="96" viewBox="0 0 96 96"><circle cx="48" cy="48" r="42" fill="none" stroke="#463829" strokeWidth="6"/><circle className="arc" cx="48" cy="48" r="42" fill="none" stroke="#C7A86A" strokeWidth="6" strokeLinecap="round" strokeDasharray="263.9" strokeDashoffset="263.9" data-pct="92"/></svg><span className="pc">92</span></div>
                  <div><h3>Proven</h3><div className="gd">Do these first</div></div>
                </div>
                <ul><li>Resistance training</li><li>Cardiorespiratory fitness</li><li>Sleep</li><li>Diet quality</li><li>Creatine</li></ul>
              </div>
              <div className="gcol g-emerging reveal d1">
                <div className="gwrap">
                  <div className="gauge"><svg width="96" height="96" viewBox="0 0 96 96"><circle cx="48" cy="48" r="42" fill="none" stroke="#463829" strokeWidth="6"/><circle className="arc" cx="48" cy="48" r="42" fill="none" stroke="#B8924E" strokeWidth="6" strokeLinecap="round" strokeDasharray="263.9" strokeDashoffset="263.9" data-pct="58"/></svg><span className="pc">58</span></div>
                  <div><h3>Useful tools</h3><div className="gd">Context matters</div></div>
                </div>
                <ul><li>Wearables</li><li>CGM</li><li>BMI (use DEXA)</li></ul>
              </div>
              <div className="gcol g-unproven reveal d2">
                <div className="gwrap">
                  <div className="gauge"><svg width="96" height="96" viewBox="0 0 96 96"><circle cx="48" cy="48" r="42" fill="none" stroke="#463829" strokeWidth="6"/><circle className="arc" cx="48" cy="48" r="42" fill="none" stroke="#8A7C68" strokeWidth="6" strokeLinecap="round" strokeDasharray="263.9" strokeDashoffset="263.9" data-pct="46"/></svg><span className="pc">46</span></div>
                  <div><h3>Promising</h3><div className="gd">Emerging · supervised</div></div>
                </div>
                <ul><li>Emerging therapies</li><li>Full-body MRI</li><li>Epigenetic age tests</li></ul>
              </div>
            </div>
            <div className="filters">
              <h3 className="filters-h">Three filters for hype.</h3>
              <div className="filters-grid">
                <div className="filt reveal"><span className="fn">01 / Evidence</span><p>Hard outcomes, or early signals? <em>Call it what it is.</em></p></div>
                <div className="filt reveal d1"><span className="fn">02 / Safety</span><p>Dose, duration, interactions. <em>“Natural” is not a safety profile.</em></p></div>
                <div className="filt reveal d2"><span className="fn">03 / Upside</span><p>Worth it even with no upside? <em>Would I give it to a friend?</em></p></div>
              </div>
            </div>
            <p className="index-foot">General education drawn from Dr. Danny's published “Science vs Hype” framework, not individual medical advice.</p>
          </div>
        </section>

        <section id="targets">
          <div className="wrap">
            <div className="sec-h reveal"><h2>What longevity medicine targets.</h2><p>Five predictable destinations — almost all with modifiable risk factors.</p></div>
            <div className="dest-grid">
              <div className="dest reveal"><span className="gly" aria-hidden="true"><svg viewBox="0 0 48 48"><path className="draw" style={{ ["--len" as string]: "120" }} d="M6 27h7l3-7 5 14 4-19 4 12 2-5h6"/><path className="pulse" d="M40 13.5a4.4 4.4 0 0 0-7-1.2" style={{ opacity: ".6" }}/></svg></span><h3>Cardiovascular</h3><p>Blood pressure, lipids, and the events we prevent.</p></div>
              <div className="dest reveal d1"><span className="gly" aria-hidden="true"><svg viewBox="0 0 48 48"><path className="draw" style={{ ["--len" as string]: "150" }} d="M24 9c-5 0-8 3-8 7-3 1-4 4-2.5 6.5C12 25 13 29 17 30c0 4 3 6 7 6"/><path className="draw" style={{ ["--len" as string]: "150" }} d="M24 9c5 0 8 3 8 7 3 1 4 4 2.5 6.5C36 25 35 29 31 30c0 4-3 6-7 6"/><line className="draw" style={{ ["--len" as string]: "30" }} x1="24" y1="12" x2="24" y2="36"/><circle className="pulse" cx="19" cy="20" r="1.6" style={{ fill: "currentColor", stroke: "none" }}/><circle className="pulse" cx="29" cy="24" r="1.6" style={{ fill: "currentColor", stroke: "none" }}/></svg></span><h3>Neurocognitive</h3><p>Cognition, and long-term protection of the brain.</p></div>
              <div className="dest reveal d2"><span className="gly" aria-hidden="true"><svg viewBox="0 0 48 48"><path className="draw" style={{ ["--len" as string]: "110" }} d="M37 17a15 15 0 1 0 2 12"/><polyline className="draw" style={{ ["--len" as string]: "30" }} points="33,9 38,17 30,20"/><circle className="pulse" cx="24" cy="24" r="5"/></svg></span><h3>Metabolic</h3><p>Insulin, glucose and liver health.</p></div>
              <div className="dest reveal d2"><span className="gly" aria-hidden="true"><svg viewBox="0 0 48 48"><path className="draw" style={{ ["--len" as string]: "90" }} d="M16 16c-3-1-6 1-5 4 .6 2 3 2 4 1l8 8c-1 1-1 3.4 1 4 3 1 5-2 4-5"/><path className="draw" style={{ ["--len" as string]: "90" }} d="M32 32c3 1 6-1 5-4-.6-2-3-2-4-1l-8-8c1-1 1-3.4-1-4-3-1-5 2-4 5"/><circle className="pulse" cx="24" cy="24" r="2" style={{ fill: "currentColor", stroke: "none" }}/></svg></span><h3>Musculoskeletal</h3><p>Strength and muscle — the guard against frailty.</p></div>
              <div className="dest reveal d2"><span className="gly" aria-hidden="true"><svg viewBox="0 0 48 48"><path className="draw" style={{ ["--len" as string]: "120" }} d="M24 7l13 5v9c0 8-5.5 14-13 16-7.5-2-13-8-13-16v-9z"/><circle className="pulse" cx="24" cy="22" r="4.5"/><circle className="draw" style={{ ["--len" as string]: "60", opacity: ".45" }} cx="24" cy="22" r="9"/></svg></span><h3>Cancer</h3><p>Risk reduction and earlier detection.</p></div>
            </div>
          </div>
        </section>

        <section className="band-hero">
          <div className="band-hero-img"><img src="/assets/danny-gym.jpg" alt="Dr. Danny training" /></div>
          <div className="band-hero-scrim"></div>
          <div className="wrap band-hero-in">
            <div className="reveal">
              <h2>Fundamentals first. <em>I live and breathe this.</em></h2>
              <p className="bhp">The plan I build for you is the one I follow myself, strength, fitness and recovery, measured honestly and earned in the room.</p>
            </div>
          </div>
        </section>

        <section className="meet" id="danny">
          <div className="wrap meet-in">
            <figure className="wipe reveal"><img src="/assets/danny-scrubs-stand.jpg" alt="Dr. Danny Cai" /></figure>
            <div className="reveal d1">
              <blockquote style={{ marginTop: "18px" }}>“On paper, I was fine. <em>In real life, I wasn't.</em> BMI 22, blood pressure normal, bloods unremarkable, and tired, foggy, running on autopilot. Normal is a range, not a target.”</blockquote>
              <div className="sig">Dr. Danny Cai</div>
              <div className="role">MBBS · FRACGP · Founder, AvaElis Health</div>
              <div className="creds">
                <div className="cr"><b>25 years</b><span>In clinical medicine</span></div>
                <div className="cr"><b>FRACGP</b><span>Fellow, RACGP</span></div>
                <div className="cr"><b>Commonwealth</b><span>Former medical advisor</span></div>
                <div className="cr"><b>DHF26</b><span>Keynote speaker</span></div>
              </div>
              <a href="/about" className="btn btn-l" style={{ marginTop: "28px" }}>Learn more about Danny →</a>
            </div>
          </div>
        </section>

        <section id="doors">
          <div className="wrap">
            <div className="sec-h reveal"><h2>Begin the conversation.</h2></div>
            <div className="doors">
              <div className="door reveal"><div className="dn">For patients</div><h3>Become a patient</h3><p>Enquire, consult, measure, then a plan built around your data.</p><a href="/#enquire" className="lk">Book a consultation →</a></div>
              <div className="door reveal d1"><div className="dn">For clinicians</div><h3>Work with Danny</h3><p>Practise alongside him and register interest in the certification course (pending accreditation).</p><a href="/#enquire" className="lk">Register interest →</a></div>
              <div className="door reveal d2"><div className="dn">For partners</div><h3>Collaborate</h3><p>A quiet, credible path for investors and operators in clinical longevity.</p><a href="/#enquire" className="lk">Partner with us →</a></div>
            </div>
          </div>
        </section>

        <section className="pod" id="podcast">
          <div className="wrap">
            <div className="sec-h reveal"><h2>The AvaElis conversations.</h2><p>Honest, long-form talks on living well for longer. Hosted by Dr. Danny Cai.</p></div>
            <div className="pod-grid">
              <article className="ep reveal"><span className="epn">Ep. 03</span><h3>VO₂ max, decoded</h3><p>Why cardiorespiratory fitness is the strongest signal we measure, and how to move the number.</p><span className="play"><span className="pbtn">▶</span> 42 min</span></article>
              <article className="ep reveal d1"><span className="epn">Ep. 02</span><h3>Science vs hype</h3><p>A working framework for telling proven from promising from pure marketing.</p><span className="play"><span className="pbtn">▶</span> 38 min</span></article>
              <article className="ep reveal d2"><span className="epn">Ep. 01</span><h3>Normal is a range</h3><p>“On paper I was fine.” Why average isn't the same as optimal, and where to begin.</p><span className="play"><span className="pbtn">▶</span> 35 min</span></article>
            </div>
            <div className="pod-sub reveal"><a href="#">Apple Podcasts</a><a href="#">Spotify</a><a href="#">YouTube</a></div>
          </div>
        </section>

        <section className="enq" id="enquire">
          <div className="wrap enq-in">
            <div className="reveal">
              <h2 style={{ marginTop: "14px" }}>Begin a <em>conversation.</em></h2>
              <p className="lede">Tell us a little about you — we respond personally to arrange an introduction.</p>
              <p className="ov" style={{ marginTop: "26px", color: "var(--muted)" }}>LinkedIn · avaelishealth.com.au</p>
            </div>
            <form className="frm reveal d1" onSubmit={(event) => { event.preventDefault(); (event.currentTarget as HTMLFormElement).innerHTML = '<p style="font-family:Spectral,serif;font-size:24px;text-align:center;padding:50px 0;color:#9A7536">Thank you, we will be in touch personally.</p>'; }}>
              <label>Full name</label><input type="text" placeholder="Your name" required />
              <label>Email</label><input type="email" placeholder="you@example.com" required />
              <label>I'm enquiring as</label><select><option>A prospective patient</option><option>A clinician / course interest</option><option>A partner or collaborator</option></select>
              <label>What's prompting this?</label><input type="text" placeholder="A line or two helps us prepare" />
              <button className="btn btn-f" type="submit">Send enquiry</button>
              <p className="fine">No public price list for treatment, personalised care is discussed in consultation. Your details stay private.</p>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="foot-top">
            <div>
              <a className="brand" href="/#top"><span className="em" style={{ borderColor: "var(--bronze-l)", color: "var(--bronze-l)" }}>A</span><span>AvaElis Health<span className="sub">Longevity Clinic</span></span></a>
              <p style={{ fontSize: "14px", fontWeight: "300", marginTop: "14px", maxWidth: "24em", color: "#D5C8B4" }}>More years thriving, less years declining. A boutique longevity practice, Dr. Danny Cai.</p>
            </div>
            <div className="foot-cols">
              <div className="fcol"><h5>Practice</h5><a href="/#services">Services &amp; pricing</a><a href="/#approach">The Science</a><a href="/#index">Evidence Index</a><a href="/about">Dr. Danny</a></div>
              <div className="fcol"><h5>Enquire</h5><a href="/#enquire">Patients</a><a href="/#enquire">Clinicians</a><a href="/#enquire">Partners</a></div>
              <div className="fcol"><h5>Follow</h5><a href="#">LinkedIn</a><a href="#">YouTube</a><a href="#">Instagram</a><a href="/writing">Writing</a><a href="/podcast">Podcast</a></div>
            </div>
          </div>
          <p className="disclaim">AvaElis Health provides general longevity and preventive care and is not a substitute for emergency or acute treatment. Public content is general education, not individual medical advice. No prescription medicines are advertised; personalised treatment follows clinical consultation.</p>
          <div className="foot-bot"><span>© 2026 AvaElis Health. All rights reserved.</span><span>Privacy · Terms · Medical disclaimer</span></div>
        </div>
      </footer>

      <HomeInteractions />
    </>
  );
}
