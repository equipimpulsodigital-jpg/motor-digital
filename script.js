// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMobile = document.querySelector('.nav-mobile');
hamburger.addEventListener('click', () => navMobile.classList.toggle('open'));
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMobile.classList.remove('open'));
});

// ── HERO entrance ──────────────────────────────────────────────
function animateHero() {
  const els = [
    { el: document.querySelector('.badge'),       delay: 100,  cls: 'anim-drop' },
    { el: document.querySelector('.hero-content h1'), delay: 280, cls: 'anim-rise' },
    { el: document.querySelector('.hero-content p'),  delay: 500, cls: 'anim-rise' },
    { el: document.querySelector('.hero-ctas'),   delay: 680,  cls: 'anim-rise' },
    { el: document.querySelector('.hero-stats'),  delay: 860,  cls: 'anim-rise' },
  ];
  els.forEach(({ el, delay, cls }) => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = cls === 'anim-drop' ? 'translateY(-20px)' : 'translateY(32px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, delay);
  });
}

// ── Scroll-reveal with stagger ─────────────────────────────────
function reveal(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const delay = parseInt(el.dataset.delay || 0);
    setTimeout(() => el.classList.add('visible'), delay);
    observer.unobserve(el);
  });
}

const scrollObserver = new IntersectionObserver(reveal, { threshold: 0.12 });

// Section headers — slide up
document.querySelectorAll('.section-header').forEach(el => {
  el.classList.add('sr', 'sr-up');
  scrollObserver.observe(el);
});

// Service cards — stagger slide up
document.querySelectorAll('.service-card').forEach((el, i) => {
  el.classList.add('sr', 'sr-up');
  el.dataset.delay = i * 90;
  scrollObserver.observe(el);
});

// Pricing cards — stagger up, featured in the middle pops last
document.querySelectorAll('.pricing-card').forEach((el, i) => {
  el.classList.add('sr', 'sr-up');
  el.dataset.delay = i * 130;
  scrollObserver.observe(el);
});

// Process steps — stagger up
document.querySelectorAll('.process-item').forEach((el, i) => {
  el.classList.add('sr', 'sr-up');
  el.dataset.delay = i * 120;
  scrollObserver.observe(el);
});

// Process CTA
const processCta = document.querySelector('.process-cta');
if (processCta) { processCta.classList.add('sr', 'sr-up'); processCta.dataset.delay = 480; scrollObserver.observe(processCta); }

// Contact halves — left from left, form from right
const contactLeft = document.querySelector('.contact-left');
const contactForm = document.querySelector('.contact-form');
if (contactLeft) { contactLeft.classList.add('sr', 'sr-left'); scrollObserver.observe(contactLeft); }
if (contactForm) { contactForm.classList.add('sr', 'sr-right'); contactForm.dataset.delay = 150; scrollObserver.observe(contactForm); }

// ── Animated counter for hero stats ───────────────────────────
function animateCounter(el, target, suffix, duration = 1400) {
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    statsObserver.unobserve(entry.target);
    document.querySelectorAll('.stat strong[data-count]').forEach(el => {
      animateCounter(el, parseInt(el.dataset.count), el.dataset.suffix || '');
    });
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ── Typewriter for gradient text ──────────────────────────────
function typewriter(el, text, speed = 55) {
  el.textContent = '';
  el.style.borderRight = '3px solid #a78bfa';
  let i = 0;
  const type = () => {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(type, speed);
    } else {
      setTimeout(() => el.style.borderRight = 'none', 600);
    }
  };
  setTimeout(type, 900);
}

const gradientText = document.querySelector('.gradient-text');
if (gradientText) {
  const original = gradientText.textContent;
  typewriter(gradientText, original);
}

// ── Contact form ───────────────────────────────────────────────
document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.innerHTML = '<span class="spinner"></span> Enviando...';
  btn.disabled = true;

  setTimeout(() => {
    this.innerHTML = `
      <div class="form-success" style="display:block">
        <div style="font-size:3rem;margin-bottom:1rem">🎉</div>
        <h3>¡Mensaje enviado!</h3>
        <p>Te respondemos en menos de 24h. ¡Gracias por contactar con Impulso Digital!</p>
      </div>
    `;
  }, 1200);
});

// ── Active nav link ────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? '#a78bfa' : '';
  });
}, { passive: true });

// ── Cursor glow that follows the mouse ────────────────────────
const glow = document.createElement('div');
glow.id = 'cursor-glow';
document.body.appendChild(glow);
let mx = 0, my = 0, gx = 0, gy = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function loop() {
  gx += (mx - gx) * 0.08;
  gy += (my - gy) * 0.08;
  glow.style.transform = `translate(${gx - 150}px, ${gy - 150}px)`;
  requestAnimationFrame(loop);
})();

// ── Init ───────────────────────────────────────────────────────
animateHero();
