// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navLinks.classList.remove("open");
    });
  });
}

// Smooth scroll for internal links (improves mobile feel)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const headerOffset = 80;
    const elementPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});

// Menu filter interactivity
const filterButtons = document.querySelectorAll(".filter-btn");
const menuItems = document.querySelectorAll(".menu-item");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    menuItems.forEach((item) => {
      const category = item.dataset.category;
      const show = filter === "all" || category === filter;
      item.style.display = show ? "flex" : "none";
    });
  });
});

// Reveal on scroll (for gallery and any [data-scroll])
const scrollElements = document.querySelectorAll("[data-scroll]");

const handleScrollReveal = () => {
  const viewportHeight = window.innerHeight;
  scrollElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < viewportHeight * 0.9) {
      el.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", handleScrollReveal);
window.addEventListener("load", handleScrollReveal);

// Simple swipe hint for gallery on mobile (scrolls slightly on load)
const galleryStrip = document.querySelector(".gallery-strip");
if (galleryStrip) {
  window.addEventListener("load", () => {
    if (window.innerWidth < 768) {
      setTimeout(() => {
        galleryStrip.scrollTo({ left: 40, behavior: "smooth" });
      }, 600);
    }
  });
}

// Reservation form feedback (no backend; just friendly UX)
const reservationForm = document.getElementById("reservation-form");
const formStatus = document.getElementById("form-status");

if (reservationForm && formStatus) {
  reservationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(reservationForm);
    const name = (formData.get("name") || "").toString().trim();

    if (!name) {
      formStatus.textContent = "Please add your name so we can hold your table.";
      formStatus.classList.remove("success");
      formStatus.classList.add("error");
      return;
    }

    reservationForm.reset();
    formStatus.textContent = `Thank you, ${name}! Your reservation request has been received. We'll confirm shortly.`;
    formStatus.classList.remove("error");
    formStatus.classList.add("success");
  });
}

// Dynamic year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear().toString();
}

