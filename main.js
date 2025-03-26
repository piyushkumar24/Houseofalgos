// Initialize GSAP animations
function initAnimations() {
  gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: 'top center+=200',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Animate feature cards
  gsap.from(".feature-card", {
    duration: 1,
    scale: 0.8,
    opacity: 0,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".features",
      start: "top center"
    }
  });
  
  // Animate step cards with staggered entrance
  gsap.from(".step-card", {
    duration: 1.2,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".platform",
      start: "top center+=100",
      toggleActions: "play none none reverse"
    }
  });
  
  // Animate step numbers with bounce effect
  gsap.from(".step-number", {
    duration: 1.5,
    scale: 0,
    rotation: -180,
    ease: "elastic.out(1, 0.3)",
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".platform",
      start: "top center+=100",
      toggleActions: "play none none reverse"
    }
  });
  
  // Animate the connecting line
  gsap.from(".steps-container::before", {
    duration: 1.5,
    scaleX: 0,
    transformOrigin: "left center",
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: ".platform",
      start: "top center+=100",
      toggleActions: "play none none reverse"
    }
  });
}

function setupParticles() {
  const container = document.getElementById("particles");
  if (!container) return;
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = `${posX}%`;
    particle.style.bottom = `${posY}%`;

    // Random size
    const size = Math.random() * 6 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random animation duration and delay
    const duration = Math.random() * 10 + 5;
    const delay = Math.random() * 5;
    particle.style.animation = `particle-float ${duration}s ${delay}s infinite linear`;

    // Random opacity
    particle.style.opacity = Math.random() * 0.5 + 0.2;

    // Random color variations (gold to blue)
    const hue = Math.random() > 0.7 ? "210" : "45";
    const saturation = Math.floor(Math.random() * 30 + 70);
    const lightness = Math.floor(Math.random() * 20 + 60);
    particle.style.background = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`;

    container.appendChild(particle);
  }
}

function setupForexTicker() {
  const tickerElement = document.getElementById("forexTicker");
  if (!tickerElement) return;

  // Clear existing content
  tickerElement.innerHTML = "";

  // Currency pair data with symbols and flags
  const currencyPairs = [
    {
      name: "EUR/USD",
      value: "1.1234",
      change: "+0.0023",
      trend: "up",
      base: { symbol: "€", code: "EUR", flag: "https://flagcdn.com/w40/eu.png" },
      quote: { symbol: "$", code: "USD", flag: "https://flagcdn.com/w40/us.png" },
    },
    {
      name: "GBP/USD",
      value: "1.2345",
      change: "-0.0018",
      trend: "down",
      base: { symbol: "£", code: "GBP", flag: "https://flagcdn.com/w40/gb.png" },
      quote: { symbol: "$", code: "USD", flag: "https://flagcdn.com/w40/us.png" },
    },
    {
      name: "USD/JPY",
      value: "110.12",
      change: "+0.25",
      trend: "up",
      base: { symbol: "$", code: "USD", flag: "https://flagcdn.com/w40/us.png" },
      quote: { symbol: "¥", code: "JPY", flag: "https://flagcdn.com/w40/jp.png" },
    },
    {
      name: "AUD/USD",
      value: "0.7890",
      change: "-0.0032",
      trend: "down",
      base: { symbol: "A$", code: "AUD", flag: "https://flagcdn.com/w40/au.png" },
      quote: { symbol: "$", code: "USD", flag: "https://flagcdn.com/w40/us.png" },
    },
    {
      name: "USD/CAD",
      value: "1.2765",
      change: "+0.0043",
      trend: "up",
      base: { symbol: "$", code: "USD", flag: "https://flagcdn.com/w40/us.png" },
      quote: { symbol: "C$", code: "CAD", flag: "https://flagcdn.com/w40/ca.png" },
    },
    {
      name: "NZD/USD",
      value: "0.7123",
      change: "-0.0021",
      trend: "down",
      base: { symbol: "NZ$", code: "NZD", flag: "https://flagcdn.com/w40/nz.png" },
      quote: { symbol: "$", code: "USD", flag: "https://flagcdn.com/w40/us.png" },
    },
    {
      name: "EUR/GBP",
      value: "0.8567",
      change: "+0.0012",
      trend: "up",
      base: { symbol: "€", code: "EUR", flag: "https://flagcdn.com/w40/eu.png" },
      quote: { symbol: "£", code: "GBP", flag: "https://flagcdn.com/w40/gb.png" },
    },
    {
      name: "EUR/JPY",
      value: "129.87",
      change: "-0.32",
      trend: "down",
      base: { symbol: "€", code: "EUR", flag: "https://flagcdn.com/w40/eu.png" },
      quote: { symbol: "¥", code: "JPY", flag: "https://flagcdn.com/w40/jp.png" },
    },
    {
      name: "GBP/JPY",
      value: "151.65",
      change: "+0.45",
      trend: "up",
      base: { symbol: "£", code: "GBP", flag: "https://flagcdn.com/w40/gb.png" },
      quote: { symbol: "¥", code: "JPY", flag: "https://flagcdn.com/w40/jp.png" },
    },
    {
      name: "AUD/JPY",
      value: "86.92",
      change: "-0.18",
      trend: "down",
      base: { symbol: "A$", code: "AUD", flag: "https://flagcdn.com/w40/au.png" },
      quote: { symbol: "¥", code: "JPY", flag: "https://flagcdn.com/w40/jp.png" },
    },
    {
      name: "CHF/JPY",
      value: "118.45",
      change: "+0.27",
      trend: "up",
      base: { symbol: "Fr", code: "CHF", flag: "https://flagcdn.com/w40/ch.png" },
      quote: { symbol: "¥", code: "JPY", flag: "https://flagcdn.com/w40/jp.png" },
    },
    {
      name: "EUR/CHF",
      value: "1.0943",
      change: "-0.0015",
      trend: "down",
      base: { symbol: "€", code: "EUR", flag: "https://flagcdn.com/w40/eu.png" },
      quote: { symbol: "Fr", code: "CHF", flag: "https://flagcdn.com/w40/ch.png" },
    },
  ];

  // Create ticker items
  currencyPairs.forEach((pair) => {
    const pairElement = document.createElement("div");
    pairElement.className = "currency-pair";
    const flagsContainer = document.createElement("div");
    flagsContainer.className = "currency-flags";
    const baseFlag = document.createElement("div");
    baseFlag.className = "currency-flag";
    baseFlag.style.backgroundImage = `url(${pair.base.flag})`;
    const quoteFlag = document.createElement("div");
    quoteFlag.className = "currency-flag";
    quoteFlag.style.backgroundImage = `url(${pair.quote.flag})`;
    flagsContainer.appendChild(baseFlag);
    flagsContainer.appendChild(quoteFlag);
    const infoContainer = document.createElement("div");
    infoContainer.className = "currency-info";
    const nameElement = document.createElement("div");
    nameElement.className = "currency-name";
    nameElement.textContent = pair.name;
    const valueContainer = document.createElement("div");
    valueContainer.className = `currency-value ${pair.trend}`;
    const valueText = document.createElement("span");
    valueText.textContent = pair.value;
    const trendIcon = document.createElement("i");
    trendIcon.className = pair.trend === "up" ? "fas fa-caret-up" : "fas fa-caret-down";
    const changeElement = document.createElement("span");
    changeElement.className = "currency-change";
    changeElement.textContent = pair.change;
    valueContainer.appendChild(valueText);
    valueContainer.appendChild(trendIcon);
    valueContainer.appendChild(changeElement);
    infoContainer.appendChild(nameElement);
    infoContainer.appendChild(valueContainer);
    pairElement.appendChild(flagsContainer);
    pairElement.appendChild(infoContainer);
    tickerElement.appendChild(pairElement);
  });

  // Clone all items to ensure continuous scrolling
  const originalItems = Array.from(tickerElement.children);
  originalItems.forEach((item) => {
    const clone = item.cloneNode(true);
    tickerElement.appendChild(clone);
  });

  // Force a reflow to ensure the animation starts properly
  void tickerElement.offsetWidth;

  // Start updating currency values immediately
  updateCurrencyValues();
}

async function updateCurrencyValues() {
  let retryCount = 0;
  const maxRetries = 3;
  const fetchForexData = async () => {
    try {
      const response = await fetch('https://api.exchangerate.host/latest?access_key=620ee230bc7f499487568fe384a8568d&base=USD');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const rates = await response.json();
    
      const pairs = document.querySelectorAll(".currency-pair");

      pairs.forEach((pair) => {
        const pairName = pair.querySelector(".currency-name")?.textContent;
        if (!pairName) return;
        
        const [baseCurr, quoteCurr] = pairName.split('/');
        const rate = rates.rates[quoteCurr] / rates.rates[baseCurr];
        const fluctuation = (Math.random() - 0.5) * 0.1; // Increased fluctuation
        const currentValue = Number(rate + fluctuation).toFixed(4);
        
        const valueElement = pair.querySelector(".currency-value span:first-child");
        const valueContainer = pair.querySelector(".currency-value");
        const trendIcon = pair.querySelector(".currency-value i");
        const changeElement = pair.querySelector(".currency-change");
        
        if (valueElement && valueContainer && trendIcon && changeElement) {
          valueElement.textContent = currentValue;
          const isUp = fluctuation >= 0;
          valueContainer.className = `currency-value ${isUp ? 'up' : 'down'}`;
          trendIcon.className = isUp ? 'fas fa-caret-up' : 'fas fa-caret-down';
          changeElement.textContent = `${isUp ? '+' : '-'}${Math.abs(fluctuation).toFixed(4)}`;
        }
      });
    } catch (error) {
      console.error('Failed to fetch forex data:', error);
      if (retryCount < maxRetries) {
        retryCount++;
        console.log(`Retrying... (${retryCount})`);
        await new Promise(res => setTimeout(res, 2000));
        return fetchForexData();
      }
    }
  };
  
  await fetchForexData();
}

// Update forex data every 5 seconds
setInterval(updateCurrencyValues, 5000);

/* ------------------------------
   Video Background Handling
   ------------------------------ */
function setupVideoBackground() {
  const video = document.getElementById("heroVideo");
  if (!video) return;
  video.addEventListener("error", () => console.log("Video error occurred"));
  video.muted = true;
  video.play().catch((error) => console.log("Video autoplay failed:", error));
}

/* ------------------------------
   Mobile Menu Toggle
   ------------------------------ */
function setupMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (!menuToggle || !navLinks) return;
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !isExpanded);
    navLinks.classList.toggle("active");
  });
}

/* ------------------------------
   Smooth Scroll for Anchor Links
   ------------------------------ */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      const navLinks = document.querySelector(".nav-links");
      const menuToggle = document.querySelector(".menu-toggle");
      if (navLinks && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

/* ------------------------------
   Sticky Navigation
   ------------------------------ */
function setupStickyNav() {
  const nav = document.querySelector(".sticky-nav");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  });
}

/* ------------------------------
   Scroll-to-Top Button
   ------------------------------ */
function setupScrollToTop() {
  const scrollTopBtn = document.querySelector(".scroll-top");
  if (!scrollTopBtn) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) scrollTopBtn.classList.add("visible");
    else scrollTopBtn.classList.remove("visible");
  });
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ------------------------------
   Counters Animation
   ------------------------------ */
function animateCounters() {
  const counters = document.querySelectorAll(".counter-value");
  const speed = 200;
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const increment = target / speed;
    function updateCount() {
      const count = +counter.innerText;
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    }
    updateCount();
  });
}

/* ------------------------------
   Enhanced Contact Form with Validation
   ------------------------------ */
function setupContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;
  
  // Form elements
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const formMessage = contactForm.querySelector('.form-message');
  const loadingSpinner = contactForm.querySelector('.loading-spinner');
  const successCheckmark = contactForm.querySelector('.success-checkmark');
  
  // Add floating animation to form on scroll
  if (typeof gsap !== 'undefined') {
    gsap.from(contactForm, {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: contactForm,
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
      }
    });
  }
  
  // Validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Show error for a specific input
  function showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.textContent = message;
    }
  }
  
  // Show success for a specific input
  function showSuccess(input) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
  }
  
  // Validate a single input field
  function validateInput(input, validationFn, errorMessage) {
    if (!validationFn(input.value.trim())) {
      showError(input, errorMessage);
      return false;
    } else {
      showSuccess(input);
      return true;
    }
  }
  
  // Add input event listeners for real-time validation
  nameInput.addEventListener('input', () => {
    validateInput(nameInput, value => value.length >= 2, 'Name must be at least 2 characters');
  });
  
  emailInput.addEventListener('input', () => {
    validateInput(emailInput, isValidEmail, 'Please enter a valid email address');
  });
  
  subjectInput.addEventListener('input', () => {
    validateInput(subjectInput, value => value.length >= 3, 'Subject must be at least 3 characters');
  });
  
  messageInput.addEventListener('input', () => {
    validateInput(messageInput, value => value.length >= 10, 'Message must be at least 10 characters');
  });
  
  // Add focus/blur effects for form fields
  const formInputs = contactForm.querySelectorAll('input, textarea');
  formInputs.forEach(input => {
    // Add focus effect
    input.addEventListener('focus', () => {
      const formGroup = input.closest('.form-group');
      formGroup.style.transform = 'translateY(-5px)';
      formGroup.style.transition = 'transform 0.3s ease';
    });
    
    // Remove focus effect
    input.addEventListener('blur', () => {
      const formGroup = input.closest('.form-group');
      formGroup.style.transform = 'translateY(0)';
    });
  });
  
  // Form submission handler
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateInput(nameInput, value => value.length >= 2, 'Name must be at least 2 characters');
    const isEmailValid = validateInput(emailInput, isValidEmail, 'Please enter a valid email address');
    const isSubjectValid = validateInput(subjectInput, value => value.length >= 3, 'Subject must be at least 3 characters');
    const isMessageValid = validateInput(messageInput, value => value.length >= 10, 'Message must be at least 10 characters');
    
    // If all fields are valid, submit the form
    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      // Show loading state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      loadingSpinner.style.display = 'inline-block';
      submitBtn.querySelector('i').style.display = 'none';
      
      // Simulate form submission (replace with actual AJAX call in production)
      setTimeout(() => {
        // Hide loading spinner, show success checkmark
        loadingSpinner.style.display = 'none';
        successCheckmark.style.display = 'inline-block';
        
        // Show success message
        formMessage.textContent = 'Your message has been sent successfully!';
        formMessage.classList.add('visible', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Reset form validation styles
        document.querySelectorAll('.form-group').forEach(group => {
          group.classList.remove('success', 'error');
        });
        
        // Reset button after delay
        setTimeout(() => {
          successCheckmark.style.display = 'none';
          submitBtn.querySelector('i').style.display = 'inline-block';
          submitBtn.disabled = false;
          formMessage.classList.remove('visible');
          
          // Add a thank you animation
          if (typeof gsap !== 'undefined') {
            gsap.to(contactForm, {
              scale: 1.03,
              duration: 0.3,
              ease: "back.out(1.7)",
              onComplete: () => {
                gsap.to(contactForm, {
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }
            });
          }
        }, 3000);
      }, 1500);
    } else {
      // Show error message if validation fails
      formMessage.textContent = 'Please fix the errors in the form.';
      formMessage.classList.add('visible', 'error');
      
      // Shake the form to indicate error
      if (typeof gsap !== 'undefined') {
        gsap.to(contactForm, {
          x: 10,
          duration: 0.1,
          repeat: 5,
          yoyo: true,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(contactForm, { x: 0 });
          }
        });
      }
      
      // Hide error message after delay
      setTimeout(() => {
        formMessage.classList.remove('visible');
      }, 3000);
    }
  });
  
  // Add hover effect to contact info items
  const contactDetails = document.querySelectorAll('.contact-detail');
  contactDetails.forEach(detail => {
    detail.addEventListener('mouseenter', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(detail, {
          x: 10,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
    
    detail.addEventListener('mouseleave', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(detail, {
          x: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  });
}

/* ------------------------------
   Initialize functions after DOMContentLoaded
   ------------------------------ */
window.addEventListener("DOMContentLoaded", () => {
  setupVideoBackground();
  setupMobileMenu();
  setupSmoothScroll();
  setupStickyNav();
  setupScrollToTop();
  setupContactForm();
  setupForexTicker();
  setupParticles();
  setupStepCards();
  // Initialize GSAP animations if ScrollTrigger is available
  if (typeof gsap !== 'undefined' && gsap.ScrollTrigger) {
    initAnimations();
  }
  // Commented out since setupDigitalRain is not defined:
  // setupDigitalRain();
});

/* ------------------------------
   Setup Step Cards Interactivity
   ------------------------------ */
function setupStepCards() {
  const stepCards = document.querySelectorAll('.step-card');
  if (!stepCards.length) return;
  
  // Add interactive hover effects
  stepCards.forEach((card, index) => {
    // Add sequential hover effect
    card.addEventListener('mouseenter', () => {
      // Highlight the current card
      card.classList.add('active');
      
      // Highlight all previous steps to show progress
      for (let i = 0; i < index; i++) {
        stepCards[i].classList.add('completed');
      }
      
      // Add pulsing effect to the step number
      const stepNumber = card.querySelector('.step-number');
      if (stepNumber) {
        stepNumber.classList.add('pulse');
      }
    });
    
    card.addEventListener('mouseleave', () => {
      // Remove all special classes
      stepCards.forEach(c => {
        c.classList.remove('active', 'completed');
        const num = c.querySelector('.step-number');
        if (num) num.classList.remove('pulse');
      });
    });
    
    // Add click effect for mobile users
    card.addEventListener('click', () => {
      card.classList.toggle('clicked');
      setTimeout(() => {
        card.classList.remove('clicked');
      }, 1000);
    });
  });
  
  // Create a sequential highlight effect on page load
  setTimeout(() => {
    const highlightSequence = () => {
      stepCards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add('highlight');
          setTimeout(() => {
            card.classList.remove('highlight');
          }, 800);
        }, i * 600);
      });
    };
    
    // Run the highlight sequence once on load
    highlightSequence();
    
    // Then run it periodically
    setInterval(highlightSequence, 10000);
  }, 2000);
}

/* Delay non-critical functions (like ticker setup) until after window load */
window.addEventListener("load", () => {
  animateCounters();
  // Delay ticker initialization by 1 second
  setTimeout(setupForexTicker, 1000);
});