import axios from "axios";

const ROOT_URL = (import.meta.env?.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");
export const API_URL = `${ROOT_URL}/api/v1`;

/* ------------------------------------------------------------------ */
/* Token storage                                                       */
/* ------------------------------------------------------------------ */
const ACCESS_KEY = "cms_access_token";
const REFRESH_KEY = "cms_refresh_token";

function read(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export const tokenStorage = {
  getAccess: () => read(ACCESS_KEY),
  getRefresh: () => read(REFRESH_KEY),
  set(access, refresh) {
    try {
      localStorage.setItem(ACCESS_KEY, access);
      localStorage.setItem(REFRESH_KEY, refresh);
    } catch {
      /* storage unavailable (private mode): session just won't persist */
    }
  },
  clear() {
    try {
      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(REFRESH_KEY);
    } catch {
      /* ignore */
    }
  },
};

/* ------------------------------------------------------------------ */
/* Axios instance                                                      */
/* ------------------------------------------------------------------ */
export const api = axios.create({ baseURL: API_URL, timeout: 30000 });

// AuthContext registers a callback here so it can send the user to /login
// when the session can no longer be refreshed.
let authFailureHandler = null;
export function setAuthFailureHandler(fn) {
  authFailureHandler = fn;
}

api.interceptors.request.use((config) => {
  const token = tokenStorage.getAccess();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// One shared refresh request, even if many calls get a 401 at the same moment.
let refreshPromise = null;

function refreshTokens() {
  if (!refreshPromise) {
    const refreshToken = tokenStorage.getRefresh();
    if (!refreshToken) return Promise.reject(new Error("No refresh token"));

    // Plain axios (not `api`) so this call can't trigger the interceptor below.
    refreshPromise = axios
      .post(`${API_URL}/auth/refresh`, { refresh_token: refreshToken })
      .then(({ data }) => {
        tokenStorage.set(data.access_token, data.refresh_token);
        return data.access_token;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

function endSession() {
  tokenStorage.clear();
  authFailureHandler?.();
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status !== 401 || !original) return Promise.reject(error);

    // A 401 from login/refresh means bad credentials, not an expired session.
    const isAuthCall = /\/auth\/(login|refresh)/.test(original.url || "");
    if (isAuthCall) return Promise.reject(error);

    if (original._retried || !tokenStorage.getRefresh()) {
      endSession();
      return Promise.reject(error);
    }

    original._retried = true;
    try {
      await refreshTokens();
      return api(original); // the request interceptor attaches the new access token
    } catch {
      endSession();
      return Promise.reject(error);
    }
  }
);

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
export const unwrap = (response) => response.data;

/** Turn any axios/FastAPI error into a readable message for toasts and forms. */
export function getErrorMessage(error, fallback = "Something went wrong") {
  const detail = error?.response?.data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((d) => {
        const field = Array.isArray(d.loc) ? d.loc.filter((p) => p !== "body").join(".") : "";
        return field ? `${field}: ${d.msg}` : d.msg;
      })
      .join("; ");
  }
  if (error?.code === "ERR_NETWORK") return "Cannot reach the server. Is the backend running?";
  return error?.message || fallback;
}

/**
 * Standard CRUD calls for a resource.
 * `adminAll` adds ?all=true to lists so the admin sees drafts and hidden items.
 */
export function createCrudApi(path, { adminAll = true } = {}) {
  return {
    list: (params = {}) =>
      api.get(path, { params: adminAll ? { all: true, ...params } : params }).then(unwrap),
    create: (data) => api.post(path, data).then(unwrap),
    update: (id, data) => api.put(`${path}/${id}`, data).then(unwrap),
    remove: (id) => api.delete(`${path}/${id}`).then(unwrap),
  };
}