document.addEventListener("DOMContentLoaded", () => {
  const togglePasswordVisibility = (inputId, icon) => {
    const input = document.querySelector(`#${inputId}`);
    if (!input) return;

    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";

    const iconElement = icon.querySelector("i");
    if (iconElement) {
      iconElement.classList.toggle("bi-eye", !isPassword);
      iconElement.classList.toggle("bi-eye-slash", isPassword);
    }
  };

  const passwordToggleConfig = [
    { iconClass: "password-visibility", inputId: "password" },
    { iconClass: "confirm-password-visibility", inputId: "confirmPassword" },
  ];
  passwordToggleConfig.forEach(({ iconClass, inputId }) => {
    const icon = document.querySelector(`.${iconClass}`);
    if (icon) {
      icon.addEventListener("click", () =>
        togglePasswordVisibility(inputId, icon)
      );
    }
  });
});
