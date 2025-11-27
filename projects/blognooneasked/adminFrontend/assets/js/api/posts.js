import { API_URL } from "../config.js";
import { fetchJSON } from "./api.js";

export async function getAllPosts() {
  return fetchJSON(`${API_URL}/admin/posts`);
}

export function createPost(postData) {
  return fetchJSON(`${API_URL}/admin/posts`, {
    method: "POST",
    body: JSON.stringify(postData),
  });
}

export function getPostById(id) {
  return fetchJSON(`${API_URL}/admin/posts/${id}`);
}

export function updatePost(id, postData) {
  return fetchJSON(`${API_URL}/admin/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(postData),
  });
}

export function deletePost(id) {
  return fetchJSON(`${API_URL}/admin/posts/${id}`, {
    method: "DELETE",
  });
}
