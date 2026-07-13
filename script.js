// For NavBar
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const scrollThreshold = 15; 

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('hidden');
        document.body.classList.remove('nav-hidden');
        return;
    }
    
    if (currentScroll > lastScrollTop) {
        navbar.classList.add('hidden');
        document.body.classList.add('nav-hidden');
    } 
    else if (lastScrollTop - currentScroll > scrollThreshold) {
        navbar.classList.remove('hidden');
        document.body.classList.remove('nav-hidden');
    }
    
    lastScrollTop = currentScroll;
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
function handleThreeLayerPeel(sectionId, lineId, solutionLayerId, lessonLayerId) {
    const section = document.getElementById(sectionId);
    const line = document.getElementById(lineId);
    const solutionLayer = document.getElementById(solutionLayerId);
    const lessonLayer = document.getElementById(lessonLayerId);

    if (!section || !line || !solutionLayer || !lessonLayer) return;

    const rect = section.getBoundingClientRect();
    const runwayHeight = section.offsetHeight;
    
    let progress = -rect.top / (runwayHeight - window.innerHeight);
    progress = Math.max(0, Math.min(1, progress));

    const percentage = progress * 100;

    let solutionProgress = progress / 0.5; 
    solutionProgress = Math.max(0, Math.min(1, solutionProgress)) * 100;

    let lessonProgress = (progress - 0.5) / 0.5;
    lessonProgress = Math.max(0, Math.min(1, lessonProgress)) * 100;

    if (percentage <= 50) {
        const lineTop = 100 - solutionProgress;
        line.style.top = `${lineTop}%`;
        
        solutionLayer.style.clipPath = `polygon(0 ${lineTop}%, 100% ${lineTop}%, 100% 100%, 0% 100%)`;
        lessonLayer.style.clipPath = `polygon(0 100%, 100% 100%, 100% 100%, 0 100%)`;
    } else {
        const lineTop = 100 - lessonProgress;
        line.style.top = `${lineTop}%`;
        
        solutionLayer.style.clipPath = `polygon(0 0, 100% 0, 100% 100%, 0 100%)`; // Keep fully visible
        lessonLayer.style.clipPath = `polygon(0 ${lineTop}%, 100% ${lineTop}%, 100% 100%, 0% 100%)`;
    }
}

window.addEventListener('scroll', () => {
    handleThreeLayerPeel('experience', 'exp-magic-line', 'exp-layer-sol', 'exp-layer-les');
    handleThreeLayerPeel('ethical-dilemma', 'dilemma-magic-line', 'dilemma-layer-sol', 'dilemma-layer-les');
});