import Image from "@tiptap/extension-image";
import { mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageView from "./ImageView";

// Image node with width (preset %) + alignment, edited via an on-image toolbar (ImageView),
// serialised as <figure class="rt-fig rt-align-X"><img style="width:Y" data-align="X"></figure>
// so the public renderer + sanitiser can reproduce size + alignment.
export const RichImage = Image.extend({
  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      title: { default: null },
      width: {
        default: "100%",
        parseHTML: (el) => (el as HTMLElement).style.width || "100%",
        renderHTML: () => ({}),
      },
      align: {
        default: "center",
        parseHTML: (el) => (el as HTMLElement).getAttribute("data-align") || "center",
        renderHTML: () => ({}),
      },
    };
  },
  renderHTML({ HTMLAttributes, node }) {
    const width = (node.attrs.width as string) || "100%";
    const align = (node.attrs.align as string) || "center";
    return [
      "figure",
      { class: `rt-fig rt-align-${align}` },
      [
        "img",
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          style: `width:${width}`,
          "data-align": align,
        }),
      ],
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageView);
  },
});
