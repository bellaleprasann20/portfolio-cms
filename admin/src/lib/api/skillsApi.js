import { api, createCrudApi, unwrap } from "./apiClient";

export const skillsApi = {
  ...createCrudApi("/skills"),
  categories: () => api.get("/skills/categories", { params: { all: true } }).then(unwrap),
};