// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Product wishlist functionality
document.querySelectorAll('.wishlist').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('active');
        this.textContent = this.classList.contains('active') ? '❤' : '♥';
        
        if (this.classList.contains('active')) {
            // Add to wishlist
            showNotification('Added to wishlist');
        } else {
            // Remove from wishlist
            showNotification('Removed from wishlist');
        }
    });
});

// Quick view modal
document.querySelectorAll('.quick-view').forEach(button => {
    button.addEventListener('click', function() {
        const modal = document.querySelector('.quick-view-modal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
document.querySelector('.modal-close').addEventListener('click', function() {
    const modal = document.querySelector('.quick-view-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
document.querySelector('.quick-view-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Newsletter form
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    // Simulate subscription
    showNotification('Thank you for subscribing to Élégance');
    this.reset();
});

// Shopping cart functionality
let cartCount = 0;
const cartButtons = document.querySelectorAll('.shop-look');

cartButtons.forEach(button => {
    button.addEventListener('click', function() {
        cartCount++;
        document.querySelector('.cart-count').textContent = cartCount;
        showNotification('Added to cart');
    });
});

// Color swatch selection
document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', function() {
        // Remove active class from siblings
        this.parentElement.querySelectorAll('.color-swatch').forEach(s => {
            s.style.borderColor = 'var(--light-grey)';
        });
        
        // Add active state to clicked swatch
        this.style.borderColor = 'var(--black)';
    });
});

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--black);
        color: var(--white);
        padding: 1rem 1.5rem;
        border-radius: 0;
        z-index: 3000;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add keyframe animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Watch sections for animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Product card animations with stagger
document.querySelectorAll('.product-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Luxury console message
console.log('👗 Welcome to Élégance - where timeless style meets modern sophistication');