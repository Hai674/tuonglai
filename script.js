document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    tabBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            // Update active tab
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Progress animation
            const progress = ((index + 1) / tabBtns.length) * 100;
            progressFill.style.width = progress + '%';
            progressText.textContent = Math.round(progress) + '%';
        });
    });

    // Auto-scroll smooth
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Counter animation
    function animateProgress() {
        let width = 0;
        const target = 75;
        const interval = setInterval(() => {
            if (width >= target) {
                clearInterval(interval);
            } else {
                width += 1;
                progressFill.style.width = width + '%';
                progressText.textContent = width + '%';
            }
        }, 30);
    }

    // Trigger initial animation
    setTimeout(animateProgress, 1000);

    // Parallax effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.container');
        parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
});
