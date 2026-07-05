document.addEventListener("DOMContentLoaded", function () {
  const loginCard = document.getElementById("loginCard");
  const registerCard = document.getElementById("registerCard");
  const showRegister = document.getElementById("showRegister");
  const showLogin = document.getElementById("showLogin");

  showRegister.addEventListener("click", function (e) {
    e.preventDefault();
    loginCard.classList.add("hidden");
    registerCard.classList.remove("hidden");
    resetErrors();
  });

  showLogin.addEventListener("click", function (e) {
    e.preventDefault();
    registerCard.classList.add("hidden");
    loginCard.classList.remove("hidden");
    resetErrors();
  });

  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;

    resetErrors();

    const fullName = document.getElementById("fullName");
    if (fullName.value.trim() === "") {
      showError(fullName, "fullNameError", "Full Name is required.");
      isValid = false;
    }

    const email = document.getElementById("registerEmail");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      showError(
        email,
        "registerEmailError",
        "Please enter a valid email address.",
      );
      isValid = false;
    }

    const bloodType = document.getElementById("bloodType");
    if (bloodType.value === "") {
      showError(bloodType, "bloodTypeError", "Please select your blood type.");
      isValid = false;
    }

    const role = document.getElementById("role");
    if (role.value === "") {
      showError(role, "roleError", "Please select a user role.");
      isValid = false;
    }

    const password = document.getElementById("registerPassword");
    if (password.value.length < 8) {
      showError(
        password,
        "registerPasswordError",
        "Password must be at least 8 characters long.",
      );
      isValid = false;
    }

    const confirmPassword = document.getElementById("confirmPassword");
    if (password.value !== confirmPassword.value) {
      showError(
        confirmPassword,
        "confirmPasswordError",
        "Passwords do not match.",
      );
      isValid = false;
    }

    if (isValid) {
      alert(
        "🚀 Client validation passed! Sending data to BloodBridge Cognito/Auth Pipeline...",
      );
      // Task 3 do të merret me ruajtjen e tokenit këtu
    }
  });

  function showError(inputElement, errorSpanId, message) {
    inputElement.classList.add("input-error");
    document.getElementById(errorSpanId).innerText = message;
  }

  function resetErrors() {
    const inputs = document.querySelectorAll("input, select");
    inputs.forEach((input) => input.classList.remove("input-error"));

    const errorSpans = document.querySelectorAll(".error-message");
    errorSpans.forEach((span) => (span.innerText = ""));
  }
});
