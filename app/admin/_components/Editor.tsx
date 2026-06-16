"use client";

import { useEditor, EditorContent, type Editor as TiptapEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExt from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Youtube from "@tiptap/extension-youtube";
import { RichImage } from "./RichImage";
import { useEffect } from "react";

function Tb({
  on,
  disabled,
  title,
  onClick,
  children,
}: {
  on?: boolean;
  disabled?: boolean;
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      className={"rt-btn" + (on ? " on" : "")}
      disabled={disabled}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </button>
  );
}

export default function Editor({
  value,
  onChange,
  onPickImage,
  uploading,
}: {
  value: string;
  onChange: (html: string) => void;
  onPickImage: () => Promise<string | null>;
  uploading: boolean;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] }, link: false }),
      LinkExt.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: "noopener noreferrer" },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder: "Write your article… use the toolbar to add headings, images, and embeds.",
      }),
      Youtube.configure({ controls: true, nocookie: true, modestBranding: true }),
      RichImage,
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && value && editor.isEmpty) editor.commands.setContent(value, { emitUpdate: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  if (!editor) return null;
  const e: TiptapEditor = editor;

  async function insertImage() {
    if (uploading) return;
    const url = await onPickImage();
    if (url) e.chain().focus().setImage({ src: url }).run();
  }

  function insertVideo() {
    const url = window.prompt("Paste a YouTube URL");
    if (url) e.commands.setYoutubeVideo({ src: url });
  }

  function setLink() {
    const prev = e.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", prev || "https://");
    if (url === null) return;
    if (url === "") e.chain().focus().extendMarkRange("link").unsetLink().run();
    else e.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  const text = e.getText();
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const readMin = Math.max(1, Math.round(words / 200));

  return (
    <div className="rt-editor">
      <div className="rt-toolbar">
        <div className="rt-grp">
          <Tb on={e.isActive("paragraph")} title="Paragraph" onClick={() => e.chain().focus().setParagraph().run()}>P</Tb>
          <Tb on={e.isActive("heading", { level: 1 })} title="Heading 1" onClick={() => e.chain().focus().toggleHeading({ level: 1 }).run()}>H1</Tb>
          <Tb on={e.isActive("heading", { level: 2 })} title="Heading 2" onClick={() => e.chain().focus().toggleHeading({ level: 2 }).run()}>H2</Tb>
          <Tb on={e.isActive("heading", { level: 3 })} title="Heading 3" onClick={() => e.chain().focus().toggleHeading({ level: 3 }).run()}>H3</Tb>
        </div>

        <div className="rt-grp">
          <Tb on={e.isActive("bold")} title="Bold" onClick={() => e.chain().focus().toggleBold().run()}><b>B</b></Tb>
          <Tb on={e.isActive("italic")} title="Italic" onClick={() => e.chain().focus().toggleItalic().run()}><i>I</i></Tb>
          <Tb on={e.isActive("underline")} title="Underline" onClick={() => e.chain().focus().toggleUnderline().run()}><u>U</u></Tb>
          <Tb on={e.isActive("strike")} title="Strikethrough" onClick={() => e.chain().focus().toggleStrike().run()}><s>S</s></Tb>
          <Tb on={e.isActive("code")} title="Inline code" onClick={() => e.chain().focus().toggleCode().run()}>{"<>"}</Tb>
        </div>

        <div className="rt-grp">
          <Tb on={e.isActive({ textAlign: "left" })} title="Align left" onClick={() => e.chain().focus().setTextAlign("left").run()}>⯇</Tb>
          <Tb on={e.isActive({ textAlign: "center" })} title="Align centre" onClick={() => e.chain().focus().setTextAlign("center").run()}>≡</Tb>
          <Tb on={e.isActive({ textAlign: "right" })} title="Align right" onClick={() => e.chain().focus().setTextAlign("right").run()}>⯈</Tb>
        </div>

        <div className="rt-grp">
          <Tb on={e.isActive("bulletList")} title="Bulleted list" onClick={() => e.chain().focus().toggleBulletList().run()}>• List</Tb>
          <Tb on={e.isActive("orderedList")} title="Numbered list" onClick={() => e.chain().focus().toggleOrderedList().run()}>1. List</Tb>
          <Tb on={e.isActive("blockquote")} title="Quote" onClick={() => e.chain().focus().toggleBlockquote().run()}>Quote</Tb>
          <Tb on={e.isActive("codeBlock")} title="Code block" onClick={() => e.chain().focus().toggleCodeBlock().run()}>Code</Tb>
          <Tb title="Divider" onClick={() => e.chain().focus().setHorizontalRule().run()}>HR</Tb>
        </div>

        <div className="rt-grp">
          <Tb on={e.isActive("link")} title="Link" onClick={setLink}>Link</Tb>
          <Tb title="Insert image" disabled={uploading} onClick={insertImage}>
            {uploading ? (<><span className="rt-spinner" aria-hidden="true" /> Uploading…</>) : "Image"}
          </Tb>
          <Tb title="Embed YouTube video" onClick={insertVideo}>Video</Tb>
        </div>

        <div className="rt-grp">
          <Tb title="Undo" disabled={!e.can().undo()} onClick={() => e.chain().focus().undo().run()}>↶</Tb>
          <Tb title="Redo" disabled={!e.can().redo()} onClick={() => e.chain().focus().redo().run()}>↷</Tb>
        </div>
      </div>

      <EditorContent editor={editor} />

      <div className="rt-foot">
        {words} words · {readMin} min read
        {uploading && <span className="rt-uploading"> · Uploading image…</span>}
      </div>
    </div>
  );
}
