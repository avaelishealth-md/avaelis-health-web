# Handoff: AvaElis Health — Marketing Site (Atelier direction)

## Overview
A boutique longevity-medicine practice site for **Dr. Danny Cai / AvaElis Health**. Warm, editorial, "quiet luxury" aesthetic. Four pages: **Home**, **About Dr. Danny**, **Podcast**, **Writing**. Every page is fully responsive (desktop + mobile) and shares one header and footer.

Tagline: *"More years thriving, less years declining."*

## About the Design Files
The files in this bundle are **design references built in HTML/CSS/JS** — working prototypes that show the intended look, layout, responsive behaviour and interactions. They are **not meant to be shipped as-is**. The task is to **recreate these designs in the target codebase's environment** (e.g. React/Next, Vue/Nuxt, Astro, etc.) using its established component patterns, routing and asset pipeline. If no codebase exists yet, **Astro or Next.js** suit this content-driven marketing site well.

The HTML is intentionally clean and semantic so it maps cleanly onto components (Header, Hero, ServiceCarousel, EvidenceIndex, JourneyTimeline, Footer, etc.).

## Fidelity
**High-fidelity (hifi).** Final colours, typography, spacing, imagery treatment and interactions. Recreate pixel-faithfully. All design tokens are listed below and centralised in `styles/atelier-system.css` (sub-pages) and the inline `<style>` of `index.html` (home).

## Pages / Views

### 1. Home — `index.html`
The flagship page. Self-contained (inline `<style>` + `<script>`). Section order:
1. **Full-bleed hero** — background portrait (`assets/danny-navy.jpg`), left-to-right dark scrim, white serif headline, two CTAs, credential line, and an **animated "Speaking" announcement chip** pinned bottom-centre (pulses at rest; on hover expands to reveal "View event →"). On mobile the chip is a single compact line.
2. **Marquee strip** — scrolling credential ticker.
3. **Services** — heading + horizontal **scroll-snap carousel** of 5 cards (360px each, 4:3 image, title, blurb, price). Scrollbar hidden; next card peeks to signal scroll. Last card is the dark "Precision Longevity Program" (plum) with a CTA.
4. **Who it's for** — 3 columns (Patients / Clinicians / Partners); a **horizontal carousel on mobile**.
5. **Manifesto** — large serif pull-quote + a square plum podcast tile.
6. **Evidence Index** — dark band, 3 **animated radial gauges** (count up 0→value, arc draws) labelled Proven / Useful tools / Promising; a **horizontal carousel on mobile**.
7. **What longevity medicine targets** — 5 cards, each with an **animated bronze line-glyph** (Cardiovascular = heartbeat, Neurocognitive = brain, Metabolic = cycle, Musculoskeletal = bone, Cancer = shield). Glyphs draw on scroll then gently pulse. Centred on mobile.
8. **How it works (Journey)** — 5-step path (Enquire→Consult→Measure→Plan→Optimise). Desktop: horizontal connector line that fills. Mobile: **centred zig-zag timeline** (steps alternate left/right of a central line so the line never crosses text) with a **scroll-driven fill** (`animation-timeline: view()`). Step markers are a **bronze ring with a centred dot**.
9. **Product band / Meet Danny** — portrait + signature quote + credentials + "Learn more about Danny" CTA. Centred on mobile.
10. **Doors** — three audience entry cards.
11. **Enquiry** — heading + form (centred on mobile).

### 2. About Dr. Danny — `about.html`
Full-bleed centred photographic hero (`assets/danny-scrubs-stand.jpg`) → credentials row → "In his words" split (image + pull-quote) → **career timeline** → "as featured / speaking" dark band → footer.

### 3. Podcast — `podcast.html`
Hero + subscribe links (Apple / Spotify / YouTube) → featured **player** (plum, play button, progress bar) → **episode list** (number, title, blurb, duration) → footer.

### 4. Writing — `writing.html`
Hero → **featured article** (image + excerpt) → 3-up **article card grid** → newsletter band → footer. (An article-detail template also exists in the source `Site Map.html` if a `/writing/[slug]` page is needed.)

## Shared Header & Footer (every page)
- **Header** (`header.nav`): sticky, translucent cream w/ blur, 1px bottom border. Left: circular "A" monogram + "AvaElis Health / LONGEVITY ATELIER". Centre/right: inline nav (The Science, Services, Evidence, Dr. Danny, Podcast, Writing) + outlined "Book a consultation" pill. **≤1024px**: nav collapses to a **☰ hamburger** that opens a full-width dropdown (includes the Book CTA).
- **Footer** (`footer`): dark (`--ink`), brand + blurb, three link columns (Practice / Enquire / Follow), italic medical disclaimer, bottom copyright row. **≤640px**: centred, with the three columns kept as a **3-column grid**.

