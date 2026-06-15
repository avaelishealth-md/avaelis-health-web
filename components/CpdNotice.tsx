// RACGP CPD accreditation notice for accredited education modules.
// Rendered on a post when its tags include "CPD". Activity ID is Module 1
// (Foundations of Peptides); generalise per-module if more accredited modules are added.
export default function CpdNotice() {
  return (
    <div className="cpd">
      <div className="cpd-badge">
        <img src="/assets/racgp-cpd-badge.png" alt="RACGP CPD accredited activity" />
      </div>
      <div className="cpd-body">
        <span className="cpd-k">RACGP-accredited education</span>
        <p>
          This educational activity was developed by AvaElis Health in collaboration with
          Medihuanna, which provided educational oversight and CPD accreditation as a RACGP
          CPD-approved education provider. The activity has been approved by the RACGP (Activity
          ID: 1631161). On completion, participants are eligible to claim CPD hours, automatically
          uploaded to their RACGP CPD dashboard in accordance with the approved CPD allocation.
        </p>
      </div>
    </div>
  );
}
