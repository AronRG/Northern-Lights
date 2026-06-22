const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navPanel = document.querySelector(".nav-panel");
const toTopButton = document.querySelector(".to-top");
const bookingForm = document.querySelector(".booking-form");
const formMessage = document.querySelector(".form-message");
const revealItems = document.querySelectorAll(".reveal");

const closeMenu = () => {
  navToggle.classList.remove("is-open");
  navPanel.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
};

const syncChrome = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
  toTopButton.classList.toggle("is-visible", window.scrollY > 520);
};

navToggle.addEventListener("click", () => {
  const isOpen = navPanel.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navPanel.addEventListener("click", (event) => {
  if (event.target.matches("a")) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("scroll", syncChrome, { passive: true });
syncChrome();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealItems.forEach((item) => revealObserver.observe(item));

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "Спасибо! Мы свяжемся с вами для подтверждения брони.";
  bookingForm.reset();
});

toTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* Интерактив: мобильное меню, появление секций, форма брони и кнопка наверх. */
