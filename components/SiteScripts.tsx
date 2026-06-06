"use client";

import { useEffect } from "react";

/** Sub-page behaviour ported from scripts/site.js: reveal-on-scroll that
 *  re-triggers in both directions. (The mobile nav hamburger is handled by
 *  the Header component's own state.) */
export default function SiteScripts() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rev = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    if (!("IntersectionObserver" in window) || reduced) {
      rev.forEach((e) => e.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.target.classList.toggle("in", e.isIntersecting)),
      { threshold: 0.14 }
    );
    rev.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return null;
}
