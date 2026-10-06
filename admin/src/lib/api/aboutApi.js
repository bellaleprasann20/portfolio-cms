import { api, unwrap } from "./apiClient";

export const aboutApi = {
  /** Returns null (instead of throwing) when the About section hasn't been created yet. */
  async get() {
    try {
      return await api.get("/about").then(unwrap);
    } catch (error) {
      if (error.response?.status === 404) return null;
      throw error;
    }
  },

  /** Create or update. The very first save must include full_name. */
  update: (data) => api.put("/about", data).then(unwrap),
};