import { getAllPosts } from "../../api/posts.js";
import { renderPosts } from "./renderPostList.js";
import { setupNewPostButton } from "./newPostButton.js";
import { setupFilters } from "./filters.js";
import { setupResetDb } from "../common/resetDb.js";
import { wakeUpServer } from "../../utils/wakeUpServer.js";
import { isAdmin } from "../../utils/isAdmin.js";

(async function initDashboard() {
  const adminNameEl = document.querySelector("#admin-name");
  const messageTextEl = document.querySelector(".message-text");

  const user = await wakeUpServer();

  if (!user || !isAdmin(user)) {
    window.location.href = "./login.html";
    return;
  }

  if (adminNameEl) adminNameEl.textContent = user.name;
  try {
    const posts = await getAllPosts();

    renderPosts(posts);
    setupFilters(posts);
    setupNewPostButton();
    setupResetDb();
  } catch (err) {
    console.error("Error loading dashboard:", err);
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
