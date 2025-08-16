const modal = document.querySelector("#modalOverlay");
const continueBtn = document.querySelector("#continueBtn");
let targetUrl;

// Prevent stuck modal on refresh
window.addEventListener("load", () => {
  modal.style.display = "none";
});

document.querySelectorAll(".needs-modal").forEach((link) => {
  link.addEventListener("click", function (event) {
    const href = this.href;
    const storageKey = `shownModalFor:${href}`;

    // If modal already shown for this link, go directly to link
    if (sessionStorage.getItem(storageKey)) {
      return;
    }

    event.preventDefault();
    targetUrl = href;
    sessionStorage.setItem(storageKey, "true");
    modal.style.display = "flex";
  });
});

continueBtn.addEventListener("click", function () {
  if (targetUrl) {
    window.location.href = targetUrl;
  }
});
