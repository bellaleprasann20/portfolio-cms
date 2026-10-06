import { useId, useRef, useState } from "react";
import { getErrorMessage } from "../../lib/api/apiClient";
import { mediaApi } from "../../lib/api/mediaApi";
import { Spinner } from "./Loader";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_MB = 5; // keep in sync with MAX_UPLOAD_MB on the backend

/**
 * Single image:    <ImageUploader label="Cover image" value={form.cover_image} onChange={(url) => ...} />
 * Several images:  <ImageUploader multiple label="Screenshots" value={form.images} onChange={(urls) => ...} />
 *
 * Files are uploaded immediately; `onChange` receives the hosted URL(s).
 * "Remove" only detaches the image from this form; the file stays in the media library.
 */
export default function ImageUploader({ value, onChange, multiple = false, label, hint, disabled = false, className = "" }) {
  const inputId = useId();
  const inputRef = useRef(null);
  const [progress, setProgress] = useState(null); // null = idle, 0-100 = uploading
  const [error, setError] = useState(null);
  const [dragging, setDragging] = useState(false);

  const urls = multiple ? (Array.isArray(value) ? value : []) : value ? [value] : [];
  const latestUrls = useRef(urls);
  latestUrls.current = urls; // so a removal made mid-upload isn't overwritten

  const uploading = progress !== null;
  const busy = uploading || disabled;

  async function handleFiles(fileList) {
    const files = Array.from(fileList || []);
    if (files.length === 0 || busy) return;

    setError(null);
    setProgress(0);
    const uploaded = [];
    const problems = [];

    for (const file of multiple ? files : files.slice(0, 1)) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        problems.push(`${file.name}: only JPEG, PNG, WebP or GIF images are allowed`);
        continue;
      }
      if (file.size > MAX_MB * 1024 * 1024) {
        problems.push(`${file.name}: larger than ${MAX_MB} MB`);
        continue;
      }
      try {
        setProgress(0);
        const media = await mediaApi.upload(file, setProgress);
        uploaded.push(media.url);
      } catch (err) {
        problems.push(`${file.name}: ${getErrorMessage(err)}`);
      }
    }

    setProgress(null);
    if (inputRef.current) inputRef.current.value = ""; // allow re-selecting the same file
    if (uploaded.length > 0) onChange(multiple ? [...latestUrls.current, ...uploaded] : uploaded[0]);
    if (problems.length > 0) setError(problems.join(" · "));
  }

  function removeAt(index) {
    onChange(multiple ? urls.filter((_, i) => i !== index) : "");
  }

  const tileText = uploading
    ? `Uploading… ${progress}%`
    : !multiple && urls.length > 0
      ? "Replace image"
      : multiple
        ? "Add images"
        : "Click or drop an image";

  return (
    <div className={className}>
      {label && <p className="mb-1 text-sm font-medium text-gray-700">{label}</p>}

      <div className="flex flex-wrap gap-3">
        {urls.map((url, index) => (
          <div key={`${url}-${index}`} className="relative h-28 w-28 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            <img src={url} alt={`Uploaded ${index + 1}`} className="h-full w-full object-cover" />
            {!disabled && (
              <button
                type="button"
                onClick={() => removeAt(index)}
                aria-label={`Remove image ${index + 1}`}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-sm text-white hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                ×
              </button>
            )}
          </div>
        ))}

        <label
          htmlFor={inputId}
          onDragOver={(e) => {
            e.preventDefault();
            if (!busy) setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFiles(e.dataTransfer?.files);
          }}
          className={[
            "flex h-28 w-28 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed p-2 text-center text-xs",
            "focus-within:ring-2 focus-within:ring-indigo-300",
            dragging ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-gray-300 text-gray-500 hover:border-indigo-400 hover:text-indigo-600",
            busy ? "cursor-not-allowed opacity-60" : "",
          ].join(" ")}
        >
          {uploading && <Spinner className="h-5 w-5" />}
          <span>{tileText}</span>
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            multiple={multiple}
            disabled={busy}
            onChange={(e) => handleFiles(e.target.files)}
            className="sr-only"
          />
        </label>
      </div>

      {error ? (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1 text-xs text-gray-500">{hint}</p>
      ) : null}
    </div>
  );
}