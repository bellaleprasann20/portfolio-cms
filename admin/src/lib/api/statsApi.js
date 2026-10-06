import { api, unwrap } from "./apiClient";

export const statsApi = {
  get: () => api.get("/stats").then(unwrap),
};