// Initialize particles.js
particlesJS("particles-js", {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#0fd850",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
    },
    opacity: {
      value: 0.3,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.3,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#43cea2",
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 0.5,
        },
      },
      push: {
        particles_nb: 4,
      },
    },
  },
  retina_detect: true,
});

// Mobile Navigation Toggle
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  const icon = navToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    navToggle.querySelector("i").classList.add("fa-bars");
    navToggle.querySelector("i").classList.remove("fa-times");
  });
});

// Header scroll effect
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Tab functionality
function openTab(tabName) {
  // Hide all tab contents
  document.querySelectorAll(".tab-contents").forEach((tab) => {
    tab.classList.remove("active-tab");
  });

  // Remove active class from all tab links
  document.querySelectorAll(".tab-links").forEach((link) => {
    link.classList.remove("active-link");
  });

  // Show current tab content
  document.getElementById(tabName).classList.add("active-tab");

  // Add active class to current tab link
  event.currentTarget.classList.add("active-link");
}

// Animate skill bars when they come into view
function animateSkills() {
  const skills = document.querySelectorAll(".skill-fill");

  skills.forEach((skill) => {
    const skillPosition = skill.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (skillPosition < screenPosition) {
      const width = skill.getAttribute("data-width");
      skill.style.width = width + "%";
    }
  });
}

window.addEventListener("scroll", animateSkills);
window.addEventListener("load", animateSkills);

// Portfolio filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));

    // Add active class to clicked button
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    portfolioItems.forEach((item) => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Set active navigation link based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Form submission to Google Sheets
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const btnText = document.getElementById("btnText");
const spinner = document.getElementById("spinner");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Show loading state
  btnText.textContent = "Sending...";
  spinner.style.display = "block";
  submitBtn.disabled = true;

  // Create hidden iframe for form submission
  const iframe = document.createElement("iframe");
  iframe.name = "hiddenFrame";
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  // Set form target to the iframe
  contactForm.target = "hiddenFrame";

  // Submit the form
  contactForm.submit();

  // Handle form submission result
  iframe.onload = function () {
    // Remove iframe
    document.body.removeChild(iframe);

    // Show success message
    formMessage.textContent = "Thank you! Your message has been sent.";
    formMessage.classList.remove("error");
    formMessage.classList.add("success");
    formMessage.style.display = "block";

    // Reset form
    contactForm.reset();

    // Reset button state
    btnText.textContent = "Send Message";
    spinner.style.display = "none";
    submitBtn.disabled = false;

    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = "none";
    }, 5000);
  };
});
