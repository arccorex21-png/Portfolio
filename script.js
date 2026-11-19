// 1. Dark / Light Theme 
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  root.setAttribute("data-theme", "dark");
  themeToggle.setAttribute("aria-label", "Switch to light mode");
}

themeToggle.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  if (isDark) {
    root.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    themeToggle.setAttribute("aria-label", "Switch to dark mode");
  } else {
    root.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    themeToggle.setAttribute("aria-label", "Switch to light mode");
  }
});

// 2. Contact Form Validation
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

function setError(inputId, message) {
  const input = document.getElementById(inputId);
  const errorEl = document.getElementById(`${inputId}-error`);
  const field = input.closest(".field");

  if (message) {
    field.classList.add("invalid");
    errorEl.textContent = message;
  } else {
    field.classList.remove("invalid");
    errorEl.textContent = "";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  statusEl.textContent = "";

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  let isValid = true;

  if (name.length < 2) {
    setError("name", "Please enter your name.");
    isValid = false;
  } else {
    setError("name", "");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    setError("email", "Please enter a valid email address.");
    isValid = false;
  } else {
    setError("email", "");
  }

  if (message.length < 10) {
    setError("message", "Please enter a message (at least 10 characters).");
    isValid = false;
  } else {
    setError("message", "");
  }

  if (isValid) {
    statusEl.textContent = `Thanks, ${name}! Your message has been validated and is ready to send.`;
    form.reset();
  }
});