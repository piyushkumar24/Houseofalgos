// Disclaimer Section Interactivity

document.addEventListener('DOMContentLoaded', function() {
    // Initialize risk level animations
    initRiskLevels();
    
    // Add interactivity to risk cards
    initRiskCards();
    
    // Add checkbox functionality
    initCheckbox();
});

// Initialize risk level animations with a delay for better visual effect
function initRiskLevels() {
    const riskLevels = document.querySelectorAll('.risk-level');
    
    riskLevels.forEach((level, index) => {
        // Add a staggered delay for each risk level
        setTimeout(() => {
            // Reset the width to 0 first
            level.style.width = '0';
            
            // Force a reflow
            void level.offsetWidth;
            
            // Add the appropriate width class
            if (level.classList.contains('low')) {
                level.style.width = '30%';
            } else if (level.classList.contains('medium')) {
                level.style.width = '60%';
            } else if (level.classList.contains('high')) {
                level.style.width = '80%';
            } else if (level.classList.contains('very-high')) {
                level.style.width = '95%';
            }
        }, 300 + (index * 200)); // Staggered delay
    });
}

// Add interactivity to risk cards
function initRiskCards() {
    const riskCards = document.querySelectorAll('.disclaimer-card.interactive-card');
    
    riskCards.forEach(card => {
        // Add hover effect for mobile devices
        card.addEventListener('touchstart', function() {
            // Remove active class from all cards
            riskCards.forEach(c => c.classList.remove('active'));
            // Add active class to current card
            this.classList.add('active');
        });
        
        // Add click effect to show/hide content
        card.addEventListener('click', function() {
            // Toggle active class
            this.classList.toggle('active');
        });
    });
}

// Add checkbox functionality
function initCheckbox() {
    const checkbox = document.getElementById('risk-acknowledgment');
    const acknowledgmentMessage = document.querySelector('.acknowledgment-message');
    
    if (checkbox && acknowledgmentMessage) {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                acknowledgmentMessage.classList.add('confirmed');
                acknowledgmentMessage.textContent = 'Thank you for acknowledging the risks. Trade responsibly!';
                
                // Add a subtle animation to the message
                acknowledgmentMessage.style.animation = 'pulse 2s infinite';
            } else {
                acknowledgmentMessage.classList.remove('confirmed');
                acknowledgmentMessage.textContent = 'By using our platform, you acknowledge and accept all trading risks.';
                acknowledgmentMessage.style.animation = 'none';
            }
        });
    }
}

// Add animation for market lines
function animateMarketLines() {
    const marketLines = document.querySelectorAll('.market-line');
    
    marketLines.forEach((line, index) => {
        // Randomize the animation properties for more realistic market movement
        const duration = 15 + Math.random() * 10; // Between 15-25s
        const delay = Math.random() * 5; // Between 0-5s
        
        line.style.animationDuration = `${duration}s`;
        line.style.animationDelay = `${delay}s`;
    });
}

// Call the market line animation
animateMarketLines();
