// Photography Portfolio App JavaScript

// Application data
const portfolioData = {
  portraits: [
    { title: "Family Portrait", category: "portraits", description: "Capturing genuine family moments" },
    { title: "Senior Portrait", category: "portraits", description: "Celebrating milestone achievements" },
    { title: "Couple Portrait", category: "portraits", description: "Love and connection in every frame" },
    { title: "Individual Portrait", category: "portraits", description: "Authentic personal expression" },
    { title: "Group Portrait", category: "portraits", description: "Friendship and unity captured" },
    { title: "Professional Portrait", category: "portraits", description: "Corporate headshots with personality" }
  ],
  landscapes: [
    { title: "Mountain Vista", category: "landscapes", description: "Majestic peaks and valleys" },
    { title: "Ocean Sunset", category: "landscapes", description: "Golden hour by the sea" },
    { title: "Forest Path", category: "landscapes", description: "Tranquil woodland scenes" },
    { title: "Desert Landscape", category: "landscapes", description: "Dramatic desert formations" },
    { title: "City Skyline", category: "landscapes", description: "Urban architecture at dusk" },
    { title: "Rural Countryside", category: "landscapes", description: "Pastoral beauty and serenity" }
  ],
  weddings: [
    { title: "Ceremony Moment", category: "weddings", description: "Sacred vows and promises" },
    { title: "Reception Joy", category: "weddings", description: "Celebration and dancing" },
    { title: "Bride Portrait", category: "weddings", description: "Radiant bridal elegance" },
    { title: "Couple's Dance", category: "weddings", description: "First dance as married couple" },
    { title: "Wedding Details", category: "weddings", description: "Beautiful ceremony decorations" },
    { title: "Family Gathering", category: "weddings", description: "Loved ones coming together" }
  ],
  events: [
    { title: "Corporate Event", category: "events", description: "Professional gatherings and networking" },
    { title: "Birthday Party", category: "events", description: "Milestone celebrations" },
    { title: "Graduation", category: "events", description: "Academic achievements honored" },
    { title: "Anniversary", category: "events", description: "Years of love celebrated" },
    { title: "Baby Shower", category: "events", description: "Welcoming new life" },
    { title: "Holiday Party", category: "events", description: "Festive seasonal gatherings" }
  ]
};

// DOM elements
const elements = {
  navToggle: document.getElementById('navToggle'),
  navMenu: document.getElementById('navMenu'),
  heroIndicators: document.querySelectorAll('.hero__indicator'),
  heroSlides: document.querySelectorAll('.hero__slide'),
  portfolioGrid: document.querySelector('.portfolio__grid'),
  portfolioFilters: document.querySelectorAll('.portfolio__filter'),
  contactForm: document.getElementById('contactForm'),
  lightbox: document.getElementById('lightbox'),
  lightboxOverlay: document.getElementById('lightboxOverlay'),
  lightboxClose: document.getElementById('lightboxClose'),
  lightboxImage: document.getElementById('lightboxImage'),
  lightboxPrev: document.getElementById('lightboxPrev'),
  lightboxNext: document.getElementById('lightboxNext')
};

// Application state
let currentSlide = 0;
let currentPortfolioItems = [];
let currentLightboxIndex = 0;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeHeroSlideshow();
  initializePortfolio();
  initializeContactForm();
  initializeLightbox();
  initializeSmoothScrolling();
});

// Navigation functionality
function initializeNavigation() {
  // Mobile menu toggle
  elements.navToggle.addEventListener('click', function() {
    elements.navMenu.classList.toggle('active');
    elements.navToggle.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  elements.navMenu.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav__link')) {
      elements.navMenu.classList.remove('active');
      elements.navToggle.classList.remove('active');
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav') && elements.navMenu.classList.contains('active')) {
      elements.navMenu.classList.remove('active');
      elements.navToggle.classList.remove('active');
    }
  });
}

// Hero slideshow functionality
function initializeHeroSlideshow() {
  // Auto-advance slides every 5 seconds
  setInterval(nextSlide, 5000);

  // Indicator click handlers
  elements.heroIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function() {
      goToSlide(index);
    });
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % elements.heroSlides.length;
  updateSlideshow();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlideshow();
}

function updateSlideshow() {
  // Update slides
  elements.heroSlides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlide);
  });

  // Update indicators
  elements.heroIndicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentSlide);
  });
}

