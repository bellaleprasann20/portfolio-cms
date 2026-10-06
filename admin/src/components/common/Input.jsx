import { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, error, hint, required = false, id, className = "", ...rest },
  ref
) {
  const autoId = useId();
  const inputId = id || autoId;
  const messageId = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-gray-700">
          {label}
          {required && (
            <span className="text-red-500" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
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
      {error ? (
        <p id={messageId} role="alert" className="mt-1 text-sm text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={messageId} className="mt-1 text-xs text-gray-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

export default Input;