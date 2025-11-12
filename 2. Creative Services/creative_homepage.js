// code for the Loading screen
window.addEventListener('load', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
});

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

// Header background on scroll
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

// Testimonial carousel
const slides = document.querySelectorAll('.testimonial-slide');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    currentSlide = index;
}

prevBtn.addEventListener('click', function() {
    let newIndex = currentSlide - 1;
    if (newIndex < 0) newIndex = slides.length - 1;
    showSlide(newIndex);
});

nextBtn.addEventListener('click', function() {
    let newIndex = currentSlide + 1;
    if (newIndex >= slides.length) newIndex = 0;
    showSlide(newIndex);
});

// Auto-rotate testimonials
setInterval(() => {
    let newIndex = currentSlide + 1;
    if (newIndex >= slides.length) newIndex = 0;
    showSlide(newIndex);
}, 5000);

// Project hover effects
document.querySelectorAll('.project-image').forEach(project => {
    project.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    project.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Form handling code
document.querySelector('form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        alert('Thank you! Your message has been sent. We\'ll get back to you soon.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Scroll animations
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

// Service card animations
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Console message
console.log('🎨 Welcome to Studio Nova - where creativity meets strategy');