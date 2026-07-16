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

card.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        
        card.classList.remove('is-flipped');
        
        setTimeout(() => {
            window.location.hash = targetId;
        }, 400); 
        return;
    }

    card.classList.toggle('is-flipped');
});

card.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        card.classList.toggle('is-flipped');
    }
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
        
        solutionLayer.style.clipPath = `polygon(0 0, 100% 0, 100% 100%, 0 100%)`;
        lessonLayer.style.clipPath = `polygon(0 ${lineTop}%, 100% ${lineTop}%, 100% 100%, 0% 100%)`;
    }
}

window.addEventListener('scroll', () => {
    handleThreeLayerPeel('experience', 'exp-magic-line', 'exp-layer-sol', 'exp-layer-les');
    handleThreeLayerPeel('ethical-dilemma', 'dilemma-magic-line', 'dilemma-layer-sol', 'dilemma-layer-les');
});


// For credits
const creditsList = [
    "GraphicSymbols (Neobrutalism Symbols)",
    "Google (Material Symbols and Fonts)",
];

let currentCreditIndex = 0;
const creditElement = document.getElementById("credit-display-box");

function rotateCredits() {
    if (!creditElement) return;

    creditElement.classList.add("fade-hidden");

    setTimeout(() => {
        currentCreditIndex = (currentCreditIndex + 1) % creditsList.length;
        creditElement.textContent = creditsList[currentCreditIndex];
        
        creditElement.classList.remove("fade-hidden");
    }, 400);
}

setInterval(rotateCredits, 4000);