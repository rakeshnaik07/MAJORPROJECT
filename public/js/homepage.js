// Homepage Professional Interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize animations and interactions
    initImageLoading();
    initScrollAnimations();
    initCardInteractions();
    
});

// Image Loading with Fallback
function initImageLoading() {
    const images = document.querySelectorAll('.card-img-top');
    
    images.forEach(img => {
        // Add loading state
        img.closest('.listing-card').classList.add('loading');
        
        // Handle successful image load
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.closest('.listing-card').classList.remove('loading');
        });
        
        // Handle image loading error
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x240/FF385C/FFFFFF?text=WanderLust';
            this.closest('.listing-card').classList.remove('loading');
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
}

// Scroll-triggered Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class for animation
                entry.target.classList.add('visible');
                
                // Trigger staggered animation
                const cards = entry.target.querySelectorAll('.listing-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animationPlayState = 'running';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe the main container
    const container = document.querySelector('.row');
    if (container) {
        observer.observe(container);
    }
}

// Enhanced Card Interactions
function initCardInteractions() {
    const cards = document.querySelectorAll('.listing-card');
    
    cards.forEach(card => {
        // Add smooth focus transitions
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Add click ripple effect
        card.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
        
        // Pause animations initially
        card.style.animationPlayState = 'paused';
    });
}

// Ripple Effect on Card Click
function createRippleEffect(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    ripple.style.position = 'absolute';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.background = 'rgba(255, 56, 92, 0.3)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '10';
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Lazy Loading Enhancement
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Smooth Error Handling
function handleErrors() {
    window.addEventListener('error', function(e) {
        console.log('Error handled:', e.error);
    });
}

// Performance Optimization
function optimizePerformance() {
    // Debounce scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        // Add any scroll-based effects here
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate);
}

// Initialize performance optimizations
optimizePerformance();
handleErrors();