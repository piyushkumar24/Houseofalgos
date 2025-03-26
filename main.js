// Particle Effect
function setupParticles() {
  const container = document.getElementById("particles")
  \
  if (!container) return
  \
  \
  for (let i = 0; i &lt; 50;
  i++
  )
  {
    const particle = document.createElement("div")
    particle.className = "particle"

    // Random position
    const posX = Math.random() * 100
    const posY = Math.random() * 100
    particle.style.left = `${posX}%`
    particle.style.bottom = `${posY}%`

    // Random size
    const size = Math.random() * 6 + 2
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`

    // Random animation duration and delay
    const duration = Math.random() * 10 + 5
    const delay = Math.random() * 5
    particle.style.animation = `particle-float ${duration}s ${delay}s infinite linear`

    // Random opacity
    particle.style.opacity = Math.random() * 0.5 + 0.2

    // Random color variations (gold to blue)
    const hue = Math.random() > 0.7 ? "210" : "45"
    const saturation = Math.floor(Math.random() * 30 + 70)
    const lightness = Math.floor(Math.random() * 20 + 60)
    particle.style.background = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`

    container.appendChild(particle)
  }
}

// Digital Rain Effect
function setupDigitalRain() {
  const canvas = document.getElementById("digitalRain")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const fontSize = 14
  const columns = canvas.width / fontSize

  // Array to store the y position of each column
  const drops = []
  for (let i = 0; i &lt; columns;
  i++
  )
  drops[i] = 1

  // Characters to display
  const chars = "01010101010101"

  function draw() {
    // Semi-transparent black background to create trail effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#FFD700" // Gold color
    ctx.font = `${fontSize}px monospace`

    for (let i = 0; i &lt; drops.length;
    i++
    )
    {
      // Random character
      const text = chars[Math.floor(Math.random() * chars.length)]

      // x = i * fontSize, y = drops[i] * fontSize
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)

      // Randomly reset some drops to the top
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }

      // Increment y coordinate
      drops[i]++
    }
  }

  setInterval(draw, 33)
}

function setupForexTicker() {
  const tickerElement = document.getElementById("forexTicker")
  if (!tickerElement) return

  // Clear existing content
  tickerElement.innerHTML = ""

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
  ]

  // Create ticker items
  currencyPairs.forEach((pair) => {
    const pairElement = document.createElement("div")
    pairElement.className = "currency-pair"
    const flagsContainer = document.createElement("div")
    flagsContainer.className = "currency-flags"
    const baseFlag = document.createElement("div")
    baseFlag.className = "currency-flag"
    baseFlag.style.backgroundImage = `url(${pair.base.flag})`
    const quoteFlag = document.createElement("div")
    quoteFlag.className = "currency-flag"
    quoteFlag.style.backgroundImage = `url(${pair.quote.flag})`
    flagsContainer.appendChild(baseFlag)
    flagsContainer.appendChild(quoteFlag)
    const infoContainer = document.createElement("div")
    infoContainer.className = "currency-info"
    const nameElement = document.createElement("div")
    nameElement.className = "currency-name"
    nameElement.textContent = pair.name
    const valueContainer = document.createElement("div")
    valueContainer.className = `currency-value ${pair.trend}`
    const valueText = document.createElement("span")
    valueText.textContent = pair.value
    const trendIcon = document.createElement("i")
    trendIcon.className = pair.trend === "up" ? "fas fa-caret-up" : "fas fa-caret-down"
    const changeElement = document.createElement("span")
    changeElement.className = "currency-change"
    changeElement.textContent = pair.change
    valueContainer.appendChild(valueText)
    valueContainer.appendChild(trendIcon)
    valueContainer.appendChild(changeElement)
    infoContainer.appendChild(nameElement)
    infoContainer.appendChild(valueContainer)
    pairElement.appendChild(flagsContainer)
    pairElement.appendChild(infoContainer)
    tickerElement.appendChild(pairElement)
  })

  // Clone all items to ensure continuous scrolling
  const originalItems = Array.from(tickerElement.children)
  originalItems.forEach((item) => {
    const clone = item.cloneNode(true)
    tickerElement.appendChild(clone)
  })

  // Force a reflow to ensure the animation starts properly
  void tickerElement.offsetWidth

  // Start updating currency values
  updateCurrencyValues()
}

