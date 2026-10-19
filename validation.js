const form = document.querySelector("#registration-form");
const successMessage = document.querySelector("#form-success");
const inputs = form.querySelectorAll("input");

function checkInput(input) {
  const value = input.value.trim();
  let error = "";

  if (!value) {
    error = "This field is required.";
  } else if (input.id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    error = "Enter a valid email address.";
  } else if (input.id === "password" && value.length < 8) {
    error = "Password must be at least 8 characters.";
  } else if (
    input.id === "confirm-password" &&
    input.value !== document.querySelector("#password").value
  ) {
    error = "Passwords do not match.";
  } else if (input.id === "age" && (!Number.isInteger(Number(value)) || Number(value) < 1)) {
    error = "Enter a valid age (a whole number greater than 0).";
  }

  document.querySelector(`#${input.id}-error`).textContent = error;
  input.setAttribute("aria-invalid", Boolean(error));
  return !error;
}

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    checkInput(input);
    if (input.id === "password") checkInput(document.querySelector("#confirm-password"));
    successMessage.textContent = "";
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const isValid = [...inputs].map(checkInput).every(Boolean);

  if (isValid) {
    successMessage.textContent = "Registration details are valid.";
  } else {
    form.querySelector('[aria-invalid="true"]').focus();
  }
});
