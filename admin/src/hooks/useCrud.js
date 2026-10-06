import { useCallback, useEffect, useRef, useState } from "react";
import { getErrorMessage } from "../lib/api/apiClient";

/**
 * Paginated list + create/update/remove for any resource API made with createCrudApi.
 *
 *   const { items, loading, page, pageCount, setPage, create, update, remove } =
 *     useCrud(projectsApi, { pageSize: 10, params: { featured: true } });
 *
 * - Changing `params` (e.g. a filter) goes back to page 1.
 * - create/update/remove refetch the current page and re-throw API errors so the
 *   calling form can show them with getErrorMessage(error).
 */
export function useCrud(api, { pageSize = 10, params } = {}) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [error, setError] = useState(null);

  // Serialize params so an inline `{ ... }` object doesn't trigger a refetch on every render.
  const paramsKey = JSON.stringify(params ?? {});

  // The page is stored with the params it belongs to, so a filter change resets it to 1
  // without firing an extra request for the old page number.
  const [pageState, setPageState] = useState({ key: paramsKey, page: 1 });
  const page = pageState.key === paramsKey ? pageState.page : 1;
  const setPage = useCallback((next) => setPageState({ key: paramsKey, page: next }), [paramsKey]);

  const apiRef = useRef(api);
  apiRef.current = api;
  const pageRef = useRef(page);
  pageRef.current = page;
  const latestRequest = useRef(0);

  const fetchPage = useCallback(
    async (targetPage) => {
      const requestId = ++latestRequest.current;
      setLoading(true);
      setError(null);
      try {
        const data = await apiRef.current.list({
          ...JSON.parse(paramsKey),
          skip: (targetPage - 1) * pageSize,
          limit: pageSize,
        });
        if (requestId !== latestRequest.current) return; // a newer request superseded this one

        // e.g. the last item on the last page was deleted: step back and reload.
        const lastPage = Math.max(1, Math.ceil(data.total / pageSize));
        if (targetPage > lastPage) {
          setPageState({ key: paramsKey, page: lastPage });
          return;
        }
        setItems(data.items);
        setTotal(data.total);
      } catch (err) {
        if (requestId === latestRequest.current) setError(getErrorMessage(err));
      } finally {
        if (requestId === latestRequest.current) setLoading(false);
      }
    },
    [paramsKey, pageSize]
  );

  useEffect(() => {
    fetchPage(page);
  }, [fetchPage, page]);

  const refresh = useCallback(() => fetchPage(pageRef.current), [fetchPage]);

  const mutate = useCallback(
    async (action) => {
      setMutating(true);
      try {
        const result = await action();
        await fetchPage(pageRef.current);
        return result;
      } finally {
        setMutating(false);
      }
    },
    [fetchPage]
  );

  const create = useCallback((data) => mutate(() => apiRef.current.create(data)), [mutate]);
  const update = useCallback((id, data) => mutate(() => apiRef.current.update(id, data)), [mutate]);
  const remove = useCallback((id) => mutate(() => apiRef.current.remove(id)), [mutate]);

  return {
    items,
    total,
    page,
    pageSize,
    pageCount: Math.max(1, Math.ceil(total / pageSize)),
    loading,
    mutating,
    error,
    setPage,
    refresh,
    create,
    update,
    remove,
  };
}

export default useCrud;