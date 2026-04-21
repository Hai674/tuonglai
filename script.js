document.addEventListener('DOMContentLoaded', () => {
    // ========== TAB SWITCHING ==========
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            // Remove active from all buttons and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            // Add active to clicked button and corresponding panel
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');

            // Smooth scroll to top of content
            document.getElementById(targetTab).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // ========== KEYBOARD NAVIGATION ==========
    tabBtns.forEach((btn, index) => {
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (index + 1) % tabBtns.length;
                tabBtns[nextIndex].focus();
                tabBtns[nextIndex].click();
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = (index - 1 + tabBtns.length) % tabBtns.length;
                tabBtns[prevIndex].focus();
                tabBtns[prevIndex].click();
            }
        });
    });

    // ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(item);
    });

    // Observe cards
    document.querySelectorAll('.card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.08}s`;
        observer.observe(card);
    });
});
