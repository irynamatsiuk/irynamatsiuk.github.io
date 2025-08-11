const headerMessages = {
  "/pages/projects/projects.html": `
    These are the projects I have done during my learning path. 
  `,
  "/pages/courses/courses.html": `
    These are the courses I have taken to deepen my knowledge in web development. <br />
    From fundamentals to advanced topics. <br />
  `,
};

async function loadTemplate(id, filePath) {
  const el = document.querySelector(`#${id}`);
  if (!el) return;
  try {
    const res = await fetch(filePath);
    const html = await res.text();
    el.innerHTML = html;

    if (id === "header-placeholder") {
      injectDynamicHeaderContent();
    }

    if (id === "nav-placeholder") {
      highlightCurrentNav();
    }
  } catch (err) {
    console.error(`Failed to load ${filePath}:`, err);
  }
}

function injectDynamicHeaderContent() {
  const currentPath = window.location.pathname;
  const message = headerMessages[currentPath];
  const desc = document.querySelector("#page-description");
  if (desc && message) {
    desc.innerHTML = message;
  }
}

function highlightCurrentNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const linkPath = new URL(href, window.location.origin).pathname;
    console.log("linkPath", linkPath);
    if (currentPath === linkPath) {
      link.classList.add("current");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadTemplate("nav-placeholder", "../../components/nav.html");
  loadTemplate("header-placeholder", "../../components/header.html");
  loadTemplate("footer-placeholder", "../../components/footer.html");
});