// Portfolio functionality
function initializePortfolio() {
  generatePortfolioItems();
  initializePortfolioFilters();
}

function generatePortfolioItems() {
  // Combine all portfolio items
  const allItems = [
    ...portfolioData.portraits,
    ...portfolioData.landscapes,
    ...portfolioData.weddings,
    ...portfolioData.events
  ];

  currentPortfolioItems = allItems;
  renderPortfolioItems(allItems);
}

function renderPortfolioItems(items) {
  elements.portfolioGrid.innerHTML = '';
  
  items.forEach((item, index) => {
    const portfolioItem = document.createElement('div');
    portfolioItem.className = 'portfolio__item';
    portfolioItem.dataset.category = item.category;
    portfolioItem.dataset.index = index;
    
    portfolioItem.innerHTML = `
      <div class="portfolio__item-content">
        <h3 class="portfolio__item-title">${item.title}</h3>
        <p class="portfolio__item-category">${item.category}</p>
        <p class="portfolio__item-description">${item.description}</p>
      </div>
    `;
    
    // Add click handler for lightbox
    portfolioItem.addEventListener('click', function() {
      openLightbox(index);
    });
    
    elements.portfolioGrid.appendChild(portfolioItem);
  });
}

function initializePortfolioFilters() {
  elements.portfolioFilters.forEach(filter => {
    filter.addEventListener('click', function() {
      const category = this.dataset.filter;
      
      // Update active filter
      elements.portfolioFilters.forEach(f => f.classList.remove('active'));
      this.classList.add('active');
      
      // Filter items
      filterPortfolioItems(category);
    });
  });
}

function filterPortfolioItems(category) {
  let filteredItems;
  
  if (category === 'all') {
    filteredItems = [
      ...portfolioData.portraits,
      ...portfolioData.landscapes,
      ...portfolioData.weddings,
      ...portfolioData.events
    ];
  } else {
    filteredItems = portfolioData[category] || [];
  }
  
  currentPortfolioItems = filteredItems;
  renderPortfolioItems(filteredItems);
}

// Lightbox functionality
function initializeLightbox() {
  // Close lightbox handlers
  elements.lightboxClose.addEventListener('click', closeLightbox);
  elements.lightboxOverlay.addEventListener('click', closeLightbox);
  
  // Navigation handlers
  elements.lightboxPrev.addEventListener('click', function() {
    navigateLightbox(-1);
  });
  
  elements.lightboxNext.addEventListener('click', function() {
    navigateLightbox(1);
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (elements.lightbox.classList.contains('active')) {
      switch(e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigateLightbox(-1);
          break;
        case 'ArrowRight':
          navigateLightbox(1);
          break;
      }
    }
  });
}

