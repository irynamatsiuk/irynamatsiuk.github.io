export function showMessage(type, text) {
  let messageTimeout = null;
  const div = document.querySelector(".message");
  const para = document.querySelector("#message-text");

  div.classList.remove("error", "success");

  if (type === "error") div.classList.add("error");
  else div.classList.add("success");

  para.textContent = text;

  // Clear old timeout to avoid overlap
  if (messageTimeout) {
    clearTimeout(messageTimeout);
  }

  // Auto-fade and clear after 3 seconds
  messageTimeout = setTimeout(() => {
    // Remove text & type classes after fade completes (0.4 sec)
    setTimeout(() => {
      clearMessage();
    }, 400);
  }, 3000);
}

export function clearMessage() {
  const div = document.querySelector(".message");
  const para = document.querySelector(".message p");

  para.textContent = "";
  div.classList.remove("error", "success");
}
