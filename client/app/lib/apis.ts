// TODO: Update this to use environment variable.
const API_BASE = "http://localhost:4000";

export const APIS = {
  TODOS: `${API_BASE}/todo`,
  ANALYTICS: `${API_BASE}/analytics`,
};

export const POST_JSON_OPTIONS = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};
