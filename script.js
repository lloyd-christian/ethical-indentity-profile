const navbar = document.querySelector('.navbar');
const stickyPanels = document.querySelectorAll('.sticky-panel');

window.addEventListener('scroll', () => {
    if (navbar.classList.contains('hidden')) {
        stickyPanels.forEach(panel => {
            panel.style.top = '0px';
            panel.style.height = '100vh';
        });
    } else {
        stickyPanels.forEach(panel => {
            panel.style.top = '70px';
            panel.style.height = 'calc(100vh - 70px)';
        });
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
document.addEventListener("DOMContentLoaded", () => {
    const scrollSections = document.querySelectorAll(".scroll-story-section");

    scrollSections.forEach((section) => {
        const steps = section.querySelectorAll(".progress-step");
        const blocks = section.querySelectorAll(".story-block");

        const observerOptions = {
            root: null,
            rootMargin: "-30% 0px -40% 0px",
            threshold: 0.1
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const stepIndex = entry.target.getAttribute("data-step");

                    steps.forEach((step) => step.classList.remove("active"));

                    if (steps[stepIndex]) {
                        steps[stepIndex].classList.add("active");
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        blocks.forEach((block) => observer.observe(block));
    });
});