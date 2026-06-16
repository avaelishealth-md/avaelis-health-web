import { amaCitation, studyLabel } from "@/lib/references";
import type { PostRef } from "@/lib/types";

// Styled, clinician-grade reference list for blog posts + the clinician summary.
// Pure render (safe in server or client components). References are verified by the
// content engine (Europe PMC / PubMed) and never invented.
export default function References({ refs }: { refs?: PostRef[] | null }) {
  if (!refs || refs.length === 0) return null;
  return (
    <section className="refs" aria-label="References">
      <h2 className="refs-h">References</h2>
      <ol className="refs-list">
        {refs.map((r, i) => {
          const badge = studyLabel(r);
          return (
            <li key={i} className="refs-item">
              <span className="refs-num" aria-hidden="true">
                {i + 1}
              </span>
              <div className="refs-body">
                {badge && <span className="refs-badge">{badge}</span>}
                <span className="refs-cite">{amaCitation(r)}</span>
                <span className="refs-meta">
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="refs-link"
                  >
                    View source
                  </a>
                  {typeof r.citedBy === "number" && r.citedBy > 0 && (
                    <span className="refs-cited">Cited by {r.citedBy}</span>
                  )}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
