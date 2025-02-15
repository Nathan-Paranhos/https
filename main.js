lucide.createIcons();


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

class SkillsCarousel {
    constructor() {
        this.currentSlide = 0;
        this.container = document.querySelector('.skills-container');
        this.slides = document.querySelectorAll('.skill-card');
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;

        this.init();
    }

    init() {

        this.createControls();

        this.updateSlides();


        this.startAutoPlay();
    }

    createControls() {
        const carousel = document.querySelector('.skills-carousel');

        const prevButton = document.createElement('button');
        prevButton.className = 'carousel-button prev';
        prevButton.innerHTML = '<i data-lucide="chevron-left"></i>';
        prevButton.onclick = () => this.prev();

        const nextButton = document.createElement('button');
        nextButton.className = 'carousel-button next';
        nextButton.innerHTML = '<i data-lucide="chevron-right"></i>';
        nextButton.onclick = () => this.next();

        const dots = document.createElement('div');
        dots.className = 'carousel-dots';   

        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
            dot.onclick = () => this.goToSlide(i);
            dots.appendChild(dot);
        }

        carousel.appendChild(prevButton);
        carousel.appendChild(nextButton);
        carousel.appendChild(dots);

        lucide.createIcons();
    }

    updateSlides() {

        this.container.style.transform = `translateX(-${this.currentSlide * 100}%)`;

        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });

        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    next() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlides();
    }

    prev() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlides();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlides();
    }

    startAutoPlay() {
        if (!this.autoPlayInterval) {
            this.autoPlayInterval = setInterval(() => {
                this.next();
            }, 3000); 
        }
    }

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
    }
}

const skillsCarousel = new SkillsCarousel();


document.querySelector('.skills-carousel').addEventListener('mouseover', () => {
    skillsCarousel.stopAutoPlay();
});

document.querySelector('.skills-carousel').addEventListener('mouseout', () => {
    skillsCarousel.startAutoPlay();
});

const sections = document.querySelectorAll('.section');
const checkVisibility = () => {
    const scrollPosition = window.scrollY + window.innerHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition > sectionTop && scrollPosition < sectionBottom) {
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
        }
    });
};

document.addEventListener('scroll', checkVisibility);

checkVisibility();
