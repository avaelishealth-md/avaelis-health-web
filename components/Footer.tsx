import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div>
            <Link className="brand" href="/">
              <span
                className="em"
                style={{ background: "var(--bronze-l)", color: "var(--ink)" }}
              >
                Æ
              </span>
              <span>
                AvaElis Health<span className="sub">Longevity Clinic</span>
              </span>
            </Link>
            <p
              style={{
                fontSize: 14,
                fontWeight: 300,
                marginTop: 14,
                maxWidth: "24em",
                color: "#D5C8B4",
              }}
            >
              More years thriving, less years declining. A boutique longevity
              practice, Dr. Danny Cai.
            </p>
          </div>
          <div className="foot-cols">
            <div className="fcol">
              <h5>Practice</h5>
              <Link href="/#services">Services</Link>
              <Link href="/#approach">The Science</Link>
              <Link href="/#index">Evidence Index</Link>
              <Link href="/about">Dr. Danny</Link>
            </div>
            <div className="fcol">
              <h5>Enquire</h5>
              <Link href="/#enquire">Patients</Link>
              <Link href="/#enquire">Clinicians</Link>
              <Link href="/#enquire">Partners</Link>
            </div>
            <div className="fcol">
              <h5>Follow</h5>
              <a href="https://au.linkedin.com/in/dr-danny-cai-4a7ab093" target="_blank" rel="noopener">LinkedIn</a>
              <Link href="/writing">Writing</Link>
            </div>
          </div>
        </div>
        <p className="disclaim">
          AvaElis Health provides general longevity and preventive care and is
          not a substitute for emergency or acute treatment. Public content is
          general education, not individual medical advice. No prescription
          medicines are advertised; personalised treatment follows clinical
          consultation.
        </p>
        <div className="foot-bot">
          <span>© 2026 AvaElis Health. All rights reserved.</span>
          <span>Privacy · Terms · Medical disclaimer</span>
        </div>
      </div>
    </footer>
  );
}
