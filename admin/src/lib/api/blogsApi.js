import { api, createCrudApi, unwrap } from "./apiClient";

export const blogsApi = {
  ...createCrudApi("/blogs"),
  // The list omits `content`, so the editor loads the full post by id.
  getById: (id) => api.get(`/blogs/id/${id}`).then(unwrap),
};