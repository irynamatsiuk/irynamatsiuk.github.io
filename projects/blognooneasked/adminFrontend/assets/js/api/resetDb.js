import { API_URL } from "../config.js";
import { fetchJSON } from "./api.js";

export async function resetDb() {
  return fetchJSON(`${API_URL}/admin/reset`, {
    method: "POST",
  });
}
