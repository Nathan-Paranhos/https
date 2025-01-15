// Inicializa os ícones Lucide
lucide.createIcons();

// Função de Scroll Suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Classe para o Carrossel de Habilidades
class SkillsCarousel {
    constructor() {
        this.currentSlide = 0;
        this.container = document.querySelector('.skills-container');
        this.slides = document.querySelectorAll('.skill-card');
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;

        // Inicializa o carrossel
        this.init();
    }

    init() {
        // Cria os controles do carrossel
        this.createControls();

        // Define o estado inicial
        this.updateSlides();

        // Inicia o autoplay
        this.startAutoPlay();
    }

    createControls() {
        const carousel = document.querySelector('.skills-carousel');

        // Botão de navegação "anterior"
        const prevButton = document.createElement('button');
        prevButton.className = 'carousel-button prev';
        prevButton.innerHTML = '<i data-lucide="chevron-left"></i>';
        prevButton.onclick = () => this.prev();

        // Botão de navegação "próximo"
        const nextButton = document.createElement('button');
        nextButton.className = 'carousel-button next';
        nextButton.innerHTML = '<i data-lucide="chevron-right"></i>';
        nextButton.onclick = () => this.next();

        // Dots de navegação
        const dots = document.createElement('div');
        dots.className = 'carousel-dots';

        // Cria os pontos para cada slide
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
            dot.onclick = () => this.goToSlide(i);
            dots.appendChild(dot);
        }

        // Adiciona os controles ao carrossel
        carousel.appendChild(prevButton);
        carousel.appendChild(nextButton);
        carousel.appendChild(dots);

        // Inicializa os ícones do Lucide nos botões
        lucide.createIcons();
    }

    updateSlides() {
        // Atualiza a posição do carrossel
        this.container.style.transform = `translateX(-${this.currentSlide * 100}%)`;

        // Atualiza o slide ativo
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });

        // Atualiza os dots
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
            }, 3000); // Troca de slide a cada 3 segundos
        }
    }

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
    }
}

// Inicializa o carrossel
const skillsCarousel = new SkillsCarousel();

// Para o autoplay quando o mouse passar sobre o carrossel
document.querySelector('.skills-carousel').addEventListener('mouseover', () => {
    skillsCarousel.stopAutoPlay();
});

// Reinicia o autoplay quando o mouse sai do carrossel
document.querySelector('.skills-carousel').addEventListener('mouseout', () => {
    skillsCarousel.startAutoPlay();
});

// Função para adicionar a classe 'visible' nas seções
const sections = document.querySelectorAll('.section');
const checkVisibility = () => {
    const scrollPosition = window.scrollY + window.innerHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        // Verifica se a seção está visível
        if (scrollPosition > sectionTop && scrollPosition < sectionBottom) {
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
        }
    });
};

// Chama a função sempre que o scroll mudar
document.addEventListener('scroll', checkVisibility);

// Verifica a visibilidade das seções quando a página for carregada
checkVisibility();
