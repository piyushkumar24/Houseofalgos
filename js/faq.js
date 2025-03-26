/**
 * House of Algo's - FAQ JavaScript
 * This file contains functionality for the FAQ section
 */

document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Set first item as active by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherToggle = otherItem.querySelector('.faq-toggle i');
                    
                    // Animate closing
                    otherAnswer.style.maxHeight = '0px';
                    otherToggle.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = '0px';
                toggle.querySelector('i').style.transform = 'rotate(0deg)';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                toggle.querySelector('i').style.transform = 'rotate(180deg)';
            }
        });
        
        // Set initial state for active item
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            toggle.querySelector('i').style.transform = 'rotate(180deg)';
        } else {
            answer.style.maxHeight = '0px';
            toggle.querySelector('i').style.transform = 'rotate(0deg)';
        }
    });
    
    // Handle window resize to adjust maxHeight
    window.addEventListener('resize', () => {
        const activeItems = document.querySelectorAll('.faq-item.active');
        
        activeItems.forEach(item => {
            const answer = item.querySelector('.faq-answer');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        });
    });
});