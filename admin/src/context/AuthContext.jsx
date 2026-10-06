import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { setAuthFailureHandler } from "../lib/api/apiClient";
import { authApi } from "../lib/api/authApi";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // True until we know whether the stored session (if any) is still valid.
  const [loading, setLoading] = useState(true);

  // Restore the session on first load.
  useEffect(() => {
    let cancelled = false;

    async function restore() {
      if (!authApi.hasSession()) {
        setLoading(false);
        return;
      }
      try {
        const me = await authApi.me();
        if (!cancelled) setUser(me);
      } catch {
        authApi.logout(); // stale or invalid tokens
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    restore();
    return () => {
      cancelled = true;
    };
  }, []);

  // The API client calls this when a token refresh fails (session truly expired).
  useEffect(() => {
    setAuthFailureHandler(() => setUser(null));
    return () => setAuthFailureHandler(null);
  }, []);

  // Logging out in another tab clears the shared tokens; follow it here.
  useEffect(() => {
    const onStorage = () => {
      if (!authApi.hasSession()) setUser(null);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = useCallback(async (email, password) => {
    const me = await authApi.login(email, password); // throws on bad credentials
    setUser(me);
    return me;
  }, []);

  const logout = useCallback(() => {
    authApi.logout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, isAuthenticated: Boolean(user), login, logout }),
    [user, loading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}