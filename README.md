# AvaElis Health — Marketing Site

Boutique longevity-medicine practice site for **Dr Danny Cai / AvaElis Health**.
"Atelier" design direction — warm, editorial, quiet-luxury.
Tagline: *More years thriving, less years declining.*

## Status: live mock (static)
This is the high-fidelity design prototype (HTML/CSS/JS) deployed as a shareable
preview. Full design spec in [`DESIGN_HANDOFF.md`](./DESIGN_HANDOFF.md).

Pages: Home (`index.html`), About (`about.html`), Podcast (`podcast.html`),
Writing (`writing.html`). Shared `styles/atelier-system.css` + `scripts/site.js`.

## Hosting
- **Vercel** — auto-deploys on every push to `main`. Zero-config static (no build step).
- Repo owned by `avaelishealth-md`; built & maintained by `jasonwhodisco` (collaborator).

## Local preview
```
npx serve .        # or just open index.html
```

## Before production launch
- **Rebuild in a framework** (Astro or Next.js) per `DESIGN_HANDOFF.md` — componentised,
  with podcast/writing as content collections.
- Swap **Pexels placeholder images** (hot-linked) for licensed/owned assets.
- Wire the enquiry + newsletter forms to a real endpoint (CRM / form service).
- Retain the footer medical disclaimer and the "no medicines named or priced" compliance constraint.
