import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

const SIZES = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };
const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

// Modals can nest (e.g. a ConfirmDialog above an edit form): only the top one reacts to Escape,
// and page scrolling stays locked until the last one closes.
const stack = [];
let scrollLocks = 0;
let savedOverflow = "";

function lockScroll() {
  if (scrollLocks++ === 0) {
    savedOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
}
function unlockScroll() {
  if (--scrollLocks === 0) document.body.style.overflow = savedOverflow;
}

/**
 * <Modal open={open} onClose={close} title="Edit project" footer={<Button>Save</Button>}>...</Modal>
 * Set dismissible={false} to block closing (Escape, backdrop, ✕) while something is saving.
 */
export default function Modal({ open, onClose, title, children, footer, size = "md", dismissible = true }) {
  const titleId = useId();
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const dismissibleRef = useRef(dismissible);
  dismissibleRef.current = dismissible;

  useEffect(() => {
    if (!open) return undefined;
    const dialog = dialogRef.current;
    const token = Symbol("modal");
    const previouslyFocused = document.activeElement;

    stack.push(token);
    lockScroll();
    // Respect an autoFocus field inside the modal; otherwise focus the dialog itself.
    if (!dialog.contains(document.activeElement)) dialog.focus();

    function onKeyDown(event) {
      if (stack[stack.length - 1] !== token) return;

      if (event.key === "Escape") {
        if (dismissibleRef.current) onCloseRef.current?.();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = [...dialog.querySelectorAll(FOCUSABLE)];
      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      stack.splice(stack.indexOf(token), 1);
      unlockScroll();
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        data-testid="modal-backdrop"
        className="absolute inset-0 bg-black/40"
        aria-hidden="true"
        onMouseDown={() => dismissible && onClose?.()}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        className={`relative z-10 flex max-h-[90vh] w-full flex-col rounded-xl bg-white shadow-xl outline-none ${
          SIZES[size] ?? SIZES.md
        }`}
      >
        {(title || dismissible) && (
          <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-4">
            <h2 id={titleId} className="text-lg font-semibold text-gray-900">
              {title}
            </h2>
            {dismissible && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="-mr-2 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <span aria-hidden="true" className="block h-5 w-5 text-center text-xl leading-5">
                  ×
                </span>
              </button>
            )}
          </div>
        )}
        <div className="overflow-y-auto px-6 py-4">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 border-t border-gray-200 bg-gray-50 px-6 py-3 rounded-b-xl">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}