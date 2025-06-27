// Ocean Scripts - Fish Love Website

// Global Ocean Variables
const oceanHeaderPlaceholder = document.getElementById(
  "ocean-header-placeholder"
);
const oceanFooterPlaceholder = document.getElementById(
  "ocean-footer-placeholder"
);

// Initialize Ocean Components
function initializeOceanComponents() {
  loadOceanHeader();
  loadOceanFooter();
  setupCurrentYear();
  loadPageSpecificContent();
}

// Load Ocean Header
async function loadOceanHeader() {
  try {
    const headerResponse = await fetch("header.html");
    const headerContent = await headerResponse.text();
    oceanHeaderPlaceholder.innerHTML = headerContent;
  } catch (oceanError) {
    console.error("Failed to load ocean header:", oceanError);
  }
}

// Load Ocean Footer
async function loadOceanFooter() {
  try {
    const footerResponse = await fetch("footer.html");
    const footerContent = await footerResponse.text();
    oceanFooterPlaceholder.innerHTML = footerContent;
  } catch (oceanError) {
    console.error("Failed to load ocean footer:", oceanError);
  }
}

// Setup Current Year
function setupCurrentYear() {
  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
}

// Load Page Specific Content
function loadPageSpecificContent() {
  const path = window.location.pathname;
  const currentPage =
    path === "/" || path === "" || path.endsWith("/")
      ? "./"
      : path.split("/").pop();

  switch (currentPage) {
    case "./":
      loadSwimmingInstructions();
      loadPlayerTestimonials();
      break;
    case "index.html":
      loadSwimmingInstructions();
      loadPlayerTestimonials();
      break;
    case "evo-log.html":
      loadGameUpdates();
      loadSeaStories();
      break;
    case "reef-contacts.html":
      loadContactDetails();
      setupContactForm();
      break;
  }
}

// Load Swimming Instructions
async function loadSwimmingInstructions() {
  try {
    const instructionsResponse = await fetch("data/swimming-instructions.json");
    const swimmingInstructions = await instructionsResponse.json();

    const instructionsContainer = document.getElementById(
      "swimming-instructions"
    );
    if (instructionsContainer) {
      instructionsContainer.innerHTML = swimmingInstructions.instructions
        .map(
          (instruction) => `
                    <div class="instruction-card">
                        <h3>${instruction.title}</h3>
                        <p>${instruction.description}</p>
                    </div>
                `
        )
        .join("");
    }
  } catch (oceanError) {
    console.error("Failed to load swimming instructions:", oceanError);
    showLoadingError("swimming-instructions");
  }
}

// Load Player Testimonials
async function loadPlayerTestimonials() {
  try {
    const testimonialsResponse = await fetch("data/player-testimonials.json");
    const oceanTestimonials = await testimonialsResponse.json();

    const testimonialsContainer = document.getElementById(
      "player-testimonials"
    );
    if (testimonialsContainer) {
      testimonialsContainer.innerHTML = oceanTestimonials.testimonials
        .map(
          (testimonial) => `
                    <div class="testimonial-card">
                        <h3>${testimonial.name}</h3>
                        <p>"${testimonial.text}"</p>
                    </div>
                `
        )
        .join("");
    }
  } catch (oceanError) {
    console.error("Failed to load player testimonials:", oceanError);
    showLoadingError("player-testimonials");
  }
}

// Load Game Updates
async function loadGameUpdates() {
  try {
    const updatesResponse = await fetch("data/game-updates.json");
    const oceanUpdates = await updatesResponse.json();

    const updatesContainer = document.getElementById("game-updates");
    if (updatesContainer) {
      updatesContainer.innerHTML = oceanUpdates.updates
        .map(
          (update, idx) => `
          <div class="current-modern-card">
            <div class="current-img-wrap">
              <img src="img/deep-${
                idx + 1
              }.jpg" alt="Update image" class="current-img" loading="lazy" />
            </div>
            <div class="current-content">
              <div class="current-date">${update.date}</div>
              <h3 class="current-title">${update.title}</h3>
              <p class="current-text">${update.content}</p>
            </div>
          </div>
        `
        )
        .join("");
    }
  } catch (oceanError) {
    console.error("Failed to load game updates:", oceanError);
    showLoadingError("game-updates");
  }
}

// Load Sea Stories (modern diary style)
async function loadSeaStories() {
  try {
    const storiesResponse = await fetch("data/sea-stories.json");
    const oceanStories = await storiesResponse.json();

    const storiesContainer = document.getElementById("sea-stories");
    if (storiesContainer) {
      storiesContainer.innerHTML = oceanStories.stories
        .map(
          (story) => `
            <div class="diary-modern-card">
              <div class="diary-date">${story.date}</div>
              <h3 class="diary-title">${story.title}</h3>
              <p class="diary-text">${story.content}</p>
            </div>
          `
        )
        .join("");
    }
  } catch (oceanError) {
    console.error("Failed to load sea stories:", oceanError);
    showLoadingError("sea-stories");
  }
}

// Load Contact Details
async function loadContactDetails() {
  try {
    const contactResponse = await fetch("data/contact-details.json");
    const reefContactDetails = await contactResponse.json();

    const contactContainer = document.getElementById("contact-details");
    if (contactContainer) {
      contactContainer.innerHTML = reefContactDetails.contacts
        .map(
          (contact) => `
                    <div class="info-card">
                        <div class="info-icon">${contact.icon}</div>
                        <div class="info-content">
                            <h4>${contact.title}</h4>
                            ${
                              contact.link
                                ? `<a href="${contact.link}">${contact.value}</a>`
                                : `<p>${contact.value}</p>`
                            }
                        </div>
                    </div>
                `
        )
        .join("");
    }
  } catch (oceanError) {
    console.error("Failed to load contact details:", oceanError);
    showLoadingError("contact-details");
  }
}

