import { renderPosts } from "./renderPostList.js";

export function setupFilters(allPosts) {
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Render filtered posts
      switch (btn.id) {
        case "filter-all":
          renderPosts(allPosts);
          break;
        case "filter-drafts":
          renderPosts(allPosts.filter((p) => !p.published));
          break;
        case "filter-published":
          renderPosts(allPosts.filter((p) => p.published));
          break;
      }
    });
  });
}
