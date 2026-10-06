import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { getErrorMessage } from "../../lib/api/apiClient";

const ToastContext = createContext(null);

const STYLES = {
  success: "border-green-200 bg-green-50 text-green-800",
  error: "border-red-200 bg-red-50 text-red-800",
  info: "border-blue-200 bg-blue-50 text-blue-800",
};

const MAX_VISIBLE = 5;
let nextId = 0;

/** Wrap the app once (inside main.jsx). Then: const toast = useToast(); toast.success("Saved"); */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (type, message, duration) => {
      const id = ++nextId;
      setToasts((current) => [...current.slice(-(MAX_VISIBLE - 1)), { id, type, message }]);
      timers.current.set(id, setTimeout(() => dismiss(id), duration));
      return id;
    },
    [dismiss]
  );

  useEffect(() => {
    const active = timers.current;
    return () => active.forEach(clearTimeout);
  }, []);

  const api = useMemo(
    () => ({
      success: (message) => push("success", message, 4000),
      // Accepts a string or a caught error: toast.error(error)
      error: (messageOrError) =>
        push("error", typeof messageOrError === "string" ? messageOrError : getErrorMessage(messageOrError), 7000),
      info: (message) => push("info", message, 4000),
      dismiss,
    }),
    [push, dismiss]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-full max-w-sm flex-col gap-2 px-4 sm:px-0"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role={t.type === "error" ? "alert" : "status"}
            className={`pointer-events-auto flex items-start justify-between gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg ${STYLES[t.type]}`}
          >
            <span>{t.message}</span>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="-mr-1 shrink-0 rounded px-1 text-lg leading-none opacity-60 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-current"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside <ToastProvider>");
  return context;
}

export default ToastProvider;