import { setupPostModal } from "../common/postModal.js";
import { deletePost } from "../../api/posts.js";
import { confirmDialog } from "../common/confirmModal.js";
import { showMessage } from "../common/message.js";

export function setupPostControls(post) {
  const editBtn = document.getElementById("edit-post-btn");
  const deleteBtn = document.getElementById("delete-post-btn");
  const editModal = setupPostModal({
    mode: "edit",
    post,
  });

  editBtn.addEventListener("click", () => {
    editModal.open();
  });

  deleteBtn.addEventListener("click", async () => {
    const confirmed = await confirmDialog({
      title: "Delete Post",
      message: "Are you sure you want to delete this post?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (!confirmed) return;

    try {
      await deletePost(post.id);
      showMessage("success", "Deleting...");
      setTimeout(() => (window.location.href = "./dashboard.html"), 1000);
    } catch (err) {
      showMessage("error", "Failed to delete post");
      console.error("Error deleting:", err);
    }
  });
}
