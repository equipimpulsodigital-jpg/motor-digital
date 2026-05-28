// ── Custom cursor ──────────────────────────────────────────────
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');

if (cursor) {
  let cx = 0, cy = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });

  (function loop() {
    cx += (tx - cx) * 0.12;
    cy += (ty - cy) * 0.12;
    cursor.style.left    = cx + 'px';
    cursor.style.top     = cy + 'px';
    cursorDot.style.left = tx + 'px';
    cursorDot.style.top  = ty + 'px';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a, button, .svc-row, .plan, input, select, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// ── Scroll progress bar ────────────────────────────────────────
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  if (progressBar) progressBar.style.width = pct + '%';
}, { passive: true });

// ── Navbar scroll ──────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Hamburger ─────────────────────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const drawer    = document.querySelector('.nav-drawer');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  drawer.classList.toggle('open');
});
drawer.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
  });
});

// ── Hero text reveal ───────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#hero h1 .word').forEach((w, i) => {
    setTimeout(() => w.classList.add('visible'), 200 + i * 180);
  });
});

// ── Magnetic buttons ───────────────────────────────────────────
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) * 0.25;
    const dy   = (e.clientY - cy) * 0.25;
    this.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  el.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// ── Scroll reveal ──────────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el    = entry.target;
    const delay = parseInt(el.dataset.delay || 0);
    setTimeout(() => el.classList.add('visible'), delay);
    observer.unobserve(el);
  });
}, { threshold: 0.1 });

// Services rows
document.querySelectorAll('.svc-row').forEach((el, i) => {
  el.classList.add('sr');
  el.dataset.delay = i * 60;
  observer.observe(el);
});

// Process cards
document.querySelectorAll('.process-card').forEach((el, i) => {
  el.classList.add('sr');
  el.dataset.delay = i * 100;
  observer.observe(el);
});

// Pricing plans
document.querySelectorAll('.plan').forEach((el, i) => {
  el.classList.add('sr');
  el.dataset.delay = i * 120;
  observer.observe(el);
});

// Contact halves
const cl = document.querySelector('.contact-left');
const cf = document.getElementById('form');
if (cl) { cl.classList.add('sr', 'sr-left'); observer.observe(cl); }
if (cf) { cf.classList.add('sr', 'sr-right'); cf.dataset.delay = 150; observer.observe(cf); }

// Footer big text
const fb = document.querySelector('.footer-big');
if (fb) { fb.classList.add('sr'); observer.observe(fb); }

// Clock (Europe/Madrid = Barcelona)
const clockEl = document.getElementById('nav-clock');
function updateClock() {
  if (!clockEl) return;
  const now = new Date();
  clockEl.textContent = now.toLocaleTimeString('es-ES', {
    timeZone: 'Europe/Madrid',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
updateClock();
setInterval(updateClock, 1000);

// Language switcher
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
  });
});

// Active nav highlight
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === `#${cur}` ? 'var(--fg)' : '';
  });
}, { passive: true });

// ── Contact form → Formspree ───────────────────────────────────
const FORMSPREE_ID = 'xgoqdkjb';

document.getElementById('form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const orig = btn.textContent;
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      body: new FormData(this),
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      this.innerHTML = `
        <div style="padding:2rem 0;text-align:center">
          <div style="font-size:2.5rem;margin-bottom:1rem;color:var(--accent)">✓</div>
          <p style="font-size:1.1rem;font-weight:700;color:var(--fg);margin-bottom:0.5rem">Mensaje recibido</p>
          <p style="color:var(--muted);font-size:0.9rem">Te respondemos en menos de 24h.</p>
        </div>
      `;
    } else {
      btn.textContent = orig;
      btn.disabled = false;
      alert('Algo salió mal. Escríbenos a equip.impulsodigital@gmail.com');
    }
  } catch {
    btn.textContent = orig;
    btn.disabled = false;
    alert('Sin conexión. Escríbenos a equip.impulsodigital@gmail.com');
  }
});
