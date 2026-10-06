import { api, unwrap } from "./apiClient";

export const mediaApi = {
  list: (params = {}) => api.get("/upload", { params }).then(unwrap),

  /**
   * Upload an image File. Resolves with the media record; use `.url` in any image field.
   * `onProgress` receives a number from 0 to 100.
   */
  upload(file, onProgress) {
    const form = new FormData();
    form.append("file", file);
    return api
      .post("/upload/image", form, {
        onUploadProgress: (e) => onProgress?.(e.total ? Math.round((e.loaded * 100) / e.total) : 0),
      })
      .then(unwrap);
  },

  remove: (id) => api.delete(`/upload/${id}`).then(unwrap),
};