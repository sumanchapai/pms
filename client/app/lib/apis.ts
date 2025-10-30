// TODO: Update this to use environment variable.
const API_BASE = "http://localhost:4000";

export const APIS = {
  TODOS: `${API_BASE}/todo`,
  BOOKING_RATING_SCORES: `${API_BASE}/bookingRatingSores`,
  BOOKING_RATING_COUNT: `${API_BASE}/bookingRatingCount`,
  GOOGLE_RATING_SCORES: `${API_BASE}/googleRatingSores`,
  GOOGLE_RATING_COUNT: `${API_BASE}/googleRatingCount`,
};

export const POST_JSON_OPTIONS = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};
