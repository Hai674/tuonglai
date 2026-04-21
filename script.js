/* ========================================
   SCRIPT - TÔI CỦA 40 NĂM SAU
   Hiệu ứng sinh động
======================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // ========== TYPING EFFECT ==========
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent.trim();
        heroTitle.innerHTML = '';
        heroTitle.classList.add('typing');
        
        let charIndex = 0;
        const typeInterval = setInterval(() => {
            if (charIndex < text.length) {
                heroTitle.textContent += text.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typeInterval);
                heroTitle.classList.remove('typing');
                heroTitle.classList.add('blink');
            }
        }, 80);
    }

    // ========== PARTICLES BACKGROUND ==========
    createParticles();

    function createParticles() {
        const container = document.querySelector('.app');
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.cssText = `
                position: fixed;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: ${Math.random() > 0.5 ? '#4facfe' : '#00f2fe'};
                border-radius: 50%;
                opacity: ${Math.random() * 0.5 + 0.2};
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                pointer-events: none;
                z-index: 0;
            `;
            container.appendChild(particle);
            
            // Animate particle
            animateParticle(particle);
        }
    }

    function animateParticle(particle) {
        const duration = Math.random() * 20000 + 15000;
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const endX = Math.random() * window.innerWidth;
        const endY = Math.random() * window.innerHeight;
        
        particle.animate([
            { transform: 'translate(0, 0)', opacity: 0 },
            { opacity: 0.6 },
            { transform: `translate(${endX - startX}px, ${endY - startY}px)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'linear'
        }).onfinish = () => animateParticle(particle);
    }

    // ========== TAB SWITCHING ==========
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            
            // Animate out then in
            const panel = document.getElementById(targetTab);
            panel.style.animation = 'none';
            panel.offsetHeight;
            panel.style.animation = 'slideIn 0.5s ease forwards';
            
            setTimeout(() => {
                panel.classList.add('active');
                panel.style.animation = '';
            }, 50);

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
                const next = (index + 1) % tabBtns.length;
                tabBtns[next].focus();
                tabBtns[next].click();
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prev = (index - 1 + tabBtns.length) % tabBtns.length;
                tabBtns[prev].focus();
                tabBtns[prev].click();
            }
        });
    });

    // ========== INTERSECTION OBSERVER ==========
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-item').forEach((item, i) => {
        item.classList.add('animate-on-scroll');
        item.style.animationDelay = `${i * 0.08}s`;
        observer.observe(item);
    });

    document.querySelectorAll('.card').forEach((card, i) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${i * 0.1}s`;
        observer.observe(card);
    });

    document.querySelectorAll('.node-card').forEach((card, i) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${i * 0.1}s`;
        observer.observe(card);
    });

    document.querySelectorAll('.mindmap-branch').forEach((branch, i) => {
        branch.classList.add('animate-on-scroll');
        branch.style.animationDelay = `${i * 0.2}s`;
        observer.observe(branch);
    });

    // ========== FLOATING CARDS ==========
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ========== RIPPLE EFFECT ==========
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const rect = btn.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            btn.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ========== COUNTER ANIMATION ==========
    animateCounters();

    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // ========== PARALLAX SCROLL ==========
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - scrolled * 0.002;
        }
    });

    // ========== MAGNETIC EFFECT ==========
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
});
