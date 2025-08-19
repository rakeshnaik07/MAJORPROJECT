// Signup Page Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeSignupPage();
});

function initializeSignupPage() {
    setupFormInteractions();
    setupFormValidation();
    setupSocialButtons();
    setupAnimations();
}

// Password toggle functionality
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.password-toggle');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
    
    // Add a small animation
    toggleIcon.style.transform = 'translateY(-50%) scale(1.2)';
    setTimeout(() => {
        toggleIcon.style.transform = 'translateY(-50%) scale(1)';
    }, 150);
}

// Setup form interactions
function setupFormInteractions() {
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
        // Focus effects
        input.addEventListener('focus', function() {
            this.closest('.form-group').classList.add('focused');
            addRippleEffect(this);
        });
        
        // Blur effects
        input.addEventListener('blur', function() {
            this.closest('.form-group').classList.remove('focused');
        });
        
        // Real-time validation
        input.addEventListener('input', function() {
            validateInput(this);
            updateSuccessFeedback(this);
        });
    });
}

// Real-time input validation
function validateInput(input) {
    const inputGroup = input.closest('.form-group');
    
    if (input.validity.valid && input.value.length > 0) {
        input.style.borderColor = '#00A699';
        inputGroup.classList.remove('error');
        inputGroup.classList.add('success');
    } else if (input.value.length > 0 && !input.validity.valid) {
        input.style.borderColor = '#FF5A5F';
        input.classList.add('error');
        inputGroup.classList.add('error');
        inputGroup.classList.remove('success');
    } else {
        input.style.borderColor = '#DDDDDD';
        inputGroup.classList.remove('error', 'success');
    }
}

// Update success feedback
function updateSuccessFeedback(input) {
    const feedback = input.parentElement.nextElementSibling;
    if (feedback && feedback.classList.contains('success-feedback')) {
        if (input.validity.valid && input.value.length > 0) {
            feedback.style.opacity = '1';
            feedback.style.transform = 'translateY(0)';
        } else {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translateY(-10px)';
        }
    }
}

// Add ripple effect
function addRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    element.parentElement.style.position = 'relative';
    element.parentElement.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Setup form validation
function setupFormValidation() {
    const form = document.querySelector('.signup-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        } else {
            showValidationErrors();
        }
    });
}

// Validate entire form
function validateForm() {
    const inputs = document.querySelectorAll('.form-input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.validity.valid || input.value.trim() === '') {
            isValid = false;
            input.classList.add('error');
            input.focus();
        }
    });
    
    return isValid;
}

// Show validation errors
function showValidationErrors() {
    const errorInputs = document.querySelectorAll('.form-input.error');
    
    errorInputs.forEach(input => {
        input.addEventListener('animationend', () => {
            input.classList.remove('error');
        }, { once: true });
    });
    
    // Show a toast message
    showToast('Please fill in all required fields correctly', 'error');
}

// Submit form with loading animation
function submitForm() {
    const submitBtn = document.querySelector('.signup-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    
    // Simulate form submission delay
    setTimeout(() => {
        // In real implementation, this would be the actual form submission
        document.querySelector('.signup-form').submit();
    }, 1000);
}

// Setup social button interactions
function setupSocialButtons() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google-btn') ? 'Google' : 
                           this.classList.contains('facebook-btn') ? 'Facebook' : 'Apple';
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show coming soon message
            showToast(`${provider} signup coming soon!`, 'info');
        });
    });
}

// Setup page animations
function setupAnimations() {
    // Animate form elements on page load
    const animatedElements = document.querySelectorAll('.form-group, .social-buttons, .login-link');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Animate logo
    const logo = document.querySelector('.logo');
    logo.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    logo.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
}

// Toast notification system
function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getToastColor(type)};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

function getToastIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getToastColor(type) {
    switch(type) {
        case 'success': return '#00A699';
        case 'error': return '#FF5A5F';
        case 'warning': return '#FC642D';
        default: return '#484848';
    }
}

// Password strength indicator
function checkPasswordStrength(password) {
    let strength = 0;
    const checks = [
        password.length >= 8,
        /[a-z]/.test(password),
        /[A-Z]/.test(password),
        /[0-9]/.test(password),
        /[^A-Za-z0-9]/.test(password)
    ];
    
    strength = checks.reduce((acc, check) => acc + check, 0);
    
    return {
        score: strength,
        text: ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][strength] || 'Very Weak'
    };
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .ripple {
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(255, 90, 95, 0.3);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .toast-content {
        display: flex;
        align-items: center;
        gap: 8px;
    }
`;

document.head.appendChild(style);