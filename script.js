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