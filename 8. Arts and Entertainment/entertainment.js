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

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle?.addEventListener('click', function() {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '100%';
    nav.style.left = '0';
    nav.style.right = '0';
    nav.style.background = 'var(--white)';
    nav.style.padding = '2rem';
    nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
});

// Artists carousel
const slides = document.querySelectorAll('.artist-slide');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    currentSlide = index;
}

prevBtn?.addEventListener('click', function() {
    let newIndex = currentSlide - 1;
    if (newIndex < 0) newIndex = slides.length - 1;
    showSlide(newIndex);
});

nextBtn?.addEventListener('click', function() {
    let newIndex = currentSlide + 1;
    if (newIndex >= slides.length) newIndex = 0;
    showSlide(newIndex);
});

// Auto-rotate carousel
setInterval(() => {
    let newIndex = currentSlide + 1;
    if (newIndex >= slides.length) newIndex = 0;
    showSlide(newIndex);
}, 5000);

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

// Form handling
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            if (this.classList.contains('newsletter-form')) {
                alert('Thank you for subscribing to Luna Collective! You\'ll receive our next update soon.');
            } else {
                alert('Thank you for your message! We\'ll get back to you soon.');
            }
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
});

// Gallery item interactions
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Event card interactions
document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-5px)';
    });
});

// Artist card interactions
document.querySelectorAll('.artist-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-5px)';
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

// Stagger animations for cards
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.event-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.artist-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Creative floating elements in hero
function createFloatingShapes() {
    const hero = document.querySelector('.hero');
    const shapes = ['✦', '♡', '○', '□', '△', '☆'];
    
    shapes.forEach((shape, index) => {
        const element = document.createElement('div');
        element.textContent = shape;
        element.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 1.5 + 1}rem;
            opacity: ${Math.random() * 0.2 + 0.1};
            animation: float ${Math.random() * 15 + 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
            z-index: 1;
            color: rgba(255, 255, 255, 0.5);
        `;
        
        // Random position
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        
        hero.appendChild(element);
    });
}

// Add floating animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { 
            transform: translateY(0) rotate(0deg) scale(1);
        }
        33% { 
            transform: translateY(-20px) rotate(120deg) scale(1.1);
        }
        66% { 
            transform: translateY(10px) rotate(240deg) scale(0.9);
        }
    }
`;
document.head.appendChild(style);

// Initialize floating shapes when hero is in view
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            createFloatingShapes();
            heroObserver.unobserve(entry.target);
        }
    });
});

heroObserver.observe(document.querySelector('.hero'));

// Creative console message
console.log('🌙 Welcome to Luna Collective - Where creativity knows no bounds');