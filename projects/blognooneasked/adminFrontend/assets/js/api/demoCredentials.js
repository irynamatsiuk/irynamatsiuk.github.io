import { API_URL } from "../config.js";

export async function getAdminCredentials() {
  try {
    const res = await fetch(`${API_URL}/public/demo-admin`);
    const credentials = await res.json();
    return credentials;
  } catch (err) {
    console.error("Failed to fetch demo credentials:", err);
    throw new Error("Something went wrong. Please try later");
  }
}