function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightboxContent();
  elements.lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  elements.lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  currentLightboxIndex = (currentLightboxIndex + direction + currentPortfolioItems.length) % currentPortfolioItems.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const item = currentPortfolioItems[currentLightboxIndex];
  if (item) {
    elements.lightboxImage.innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <h3 style="margin-bottom: 1rem; font-size: 1.5rem;">${item.title}</h3>
        <p style="margin-bottom: 0.5rem; text-transform: uppercase; font-weight: 500; opacity: 0.8;">${item.category}</p>
        <p style="margin: 0; opacity: 0.9;">${item.description}</p>
      </div>
    `;
  }
}

// Contact form functionality
function initializeContactForm() {
  elements.contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
      handleFormSubmission();
    }
  });
}

function validateForm() {
  const formData = new FormData(elements.contactForm);
  const name = formData.get('name').trim();
  const email = formData.get('email').trim();
  const message = formData.get('message').trim();
  
  // Clear previous error states
  clearFormErrors();
  
  let isValid = true;
  
  // Validate name
  if (!name) {
    showFieldError('name', 'Name is required');
    isValid = false;
  }
  
  // Validate email
  if (!email) {
    showFieldError('email', 'Email is required');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showFieldError('email', 'Please enter a valid email address');
    isValid = false;
  }
  
  // Validate message
  if (!message) {
    showFieldError('message', 'Message is required');
    isValid = false;
  }
  
  return isValid;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFieldError(fieldName, message) {
  const field = document.getElementById(fieldName);
  const formGroup = field.closest('.form-group');
  
  // Add error class
  field.classList.add('error');
  field.style.borderColor = 'var(--color-error)';
  
  // Create error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error';
  errorDiv.textContent = message;
  errorDiv.style.color = 'var(--color-error)';
  errorDiv.style.fontSize = '0.875rem';
  errorDiv.style.marginTop = '0.25rem';
  
  formGroup.appendChild(errorDiv);
}

function clearFormErrors() {
  // Remove error classes and reset border colors
  elements.contactForm.querySelectorAll('.error').forEach(field => {
    field.classList.remove('error');
    field.style.borderColor = '';
  });
  
  // Remove error messages
  elements.contactForm.querySelectorAll('.field-error').forEach(error => {
    error.remove();
  });
  
  // Remove any existing success messages
  elements.contactForm.querySelectorAll('.success-message').forEach(success => {
    success.remove();
  });
}

function handleFormSubmission() {
  const formData = new FormData(elements.contactForm);
  const submitButton = elements.contactForm.querySelector('button[type="submit"]');
  
  // Show loading state
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;
  submitButton.style.opacity = '0.7';
  
  // Simulate form submission delay
  setTimeout(() => {
    // Reset button state
    submitButton.textContent = originalText;
    submitButton.disabled = false;
    submitButton.style.opacity = '1';
    
    // Show success message
    showSuccessMessage();
    
    // Reset form
    elements.contactForm.reset();
    
    // Scroll to success message
    const successMessage = elements.contactForm.querySelector('.success-message');
    if (successMessage) {
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 1500);
}

function showSuccessMessage() {
  // Clear any existing messages first
  clearFormErrors();
  
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.innerHTML = `
    <div style="
      background: rgba(168, 196, 168, 0.1);
      border: 2px solid var(--color-primary);
      color: var(--color-text);
      padding: 1.5rem;
      border-radius: 12px;
      margin-bottom: 1.5rem;
      text-align: center;
      animation: slideIn 0.5s ease-out;
    ">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">✓</div>
      <strong style="color: var(--color-primary); font-size: 1.125rem;">Message Sent Successfully!</strong><br>
      <span style="color: var(--color-text-secondary); margin-top: 0.5rem; display: block;">
        Thank you for your inquiry. I'll get back to you within 24 hours.
      </span>
    </div>
  `;
  
  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
  
  // Insert success message at the top of the form
  elements.contactForm.insertBefore(successDiv, elements.contactForm.firstChild);
  
  // Remove success message after 8 seconds
  setTimeout(() => {
    if (successDiv.parentNode) {
      successDiv.style.animation = 'slideOut 0.5s ease-out';
      setTimeout(() => {
        successDiv.remove();
        style.remove();
      }, 500);
    }
  }, 8000);
  
  // Add slideOut animation
  setTimeout(() => {
    style.textContent += `
      @keyframes slideOut {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(-20px);
        }
      }
    `;
  }, 100);
}

// Smooth scrolling functionality
function initializeSmoothScrolling() {
  // Add smooth scrolling to all nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed header
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Scroll animations and header behavior
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  const scrolled = window.pageYOffset;
  
  // Add/remove header shadow based on scroll position
  if (scrolled > 50) {
    header.style.boxShadow = '0 2px 20px rgba(90, 107, 90, 0.15)';
  } else {
    header.style.boxShadow = '0 2px 20px rgba(90, 107, 90, 0.1)';
  }
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
  // Add initial animation states
  const animatedElements = document.querySelectorAll('.portfolio__item, .service-card, .testimonial-card');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
});

// Lazy loading simulation for portfolio items
function lazyLoadPortfolioItems() {
  const items = document.querySelectorAll('.portfolio__item');
  
  items.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
  // Add any scroll-based functionality here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Error handling for missing elements
function checkRequiredElements() {
  const requiredElements = [
    'navToggle', 'navMenu', 'portfolioGrid', 'contactForm', 'lightbox'
  ];
  
  const missingElements = requiredElements.filter(id => !document.getElementById(id));
  
  if (missingElements.length > 0) {
    console.warn('Missing required elements:', missingElements);
  }
}

// Initialize error checking
document.addEventListener('DOMContentLoaded', checkRequiredElements);

// Export functions for potential testing
window.PhotographyPortfolio = {
  goToSlide,
  filterPortfolioItems,
  openLightbox,
  closeLightbox,
  validateForm
};