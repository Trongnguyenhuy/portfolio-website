const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");

navToggle.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    // Check if the link is an internal anchor
    const href = link.getAttribute("href");
    if (href.startsWith("#")) {
      event.preventDefault(); // Prevent the default jump
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Smoothly scroll to the target element
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
    // Close the mobile navigation menu
    document.body.classList.remove("nav-open");
  });
});

// --- PROJECT FILTERING ---
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

/**
 * Filters project items based on a category.
 * @param {string} category - The category to filter by ('all', 'web-dev', 'design', etc.).
 */
function filterProjects(category) {
  projectItems.forEach((item) => {
    const itemCategory = item.dataset.category;
    const shouldShow = category === "all" || category === itemCategory;

    if (shouldShow) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Get the category from the button's data-filter attribute
    const filterCategory = button.dataset.filter;

    // Remove 'active' class from all buttons and add it to the clicked one
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Call the filter function
    filterProjects(filterCategory);
  });
});

// --- LIGHTBOX ---
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const projectImages = document.querySelectorAll(".project-item img");
const lightboxClose = document.querySelector(".lightbox-close");

/**
 * Displays the lightbox with the clicked image.
 * @param {Event} event - The click event from the image.
 */
function openLightbox(event) {
  const imgElement = event.currentTarget;
  lightbox.classList.add("active");
  lightboxImg.src = imgElement.src;
  lightboxImg.alt = imgElement.alt; // Copy alt text for accessibility
  document.body.style.overflow = "hidden"; // Prevent background scrolling
  document.addEventListener("keydown", handleKeydown);
}

/**
 * Hides the lightbox.
 */
function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto"; // Restore background scrolling
  document.removeEventListener("keydown", handleKeydown);
}

/**
 * Handles keydown events for the lightbox.
 * @param {KeyboardEvent} event
 */
function handleKeydown(event) {
  if (event.key === "Escape") {
    closeLightbox();
  }
}

projectImages.forEach((image) => {
  image.addEventListener("click", openLightbox);
});

lightboxClose.addEventListener("click", closeLightbox);

// Close lightbox when clicking on the background overlay
lightbox.addEventListener("click", (event) => {
  // Check if the click is on the overlay itself, not the image
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// --- FORM VALIDATION ---
const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

/**
 * Sets an error message for a form field.
 * @param {HTMLElement} field - The input or textarea element.
 * @param {string} message - The error message to display.
 */
function setFieldError(field, message) {
  field.classList.add("invalid");
  const errorContainer = field.nextElementSibling;
  errorContainer.innerText = message;
}

/**
 * Clears any error message for a form field.
 * @param {HTMLElement} field - The input or textarea element.
 */
function clearFieldError(field) {
  field.classList.remove("invalid");
  const errorContainer = field.nextElementSibling;
  errorContainer.innerText = "";
}

/**
 * Validates an email address format.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates the name field.
 * @returns {boolean} - True if valid, false otherwise.
 */
function validateName() {
  clearFieldError(nameInput);
  if (nameInput.value.trim() === "") {
    setFieldError(nameInput, "Name cannot be empty.");
    return false;
  }
  return true;
}

/**
 * Validates the email field.
 * @returns {boolean} - True if valid, false otherwise.
 */
function validateEmail() {
  clearFieldError(emailInput);
  if (emailInput.value.trim() === "") {
    setFieldError(emailInput, "Email cannot be empty.");
    return false;
  } else if (!isValidEmail(emailInput.value.trim())) {
    setFieldError(emailInput, "Please enter a valid email address.");
    return false;
  }
  return true;
}

/**
 * Validates the message field.
 * @returns {boolean} - True if valid, false otherwise.
 */
function validateMessage() {
  clearFieldError(messageInput);
  if (messageInput.value.trim() === "") {
    setFieldError(messageInput, "Message cannot be empty.");
    return false;
  }
  return true;
}

// Add real-time validation listeners
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
messageInput.addEventListener("input", validateMessage);

contactForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Stop form from submitting

  // Run all validations on submit to be safe
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();

  const isFormValid = isNameValid && isEmailValid && isMessageValid;

  if (isFormValid) {
    // Create an object with the form data for debugging
    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim(),
    };

    // Log the data to the console instead of just a generic message
    console.log("Form Data Submitted:", formData);

    alert("Thank you for your message! Check the console for the submitted data.");
    contactForm.reset(); // Clear the form fields

    // Manually clear any lingering error messages after reset
    clearFieldError(nameInput);
    clearFieldError(emailInput);
    clearFieldError(messageInput);
  }
});