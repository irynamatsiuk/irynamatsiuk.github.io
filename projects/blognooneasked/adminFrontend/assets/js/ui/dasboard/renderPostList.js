export function renderPosts(posts = []) {
  const container = document.querySelector(".posts");
  container.classList.remove("hidden");

  container.textContent = "";

  if (!posts.length) {
    const message = document.createElement("p");
    message.classList.add("no-posts");
    message.textContent = "No posts found";
    container.appendChild(message);
    return;
  }

  // Fragment - is a hidden DOM container, that lives only in memory and does not trigger layout calculation when modified -> better for performance
  const fragment = document.createDocumentFragment();

  posts.forEach((post) => {
    const article = document.createElement("article");
    article.classList.add("post");

    const titleLink = document.createElement("a");
    titleLink.href = `post.html?id=${post.id}`;
    titleLink.className = "title";
    titleLink.textContent = post.title;

    const contentP = document.createElement("p");
    contentP.className = "content";
    contentP.textContent = post.content;

    const statusP = document.createElement("p");
    statusP.className = "status";
    statusP.textContent = post.published ? "published" : "draft";

    const commentsLink = document.createElement("a");
    commentsLink.href = `post.html?id=${post.id}`;
    commentsLink.className = "post-link";
    commentsLink.textContent = `Comments: ${post.comments.length}`;

    article.append(titleLink, contentP, statusP, commentsLink);

    fragment.appendChild(article);
  });
  container.appendChild(fragment);
}
