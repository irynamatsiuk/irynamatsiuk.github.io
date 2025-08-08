import { projects } from "./projectsData.js";
import { filterCategories } from "./projectsFilterData.js";

function showProjects() {
  const template = document.querySelector("#project");

  for (let i = projects.length - 1; i >= 0; i--) {
    const project = projects[i];
    const clone = template.content.cloneNode(true);
    const projectEl = clone.querySelector(".project");
    const name = clone.querySelector(".name");
    const details = clone.querySelector(".details");
    const description = clone.querySelector(".description");
    const courseName = clone.querySelector(".course-name");
    const live = clone.querySelector(".live-link");
    const github = clone.querySelector(".github-link");

    projectEl.classList.add(`${project.id}`);
    name.textContent = project.name;
    details.textContent = project.details;
    courseName.textContent = `\u00A0 ${project.courseProvider}, ${project.courseName}`;
    github.innerHTML = `<a href=${project.sourceLink} target=_"blank">Github</a>`;

    if (project.liveLink != "") {
      live.innerHTML = `<a href=${project.liveLink} target=_"blank">Live</a>`;
    }

    project.description.map((paragraph) => {
      let p = document.createElement("p");
      p.textContent = paragraph;
      description.appendChild(p);
    });

    document.querySelector(".projects").appendChild(clone);
  }
}

function createFilter() {
  const radiosDiv = document.querySelector(".radios");
  const sortedCategories = [...filterCategories].sort((a, b) =>
    a.value.localeCompare(b.value)
  );

  sortedCategories.forEach((category) => {
    const radio = document.createElement("div");
    radio.className = "radio";

    const input = document.createElement("input");
    input.className = "radio-input";
    input.type = "radio";
    input.name = "keyword";
    input.id = category.id;
    input.value = category.id === "allProjects" ? "" : category.value;
    input.checked = category.id === "allProjects";
    input.addEventListener("change", () => {
      const value = input.value;
      filterProjects(value);
    });

    const label = document.createElement("label");
    label.htmlFor = category.id;
    label.textContent = category.value;

    radio.append(input, label);
    radiosDiv.appendChild(radio);
  });
}

function filterProjects(keyWord) {
  const allProjects = document.querySelectorAll(".project");
  const allDetails = document.querySelectorAll(".details");

  for (let i = 0; i < allProjects.length; i++) {
    let projectDetails = allDetails[i];
    if (projectDetails.textContent.includes(keyWord)) {
      allProjects[i].style.display = "";
    } else {
      allProjects[i].style.display = "none";
    }
  }
  // go back to page top
  if (screen.width >= 1000) {
    window.scroll({
      top: 250,
      left: 0,
      behavior: "smooth",
    });
  } else if (screen.width < 1000) {
    let el = document.querySelector(".main");
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

showProjects();
createFilter();
