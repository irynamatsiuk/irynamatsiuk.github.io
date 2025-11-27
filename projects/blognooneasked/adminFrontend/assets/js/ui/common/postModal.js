import { createPost, updatePost } from "../../api/posts.js";
import { showMessage } from "./message.js";

// Reusable modal for both creating and editing a post

export function setupPostModal({ mode, post = {} }) {
  const modal = document.getElementById("post-modal");
  const closeModal = document.getElementById("close-modal");
  const postForm = document.getElementById("post-form");
  const submitBtns = postForm.querySelectorAll('button[type="submit"]');
  const modalError = document.getElementById("error-modal");
  const message = document.getElementById("message-text");
  let isPublish = false;

  // Prefill data for edit mode, changes heading
  function prefillForm() {
    postForm.reset();
    if (mode === "edit" && post) {
      postForm.querySelector('[name="title"]').value = post.title || "";
      postForm.querySelector('[name="content"]').value = post.content || "";
    }
    modal.querySelector("h2").textContent =
      mode === "edit" ? "Edit Post" : "Create New Post";
  }

  function open() {
    prefillForm();
    modalError.textContent = "";
    modal.classList.remove("hidden");
  }

  function close() {
    modal.classList.add("hidden");
  }

  // Listener to close the modal when clicking outside it
  closeModal.addEventListener("click", close);
  window.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });

  // Set up the "publish" behavior for the form's submit buttons.
  // When a button is clicked, it checks the button's `data-publish` attribute.
  // If `data-publish="true"`, the `isPublish` flag is set to true, indicating
  // that the post should be published; otherwise, it remains false (draft).
  // This allows the same form to handle both "Save as Draft" and "Publish" actions.

  submitBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      isPublish = e.target.dataset.publish === "true";
    });
  });

  // Handle submit
  postForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const postData = {
      title: postForm.title.value.trim(),
      content: postForm.content.value.trim(),
      published: isPublish,
    };

    if (!postData.title || !postData.content) {
      modalError.textContent = "Please fill in all fields";
      return;
    }

    try {
      if (mode === "edit") {
        await updatePost(post.id, postData);
      } else {
        await createPost(postData);
      }
      close();
      showMessage("success", "Saving...");
      setTimeout(() => location.reload(), 1000);
    } catch (err) {
      console.error("Post save error:", err);
      message.textContent = "Failed to save post";
    }
  });
  return { open, close };
}
