import { getCurrentUser } from "../api/auth.js";

export async function wakeUpServer() {
  const box = document.getElementById("server-wakeup");

  const showSpinnerTimeout = setTimeout(() => {
    box?.classList.remove("hidden");
  }, 500);

  try {
    const user = await getCurrentUser();
    return user || null;
  } finally {
    clearTimeout(showSpinnerTimeout); // Cancel showing the spinner if the server responds faster than 500ms
    box?.classList.add("hidden");
  }
}
