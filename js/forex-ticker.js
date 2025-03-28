// Currency pairs data with logos
const currencyPairs = [
    { base: 'EUR', quote: 'USD', baseSymbol: '€', quoteSymbol: '$' },
    { base: 'GBP', quote: 'USD', baseSymbol: '£', quoteSymbol: '$' },
    { base: 'USD', quote: 'JPY', baseSymbol: '$', quoteSymbol: '¥' },
    { base: 'USD', quote: 'CHF', baseSymbol: '$', quoteSymbol: '₣' },
    { base: 'AUD', quote: 'USD', baseSymbol: 'A$', quoteSymbol: '$' },
    { base: 'USD', quote: 'CAD', baseSymbol: '$', quoteSymbol: 'C$' },
    { base: 'NZD', quote: 'USD', baseSymbol: 'NZ$', quoteSymbol: '$' },
    { base: 'USD', quote: 'SGD', baseSymbol: '$', quoteSymbol: 'S$' }
];

// Initialize the forex ticker
function initForexTicker() {
    const ticker = document.getElementById('forexTicker');
    if (!ticker) return;

    // Clear any existing content
    ticker.innerHTML = '';

    // Create currency pairs
    currencyPairs.forEach(pair => {
        const value = generateRandomPrice(pair);
        const change = generateRandomChange();
        const isUp = change >= 0;

        const pairElement = document.createElement('div');
        pairElement.className = 'currency-pair';
        pairElement.setAttribute('data-pair', `${pair.base}${pair.quote}`);
        pairElement.innerHTML = `
            <div class="currency-name">
                <span class="currency-logo">${pair.baseSymbol}</span>
                <span class="currency-code">${pair.base}</span>
                <span class="currency-separator">/</span>
                <span class="currency-logo">${pair.quoteSymbol}</span>
                <span class="currency-code">${pair.quote}</span>
            </div>
            <div class="currency-value ${isUp ? 'up' : 'down'}">
                <span>${value}</span>
                <i class="fas fa-${isUp ? 'caret-up' : 'caret-down'}"></i>
                <span class="currency-change">${change}%</span>
            </div>
        `;

        // Add click event for modal
        pairElement.addEventListener('click', () => showCurrencyModal(pair, value, change));
        ticker.appendChild(pairElement);

        // Clone for infinite scroll
        const clone = pairElement.cloneNode(true);
        clone.addEventListener('click', () => showCurrencyModal(pair, value, change));
        ticker.appendChild(clone);
    });

    // Start updating values
    setInterval(updateValues, 3000);

    // Pause animation on hover
    const tickerContainer = document.querySelector('.forex-ticker-container');
    if (tickerContainer) {
        tickerContainer.addEventListener('mouseenter', () => {
            ticker.style.animationPlayState = 'paused';
        });
        
        tickerContainer.addEventListener('mouseleave', () => {
            ticker.style.animationPlayState = 'running';
        });
    }
}

// Show currency modal
function showCurrencyModal(pair, value, change) {
    const template = document.getElementById('currencyModalTemplate');
    if (!template) return;
    
    const modal = template.content.cloneNode(true).querySelector('.currency-modal');
    
    modal.querySelector('.base-currency').textContent = `${pair.baseSymbol}${pair.base}`;
    modal.querySelector('.quote-currency').textContent = `${pair.quoteSymbol}${pair.quote}`;
    modal.querySelector('.price-value').textContent = value;
    
    const changeElement = modal.querySelector('.price-change');
    const isUp = change >= 0;
    changeElement.className = `price-change ${isUp ? 'up' : 'down'}`;
    changeElement.innerHTML = `
        <i class="fas fa-${isUp ? 'caret-up' : 'caret-down'}"></i>
        ${change}%
    `;

    // Add animation to modal content
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'translateY(20px)';
    setTimeout(() => {
        modalContent.style.transform = 'translateY(0)';
    }, 10);

    // Close modal on button click or outside click
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });

    // Close on escape key
    document.addEventListener('keydown', function escapeClose(e) {
        if (e.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', escapeClose);
        }
    });

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

// Close modal with animation
function closeModal(modal) {
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'translateY(20px)';
    modal.classList.remove('show');
    
    setTimeout(() => {
        modal.remove();
    }, 300);
}

// Generate random price based on currency pair
function generateRandomPrice(pair) {
    let min, max;
    
    // Set realistic ranges based on currency pair
    if (pair.base === 'EUR' && pair.quote === 'USD') {
        min = 1.05; max = 1.15;
    } else if (pair.base === 'GBP' && pair.quote === 'USD') {
        min = 1.20; max = 1.30;
    } else if (pair.base === 'USD' && pair.quote === 'JPY') {
        min = 105; max = 115;
        return (Math.random() * (max - min) + min).toFixed(2);
    } else if (pair.base === 'USD' && pair.quote === 'CHF') {
        min = 0.90; max = 0.95;
    } else if (pair.base === 'AUD' && pair.quote === 'USD') {
        min = 0.65; max = 0.75;
    } else if (pair.base === 'USD' && pair.quote === 'CAD') {
        min = 1.25; max = 1.35;
    } else if (pair.base === 'NZD' && pair.quote === 'USD') {
        min = 0.60; max = 0.70;
    } else if (pair.base === 'USD' && pair.quote === 'SGD') {
        min = 1.30; max = 1.40;
    } else {
        min = 0.5; max = 1.5;
    }
    
    return (Math.random() * (max - min) + min).toFixed(4);
}

// Generate random change percentage
function generateRandomChange() {
    return (Math.random() * 2 - 1).toFixed(2);
}

// Update currency values
function updateValues() {
    const pairs = document.querySelectorAll('.currency-pair');
    pairs.forEach(pair => {
        const pairCode = pair.getAttribute('data-pair');
        if (!pairCode) return;
        
        const currencyPair = currencyPairs.find(p => `${p.base}${p.quote}` === pairCode);
        if (!currencyPair) return;
        
        const valueElement = pair.querySelector('.currency-value');
        const valueSpan = valueElement.querySelector('span');
        const changeElement = pair.querySelector('.currency-change');
        const iconElement = valueElement.querySelector('i');
        
        const newValue = generateRandomPrice(currencyPair);
        const newChange = generateRandomChange();
        const isUp = newChange >= 0;
        const oldValue = parseFloat(valueSpan.textContent);
        const newValueFloat = parseFloat(newValue);
        const valueChanged = newValueFloat !== oldValue;
        
        // Only animate if value actually changed
        if (valueChanged) {
            // Update value and change
            valueSpan.textContent = newValue;
            changeElement.textContent = `${newChange}%`;

            // Update direction
            valueElement.className = `currency-value ${isUp ? 'up' : 'down'}`;
            iconElement.className = `fas fa-${isUp ? 'caret-up' : 'caret-down'}`;

            // Add animation
            valueElement.classList.add(isUp ? 'changing-up' : 'changing-down');
            setTimeout(() => {
                valueElement.classList.remove('changing-up', 'changing-down');
            }, 600);
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initForexTicker);
