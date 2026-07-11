// For navbar
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
    navbar.classList.add('hidden');
    } else {
    navbar.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
});

function toggleMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuLinks = document.getElementById('menuLinks');
    
    menuToggle.classList.toggle('active');
    menuLinks.classList.toggle('active');
    
    if (menuLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// For card flip animation
const card = document.querySelector('.card');

card.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
});

// For moral compass
const items = document.querySelectorAll('.item');

items.forEach(item => {
    let timerId = null;

    item.addEventListener('click', () => {
        const originalText = item.textContent;
        const alternateText = item.getAttribute('data-text');

        if (item.classList.contains('revealed')) return;

        item.textContent = alternateText;
        item.setAttribute('data-text', originalText);
        item.classList.add('revealed');

        clearTimeout(timerId);

        timerId = setTimeout(() => {
        const currentText = item.textContent;
        const originalSavedText = item.getAttribute('data-text');

        item.textContent = originalSavedText;
        item.setAttribute('data-text', currentText);
        item.classList.remove('revealed');
        }, 5000); 
    });
});



// For Experience and Ethical Dillema
document.querySelectorAll('.slider-card').forEach(card => {
    const slides = card.querySelectorAll('.slide');
    const steps = card.querySelectorAll('.progress-step');
    const nextBtn = card.querySelector('.nextBtn');
    const prevBtn = card.querySelector('.prevBtn');
    
    let currentIndex = 0;

    function updateSlides(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        steps.forEach((step, i) => {
            if (i === index) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlides(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlides(currentIndex);
    });
});