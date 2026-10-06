import { createCrudApi } from "./apiClient";

// Experience has no draft/hidden state, so no ?all=true.
export const experienceApi = createCrudApi("/experience", { adminAll: false });