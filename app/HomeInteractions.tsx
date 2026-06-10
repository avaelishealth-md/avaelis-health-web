"use client";

import { useEffect } from "react";

export default function HomeInteractions() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    // ── Script 1: qcard reveal + service carousel nav ──────────────────────
    (function () {
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const qs = ([] as Element[]).slice.call(document.querySelectorAll(".qcard"));
      if (!("IntersectionObserver" in window) || reduced) {
        qs.forEach(function (c) {
          c.classList.add("in");
        });
      } else {
        const io = new IntersectionObserver(
          function (es) {
            es.forEach(function (e) {
              if (e.isIntersecting) {
                const i = qs.indexOf(e.target);
                setTimeout(function () {
                  e.target.classList.add("in");
                }, (i % 5) * 90);
                io.unobserve(e.target);
              }
            });
          },
          { threshold: 0.2 }
        );
        qs.forEach(function (c) {
          io.observe(c);
        });
        setTimeout(function () {
          qs.forEach(function (c) {
            if (c.getBoundingClientRect().top < innerHeight * 0.97) c.classList.add("in");
          });
        }, 500);
        cleanups.push(function () {
          io.disconnect();
        });
      }
      const track = document.getElementById("svcTrack");
      if (track) {
        const card = track.querySelector(".qcard");
        function step() {
          return (card ? card.getBoundingClientRect().width : 300) + 18;
        }
        const p = document.querySelector(".svc-prev") as HTMLElement | null;
        const n = document.querySelector(".svc-next") as HTMLElement | null;
        const onNext = function () {
          track.scrollBy({ left: step(), behavior: "smooth" });
        };
        const onPrev = function () {
          track.scrollBy({ left: -step(), behavior: "smooth" });
        };
        if (n) n.addEventListener("click", onNext);
        if (p) p.addEventListener("click", onPrev);
        cleanups.push(function () {
          if (n) n.removeEventListener("click", onNext);
          if (p) p.removeEventListener("click", onPrev);
        });
      }
    })();

    // ── Script 2: reveal-on-scroll + wipes/journey + evidence gauges ───────
    (function () {
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const rev = ([] as Element[]).slice.call(document.querySelectorAll(".reveal"));
      function show(e: Element) {
        e.classList.add("in");
      }
      if (!("IntersectionObserver" in window) || reduced) {
        rev.forEach(show);
      } else {
        const io = new IntersectionObserver(
          function (es) {
            es.forEach(function (e) {
              if (e.isIntersecting) {
                show(e.target);
                io.unobserve(e.target);
              }
            });
          },
          { threshold: 0.14 }
        );
        rev.forEach(function (e) {
          io.observe(e);
        });
        setTimeout(function () {
          rev.forEach(function (e) {
            if (e.getBoundingClientRect().top < innerHeight * 0.96) show(e);
          });
        }, 400);
        cleanups.push(function () {
          io.disconnect();
        });
      }
      // wipes + journey line share IO
      const anim = ([] as Element[]).slice.call(document.querySelectorAll(".wipe, .track"));
      if ("IntersectionObserver" in window && !reduced) {
        const io2 = new IntersectionObserver(
          function (es) {
            es.forEach(function (e) {
              if (e.isIntersecting) {
                e.target.classList.add("in");
                io2.unobserve(e.target);
              }
            });
          },
          { threshold: 0.25 }
        );
        anim.forEach(function (e) {
          io2.observe(e);
        });
        cleanups.push(function () {
          io2.disconnect();
        });
      } else {
        anim.forEach(function (e) {
          e.classList.add("in");
        });
      }
      // gauges
      const arcs = ([] as Element[]).slice.call(document.querySelectorAll(".arc"));
      function fillArc(a: Element) {
        const el = a as SVGElement;
        const c = 263.9;
        const p = +(a.getAttribute("data-pct") as string);
        el.style.transition = "stroke-dashoffset 1.5s cubic-bezier(.16,1,.3,1)";
        el.style.strokeDashoffset = (c * (1 - p / 100)).toFixed(1);
        const g = a.closest(".gauge");
        const pc = g && g.querySelector(".pc");
        if (pc) {
          let t0: number | null = null;
          (function tick(ts: number) {
            if (!t0) t0 = ts;
            const k = Math.min((ts - t0) / 1500, 1);
            const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
            pc.textContent = String(Math.round(p * e));
            if (k < 1) requestAnimationFrame(tick);
          })(performance.now());
        }
      }
      if ("IntersectionObserver" in window && !reduced) {
        const io3 = new IntersectionObserver(
          function (es) {
            es.forEach(function (e) {
              if (e.isIntersecting) {
                fillArc(e.target);
              } else {
                const a = e.target as SVGElement;
                const c = 263.9;
                a.style.transition = "none";
                a.style.strokeDashoffset = String(c);
                const g = a.closest(".gauge");
                const pc = g && g.querySelector(".pc");
                if (pc) pc.textContent = "0";
              }
            });
          },
          { threshold: 0.5 }
        );
        arcs.forEach(function (a) {
          io3.observe(a);
        });
        cleanups.push(function () {
          io3.disconnect();
        });
      } else {
        arcs.forEach(fillArc);
      }
    })();

    // ── Script 3: mobile nav hamburger ─────────────────────────────────────
    (function () {
      const t = document.getElementById("navToggle");
      const h = document.querySelector("header.nav");
      if (t && h) {
        const onToggle = function () {
          h.classList.toggle("open");
        };
        t.addEventListener("click", onToggle);
        const links = ([] as Element[]).slice.call(h.querySelectorAll("nav.lk a"));
        const onLink = function () {
          h.classList.remove("open");
        };
        links.forEach(function (a) {
          a.addEventListener("click", onLink);
        });
        cleanups.push(function () {
          t.removeEventListener("click", onToggle);
          links.forEach(function (a) {
            a.removeEventListener("click", onLink);
          });
        });
      }
    })();

    return function () {
      cleanups.forEach(function (fn) {
        fn();
      });
    };
  }, []);

  return null;
}
