import { api, createCrudApi, unwrap } from "./apiClient";

export const projectsApi = {
  ...createCrudApi("/projects"),
  getById: (id) => api.get(`/projects/id/${id}`).then(unwrap),
};