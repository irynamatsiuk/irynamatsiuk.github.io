import { API_URL } from "../config.js";
import { fetchJSON } from "./api.js";

export async function login(email, password) {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    let errMsg = "Login failed";
    // Try/catch prevent code from crashing if the server returns invalid JSON
    try {
      const data = await res.json();
      if (data.message) errMsg = data.message;
    } catch {} // Ignore JSON parsing errors
    if (res.status === 401) errMsg = "Invalid email or password";
    else if (res.status >= 500) errMsg = "Server error. Please try again later";
    throw new Error(errMsg);
  }
  // Login succeeded
  return true;
}

export async function logout() {
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    let errMsg = "Logout failed";
    try {
      const data = await res.json();
      if (data.message) errMsg = data.message;
    } catch {} // Ignore JSON parsing errors
    throw new Error(errMsg);
  }
  // Logout succeeded
  window.location.href = "login.html";
}

export async function getCurrentUser() {
  // await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate waking up the server

  // FetchJSON handles token refresh and JSON parsing
  const user = await fetchJSON(`${API_URL}/me`, { credentials: "include" });
  return user || null;
}
