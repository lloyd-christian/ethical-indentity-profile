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