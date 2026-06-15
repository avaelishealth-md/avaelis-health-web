import DOMPurify from "isomorphic-dompurify";

// Force external links to be safe.
DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if (node.tagName === "A" && node.getAttribute("target") === "_blank") {
    node.setAttribute("rel", "noopener noreferrer");
  }
});

// Sanitise editor HTML. Run both on save (before storing) and on render (defence in depth).
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty || "", {
    ALLOWED_TAGS: [
      "p", "br", "strong", "em", "u", "s",
      "h2", "h3", "h4",
      "ul", "ol", "li",
      "blockquote", "a", "img", "figure", "figcaption",
      "code", "pre", "hr",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "target", "rel"],
  });
}
