import { formatDate } from "../../utils/formatDate.js";

export function renderPost(post) {
  if (!post) {
    const para = document.createElement("p");
    para.classList.add("error");
    para.textContent = "Post not found";
    document.querySelector(".post").appendChild(para);
    return;
  }

  document.querySelector(".post-details").classList.remove("hidden");

  const title = document.querySelector(".title");
  const content = document.querySelector(".content");
  const date = document.querySelector(".date");
  const status = document.querySelector(".status");

  title.textContent = post.title;
  content.textContent = post.content;
  date.textContent = formatDate(post.createdAt);
  status.textContent = post.published ? "published" : "draft";
}
