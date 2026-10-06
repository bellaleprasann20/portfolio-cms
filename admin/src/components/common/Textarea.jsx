import { forwardRef, useId } from "react";

const Textarea = forwardRef(function Textarea(
  { label, error, hint, required = false, id, rows = 4, className = "", value, maxLength, ...rest },
  ref
) {
  const autoId = useId();
  const fieldId = id || autoId;
  const messageId = error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined;
  const showCounter = maxLength && typeof value === "string";

  return (
    <div className={className}>
      {label && (
        <label htmlFor={fieldId} className="mb-1 block text-sm font-medium text-gray-700">
          {label}
          {required && (
            <span className="text-red-500" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </label>
      )}
      <textarea
        ref={ref}
        id={fieldId}
        rows={rows}
        value={value}
        maxLength={maxLength}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={messageId}
        className={[
          "block w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2",
          "disabled:bg-gray-100 disabled:text-gray-500",
          error
            ? "border-red-400 focus:ring-red-200"
            : "border-gray-300 focus:border-indigo-400 focus:ring-indigo-200",
        ].join(" ")}
        {...rest}
      />
      <div className="mt-1 flex items-start justify-between gap-2">
        {error ? (
          <p id={messageId} role="alert" className="text-sm text-red-600">
            {error}
          </p>
        ) : hint ? (
          <p id={messageId} className="text-xs text-gray-500">
            {hint}
          </p>
        ) : (
          <span />
        )}
        {showCounter && (
          <span className="shrink-0 text-xs text-gray-400">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
});

export default Textarea;