import { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import { getErrorMessage } from "../../lib/api/apiClient";
import { mediaApi } from "../../lib/api/mediaApi";

const MAX_IMAGE_MB = 5;

/**
 * Returns a safe href for the link button, or null if the URL must be rejected.
 * "example.com" becomes "https://example.com"; javascript:, data: etc. are refused.
 */
export function normalizeLinkUrl(raw) {
  const url = (raw || "").trim();
  if (!url) return null;
  if (/^(https?:|mailto:|\/|#)/i.test(url)) return url;
  if (/^[a-z][a-z0-9+.-]*:/i.test(url)) return null; // some other scheme
  return `https://${url}`;
}

/**
 * The HTML to store. An empty document gives "" (not "<p></p>"), and the blank trailing paragraph
 * that StarterKit adds after headings, lists and images (so the cursor can go below them) is dropped.
 */
function readHtml(editor) {
  if (editor.isEmpty) return "";
  return editor.getHTML().replace(/(?:<p><\/p>)+$/, "");
}

function ToolbarButton({ label, onClick, active = false, disabled = false, children, className = "" }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()} // keep the selection inside the editor
      onClick={onClick}
      className={[
        "rounded px-2 py-1 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
        "disabled:cursor-not-allowed disabled:opacity-40",
        active ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-gray-100",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}

/**
 * <RichTextEditor label="Content" value={form.content} onChange={(html) => ...} error={errors.content} />
 * `value` and `onChange` use HTML strings ("" when the document is empty).
 * Always sanitize this HTML (e.g. DOMPurify) when rendering it on the public site.
 * Add the `.rich-text` styles (see index.css snippet) so headings and lists look right.
 */
export default function RichTextEditor({ value = "", onChange, label, error, disabled = false, minHeight = "16rem" }) {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const fileInputRef = useRef(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit.configure({ heading: { levels: [2, 3] }, link: { openOnClick: false } }), Image],
    content: value,
    editable: !disabled,
    onUpdate: ({ editor: ed }) => onChangeRef.current?.(readHtml(ed)),
    editorProps: {
      attributes: {
        class: "rich-text px-4 py-3 focus:outline-none",
        role: "textbox",
        "aria-multiline": "true",
        "aria-label": label || "Rich text editor",
        style: `min-height:${minHeight}`,
      },
    },
  });

  // Toolbar highlight state (re-computed on every editor transaction).
  const state = useEditorState({
    editor,
    selector: ({ editor: ed }) =>
      ed
        ? {
            bold: ed.isActive("bold"),
            italic: ed.isActive("italic"),
            strike: ed.isActive("strike"),
            h2: ed.isActive("heading", { level: 2 }),
            h3: ed.isActive("heading", { level: 3 }),
            bullet: ed.isActive("bulletList"),
            ordered: ed.isActive("orderedList"),
            quote: ed.isActive("blockquote"),
            code: ed.isActive("codeBlock"),
            link: ed.isActive("link"),
            canUndo: ed.can().undo(),
            canRedo: ed.can().redo(),
          }
        : null,
  });

  // Keep the editor in sync when the parent replaces `value` (e.g. loading a post to edit).
  useEffect(() => {
    if (!editor) return;
    if ((value || "") !== readHtml(editor)) editor.commands.setContent(value || "");
  }, [value, editor]);

  useEffect(() => {
    // emitUpdate=false: toggling editability must not look like a content change to the parent.
    if (editor && editor.isEditable === disabled) editor.setEditable(!disabled, false);
  }, [editor, disabled]);

  if (!editor || !state) return null;

  const run = (command) => () => command(editor.chain().focus()).run();

  function setLink() {
    const previous = editor.getAttributes("link").href || "";
    const input = window.prompt("Link URL (leave empty to remove the link)", previous);
    if (input === null) return;
    if (input.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    const href = normalizeLinkUrl(input);
    if (!href) {
      setUploadError("That link type isn't allowed. Use http(s):// or mailto: links.");
      return;
    }
    setUploadError(null);
    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
  }

  async function insertImage(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) return setUploadError("Please choose an image file.");
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) return setUploadError(`Images must be under ${MAX_IMAGE_MB} MB.`);

    setUploadError(null);
    setUploading(true);
    try {
      const media = await mediaApi.upload(file);
      editor.chain().focus().setImage({ src: media.url, alt: file.name }).run();
    } catch (err) {
      setUploadError(getErrorMessage(err));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {label && <p className="mb-1 text-sm font-medium text-gray-700">{label}</p>}

      <div className={`rounded-lg border bg-white shadow-sm ${error ? "border-red-400" : "border-gray-300"}`}>
        {!disabled && (
          <div role="toolbar" aria-label="Formatting" className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 px-2 py-1.5">
            <ToolbarButton label="Bold" active={state.bold} onClick={run((c) => c.toggleBold())} className="font-bold">B</ToolbarButton>
            <ToolbarButton label="Italic" active={state.italic} onClick={run((c) => c.toggleItalic())} className="italic">I</ToolbarButton>
            <ToolbarButton label="Strikethrough" active={state.strike} onClick={run((c) => c.toggleStrike())} className="line-through">S</ToolbarButton>
            <span className="mx-1 h-5 w-px bg-gray-200" aria-hidden="true" />
            <ToolbarButton label="Heading 2" active={state.h2} onClick={run((c) => c.toggleHeading({ level: 2 }))}>H2</ToolbarButton>
            <ToolbarButton label="Heading 3" active={state.h3} onClick={run((c) => c.toggleHeading({ level: 3 }))}>H3</ToolbarButton>
            <span className="mx-1 h-5 w-px bg-gray-200" aria-hidden="true" />
            <ToolbarButton label="Bullet list" active={state.bullet} onClick={run((c) => c.toggleBulletList())}>• List</ToolbarButton>
            <ToolbarButton label="Numbered list" active={state.ordered} onClick={run((c) => c.toggleOrderedList())}>1. List</ToolbarButton>
            <ToolbarButton label="Quote" active={state.quote} onClick={run((c) => c.toggleBlockquote())}>Quote</ToolbarButton>
            <ToolbarButton label="Code block" active={state.code} onClick={run((c) => c.toggleCodeBlock())}>Code</ToolbarButton>
            <span className="mx-1 h-5 w-px bg-gray-200" aria-hidden="true" />
            <ToolbarButton label="Link" active={state.link} onClick={setLink}>Link</ToolbarButton>
            <ToolbarButton label="Insert image" disabled={uploading} onClick={() => fileInputRef.current?.click()}>
              {uploading ? "Uploading…" : "Image"}
            </ToolbarButton>
            <span className="mx-1 h-5 w-px bg-gray-200" aria-hidden="true" />
            <ToolbarButton label="Undo" disabled={!state.canUndo} onClick={run((c) => c.undo())}>Undo</ToolbarButton>
            <ToolbarButton label="Redo" disabled={!state.canRedo} onClick={run((c) => c.redo())}>Redo</ToolbarButton>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={insertImage} className="hidden" data-testid="editor-image-input" />
          </div>
        )}
        <EditorContent editor={editor} />
      </div>

      {(error || uploadError) && (
        <p role="alert" className="mt-1 text-sm text-red-600">
          {error || uploadError}
        </p>
      )}
    </div>
  );
}