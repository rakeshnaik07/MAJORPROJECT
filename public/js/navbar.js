// Navbar Interactive Effects  
document.addEventListener('DOMContentLoaded', function() {  
    initializeNavbar();  
});  

function initializeNavbar() {  
    setupScrollEffects();  
    setupSearchInteractions();  
    setupMobileMenu();  
}  

// Scroll effects for navbar  
function setupScrollEffects() {  
    const navbar = document.querySelector('.wanderlust-navbar');  
    let lastScrollTop = 0;  

    window.addEventListener('scroll', function() {  
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;  

        // Add scrolled class for styling  
        if (scrollTop > 50) {  
            navbar.classList.add('scrolled');  
        } else {  
            navbar.classList.remove('scrolled');  
        }  

        // Hide/show navbar on scroll  
        if (scrollTop > lastScrollTop && scrollTop > 100) {  
            // Scrolling down  
            navbar.style.transform = 'translateY(-100%)';  
        } else {  
            // Scrolling up  
            navbar.style.transform = 'translateY(0)';  
        }  

        lastScrollTop = scrollTop;  
    });  
}  

// Search interactions  
function setupSearchInteractions() {  
    const searchSections = document.querySelectorAll('.search-section');  
    const searchInputs = document.querySelectorAll('.search-input');  
    const searchBtn = document.querySelector('.search-btn');  

    // Add focus effects to search sections  
    searchInputs.forEach(input => {  
        input.addEventListener('focus', function() {  
            this.closest('.search-section').classList.add('focused');  
            this.closest('.search-wrapper').classList.add('active');  
        });  

        input.addEventListener('blur', function() {  
            this.closest('.search-section').classList.remove('focused');  
            this.closest('.search-wrapper').classList.remove('active');  
        });  
    });  

    // Search button functionality  
    if (searchBtn) {  
        searchBtn.addEventListener('click', function() {  
            performSearch();  
        });  
    }  

    // Mobile search modal  
    const mobileSearch = document.querySelector('.mobile-search-wrapper');  
    if (mobileSearch) {  
        mobileSearch.addEventListener('click', function() {  
            this.style.transform = 'scale(0.95)';  
            setTimeout(() => {  
                this.style.transform = 'scale(1)';  
            }, 150);  
        });  
    }  
}  

// Mobile menu interactions  
function setupMobileMenu() {  
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');  
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');  

    if (mobileMenuBtn) {  
        mobileMenuBtn.addEventListener('click', function() {  
            this.style.transform = 'scale(0.9)';  
            setTimeout(() => {  
                this.style.transform = 'scale(1)';  
            }, 150);  
        });  
    }  

    // Add staggered animation to mobile nav items  
    mobileNavItems.forEach((item, index) => {  
        item.addEventListener('mouseenter', function() {  
            this.style.transform = 'translateX(8px)';  
        });  

        item.addEventListener('mouseleave', function() {  
            this.style.transform = 'translateX(0)';  
        });  
    });  
}  

// Search functionality  
function performSearch() {  
    const searchBtn = document.querySelector('.search-btn');  
    const whereInput = document.querySelector('.search-input');  

    if (!whereInput || !whereInput.value.trim()) {  
        showSearchError();  
        return;  
    }  

    // Show loading state  
    searchBtn.classList.add('loading');  
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';  

    // Simulate search (replace with actual search logic)  
    setTimeout(() => {  
        // Redirect to search results  
        window.location.href = `/listings?search=${encodeURIComponent(whereInput.value.trim())}`;  
    }, 1200);  
}  

// Show search error feedback  
function showSearchError() {  
    const errorMsg = document.createElement('div');  
    errorMsg.className = 'search-error';  
    errorMsg.textContent = 'Please enter a search query.';  

    const searchWrapper = document.querySelector('.search-wrapper');  
    if (searchWrapper && !document.querySelector('.search-error')) {  
        searchWrapper.appendChild(errorMsg);  
        setTimeout(() => {  
            errorMsg.remove();  
        }, 2000);  
    }  
}  
