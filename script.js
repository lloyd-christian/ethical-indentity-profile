// For NavBar Hide
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

// For subNav
const siteSections = [
    { id: 'who-am-i', label: 'WHO AM I?', type: 'standard' },
    { id: 'moral-compass', label: 'MY MORAL COMPASS', type: 'standard' },
    { 
        id: 'experience', 
        label: 'THE EXPERIENCE', 
        type: 'peel', 
        layers: ['exp-layer-1', 'exp-layer-2', 'exp-layer-3', 'exp-layer-4', 'exp-layer-5'], 
        steps: ['TITLE', 'PROBLEM', 'SOLUTION', 'RESULT', 'LESSON'], 
        lineId: 'exp-magic-line' 
    },
    { 
        id: 'ethical-dilemma', 
        label: 'ETHICAL DILEMMA', 
        type: 'peel', 
        layers: ['dilemma-layer-1', 'dilemma-layer-2', 'dilemma-layer-3', 'dilemma-layer-4', 'dilemma-layer-5'], 
        steps: ['TITLE', 'PROBLEM', 'SOLUTION', 'RESULT', 'VALUE'], 
        lineId: 'dilemma-magic-line' 
    },
    { id: 'personal-ethics-definition', label: 'FOR ME, ETHICS IS...', type: 'standard' },
    { id: 'end-of-course', label: 'AT THE END...', type: 'standard' },
    { id: 'the-motto', label: 'THE MOTTO', type: 'standard' }
];

function updateContextualNavigation() {
    const subNav = document.getElementById('contextual-subnav');
    if (!subNav) return;

    let activeSection = null;
    let maxVisibleHeight = 0;

    siteSections.forEach(secConfig => {
        const element = document.getElementById(secConfig.id);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));

        if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            activeSection = { config: secConfig, rect, element };
        }
    });

    if (!activeSection || maxVisibleHeight < 50) {
        subNav.classList.remove('active');
        return;
    }

    subNav.classList.add('active');

    const titleElement = subNav.querySelector('.subnav-section-title');
    const fillElement = subNav.querySelector('.subnav-progress-fill');

    if (!titleElement || !fillElement) return;

    titleElement.textContent = activeSection.config.label;

    const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const globalProgress = totalScrollableHeight > 0 ? (window.pageYOffset || document.documentElement.scrollTop) / totalScrollableHeight : 0;
    const globalProgressPercent = Math.max(0, Math.min(100, globalProgress * 100));

    fillElement.style.width = `${globalProgressPercent}%`;

    if (activeSection.config.type === 'peel') {
        const { config, element } = activeSection;
        const line = document.getElementById(config.lineId);
        const layers = config.layers.map(id => document.getElementById(id));

        if (line && !layers.some(layer => !layer)) {
            const runwayHeight = element.offsetHeight;
            let sectionProgress = -activeSection.rect.top / (runwayHeight - window.innerHeight);
            sectionProgress = Math.max(0, Math.min(1, sectionProgress));

            const step = 0.25;
            const activeTransitionIndex = Math.min(3, Math.floor(sectionProgress / step));
            const getLayerProgress = (index) => {
                const start = (index - 1) * step;
                let subProgress = (sectionProgress - start) / step;
                return Math.max(0, Math.min(1, subProgress)) * 100;
            };

            const activeSubProgress = getLayerProgress(activeTransitionIndex + 1);
            const lineTop = 100 - activeSubProgress;

            line.style.top = `${lineTop}%`;

            layers.forEach((layer, index) => {
                if (index === 0) {
                    layer.style.clipPath = 'none';
                } else if (index < activeTransitionIndex + 1) {
                    layer.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
                } else if (index === activeTransitionIndex + 1) {
                    layer.style.clipPath = `polygon(0 ${lineTop}%, 100% ${lineTop}%, 100% 100%, 0% 100%)`;
                } else {
                    layer.style.clipPath = 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)';
                }
            });
        }
    } else {
        fillElement.style.backgroundColor = 'var(--orange)';
    }
}

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateContextualNavigation();
            ticking = false;
        });
        ticking = true;
    }
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

// Card Flip Interaction
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

// Rotating Credits Footer
const creditsList = [
    "Jon Tyson & Ryan Stefan (Unsplash)",
    "GraphicSauce (Neobrutalism Symbols)",
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