// Setup Contact Form
function setupContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmission);
  }
}

// Handle Contact Submission
function handleContactSubmission(oceanEvent) {
  oceanEvent.preventDefault();

  const formData = new FormData(oceanEvent.target);
  const swimmerName = formData.get("name");
  const swimmerPhone = formData.get("phone");
  const swimmerMessage = formData.get("message");

  // Simulate form submission
  showSubmissionMessage(
    "Thank you for your message! We will swim back to you soon."
  );

  // Reset form
  oceanEvent.target.reset();
}

// Show Submission Message
function showSubmissionMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.className = "submission-message ocean-style-message";
  messageElement.textContent = message;
  messageElement.style.cssText = `
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: var(--ocean-surface);
    color: var(--abyss-primary);
    padding: 18px 36px;
    border-radius: 0 0 var(--abyss-radius) var(--abyss-radius);
    box-shadow: 0 8px 32px rgba(26,58,95,0.13);
    z-index: 2000;
    font-family: var(--swimming-font);
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    border-bottom: 3px solid var(--ocean-accent);
    animation: swim-slide-down 0.4s cubic-bezier(0.4,0,0.2,1);
  `;

  document.body.appendChild(messageElement);

  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: "smooth" });

  setTimeout(() => {
    messageElement.style.animation =
      "swim-slide-up 0.4s cubic-bezier(0.4,0,0.2,1)";
    setTimeout(() => {
      document.body.removeChild(messageElement);
    }, 400);
  }, 3000);
}

// Show Loading Error
function showLoadingError(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = `
            <div class="loading-error">
                <p>Sorry, we couldn't load the content. Please try refreshing the page.</p>
            </div>
        `;
  }
}

// Add CSS Animations
const oceanStyles = document.createElement("style");
oceanStyles.textContent = `
    @keyframes swim-slide-down {
        from { transform: translateY(-100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes swim-slide-up {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(-100%); opacity: 0; }
    }
    
    @keyframes swim-slide-in {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes swim-slide-out {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .loading-error {
        text-align: center;
        padding: 40px;
        color: var(--coral-secondary);
        font-style: italic;
    }
    
    .submission-message {
        font-family: var(--swimming-font);
    }
`;

document.head.appendChild(oceanStyles);

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
  const navigationLinks = document.querySelectorAll('a[href^="#"]');

  navigationLinks.forEach((link) => {
    link.addEventListener("click", function (oceanEvent) {
      oceanEvent.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Add Hover Effects to Cards
function setupCardHoverEffects() {
  const oceanCards = document.querySelectorAll(
    ".feature-card, .testimonial-card, .upgrade-card, .current-card, .diary-card"
  );

  oceanCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
}

// Initialize Everything When DOM is Loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeOceanComponents();
  setupSmoothScrolling();
  setupCardHoverEffects();

  // Add bubble effect to buttons
  const coralButtons = document.querySelectorAll(".coral-button");
  coralButtons.forEach((button) => {
    button.addEventListener("click", function () {
      createBubbleEffect(this);
    });
  });

  showCookieBar();

  createScrollToTopButton();
});

// Create Bubble Effect
function createBubbleEffect(element) {
  const bubble = document.createElement("div");
  bubble.className = "click-bubble";
  bubble.style.cssText = `
        position: absolute;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        animation: bubble-pop 0.6s ease-out forwards;
    `;

  const rect = element.getBoundingClientRect();
  bubble.style.left = rect.left + rect.width / 2 + "px";
  bubble.style.top = rect.top + rect.height / 2 + "px";

  document.body.appendChild(bubble);

  setTimeout(() => {
    document.body.removeChild(bubble);
  }, 600);
}

// Add bubble pop animation
const bubbleAnimation = document.createElement("style");
bubbleAnimation.textContent = `
    @keyframes bubble-pop {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(1.5);
            opacity: 0.7;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;

document.head.appendChild(bubbleAnimation);

// Cookie Bar
function showCookieBar() {
  if (localStorage.getItem("cookieAccepted") === "true") return;
  const path = window.location.pathname;
  const isHome =
    path === "/" ||
    path === "" ||
    path.endsWith("/") ||
    path.endsWith("index.html");
  if (!isHome) return;

  const bar = document.createElement("div");
  bar.className = "cookie-bar";
  bar.innerHTML = `
    <div class="cookie-bar-content">
      <span>
        We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies. 
        <a href="./fish-cookies.html" class="cookie-link" target="_blank">Learn more</a>.
      </span>
      <button class="coral-button primary-swim cookie-accept">Accept</button>
    </div>
  `;
  document.body.appendChild(bar);
  setTimeout(() => {
    bar.classList.add("visible");
  }, 50);
  bar.querySelector(".cookie-accept").onclick = function () {
    localStorage.setItem("cookieAccepted", "true");
    bar.classList.remove("visible");
    setTimeout(() => bar.remove(), 400);
  };
}

// Scroll to Top Button
function createScrollToTopButton() {
  const btn = document.createElement("button");
  btn.className = "scroll-to-top";
  btn.title = "Back to top";
  btn.innerHTML = '<span class="scroll-arrow">&#8679;</span>';
  document.body.appendChild(btn);
  btn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });
}
