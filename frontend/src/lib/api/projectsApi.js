import axios from "axios";

const API_URL = `${(import.meta.env?.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "")}/api/v1`;
const TIMEOUT = 8000; // a sleeping free-tier backend shouldn't leave a skeleton on screen forever

export const projectsApi = {
  /** Public: only published projects, ordered by the CMS "order" field. */
  list: (params = {}, signal) =>
    axios.get(`${API_URL}/projects`, { params, signal, timeout: TIMEOUT }).then((response) => response.data),

  getBySlug: (slug, signal) =>
    axios
      .get(`${API_URL}/projects/${encodeURIComponent(slug)}`, { signal, timeout: TIMEOUT })
      .then((response) => response.data),
};