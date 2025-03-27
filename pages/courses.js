import { courses } from "./coursesData.js";

export function createAccordion(courses) {
  const template = document.querySelector("#course");

  for (let i = courses.length - 1; i >= 0; i--) {
    const course = courses[i];
    const clone = template.content.cloneNode(true);
    const btn = clone.querySelector(".accordion-btn");
    const status = clone.querySelector(".status");
    const description = clone.querySelector(".course-description");
    const link = clone.querySelector(".course-link");
    const project = clone.querySelector(".course-project");
    const certificate = clone.querySelector(".certificate");

    btn.textContent = course.name;
    status.textContent = course.status;

    link.innerHTML = `<a href=${course.link} target=_"blank">Website</a>`;

    if (course.certificate != "") {
      certificate.innerHTML = `<a href=${course.certificate} target=_"blank">Certificate</a>`;
    }

    if (course.project != "") {
      project.innerHTML = `<a href=${course.project} target=_"blank">Course Project</a>`;
    }

    course.description.map((paragraph) => {
      let p = document.createElement("p");
      p.textContent = paragraph;
      description.appendChild(p);
    });
    document.querySelector(".accordion").appendChild(clone);
  }
}

createAccordion(courses);

const accordion = document.querySelectorAll(".accordion-btn");

accordion.forEach((button) => {
  button.addEventListener("click", () => {
    let panel = button.nextElementSibling;
    if (panel.style.maxHeight) {
      button.classList.toggle("active");
      panel.style.maxHeight = null;
    } else {
      const activeButtons = document.querySelectorAll(".active");
      if (activeButtons) {
        activeButtons.forEach((activeButton) => {
          activeButton.classList.toggle("active");
          activeButton.nextElementSibling.style.maxHeight = null;
        });
      }
      panel.style.maxHeight = panel.scrollHeight + "px";
      button.classList.toggle("active");
    }
  });
});
