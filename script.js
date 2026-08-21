/* =========================================================
   1. MOBILE NAV TOGGLE
   ========================================================= */
function setupNavToggle() {
  const toggleBtn = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("is-open");
    toggleBtn.classList.toggle("is-open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      toggleBtn.classList.remove("is-open");
    });
  });
}

/* =========================================================
   2. CONTACT FORM HANDLING
   Sends form data to Formspree using fetch(), without
   reloading the page.
   ========================================================= */
function setupContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = "Please fill in every field before sending.";
      status.style.color = "#9C3E22";
      return;
    }

    status.textContent = "Sending...";
    status.style.color = "#736A63";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        status.textContent = `Thanks, ${name}! Your message has been sent.`;
        status.style.color = "#9C3E22";
        form.reset();
      } else {
        status.textContent = "Something went wrong. Please try again.";
      }
    } catch (error) {
      status.textContent = "Network error — please check your connection.";
    }
  });
}

/* =========================================================
   3. FOOTER YEAR
   ========================================================= */
function setupFooterYear() {
  const yearEl = document.getElementById("year");
  yearEl.textContent = new Date().getFullYear();
}

/* =========================================================
   4. SCROLL-REVEAL ANIMATIONS
   A feature not present in the CodeOrbit version: uses
   IntersectionObserver to fade + rise each section into view
   as the user scrolls to it, instead of everything being
   visible immediately on load.
   ========================================================= */
function setupScrollReveal() {
  const sections = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // animate once, not every scroll
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* =========================================================
   RUN EVERYTHING ONCE THE DOM IS READY
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  setupNavToggle();
  setupContactForm();
  setupFooterYear();
  setupScrollReveal();
});
