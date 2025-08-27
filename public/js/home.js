
    // Initialize AOS library
    document.addEventListener('DOMContentLoaded', function() {
      AOS.init({
        duration: 500, // reduced from 1000
        once: true,
        offset: 50
      });

      // Mobile Nav Toggle
      const hamburger = document.querySelector('.hamburger');
      const navLinks = document.querySelector('.nav-links');

      hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
      });
    });
