document.addEventListener("DOMContentLoaded", () => {
  // Handle rename form interactions
  document.querySelectorAll(".rename-form").forEach((form) => {
    const renameBtn = form.querySelector(".rename-btn");
    const saveBtn = form.querySelector(".save-btn");
    const nameSpan = form.querySelector(".folder-name");
    const itemsSpan = form.querySelector(".folder-items");
    const inputField = form.querySelector(".rename-input");

    if (!renameBtn || !saveBtn || !nameSpan || !itemsSpan || !inputField)
      return;

    renameBtn.addEventListener("click", () => {
      nameSpan.classList.add("d-none");
      itemsSpan.classList.add("d-none");
      inputField.classList.remove("d-none");
      renameBtn.classList.add("d-none");
      saveBtn.classList.remove("d-none");
      inputField.focus();
    });
  });

  // Toggle visibility of new folder & upload file forms
  const newFolderForm = document.querySelector(".new-folder");
  const uploadFile = document.querySelector(".upload-file");
  const openFormsBtn = document.querySelector(".open-forms");
  const closeFormsBtn = document.querySelector(".close-forms");

  if (openFormsBtn && closeFormsBtn && newFolderForm && uploadFile) {
    openFormsBtn.addEventListener("click", () => {
      newFolderForm.classList.remove("d-none");
      uploadFile.classList.remove("d-none");
      closeFormsBtn.classList.remove("d-none");
      openFormsBtn.classList.add("d-none");
    });

    closeFormsBtn.addEventListener("click", () => {
      newFolderForm.classList.add("d-none");
      uploadFile.classList.add("d-none");
      closeFormsBtn.classList.add("d-none");
      openFormsBtn.classList.remove("d-none");
    });
  }
});
