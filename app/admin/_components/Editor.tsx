"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExt from "@tiptap/extension-link";
import ImageExt from "@tiptap/extension-image";
import { useEffect } from "react";

export default function Editor({
  value,
  onChange,
  onImageUpload,
}: {
  value: string;
  onChange: (html: string) => void;
  onImageUpload: () => Promise<string | null>;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] }, link: false }),
      LinkExt.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } }),
      ImageExt,
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // Load initial content once the editor instance is ready (edit screen).
  useEffect(() => {
    if (editor && value && editor.isEmpty) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  if (!editor) return null;

  const Btn = ({
    active,
    label,
    onClick,
  }: {
    active?: boolean;
    label: string;
    onClick: () => void;
  }) => (
    <button type="button" className={active ? "on" : ""} onClick={onClick}>
      {label}
    </button>
  );

  return (
    <div className="adm-editor">
      <div className="adm-toolbar">
        <Btn active={editor.isActive("bold")} label="B" onClick={() => editor.chain().focus().toggleBold().run()} />
        <Btn active={editor.isActive("italic")} label="i" onClick={() => editor.chain().focus().toggleItalic().run()} />
        <Btn active={editor.isActive("heading", { level: 2 })} label="H2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} />
        <Btn active={editor.isActive("heading", { level: 3 })} label="H3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} />
        <Btn active={editor.isActive("bulletList")} label="• List" onClick={() => editor.chain().focus().toggleBulletList().run()} />
        <Btn active={editor.isActive("orderedList")} label="1. List" onClick={() => editor.chain().focus().toggleOrderedList().run()} />
        <Btn active={editor.isActive("blockquote")} label="Quote" onClick={() => editor.chain().focus().toggleBlockquote().run()} />
        <Btn
          label="Link"
          onClick={() => {
            const prev = editor.getAttributes("link").href as string | undefined;
            const url = window.prompt("Link URL", prev || "https://");
            if (url === null) return;
            if (url === "") editor.chain().focus().unsetLink().run();
            else editor.chain().focus().setLink({ href: url }).run();
          }}
        />
        <Btn
          label="Image"
          onClick={async () => {
            const url = await onImageUpload();
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
