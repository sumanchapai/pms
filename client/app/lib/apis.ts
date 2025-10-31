// TODO: Update this to use environment variable.
const API_BASE = import.meta.env.VITE_BACKEND_URL;
console.log("here with API_BASE", API_BASE);

export const APIS = {
  TODOS: `${API_BASE}/todo`,
  ANALYTICS: `${API_BASE}/analytics`,
};

export const POST_JSON_OPTIONS = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export const PUT_JSON_OPTIONS = {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
};

export function errorJSONResponse(msg: string) {
  return new Response(
    JSON.stringify({
      errors: {
        message: msg,
      },
    }),
    {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