function updateCurrencyValues() {
  setInterval(() => {
    const pairs = document.querySelectorAll(".currency-pair")
    pairs.forEach((pair) => {
      const valueElement = pair.querySelector(".currency-value span:first-child")
      if (!valueElement) return
      let currentValue = Number.parseFloat(valueElement.textContent)
      const fluctuation = (Math.random() - 0.5) * 0.01
      currentValue += fluctuation
      valueElement.textContent = currentValue.toFixed(4)
      const valueContainer = pair.querySelector(".currency-value")
      const trendIcon = pair.querySelector(".currency-value i")
      const changeElement = pair.querySelector(".currency-change")
      if (fluctuation > 0) {
        valueContainer.className = "currency-value up"
        trendIcon.className = "fas fa-caret-up"
        changeElement.textContent = "+" + Math.abs(fluctuation).toFixed(4)
      } else {
        valueContainer.className = "currency-value down"
        trendIcon.className = "fas fa-caret-down"
        changeElement.textContent = "-" + Math.abs(fluctuation).toFixed(4)
      }
    })
  }, 5000)
}

/* ------------------------------
   Video Background Handling
   ------------------------------ */
function setupVideoBackground() {
  const video = document.getElementById("heroVideo")
  if (!video) return
  video.addEventListener("error", () => console.log("Video error occurred"))
  video.muted = true
  video.play().catch((error) => console.log("Video autoplay failed:", error))
}

/* ------------------------------
   Mobile Menu Toggle
   ------------------------------ */
function setupMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")
  if (!menuToggle || !navLinks) return
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true"
    menuToggle.setAttribute("aria-expanded", !isExpanded)
    navLinks.classList.toggle("active")
  })
}

/* ------------------------------
   Smooth Scroll for Anchor Links
   ------------------------------ */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (!target) return
      target.scrollIntoView({ behavior: "smooth", block: "start" })
      const navLinks = document.querySelector(".nav-links")
      const menuToggle = document.querySelector(".menu-toggle")
      if (navLinks && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active")
        if (menuToggle) menuToggle.setAttribute("aria-expanded", "false")
      }
    })
  })
}

/* ------------------------------
   Sticky Navigation
   ------------------------------ */
function setupStickyNav() {
  const nav = document.querySelector(".sticky-nav")
  if (!nav) return
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) nav.classList.add("scrolled")
    else nav.classList.remove("scrolled")
  })
}

/* ------------------------------
   Scroll-to-Top Button
   ------------------------------ */
function setupScrollToTop() {
  const scrollTopBtn = document.querySelector(".scroll-top")
  if (!scrollTopBtn) return
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) scrollTopBtn.classList.add("visible")
    else scrollTopBtn.classList.remove("visible")
  })
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  })
}

/* ------------------------------
   Counters Animation
   ------------------------------ */
function animateCounters() {
  const counters = document.querySelectorAll(".counter-value")
  const speed = 200
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target")
    const increment = target / speed
    let i = 0 // Declare i here
    function updateCount() {
      const count = +counter.innerText
      if (count &lt;
      target
      )
      i++ // Use i here
      counter.innerText = Math.ceil(count + increment)
      setTimeout(updateCount, 1)
      else
      counter.innerText = target
    }
    updateCount()
  })
}

/* ------------------------------
   Contact Form (simulate submission)
   ------------------------------ */
function setupContactForm() {
  const contactForm = document.getElementById("contactForm")
  if (!contactForm) return
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    if (!submitBtn) return
    const originalBtnText = submitBtn.innerHTML
    submitBtn.innerHTML = "Sending..."
    setTimeout(() => {
      submitBtn.innerHTML = "Message Sent!"
      contactForm.reset()
      setTimeout(() => {
        submitBtn.innerHTML = originalBtnText
      }, 3000)
    }, 1500)
  })
}

/* ------------------------------
   Initialize functions after DOMContentLoaded
   ------------------------------ */
window.addEventListener("DOMContentLoaded", () => {
  setupVideoBackground()
  setupMobileMenu()
  setupSmoothScroll()
  setupStickyNav()
  setupScrollToTop()
  setupContactForm()
  setupForexTicker()
  setupParticles()
  setupDigitalRain()
})

/* Delay non-critical functions (like ticker setup) until after window load */
window.addEventListener("load", () => {
  animateCounters()
  // Delay ticker initialization by 1 second
  setTimeout(setupForexTicker, 1000)
})

