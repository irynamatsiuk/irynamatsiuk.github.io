import { API_URL } from "../config.js";
import { fetchJSON } from "./api.js";

export async function createComment(postId, content) {
  return fetchJSON(`${API_URL}/admin/comments`, {
    method: "POST",
    body: JSON.stringify({ postId, content }),
  });
}

export async function deleteComment(commentId) {
  return fetchJSON(`${API_URL}/admin/comments/${commentId}`, {
    method: "DELETE",
  });
}
