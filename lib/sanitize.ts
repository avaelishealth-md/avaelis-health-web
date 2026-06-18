import sanitizeHtmlLib from "sanitize-html";

// Sanitise editor HTML. Server-side only; run on save (before storing) and on render
// (defence in depth). Allows the rich-editor output: headings, formatted text + alignment,
// sized/aligned images (figure + width style + data-align), and YouTube embeds (iframe
// restricted to trusted video hosts).
export function sanitizeHtml(dirty: string): string {
  return sanitizeHtmlLib(dirty || "", {
    allowedTags: [
      "p", "br", "strong", "em", "u", "s",
      "h2", "h3", "h4",
      "ul", "ol", "li",
      "blockquote", "a", "img", "figure", "figcaption",
      "code", "pre", "hr",
      "div", "iframe",
      "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "colgroup", "col",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "style", "data-align", "width", "height"],
      figure: ["class", "style"],
      div: ["data-youtube-video", "class", "style"],
      iframe: ["src", "width", "height", "frameborder", "allow", "allowfullscreen", "title"],
      p: ["style"],
      h1: ["style"],
      h2: ["style"],
      h3: ["style"],
      h4: ["style"],
      table: ["class", "style"],
      th: ["align", "colspan", "rowspan", "scope", "style"],
      td: ["align", "colspan", "rowspan", "style"],
      col: ["span", "style"],
      colgroup: ["span", "style"],
      "*": ["class"],
    },
    allowedStyles: {
      "*": {
        "text-align": [/^(left|right|center|justify)$/],
        width: [/^\d{1,3}(\.\d+)?(%|px)$/],
      },
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedIframeHostnames: [
      "www.youtube.com",
      "www.youtube-nocookie.com",
      "youtube.com",
      "player.vimeo.com",
    ],
    transformTags: {
      a: (tagName, attribs) => {
        if (attribs.target === "_blank") attribs.rel = "noopener noreferrer";
        return { tagName, attribs };
      },
    },
  });
}

// Some content-engine bodies open by repeating the title, an audience notice, and a
// keynote attribution — all of which the page header already shows. If the lede
// (everything before the first heading) duplicates the title or is that boilerplate,
// drop it so the body starts at the first real section. Bodies whose opening is genuine
// intro prose are left untouched, so this is a no-op for normal posts.
export function stripDuplicateLede(html: string, title?: string | null): string {
  if (!html) return html;
  const firstHeading = html.search(/<h[1-4][\s>]/i);
  if (firstHeading <= 0) return html;
  const norm = (s: string) =>
    s.replace(/<[^>]+>/g, " ").replace(/[^a-z0-9\s]/gi, " ").replace(/\s+/g, " ").trim().toLowerCase();
  const ledeText = norm(html.slice(0, firstHeading));
  const t = title ? norm(title) : "";
  const redundant =
    (t.length > 0 && ledeText.includes(t)) ||
    ledeText.includes("intended for health professionals");
  return redundant ? html.slice(firstHeading) : html;
}
