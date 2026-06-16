// RACGP CPD accreditation notice for accredited education modules.
// Rendered on a post when its tags include "CPD". Activity ID + hours are
// Module 1 (Foundations of Peptides); generalise per-module if more
// accredited modules are added.
export default function CpdNotice() {
  return (
    <div className="cpd">
      <img
        className="cpd-badge"
        src="/assets/racgp-cpd-badge.png"
        alt="RACGP CPD Approved Activity: Educational Activities, 1 hour"
      />
      <div className="cpd-body">
        <span className="cpd-k">RACGP-accredited education</span>
        <p className="cpd-text">
          This educational activity was developed by AvaElis Health in collaboration with Medihuanna,
          a RACGP CPD-approved education provider. It has been approved by the RACGP (Activity ID:
          1631161). On completion, participants are eligible to claim 1 hour of RACGP CPD in the
          Educational Activities category, automatically uploaded to their RACGP CPD dashboard.
        </p>
        <p className="cpd-provider">
          <span>Provided by</span>
          <img
            className="cpd-logo"
            src="/assets/medihuanna.png"
            alt="Medihuanna, RACGP CPD-approved education provider"
          />
        </p>
      </div>
    </div>
  );
}
