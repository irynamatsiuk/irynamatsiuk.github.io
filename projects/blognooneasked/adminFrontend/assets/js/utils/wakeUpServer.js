import { getCurrentUser } from "../api/auth.js";

export async function wakeUpServer() {
  const box = document.getElementById("server-wakeup");
  box?.classList.remove("hidden");

  try {
    const user = await getCurrentUser();
    return user || null;
  } finally {
    box?.classList.add("hidden");
  }
}
