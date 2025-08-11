import { projects } from "./projectsData.js";

function getTechCategories() {
  let map = new Map();
  map.set("all", "All Projects");

  for (const project of projects) {
    for (const category of project.tech) {
      const key = category.toLowerCase().replace(/\s+/g, "_");
      map.set(key, category);
    }
  }
  return map;
}

function renderFilterRadios() {
  const radiosContainer = document.querySelector(".radios");
  if (!radiosContainer) return;

  const techCategories = getTechCategories();

  // sort categories alphabetically
  const sorted = new Map(
    [...techCategories.entries()].sort((a, b) => a[1].localeCompare(b[1]))
  );

  for (const [key, value] of sorted) {
    const radioWrapper = document.createElement("div");
    radioWrapper.className = "radio";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "keyword";
    input.id = key;
    input.value = key === "all" ? "" : value;
    input.checked = key === "all";
    input.className = "radio-input";
    input.addEventListener("change", () => {
      filterProjectsByKeyword(input.value);
    });

    const label = document.createElement("label");
    label.htmlFor = key;
    label.textContent = value;

    radioWrapper.append(input, label);
    radiosContainer.appendChild(radioWrapper);
  }
}

// for each project, checks its tech text,
// if it contains the selected keyword, show the project, otherwise, hide it.
function filterProjectsByKeyword(keyword) {
  const projects = document.querySelectorAll(".project");
  const techs = document.querySelectorAll(".tech");

  projects.forEach((project, index) => {
    const text = techs[index]?.textContent ?? "";
    // it safely accesses .textContent only if tech[index] exists,
    // if tech[index] is undefined, it won’t throw an error.
    // ?? "" ensures that text is at least an empty string, so .includes() won’t fail
    project.style.display = text.includes(keyword) ? "" : "none";
  });

  scrollToFilteredSection();
}

function scrollToFilteredSection() {
  if (screen.width >= 1000) {
    window.scroll({ top: 250, left: 0, behavior: "smooth" });
  } else {
    document
      .querySelector(".main")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// run on page load
renderFilterRadios();
