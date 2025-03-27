/**
 * House of Algo's - Animations JavaScript
 * This file contains custom animations and interactive elements
 */

document.addEventListener('DOMContentLoaded', () => {
    // Income cards hover effect
    const incomeCards = document.querySelectorAll('.income-card');
    
    incomeCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.income-icon').classList.add('animated');
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.income-icon').classList.remove('animated');
        });
    });
    
    // Vision cards parallax effect
    const visionCards = document.querySelectorAll('.vision-card');
    
    visionCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            card.style.transform = `perspective(1000px) rotateX(${deltaY * -5}deg) rotateY(${deltaX * 5}deg) translateZ(10px)`;
            
            const bgIcon = card.querySelector('.card-bg-icon');
            if (bgIcon) {
                bgIcon.style.transform = `translateX(${deltaX * 10}px) translateY(${deltaY * 10}px)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            
            const bgIcon = card.querySelector('.card-bg-icon');
            if (bgIcon) {
                bgIcon.style.transform = 'translateX(0) translateY(0)';
            }
        });
    });
    
    // Platform steps animation
    const stepCards = document.querySelectorAll('.step-card');
    
    stepCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const stepNumber = card.querySelector('.step-number');
            const stepIcon = card.querySelector('.step-icon');
            
            stepNumber.style.transform = 'translateY(-50%) scale(1.1) rotate(10deg)';
            stepIcon.style.transform = 'scale(1.2) rotate(-10deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            const stepNumber = card.querySelector('.step-number');
            const stepIcon = card.querySelector('.step-icon');
            
            stepNumber.style.transform = 'translateY(-50%) scale(1) rotate(0)';
            stepIcon.style.transform = 'scale(1) rotate(0)';
        });
    });
    
    // Contact form input animation
    const formInputs = document.querySelectorAll('.input-wrapper input, .input-wrapper textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            const wrapper = input.parentElement;
            wrapper.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            const wrapper = input.parentElement;
            if (input.value.trim() === '') {
                wrapper.classList.remove('focused');
            }
        });
        
        // Check if input already has value (e.g., on page reload)
        if (input.value.trim() !== '') {
            const wrapper = input.parentElement;
            wrapper.classList.add('focused');
        }
    });
    
    // Animated background elements
    function animateBackgroundElements() {
        const elements = document.querySelectorAll('.bg-element');
        
        elements.forEach(element => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            const randomDuration = 5 + Math.random() * 5;
            const randomDelay = Math.random() * 5;
            
            element.style.transition = `transform ${randomDuration}s ease-in-out ${randomDelay}s`;
            element.style.transform = `translate(${randomX}px, ${randomY}px)`;
            
            // Reset position after animation completes
            setTimeout(() => {
                element.style.transition = 'none';
                element.style.transform = 'translate(0, 0)';
                
                // Trigger reflow
                void element.offsetWidth;
                
                // Start next animation
                setTimeout(() => {
                    animateBackgroundElements();
                }, 100);
            }, (randomDuration + randomDelay) * 1000);
        });
    }
    
    // Start background animations
    animateBackgroundElements();
    
    // Typing effect for section headers
    function createTypingEffect() {
        const headers = document.querySelectorAll('.section-header h2');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const header = entry.target;
                    const text = header.textContent;
                    header.textContent = '';
                    header.classList.add('typing');
                    
                    let i = 0;
                    const typeInterval = setInterval(() => {
                        if (i < text.length) {
                            header.textContent += text.charAt(i);
                            i++;
                        } else {
                            clearInterval(typeInterval);
                            header.classList.remove('typing');
                        }
                    }, 100);
                    
                    observer.unobserve(header);
                }
            });
        }, { threshold: 0.5 });
        
        headers.forEach(header => {
            observer.observe(header);
        });
    }
    
    // Uncomment to enable typing effect
    // createTypingEffect();
});