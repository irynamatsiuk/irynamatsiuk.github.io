import { projects } from "./projectsData.js";

function renderProjects() {
  const template = document.querySelector("#project");
  const container = document.querySelector(".projects");

  if (!template || !container) return;

  [...projects].reverse().forEach((project) => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".project").classList.add(project.id);
    clone.querySelector(".name").textContent = project.name;
    clone.querySelector(".tech").textContent = project.tech.join(", ");
    clone.querySelector(
      ".course-name"
    ).textContent = `\u00A0 ${project.courseProvider}, ${project.courseName}`;

    const githubLink = clone.querySelector(".github-link");
    githubLink.innerHTML = `<a href="${project.sourceLink}" target="_blank" rel="noopener">GitHub Repo</a>`;

    const liveLink = clone.querySelector(".live-link");
    if (project.liveLink) {
      liveLink.innerHTML = `<a href="${project.liveLink}" target="_blank" rel="noopener">Live Demo</a>`;
    }

    const description = clone.querySelector(".description");
    if (Array.isArray(project.description)) {
      project.description.forEach((text) => {
        const p = document.createElement("p");
        p.textContent = text;
        description.appendChild(p);
      });
    }

    container.appendChild(clone);
  });
}

// run on page load
renderProjects();
