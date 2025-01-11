lucide.createIcons();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const observerOptions = { threshold: 0.1 };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.hero-title, .hero-subtitle, .section-title, .section-text, .skill-card, .experience-item, .education-item, .social-links');
animatedElements.forEach(el => observer.observe(el));

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading]');
    images.forEach(img => {
        img.onload = () => img.classList.add('loaded');
    });
});