## Interactions & Behaviour
- **Reveal on scroll**: elements `.reveal` fade/translate in; they **re-trigger on scroll up and down** (IntersectionObserver toggles `.in`).
- **Evidence gauges**: arc draws (`stroke-dashoffset`) + number counts up when ≥50% in view; reset when out of view.
- **Journey line**: desktop fills horizontally on enter; mobile fills vertically via CSS scroll-timeline (`animation-timeline: view()`), top of line begins at the first marker.
- **Target glyphs**: SVG stroke-draw on reveal, then a slow infinite pulse on a key element; colour shifts to clay on hover.
- **Services / Who / Evidence carousels** (mobile): native horizontal `scroll-snap`, scrollbars hidden, next card peeks.
- **Hero chip**: rest = pulsing glow; hover = lift + bronze fill + slide-out CTA. Hidden expansion on touch.
- **Nav hamburger**: toggles `.open` on `header.nav`.
- All motion respects `prefers-reduced-motion: reduce`.

## Responsive Behaviour
- Primary breakpoints: **1024px** (nav → hamburger), **980px** (multi-col → stacked), **640px** (mobile carousels, centred headings/footer, tighter spacing).
- Mobile section headings are **centre-aligned**; desktop is left-aligned (except the Evidence Index which is centred both).
- Design width reference: desktop ~1280px content max (`--max: 1180px` for sub-pages); mobile reference 390px.

## Design Tokens
Colours (CSS custom properties, see `:root`):
- `--cream #F2EBDD` (page bg) · `--paper #F8F3E9` · `--paper-2 #EFE8DA` · `--sand #E4D8C0`
- `--ink #2A211A` (near-black / dark sections) · `--ink-2 #5A4E40` (body text) · `--muted #8A7C68` · `--muted-l #A99E8C`
- `--line #DBCFB7` (hairlines) · `--line-2 #C9BA9C`
- `--bronze #9A7536` (primary accent) · `--bronze-l #B8924E` (accent on dark)
- `--clay #A9603F` (warm highlight) · `--plum #5A3A42` (podcast/program) · `--sage #6B7356`
- Dark-section text greys: `#BCAE96`, `#D5C8B4`, `#9A8C76`, `#857761`; dark borders `#463829`, `#33281F`.

Typography:
- Display/serif: **Spectral** (300/400/500/600, + italics) — headings, prices, numerals.
- UI/sans: **Albert Sans** (300/400/500/600) — body, labels, buttons.
- Mono: **JetBrains Mono** (400/500) — eyebrows, meta, prices small-caps.
- Headings: weight 300–400, `letter-spacing:-.01em`. **No italic / no recoloured emphasis words** — all heading `em` render in the heading's own colour, upright (enforced globally).
- Eyebrow/overline `.ov`: 12px, 600, `letter-spacing:.2em`, uppercase, bronze.

Spacing / radius / shadow:
- Section padding: desktop 74px (`.pad`) / 54px (`.pad-s`) vertical; mobile 50/38px. Wrap side padding 40px desktop, 22px mobile.
- Radii: cards 16–20px, pills/buttons 100px, monogram/gauges 50%.
- Shadow (cards/hover): `0 26px 46px -30px rgba(42,33,26,.45)`; deep frames `0 40px 80px -56px rgba(36,29,23,.55)`.
- Card hover: `translateY(-6px)` + shadow + image `scale(1.05)`.

## State Management
Static marketing site — no app state. For a framework build:
- Newsletter / enquiry forms: local field state + submit handler (currently inline demo that swaps to a thank-you message). Wire to a real endpoint (e.g. form service / CRM).
- Podcast/Writing lists are ideal as **content collections** (Markdown/CMS) → map episode/article cards from data.

## Assets
In `assets/` (photos are the client's own; replace placeholders before launch):
- `danny-navy.jpg` — home hero portrait
- `danny-scrubs-stand.jpg` — About hero portrait
- `danny-clinic.jpg` — services "Longevity Program" card / About "in his words"
- `danny-gym.jpg`, `danny.jpg` — additional portraits (spare)
- `logo-racgp-sm.png`, `logo-doh-crop.png`, `logo-dhf-crop.png` — affiliation logos
- **Service/category/article imagery** currently uses **Pexels URLs** (hot-linked) as placeholders — swap for licensed/owned images.
- Target glyphs and the monogram are **inline SVG / CSS** (no image files).

## Files
- `index.html` — Home (self-contained: inline `<style>` + `<script>`).
- `about.html`, `podcast.html`, `writing.html` — sub-pages; link `styles/atelier-system.css` + `scripts/site.js`.
- `styles/atelier-system.css` — shared design system: tokens, header/footer, page primitives, components (cards, pricing, timeline, player, evidence table, forms), responsive rules.
- `scripts/site.js` — sub-page behaviour: reveal-on-scroll (replay) + nav hamburger toggle.
- `assets/` — images & logos.

### Compliance note
No prescription medicines are named or priced anywhere; "personalised treatment follows clinical consultation". Keep this constraint when adding copy. The footer carries a medical disclaimer; retain it.

### Source of truth
These four pages were composed from a single working canvas (`AvaElis Site.html` in the originating project) where every page is shown desktop + mobile as live DOM. If you need the article-detail or podcast-episode templates, they exist in that project's `Site Map.html`.
