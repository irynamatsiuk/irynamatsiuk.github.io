import { login } from "../api/auth.js";
import { getAdminCredentials } from "../api/demoCredentials.js";
import { wakeUpServer } from "../utils/wakeUpServer.js";
import { isAdmin } from "../utils/isAdmin.js";

const loginForm = document.getElementById("login-form");
const submitBtn = document.getElementById("login-btn");
const errMsg = document.getElementById("message-text");
const togglePass = document.getElementById("toggle-password");
const passInput = document.getElementById("password");
const emailInput = document.getElementById("email");
const loadCredentialsBtn = document.getElementById("load-credentials-btn");

const eyeOpen = "./assets/images/icons/visibility.svg";
const eyeClosed = "./assets/images/icons/visibility_off.svg";

// Check if admin is already logged in
async function checkAdminLogin() {
  const containerEl = document.querySelector("main .container");
  const messageTextEl = document.querySelector(".message-text");
  if (containerEl) containerEl.classList.add("hidden");
  try {
    const user = await wakeUpServer();

    if (!user || !isAdmin(user)) {
      containerEl?.classList.remove("hidden");
      return;
    }
    window.location.href = "./dashboard.html";
  } catch (err) {
    console.log("Not logged in:", err);
    containerEl?.classList.remove("hidden");
    if (messageTextEl) {
      messageTextEl.textContent =
        "Failed to wake up the server. Please try again";
    }
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  errMsg.textContent = ""; // Clear previous error
  submitBtn.disabled = true; // Disable submit button to prevent double click

  try {
    await login(email, password);
    window.location.href = "./dashboard.html";
  } catch (err) {
    errMsg.textContent = err.message;
    console.error("login Error:", err);
  } finally {
    submitBtn.disabled = false;
  }
}

function togglePasswordVisibility() {
  const type = passInput.type === "password" ? "text" : "password";
  passInput.type = type;
  togglePass.src = type === "password" ? eyeOpen : eyeClosed;
}

async function fillAdminCredentials() {
  try {
    const credentials = await getAdminCredentials();
    emailInput.value = credentials.login;
    passInput.value = credentials.pass;
  } catch (err) {
    errMsg.textContent = err.message;
    console.error("Failed to fetch demo credentials:", err);
  }
}

loadCredentialsBtn.addEventListener("click", fillAdminCredentials);
togglePass.addEventListener("click", togglePasswordVisibility);
loginForm.addEventListener("submit", handleLogin);

checkAdminLogin();
