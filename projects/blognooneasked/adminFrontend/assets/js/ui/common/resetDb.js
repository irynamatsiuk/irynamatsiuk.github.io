import { confirmDialog } from "./confirmModal.js";
import { showMessage } from "./message.js";
import { resetDb } from "../../api/resetDb.js";

export function setupResetDb() {
  const resetBtn = document.querySelector("#reset-db-btn");
  resetBtn.addEventListener("click", async () => {
    const confirmed = await confirmDialog({
      title: "Reset Database",
      message:
        "This action will reset the database to its default state (4 demo posts).\n" +
        "Are you sure you want to reset the database?",
      confirmText: "Reset",
      cancelText: "Cancel",
    });
    if (!confirmed) return;

    try {
      await resetDb();
      showMessage("success", "Resetting the database...");
      setTimeout(() => location.reload(), 1000);
    } catch {
      showMessage("error", "Failed to rest database");
      console.error("Database reset failed:", err);
    }
  });
}
