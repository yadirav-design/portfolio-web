// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu functionality
  const hamburger = document.querySelector(".hamburger");

  if (hamburger) {
    const mobileMenu = document.querySelector(".mobile-menu");

    // Toggle mobile menu
    hamburger.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
      document.body.style.overflow = mobileMenu.classList.contains("active")
        ? "hidden"
        : "auto";
    });

    // Close mobile menu
    const closeMenu = document.querySelector(".close-menu");
    if (closeMenu) {
      closeMenu.addEventListener("click", function () {
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "auto";
      });
    }

    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll(".mobile-nav-links a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "auto";
      });
    });
  }

  // Smooth scrolling for all navigation links
  const allLinks = document.querySelectorAll('a[href^="#"]');

  allLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      // Special case for #about which should scroll to hero section
      if (targetId === "#about") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector("header")
          ? document.querySelector("header").offsetHeight
          : 80;
        const offsetTop = targetElement.offsetTop - headerHeight;

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
    if (sections.length === 0 || navLinks.length === 0) return;

    const scrollPosition = window.scrollY + 150;

    // Check if we're at the top of the page first
    if (scrollPosition < 100) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#") {
          link.classList.add("active");
        }
      });
      return;
    }

    // Otherwise check which section is in view
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
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
  }

  window.addEventListener("scroll", highlightNavigation);
  highlightNavigation(); // Set initial active state

  // Animation on scroll - only if these elements exist
  const animatedElements = document.querySelectorAll(".animated-element");

  if (animatedElements.length > 0) {
    // Set initial styles for animation
    animatedElements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

    // Use Intersection Observer for better performance
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
              observer.unobserve(entry.target); // Stop observing after animation
            }
          });
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.15,
        }
      );

      // Start observing each element
      animatedElements.forEach((element) => observer.observe(element));
    } else {
      // Fallback for browsers without IntersectionObserver
      function revealOnScroll() {
        animatedElements.forEach((element) => {
          const elementTop = element.getBoundingClientRect().top;
          if (elementTop < window.innerHeight - 100) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
          }
        });
      }

      window.addEventListener("scroll", revealOnScroll);
      revealOnScroll(); // Initial check
    }
  }
});
