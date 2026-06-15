import sanitizeHtmlLib from "sanitize-html";

// Sanitise editor HTML. Server-side only; run on save (before storing) and on render
// (defence in depth). Uses sanitize-html (pure Node, no jsdom/ESM bundling issues).
export function sanitizeHtml(dirty: string): string {
  return sanitizeHtmlLib(dirty || "", {
    allowedTags: [
      "p", "br", "strong", "em", "u", "s",
      "h2", "h3", "h4",
      "ul", "ol", "li",
      "blockquote", "a", "img", "figure", "figcaption",
      "code", "pre", "hr",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title"],
      "*": ["class"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      // Force safe rel on any link that opens in a new tab.
      a: (tagName, attribs) => {
        if (attribs.target === "_blank") attribs.rel = "noopener noreferrer";
        return { tagName, attribs };
      },
    },
  });
}
