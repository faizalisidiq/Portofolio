document.addEventListener("DOMContentLoaded", () => {
  // Navbar Scroll Effect
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    // Animate hamburger icon (optional visual tweak, handled by css if needed)
    menuToggle.classList.toggle("active");
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

  // Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Active link highlighting on scroll
  const sections = document.querySelectorAll("section, header");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((li) => {
      li.classList.remove("active");
      if (li.getAttribute("href").includes(current)) {
        li.classList.add("active");
      }
    });
  });

  // Scroll Animations using Intersection Observer
  const animateElements = document.querySelectorAll(".reveal-text, .fade-in, .slide-in-left, .slide-in-right, .fade-in-up");

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        // Jangan hapus animasi untuk elemen di dalam hero agar teks tetap tampil
        if (!entry.target.closest(".hero")) {
          entry.target.classList.remove("visible");
        }
      }
    });
  }, observerOptions);

  animateElements.forEach((el) => {
    scrollObserver.observe(el);
  });

  // Contact Form submission (prevent default for demo)
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector("button");
      const originalText = btn.innerText;
      btn.innerText = "Mengirim...";
      btn.style.opacity = "0.7";

      // Simulate API call
      setTimeout(() => {
        btn.innerText = "Terkirim!";
        btn.style.backgroundColor = "#28a745";
        btn.style.boxShadow = "0 4px 15px rgba(40, 167, 69, 0.3)";
        btn.style.opacity = "1";
        contactForm.reset();

        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.backgroundColor = "";
          btn.style.boxShadow = "";
        }, 3000);
      }, 1500);
    });
  }
});
