import { API_URL } from "../config.js";

// Unified fetch wrapper that includes token refresh + JSON handling

export async function fetchJSON(url, options = {}) {
  const finalOptions = {
    credentials: "include", // send cookies
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  };

  try {
    // First request
    let res = await fetch(url, finalOptions);

    // Handle expired access token
    if (res.status === 401) {
      console.warn("Access token expired. Trying to refresh...");
      const refreshRes = await fetch(`${API_URL}/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (refreshRes.ok) {
        // Retry original request
        res = await fetch(url, finalOptions);
      } else {
        // Refresh failed -> redirect to login
        console.error("Refresh failed. Redirecting to login...");
        if (!window.location.pathname.endsWith("/login.html")) {
          window.location.href = "./login.html";
        }
        throw new Error("Unauthorized");
      }
    }

    // Handle other non-OK responses
    if (!res.ok) {
      let errMsg = `Request failed (${res.status})`;
      try {
        const errData = await res.json();
        if (errData.message) errMsg = errData.message;
      } catch {
        // If parsing JSON fails, try reading it as plain text instead
        const text = await res.text();
        if (text) errMsg = text;
      }
      throw new Error(errMsg);
    }
    // Safer JSON parsing (in case backend doesn’t send valid JSON
    // for example, it returns empty response 204 No Content), calling .json() will throw an error
    try {
      return await res.json();
    } catch {
      console.warn("Response was not valid JSON");
      return null;
    }
  } catch (error) {
    console.error("fetchJSON error:", error);
    throw error;
  }
}
