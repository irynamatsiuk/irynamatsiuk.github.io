import { createComment } from "../../api/comments.js";
import { getPostById } from "../../api/posts.js";
import { renderPost } from "./renderPost.js";
import { renderComments } from "./renderComments.js";
import { showMessage } from "../common/message.js";

export function setupCommentForm(postId) {
  const form = document.getElementById("new-comment-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const commentContent = form.commentContent.value.trim();

    if (!commentContent) {
      showMessage("error", "Comment cannot be empty");
    }

    try {
      await createComment(postId, commentContent);
      form.reset();
      showMessage("success", "Comment is added");

      const updatedPost = await getPostById(postId);
      renderPost(updatedPost);
      renderComments(updatedPost.comments);
    } catch (err) {
      showMessage("error", "Failed to add comment");
      console.error("Error adding comment:", err);
    }
  });
}
