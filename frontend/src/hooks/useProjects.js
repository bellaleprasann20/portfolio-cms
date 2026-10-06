import { useEffect, useState } from "react";
import { FALLBACK_PROJECTS, findFallbackProject } from "../data/projects";
import { projectsApi } from "../lib/api/projectsApi";
import { normalizeProject } from "../utils/projects";

const isCanceled = (error) => error?.code === "ERR_CANCELED";

/**
 * All projects, normalized.  const { projects, loading, usingFallback } = useProjects();
 * If the CMS is unreachable or empty, the built-in fallback list is used so the site is never blank.
 */
export function useProjects({ limit = 100 } = {}) {
  // The result remembers which request it answers; `loading` is "no answer for the current request yet".
  const [result, setResult] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    projectsApi
      .list({ limit }, controller.signal)
      .then((data) => {
        const projects = (data.items ?? []).map(normalizeProject);
        setResult(
          projects.length > 0
            ? { limit, projects, usingFallback: false }
            : { limit, projects: FALLBACK_PROJECTS, usingFallback: true }
        );
      })
      .catch((error) => {
        if (isCanceled(error)) return;
        setResult({ limit, projects: FALLBACK_PROJECTS, usingFallback: true });
      });

    return () => controller.abort();
  }, [limit]);

  const ready = result?.limit === limit;
  return {
    projects: ready ? result.projects : [],
    usingFallback: ready ? result.usingFallback : false,
    loading: !ready,
  };
}

/**
 * ONE project, looked up by the slug in the URL.
 * status: "loading" | "ready" | "notfound" | "error".  It never returns some other project as a guess.
 */
export function useProject(slug) {
  const [result, setResult] = useState(null); // { slug, status, project }

  useEffect(() => {
    if (!slug) return undefined;
    const controller = new AbortController();

    projectsApi
      .getBySlug(slug, controller.signal)
      .then((data) => setResult({ slug, status: "ready", project: normalizeProject(data) }))
      .catch((error) => {
        if (isCanceled(error)) return;
        const local = findFallbackProject(slug); // CMS down or project not added there yet
        if (local) return setResult({ slug, status: "ready", project: local });
        setResult({ slug, status: error?.response?.status === 404 ? "notfound" : "error", project: null });
      });

    return () => controller.abort();
  }, [slug]);

  if (!slug) return { project: null, status: "notfound" };
  // Only trust a result that belongs to THIS slug (the same page is reused when the URL changes).
  if (result?.slug !== slug) return { project: null, status: "loading" };
  return { project: result.project, status: result.status };
}

export default useProjects;