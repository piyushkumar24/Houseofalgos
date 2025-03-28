/**
 * House of Algo's - FAQ JavaScript
 * This file contains functionality for the FAQ section.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("FAQ script loaded and DOM ready.");
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Set first item as active by default
    if (faqItems.length > 0) {
      faqItems[0].classList.add('active');
    }
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      const toggleIcon = item.querySelector('.faq-toggle i');
      
      // Initialize FAQ item state
      if (item.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        toggleIcon.style.transform = 'rotate(180deg)';
      } else {
        answer.style.maxHeight = '0px';
        toggleIcon.style.transform = 'rotate(0deg)';
      }
      
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            const otherToggleIcon = otherItem.querySelector('.faq-toggle i');
            otherAnswer.style.maxHeight = '0px';
            otherToggleIcon.style.transform = 'rotate(0deg)';
          }
        });
        
        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = '0px';
          toggleIcon.style.transform = 'rotate(0deg)';
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          toggleIcon.style.transform = 'rotate(180deg)';
        }
      });
    });
    
    // Adjust active FAQ item heights on window resize
    window.addEventListener('resize', () => {
      const activeItems = document.querySelectorAll('.faq-item.active');
      activeItems.forEach(item => {
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      });
    });
  });
  