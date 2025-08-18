// Main JavaScript for Medical App
document.addEventListener("DOMContentLoaded", () => {
  // API Base URLs (Update these after deployment)
  const API_URLS = {
    auth: "http://localhost:3001",
    disease: "http://localhost:8501",
    precaution: "http://localhost:5000",
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Service card animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe service cards
  document.querySelectorAll(".service-card").forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })

  // Navigation active state
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll(".nav-link")

    let current = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active")
      }
    })
  })

  // Enhanced dropdown functionality
  const dropdowns = document.querySelectorAll(".dropdown")

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle")
    const menu = dropdown.querySelector(".dropdown-menu")

    if (toggle && menu) {
      toggle.addEventListener("click", (e) => {
        e.preventDefault()
        menu.style.display = menu.style.display === "block" ? "none" : "block"
      })

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
          menu.style.display = "none"
        }
      })
    }
  })

  // Contact form functionality
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm)
  }
})

// API Helper Functions
async function makeAPICall(url, method = "GET", data = null) {
  try {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    }

    if (data) {
      options.body = JSON.stringify(data)
    }

    const response = await fetch(url, options)
    return await response.json()
  } catch (error) {
    console.error("API Call Error:", error)
    throw error
  }
}

// Show loading spinner
function showLoading(element) {
  element.innerHTML =
    '<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>'
}

// Hide loading spinner
function hideLoading(element, originalContent) {
  element.innerHTML = originalContent
}

// Preloader
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader")
  if (preloader) {
    preloader.style.opacity = "0"
    setTimeout(() => {
      preloader.style.display = "none"
    }, 500)
  }
})

// Newsletter subscription
function subscribeNewsletter() {
  const emailInput = document.querySelector('.newsletter-inner input[name="EMAIL"]')
  if (emailInput && emailInput.value) {
    alert("Thank you for subscribing to our newsletter!")
    emailInput.value = ""
  } else {
    alert("Please enter a valid email address.")
  }
}

// Contact form functionality
function handleContactForm(event) {
  event.preventDefault()
  alert("Thank you for your message. We will get back to you soon!")
  event.target.reset()
}
