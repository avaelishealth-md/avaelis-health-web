"use client";

import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";

const ALIGNS = [
  { v: "left", label: "Left" },
  { v: "center", label: "Centre" },
  { v: "right", label: "Right" },
];
const SIZES = [
  { v: "25%", label: "S" },
  { v: "50%", label: "M" },
  { v: "75%", label: "L" },
  { v: "100%", label: "Full" },
];

export default function ImageView({ node, updateAttributes, selected, editor }: NodeViewProps) {
  const src = node.attrs.src as string;
  const alt = (node.attrs.alt as string) || "";
  const width = (node.attrs.width as string) || "100%";
  const align = (node.attrs.align as string) || "center";
  const justify = align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start";

  return (
    <NodeViewWrapper
      className={`rt-fig rt-align-${align}`}
      style={{ display: "flex", justifyContent: justify, margin: "20px 0" }}
      data-align={align}
    >
      <div className="rt-img" style={{ width, maxWidth: "100%", position: "relative" }}>
        {selected && editor.isEditable && (
          <div className="rt-img-bar" contentEditable={false}>
            <span className="rt-grp">
              {ALIGNS.map((a) => (
                <button
                  key={a.v}
                  type="button"
                  className={align === a.v ? "on" : ""}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    updateAttributes({ align: a.v });
                  }}
                >
                  {a.label}
                </button>
              ))}
            </span>
            <span className="rt-bar-sep" />
            <span className="rt-grp">
              {SIZES.map((s) => (
                <button
                  key={s.v}
                  type="button"
                  className={width === s.v ? "on" : ""}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    updateAttributes({ width: s.v });
                  }}
                >
                  {s.label}
                </button>
              ))}
            </span>
          </div>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="rt-img-el" draggable={false} />
      </div>
    </NodeViewWrapper>
  );
}
