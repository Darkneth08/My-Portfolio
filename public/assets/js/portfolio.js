document.addEventListener('DOMContentLoaded', () => {
    const doc = document.documentElement;
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const themeToggle = document.getElementById('themeToggle');
    const progress = document.querySelector('.scroll-progress span');
    const backToTop = document.getElementById('backToTop');
    const year = document.getElementById('year');
    const typedText = document.getElementById('typedText');
    const cursorGlow = document.querySelector('.cursor-glow');
    const canvas = document.getElementById('spaceCanvas');

    if (year) year.textContent = new Date().getFullYear();

    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    doc.setAttribute('data-theme', savedTheme);
    if (themeToggle) {
        themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
        themeToggle.addEventListener('click', () => {
            const current = doc.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            doc.setAttribute('data-theme', current);
            localStorage.setItem('portfolio-theme', current);
            themeToggle.innerHTML = current === 'dark' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
        });
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            menuToggle.classList.toggle('active');
        });
        navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            menuToggle.classList.remove('active');
        }));
    }

    const words = ['Laravel web systems', 'admin dashboards', 'database-driven apps', 'smooth interfaces', 'professional portfolio systems'];
    let wordIndex = 0;
    let letterIndex = 0;
    let deleting = false;

    function typeLoop() {
        if (!typedText) return;
        const word = words[wordIndex];
        typedText.style.opacity = deleting ? '.82' : '1';
        typedText.textContent = deleting ? word.slice(0, letterIndex--) : word.slice(0, letterIndex++);

        if (!deleting && letterIndex > word.length + 14) deleting = true;
        if (deleting && letterIndex < 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(typeLoop, deleting ? 36 : 68);
    }
    typeLoop();

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('show');
        });
    }, { threshold: 0.14 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    function updateScrollState() {
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = height > 0 ? (window.scrollY / height) * 100 : 0;
        if (progress) progress.style.width = `${ratio}%`;
        if (backToTop) backToTop.classList.toggle('show', window.scrollY > 600);

        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 180) current = section.id;
        });
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
    }
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });

    if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;
            document.querySelectorAll('.project-card').forEach(card => {
                const visible = filter === 'all' || card.dataset.category === filter;
                card.style.display = visible ? 'block' : 'none';
            });
        });
    });

    if (cursorGlow) {
        window.addEventListener('pointermove', event => {
            cursorGlow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
        }, { passive: true });
    }

    if (canvas) {
        const ctx = canvas.getContext('2d');
        const pointer = { x: 0, y: 0, active: false };
        let particles = [];
        let width = 0;
        let height = 0;
        let frame = 0;

        function resizeCanvas() {
            width = canvas.width = window.innerWidth * window.devicePixelRatio;
            height = canvas.height = window.innerHeight * window.devicePixelRatio;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            const count = Math.min(120, Math.floor(window.innerWidth / 12));
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                z: Math.random() * 1 + .2,
                vx: (Math.random() - .5) * .32,
                vy: (Math.random() - .5) * .32,
                size: Math.random() * 2.2 + .8,
            }));
        }

        function drawSpace() {
            if (!ctx) return;
            frame += .008;
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'rgba(5, 8, 22, .22)';
            ctx.fillRect(0, 0, width, height);

            particles.forEach((particle, index) => {
                const depth = particle.z * window.devicePixelRatio;
                particle.x += particle.vx * depth;
                particle.y += particle.vy * depth;

                if (pointer.active) {
                    const dx = pointer.x * window.devicePixelRatio - particle.x;
                    const dy = pointer.y * window.devicePixelRatio - particle.y;
                    const distance = Math.hypot(dx, dy);
                    if (distance < 180 * window.devicePixelRatio) {
                        particle.x -= dx * .002;
                        particle.y -= dy * .002;
                    }
                }

                if (particle.x < 0) particle.x = width;
                if (particle.x > width) particle.x = 0;
                if (particle.y < 0) particle.y = height;
                if (particle.y > height) particle.y = 0;

                const glow = .45 + Math.sin(frame * 3 + index) * .25;
                ctx.beginPath();
                ctx.fillStyle = `rgba(34, 211, 238, ${glow})`;
                ctx.arc(particle.x, particle.y, particle.size * depth, 0, Math.PI * 2);
                ctx.fill();

                for (let i = index + 1; i < particles.length; i += 1) {
                    const other = particles[i];
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.hypot(dx, dy);
                    const max = 105 * window.devicePixelRatio;
                    if (distance < max) {
                        ctx.strokeStyle = `rgba(124, 58, 237, ${(.12 * (1 - distance / max)).toFixed(3)})`;
                        ctx.lineWidth = window.devicePixelRatio;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(drawSpace);
        }

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('pointermove', event => {
            pointer.x = event.clientX;
            pointer.y = event.clientY;
            pointer.active = true;
        }, { passive: true });
        window.addEventListener('pointerleave', () => pointer.active = false);
        resizeCanvas();
        drawSpace();
    }

    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', event => {
            const rect = card.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
            const y = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
            card.style.transform = `rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => card.style.transform = '');
    });
});
