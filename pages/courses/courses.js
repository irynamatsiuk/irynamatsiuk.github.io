import { courses } from "./coursesData.js";

// helper to create a single <a> element or return empty string
function createLink(url, text) {
  return url
    ? `<a href="${url}" target="_blank" rel="noopener">${text}</a>`
    : "";
}

// helper to render course description
function renderDescription(descriptionArray, container) {
  descriptionArray.forEach((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    container.appendChild(p);
  });
}

// main rendering function
function createAccordion(courses) {
  const template = document.querySelector("#course");
  const accordionContainer = document.querySelector(".accordion");

  if (!template || !accordionContainer) return;
  courses
    .slice()
    .reverse()
    .forEach((course) => {
      const clone = template.content.cloneNode(true);

      const btn = clone.querySelector(".accordion-btn");
      const status = clone.querySelector(".status");
      const description = clone.querySelector(".course-description");
      const website = clone.querySelector(".course-website");
      const project = clone.querySelector(".course-project");
      const certificate = clone.querySelector(".certificate");

      btn.textContent = course.name;
      status.textContent = course.status;

      website.innerHTML = createLink(course.website, "Website");
      certificate.innerHTML = createLink(course.certificate, "Certificate");
      project.innerHTML = createLink(course.project, "Course Project");

      renderDescription(course.description, description);

      accordionContainer.appendChild(clone);
    });
}

// sets up accordion toggle behavior
function setupAccordionToggles() {
  const buttons = document.querySelectorAll(".accordion-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const panel = button.nextElementSibling;
      const isOpen = button.classList.contains("active");

      // close all open panels
      document
        .querySelectorAll(".accordion-btn.active")
        .forEach((activeBtn) => {
          activeBtn.classList.remove("active");
          activeBtn.nextElementSibling.style.maxHeight = null;
        });

      // toggle current
      if (!isOpen) {
        panel.style.maxHeight = panel.scrollHeight + "px";
        button.classList.add("active");
      }
    });
  });
}

// init
createAccordion(courses);
setupAccordionToggles();
