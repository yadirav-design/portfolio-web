// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu functionality
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.createElement("div");
  mobileMenu.classList.add("mobile-menu");

  // Create mobile menu content
  mobileMenu.innerHTML = `
      <button class="close-menu">×</button>
      <div class="mobile-nav-links">
        <a href="#" class="active">Inicio</a>
        <a href="#services">Servicios</a>
        <a href="#about">Sobre mí</a>
        <a href="#projects">Proyectos</a>
        <a href="#blog">Blog</a>
        <a href="#contact">Contacto</a>
      </div>
    `;

  document.body.appendChild(mobileMenu);

  // Toggle mobile menu
  hamburger.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
    document.body.style.overflow = "hidden";
  });

  // Close mobile menu
  const closeMenu = document.querySelector(".close-menu");
  closeMenu.addEventListener("click", function () {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  // Close mobile menu when clicking on links
  const mobileLinks = document.querySelectorAll(".mobile-nav-links a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  // Smooth scrolling for all navigation links
  const allLinks = document.querySelectorAll('a[href^="#"]');

  allLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Active menu item on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-nav-links a");

  function highlightNavigation() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });

    // Check if we're at the top of the page
    if (scrollPosition < 100) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#") {
          link.classList.add("active");
        }
      });
    }
  }

  window.addEventListener("scroll", highlightNavigation);

  // Form validation
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simple validation
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      if (!name || !email || !subject || !message) {
        alert("Por favor, completa todos los campos");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Por favor, introduce un email válido");
        return;
      }

      // If validation passes, you would normally send the form data to a server
      // For this example, we'll just show a success message
      alert("¡Mensaje enviado con éxito! Gracias por contactar.");
      contactForm.reset();
    });
  }

  // Animation on scroll
  function revealOnScroll() {
    const elements = document.querySelectorAll(
      ".service-card, .portfolio-item, .timeline-item"
    );

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Set initial styles for animation
  const animatedElements = document.querySelectorAll(
    ".service-card, .portfolio-item, .timeline-item"
  );
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "all 0.6s ease";
  });

  window.addEventListener("scroll", revealOnScroll);

  // Trigger once on load
  revealOnScroll();
});
