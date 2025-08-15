// Load HTML partials into placeholders in index.html
document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");
  includes.forEach((el) => {
    const file = el.getAttribute("data-include");
    fetch(file)
      .then((res) => res.text())
      .then((data) => {
        el.innerHTML = data;

        // Initialize Bootstrap carousel manually after dynamic content is loaded
        if (file.includes("adopted")) {
          const carouselEl = document.getElementById("carouselCaptions");
          if (carouselEl) {
            const carousel = new bootstrap.Carousel(carouselEl, {
              interval: 5000,
            });
            carousel.cycle();
          }
        }

        // Prevent accessibility warning by toggling `inert` on modal:
        // - Add `inert` on hide to block hidden focus
        // - Remove `inert` on show to restore interactivity
        // - Move focus to body after hide for safety
        if (file.includes("modal")) {
          const modalEl = document.getElementById("modal");

          modalEl.addEventListener("hide.bs.modal", () => {
            document.getElementById("modal").setAttribute("inert", "");
            const safeElement = document.body.focus();
          });
          modalEl.addEventListener("show.bs.modal", () => {
            modalEl.removeAttribute("inert");
          });
        }

        // Prevent default form behavior (reloading page) after clicking on submit button
        if (file.includes("contact")) {
          const contactForm = el.querySelector("#contact");
          if (contactForm) {
            contactForm.addEventListener("submit", function (e) {
              e.preventDefault();
            });
          }
        }
      })

      .catch((err) => {
        console.error(`Include error: ${file}`, err);
      });
  });
});
