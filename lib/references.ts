import type { PostRef } from "@/lib/types";

// Display helpers for references, ported from the content engine so the blog renders
// the same AMA citation + evidence-hierarchy badge clinicians expect. Pure functions.

// Evidence-hierarchy labels, strongest first; the badge shows the best match.
const STUDY_LABELS: [RegExp, string][] = [
  [/meta-?analysis/i, "Meta-analysis"],
  [/systematic review/i, "Systematic review"],
  [/randomized controlled trial/i, "RCT"],
  [/clinical trial/i, "Clinical trial"],
  [/^review$/i, "Review"],
];

/** Best study-type badge for a reference, or undefined for plain articles. */
export function studyLabel(ref: Pick<PostRef, "pubTypes">): string | undefined {
  for (const [re, label] of STUDY_LABELS) {
    if (ref.pubTypes?.some((t) => re.test(t.trim()))) return label;
  }
  return undefined;
}

/** AMA-style citation: first 3 authors (et al), title, journal, year, PMID. */
export function amaCitation(ref: PostRef): string {
  const names = (ref.authors ?? "")
    .split(",")
    .map((a) => a.trim().replace(/\.$/, ""))
    .filter(Boolean);
  const authors =
    names.length > 3 ? `${names.slice(0, 3).join(", ")}, et al` : names.join(", ");
  const parts = [
    authors ? `${authors}.` : null,
    `${ref.title}.`,
    ref.journal ? `${ref.journal}.` : null,
    ref.year ? `${ref.year}.` : null,
    ref.pmid ? `PMID: ${ref.pmid}.` : null,
  ];
  return parts.filter(Boolean).join(" ");
}
