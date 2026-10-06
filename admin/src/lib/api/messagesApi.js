import { api, unwrap } from "./apiClient";

// Admin inbox for contact-form messages. (The public form posts to /contact from the portfolio site.)
export const messagesApi = {
  list: (params = {}) => api.get("/contact", { params }).then(unwrap),
  unreadCount: () => api.get("/contact/unread-count").then(unwrap).then((d) => d.unread),
  setRead: (id, isRead = true) => api.patch(`/contact/${id}`, { is_read: isRead }).then(unwrap),
  remove: (id) => api.delete(`/contact/${id}`).then(unwrap),
};