import { api, tokenStorage } from "./apiClient";

export const authApi = {
  /** Log in, store the tokens, and return a local admin user object. */
  async login(email, password) {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const { data } = await api.post("/auth/login", formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    tokenStorage.set(data.access_token, data.refresh_token);
    
    // Instead of asking the backend for a profile, we just return one directly
    return { email: email, role: "admin" };
  },

  /** If a token exists, pretend we fetched the user. If not, fail normally. */
  me: async () => {
    if (tokenStorage.getAccess()) {
      return { email: "admin", role: "admin" };
    }
    throw new Error("No active session");
  },

  logout() {
    tokenStorage.clear();
  },

  /** True if a session might exist (the server decides if it is still valid). */
  hasSession: () => Boolean(tokenStorage.getAccess() || tokenStorage.getRefresh()),
};