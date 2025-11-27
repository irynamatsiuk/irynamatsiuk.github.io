export function confirmDialog({
  title = "Confirm",
  message = "Are you sure?",
  confirmText = "OK",
  cancelText = "Cancel",
}) {
  // Return a Promise so the caller can await the user's choice
  return new Promise((resolve) => {
    // Grab references to the modal elements
    const modal = document.getElementById("confirm-modal");
    const titleEl = document.getElementById("confirm-title");
    const msgEl = document.getElementById("confirm-message");
    const okBtn = document.getElementById("confirm-ok");
    const cancelBtn = document.getElementById("confirm-cancel");

    // Set the modal content and button text
    titleEl.textContent = title;
    msgEl.textContent = message;
    okBtn.textContent = confirmText;
    cancelBtn.textContent = cancelText;

    modal.classList.remove("hidden");

    // Cleanup function hides the modal and removes all event listeners
    function cleanup(result) {
      modal.classList.add("hidden");
      okBtn.removeEventListener("click", onOk);
      cancelBtn.removeEventListener("click", onCancel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onBackdropClick);

      resolve(result);
    }

    // Event handlers
    function onOk() {
      cleanup(true);
    }
    function onCancel() {
      cleanup(false);
    }
    function onKey(e) {
      if (e.key === "Escape") cleanup(false);
      if (e.key === "Enter") {
        e.preventDefault();
        cleanup(true);
      }
    }

    function onBackdropClick(e) {
      if (e.target === modal) cleanup(false);
    }

    // Attach the event listeners
    okBtn.addEventListener("click", onOk);
    cancelBtn.addEventListener("click", onCancel);
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onBackdropClick);
  });
}
