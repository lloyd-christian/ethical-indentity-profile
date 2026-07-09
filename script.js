// For the animation upon opening
let lastScrollY = window.scrollY;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        navbar.classList.add('nav-hidden');
    } else {
        navbar.classList.remove('nav-hidden');
    }
    
    lastScrollY = window.scrollY;
});

// For card flip animation
const cardContainer = document.querySelector('.card-container');
const cardInner = document.querySelector('.card');

cardContainer.addEventListener('click', () => {
    cardInner.classList.toggle('is-flipped');
});

// For Experience and Ethical Dillema
const sections = document.querySelectorAll('#that-one-experience, #ethical-dilemma');

sections.forEach((section) => {
    const track = section.querySelector('.slides-track');
    const slides = section.querySelectorAll('.slide');
    const prevBtn = section.querySelector('.prevBtn');
    const nextBtn = section.querySelector('.nextBtn');
    let currentIndex = 0;

    if (!track || slides.length === 0 || !prevBtn || !nextBtn) return;

    function moveSlide(index) {
        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }
        
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        moveSlide(currentIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
        moveSlide(currentIndex - 1);
    });
});