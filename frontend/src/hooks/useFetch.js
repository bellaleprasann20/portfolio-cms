import { useState, useEffect, useCallback } from 'react';
import { getErrorMessage } from '../lib/api/apiClient';

/**
 * Generic hook for data fetching.
 * @param {Function} apiFunc - The API function to call (e.g., projectsApi.list)
 * @param {Object} params - Optional parameters to pass to the API function
 * @param {any} initialData - Initial state for the data
 */
export const useFetch = (apiFunc, params = null, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stringify params so the dependency array can accurately detect changes without infinite loops
  const stringifiedParams = JSON.stringify(params);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const parsedParams = stringifiedParams ? JSON.parse(stringifiedParams) : undefined;
      const result = await apiFunc(parsedParams);
      setData(result);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [apiFunc, stringifiedParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;