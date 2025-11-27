import { getPostById } from "../../api/posts.js";
import { renderPost } from "./renderPost.js";
import { setupPostControls } from "./postControls.js";
import { setupCommentForm } from "./commentForm.js";
import { renderComments } from "./renderComments.js";
import { setupResetDb } from "../common/resetDb.js";
import { wakeUpServer } from "../../utils/wakeUpServer.js";
import { isAdmin } from "../../utils/isAdmin.js";

(async function initPage() {
  const adminNameEl = document.querySelector("#admin-name");
  const messageTextEl = document.querySelector(".message-text");

  const user = await wakeUpServer();

  if (!user || !isAdmin(user)) {
    window.location.href = "./login.html";
    return;
  }

  if (adminNameEl) adminNameEl.textContent = user.name;

  // Load post
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  try {
    const post = await getPostById(id);

    renderPost(post);
    setupPostControls(post);
    renderComments(post.comments);
    setupCommentForm(id);
    setupResetDb();
  } catch (err) {
    console.error("Error loading post:", err);
    if (messageTextEl) {
      messageTextEl.textContent = "Failed to load post data. Please try again";
    }
  }
})();

/*
  This async function runs immediately when the module is imported.

  A self-invoking async function is used instead of waiting for
  `window.onload` or `DOMContentLoaded` because this file is loaded
  dynamically (via import() in main.js) *after* the page has already loaded.

  That means event listeners like `window.addEventListener("load", …)` 
  would never fire — so this pattern ensures the code always runs reliably.
*/
