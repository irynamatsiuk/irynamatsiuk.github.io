const modal = document.querySelector("#modalOverlay");
const continueBtn = document.querySelector("#continueBtn");
let targetUrl;

document.querySelectorAll(".needs-modal").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    targetUrl = this.href;
    modal.style.display = "flex";
  });
});

continueBtn.addEventListener("click", function () {
  if (targetUrl) {
    window.location.href = targetUrl;
  }
});
