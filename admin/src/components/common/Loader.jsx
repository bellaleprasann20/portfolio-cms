export function Spinner({ className = "h-4 w-4" }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-75" />
    </svg>
  );
}

/**
 * <Loader />                      inline spinner
 * <Loader label="Loading..." />   spinner with visible text
 * <Loader fullScreen />           centered on the whole screen (e.g. while checking the session)
 */
export default function Loader({ label = "Loading", fullScreen = false, showLabel = false, className = "" }) {
  const content = (
    <div role="status" className={`flex items-center justify-center gap-2 text-indigo-600 ${className}`}>
      <Spinner className="h-6 w-6" />
      {showLabel ? <span className="text-sm text-gray-600">{label}</span> : <span className="sr-only">{label}</span>}
    </div>
  );

  if (!fullScreen) return content;
  return <div className="flex min-h-screen items-center justify-center bg-gray-50">{content}</div>;
}