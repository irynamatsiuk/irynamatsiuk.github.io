import { logout } from "../api/auth.js";

document.querySelector("#logout-btn").addEventListener("click", async () => {
  const errMsg = document.getElementById("error-msg");
  try {
    await logout();
  } catch (err) {
    errMsg.textContent = "Logout failed";
    console.error("Logout error:", err);
  }
});
