import { setupPostModal } from "../common/postModal.js";

export function setupNewPostButton() {
  const newPostBtn = document.getElementById("new-post-btn");
  const modal = setupPostModal({
    mode: "create",
  });

  newPostBtn.addEventListener("click", () => modal.open());
}
