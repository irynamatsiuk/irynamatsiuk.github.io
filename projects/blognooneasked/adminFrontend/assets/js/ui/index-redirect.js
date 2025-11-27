import { wakeUpServer } from "../utils/wakeUpServer.js";

document.addEventListener("DOMContentLoaded", async () => {
  const user = await wakeUpServer();
  if (user) {
    window.location.href = "./dashboard.html";
  } else {
    window.location.href = "./login.html";
  }
});
