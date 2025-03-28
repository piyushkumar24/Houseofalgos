/**
 * House of Algo's - FAQ JavaScript
 * This file handles the accordion functionality for the FAQ section
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("FAQ script loaded and initialized");
    
    // Get all FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) {
        console.warn("No FAQ items found on the page");
        return;
    }
    
    console.log(`Found ${faqItems.length} FAQ items`);
    
    // Function to open an FAQ item
    function openFaqItem(item) {
        // Add active class to the item
        item.classList.add('active');
        
        // Get the answer and toggle icon elements
        const answer = item.querySelector('.faq-answer');
        const toggleIcon = item.querySelector('.faq-toggle i');
        
        if (answer && toggleIcon) {
            // Set the max height to the scroll height to animate the opening
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.opacity = '1';
            toggleIcon.style.transform = 'rotate(180deg)';
        }
    }
    
    // Function to close an FAQ item
    function closeFaqItem(item) {
        // Remove active class from the item
        item.classList.remove('active');
        
        // Get the answer and toggle icon elements
        const answer = item.querySelector('.faq-answer');
        const toggleIcon = item.querySelector('.faq-toggle i');
        
        if (answer && toggleIcon) {
            // Set the max height to 0 to animate the closing
            answer.style.maxHeight = '0px';
            answer.style.opacity = '0';
            toggleIcon.style.transform = 'rotate(0deg)';
        }
    }
    
    // Set first FAQ item as active by default
    if (faqItems.length > 0) {
        openFaqItem(faqItems[0]);
    }
    
    // Add click event listener to each FAQ question
    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach((otherItem) => {
                    if (otherItem !== item) {
                        closeFaqItem(otherItem);
                    }
                });
                
                // Toggle the clicked item
                if (isActive) {
                    closeFaqItem(item);
                } else {
                    openFaqItem(item);
                }
            });
        }
    });
    
    // Adjust max height of active FAQ items when the window is resized
    window.addEventListener('resize', function() {
        const activeItems = document.querySelectorAll('.faq-item.active');
        
        activeItems.forEach((item) => {
            const answer = item.querySelector('.faq-answer');
            
            if (answer) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});
