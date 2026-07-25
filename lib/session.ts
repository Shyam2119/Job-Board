// lib/session.ts
// Generates and persists a stable anonymous session ID in the browser.
// Used to associate saved jobs and profiles with a browser session
// without requiring user authentication.

export const SESSION_KEY = "tf_session_id";

export function getSessionId(): string {
  if (typeof window === "undefined") return "server";

  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}
