import { formatDate } from "../../utils/formatDate.js";
import { confirmDialog } from "../common/confirmModal.js";
import { deleteComment } from "../../api/comments.js";
import { showMessage } from "../common/message.js";

export function renderComments(comments) {
  const container = document.querySelector(".comments");
  container.innerHTML = "";

  const header = document.createElement("h3");
  header.textContent = "Comments:";
  container.appendChild(header);

  if (!comments.length) {
    const p = document.createElement("p");
    p.textContent = "No comments yet";
    container.appendChild(p);
    return;
  }

  comments.reverse().forEach((comment) => {
    const commentElement = renderCommentElement(comment);
    container.appendChild(commentElement);
  });
}

function renderCommentElement(comment) {
  const div = document.createElement("div");
  div.classList.add("comment");

  // Top bar wrapper
  const topRow = document.createElement("div");

  const authorP = document.createElement("p");
  authorP.className = "author";
  authorP.textContent = `${comment.author.name} said: `;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn-delete-comment";
  deleteBtn.setAttribute("aria-label", "Delete Comment");

  topRow.append(authorP, deleteBtn);

  // Comment content
  const contentP = document.createElement("p");
  contentP.className = "commentContent";
  contentP.textContent = comment.content;

  // Date
  const dateP = document.createElement("p");
  dateP.className = "date";
  dateP.textContent = formatDate(comment.createdAt);

  // Build full comment block
  div.append(topRow, contentP, dateP);

  // Add delete functionality
  deleteBtn.addEventListener("click", async () => {
    const confirmed = await confirmDialog({
      title: "Delete Comment",
      message: "Are you sure you want to delete this comment?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (!confirmed) return;

    try {
      await deleteComment(comment.id);
      showMessage("success", "Comment is deleted");
      div.remove(); // Remove from DOM after deletion
    } catch (err) {
      showMessage("error", "Failed to delete comment");
      console.error("Delete comment failed:", err);
    }
  });

  return div;
}
