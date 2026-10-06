import Button from "./Button";

const BADGE_TONES = {
  gray: "bg-gray-100 text-gray-700",
  green: "bg-green-100 text-green-800",
  yellow: "bg-yellow-100 text-yellow-800",
  red: "bg-red-100 text-red-800",
  blue: "bg-blue-100 text-blue-800",
};

/** Small status pill for table cells: <Badge tone="green">Published</Badge> */
export function Badge({ tone = "gray", children }) {
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${BADGE_TONES[tone] ?? BADGE_TONES.gray}`}>
      {children}
    </span>
  );
}

/**
 * columns: [{ key, header, render?: (row) => node, className? }]
 *
 * <DataTable
 *   columns={columns} rows={items} loading={loading} error={error} onRetry={refresh}
 *   onEdit={openEditor} onDelete={askToDelete} rowLabel={(r) => r.title}
 *   page={page} pageCount={pageCount} total={total} pageSize={pageSize} onPageChange={setPage}
 * />
 * Props map 1:1 onto what useCrud returns.
 */
export default function DataTable({
  columns,
  rows = [],
  rowKey = "id",
  loading = false,
  error = null,
  onRetry,
  emptyMessage = "Nothing here yet.",
  onEdit,
  onDelete,
  renderActions,
  rowLabel,
  page = 1,
  pageCount = 1,
  total,
  pageSize,
  onPageChange,
}) {
  const hasActions = Boolean(onEdit || onDelete || renderActions);
  const colCount = columns.length + (hasActions ? 1 : 0);
  const firstLoad = loading && rows.length === 0;
  const showPager = typeof total === "number" && total > 0;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {error && (
        <div role="alert" className="flex items-center justify-between gap-4 border-b border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{error}</span>
          {onRetry && (
            <Button size="sm" variant="secondary" onClick={onRetry}>
              Retry
            </Button>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm" aria-busy={loading}>
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th key={col.key} scope="col" className={`px-4 py-3 text-left font-medium text-gray-600 ${col.className ?? ""}`}>
                  {col.header}
                </th>
              ))}
              {hasActions && (
                <th scope="col" className="px-4 py-3 text-right font-medium text-gray-600">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className={`divide-y divide-gray-100 ${loading && !firstLoad ? "opacity-60" : ""}`}>
            {firstLoad &&
              Array.from({ length: 5 }, (_, i) => (
                <tr key={`skeleton-${i}`} data-testid="skeleton-row">
                  {Array.from({ length: colCount }, (_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 animate-pulse rounded bg-gray-100" />
                    </td>
                  ))}
                </tr>
              ))}

            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={colCount} className="px-4 py-12 text-center text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            )}

            {rows.map((row) => {
              const label = rowLabel ? rowLabel(row) : "";
              return (
                <tr key={row[rowKey]} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.key} className={`px-4 py-3 text-gray-700 ${col.className ?? ""}`}>
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                  {hasActions && (
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        {renderActions?.(row)}
                        {onEdit && (
                          <Button size="sm" variant="ghost" onClick={() => onEdit(row)} aria-label={label ? `Edit ${label}` : "Edit"}>
                            Edit
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => onDelete(row)}
                            aria-label={label ? `Delete ${label}` : "Delete"}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showPager && (
        <div className="flex items-center justify-between gap-4 border-t border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
          <span>
            {pageSize
              ? `Showing ${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, total)} of ${total}`
              : `${total} total`}
          </span>
          {pageCount > 1 && onPageChange && (
            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
                Previous
              </Button>
              <span aria-live="polite">
                Page {page} of {pageCount}
              </span>
              <Button size="sm" variant="secondary" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}