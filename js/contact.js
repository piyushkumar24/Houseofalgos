/**
 * House of Algo's - Contact Form JavaScript
 * This file contains functionality for the contact form
 */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const formMessage = contactForm.querySelector('.form-message');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loadingSpinner = submitBtn.querySelector('.loading-spinner');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formDataObj = Object.fromEntries(formData.entries());
        
        // Validate form
        if (!validateForm(formDataObj)) {
            showMessage('Please fill in all required fields correctly.', 'error');
            shakeForm();
            return;
        }
        
        // Show loading state
        btnText.style.opacity = '0';
        loadingSpinner.style.display = 'block';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            showMessage('Your message has been sent successfully! We will get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset input wrappers
            const inputWrappers = contactForm.querySelectorAll('.input-wrapper');
            inputWrappers.forEach(wrapper => {
                wrapper.classList.remove('focused');
            });
            
            // Show success animation
            showSuccessAnimation();
        } catch (error) {
            // Show error message
            showMessage('There was an error sending your message. Please try again later.', 'error');
            shakeForm();
        } finally {
            // Reset button state
            btnText.style.opacity = '1';
            loadingSpinner.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
    
    // Validate form data
    function validateForm(data) {
        // Check if all fields are filled
        if (!data.name || !data.email || !data.subject || !data.message) {
            return false;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return false;
        }
        
        return true;
    }
    
    // Show form message
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message';
        formMessage.classList.add(type);
        
        // Animate message appearance
        formMessage.style.opacity = '0';
        formMessage.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            formMessage.style.opacity = '1';
            formMessage.style.transform = 'translateY(0)';
        }, 10);
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.opacity = '0';
            formMessage.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                formMessage.className = 'form-message';
            }, 300);
        }, 5000);
    }
    
    // Shake form on error
    function shakeForm() {
        contactForm.classList.add('shake');
        
        setTimeout(() => {
            contactForm.classList.remove('shake');
        }, 500);
    }
    
    // Show success animation
    function showSuccessAnimation() {
        const successOverlay = document.createElement('div');
        successOverlay.className = 'success-overlay';
        
        const successIcon = document.createElement('div');
        successIcon.className = 'success-icon';
        successIcon.innerHTML = '<i class="fas fa-check"></i>';
        
        successOverlay.appendChild(successIcon);
        contactForm.appendChild(successOverlay);
        
        setTimeout(() => {
            successOverlay.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            successOverlay.classList.remove('show');
            
            setTimeout(() => {
                contactForm.removeChild(successOverlay);
            }, 300);
        }, 2000);
    }
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });
    });
    
    function validateInput(input) {
        const wrapper = input.parentElement;
        
        if (input.value.trim() === '') {
            wrapper.classList.add('error');
            return false;
        }
        
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                wrapper.classList.add('error');
                return false;
            }
        }
        
        wrapper.classList.remove('error');
        return true;
    }
});