// ── Overlay helpers ────────────────────────────────────────────
function openOverlay(el) {
  if (!el) return;
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
  const first = el.querySelector('input, button:not([id$="close"])');
  if (first) first.focus();
}
function closeOverlay(el) {
  if (!el) return;
  el.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Contact overlay ────────────────────────────────────────────
const contactOverlay = document.getElementById('contact-overlay');
const overlayClose   = document.getElementById('overlay-close');

document.querySelectorAll('.js-contact-overlay').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    openOverlay(contactOverlay);
  });
});
overlayClose?.addEventListener('click', () => closeOverlay(contactOverlay));

// Qualsevol link del navbar/drawer que no sigui trigger d'overlay tanca els overlays oberts
document.querySelectorAll('#navbar a:not(.js-contact-overlay), .nav-drawer a:not(.js-contact-overlay)').forEach(el => {
  el.addEventListener('click', () => {
    if (contactOverlay?.classList.contains('open')) closeOverlay(contactOverlay);
  });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeOverlay(contactOverlay);
  }
});

// ── Mobile services accordion ──────────────────────────────────
function initAccordion() {
  if (window.innerWidth >= 900) return;
  document.querySelectorAll('#servicios .svc-row').forEach(row => {
    if (row.querySelector('.svc-row-toggle')) return;
    const head = row.querySelector('.svc-head');
    const desc = row.querySelector('.svc-desc');
    const chevron = document.createElement('span');
    chevron.className = 'svc-chevron';
    chevron.textContent = '↓';
    const toggle = document.createElement('div');
    toggle.className = 'svc-row-toggle';
    toggle.appendChild(head);
    toggle.appendChild(chevron);
    row.prepend(toggle);
    toggle.addEventListener('click', () => row.classList.toggle('expanded'));
  });
}
window.addEventListener('DOMContentLoaded', initAccordion);

// ── Scroll progress bar ────────────────────────────────────────
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  if (progressBar) progressBar.style.width = pct + '%';
}, { passive: true });

// ── Navbar scroll ──────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Hamburger ─────────────────────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const drawer    = document.querySelector('.nav-drawer');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  drawer.classList.toggle('open');
});
drawer?.querySelectorAll('a').forEach(a => {
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

// ── Hero pop box ───────────────────────────────────────────────
const POP_TEXTS = {
  es: ['Desde 299€', 'Las mejores webs de Catalunya'],
  ca: ['Des de 299€', 'Les millors webs de Catalunya'],
  en: ['From €299', 'The best websites in Catalonia'],
};

window.addEventListener('DOMContentLoaded', () => {
  const popWrap = document.getElementById('hero-pop-wrap');
  const popText = document.getElementById('hero-pop-text');
  if (!popWrap || !popText) return;

  let popIndex = 0;

  setTimeout(() => {
    popWrap.classList.add('pop');

    setInterval(() => {
      popText.classList.add('swap');
      setTimeout(() => {
        const texts = POP_TEXTS[document.documentElement.lang] || POP_TEXTS.ca;
        popIndex = (popIndex + 1) % texts.length;
        popText.textContent = texts[popIndex];
        popText.classList.remove('swap');
      }, 250);
    }, 3000);
  }, 2200);
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

document.querySelectorAll('#servicios .svc-row').forEach((el, i) => {
  el.classList.add('sr');
  el.dataset.delay = i * 60;
  observer.observe(el);
});

document.querySelectorAll('.process-card').forEach((el, i) => {
  el.classList.add('sr');
  el.dataset.delay = i * 100;
  observer.observe(el);
});

document.querySelectorAll('.plan').forEach((el, i) => {
  el.classList.add('sr');
  el.dataset.delay = i * 120;
  observer.observe(el);
});

const cl = document.querySelector('.contact-left');
const cf = document.getElementById('form');
if (cl) { cl.classList.add('sr', 'sr-left'); observer.observe(cl); }
if (cf) { cf.classList.add('sr', 'sr-right'); cf.dataset.delay = 150; observer.observe(cf); }

const fb = document.querySelector('.footer-big');
if (fb) { fb.classList.add('sr'); observer.observe(fb); }

// ── Clock (Europe/Madrid = Barcelona) ─────────────────────────
const clockEl = document.getElementById('nav-clock');
function updateClock() {
  if (!clockEl) return;
  const now = new Date();
  clockEl.textContent = now.toLocaleTimeString('es-ES', {
    timeZone: 'Europe/Madrid',
    hour: '2-digit',
    minute: '2-digit',
  });
}
updateClock();
setInterval(updateClock, 1000);

// ── Language ───────────────────────────────────────────────────
// Cada idioma té les seves pròpies URLs (/ i /es/); el selector són enllaços normals.
// Neteja la preferència antiga, de quan la traducció es feia al navegador.
try { localStorage.removeItem('lang'); } catch {}

// ── Active nav highlight ───────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.classList.contains('nav-active')) return;
    const key = a.dataset.section || (a.getAttribute('href') || '').replace(/^\/?#/, '');
    a.style.color = key === cur ? 'var(--accent)' : '';
  });
}, { passive: true });

// ── Cookie consent ────────────────────────────────────────────
const cookieBanner = document.getElementById('cookie-banner');
const cookieConsent = localStorage.getItem('cookie-consent');

if (!cookieConsent && cookieBanner) {
  setTimeout(() => cookieBanner.classList.add('visible'), 1200);
}

document.getElementById('cookie-accept')?.addEventListener('click', () => {
  localStorage.setItem('cookie-consent', 'accepted');
  cookieBanner?.classList.remove('visible');
  loadGTM();
});

document.getElementById('cookie-reject')?.addEventListener('click', () => {
  localStorage.setItem('cookie-consent', 'rejected');
  cookieBanner?.classList.remove('visible');
});

// ── Contact form → Formspree ───────────────────────────────────
const FORMSPREE_ID = 'xgoqdkjb';

const FORM_TEXTS = {
  ca: { sending: 'Enviant...', ok: 'Missatge rebut', okSub: 'Et responem en menys de 24h.',
        error: 'Alguna cosa ha fallat. Escriu-nos a equip.impulsodigital@gmail.com',
        offline: 'Sense connexió. Escriu-nos a equip.impulsodigital@gmail.com' },
  es: { sending: 'Enviando...', ok: 'Mensaje recibido', okSub: 'Te respondemos en menos de 24h.',
        error: 'Algo salió mal. Escríbenos a equip.impulsodigital@gmail.com',
        offline: 'Sin conexión. Escríbenos a equip.impulsodigital@gmail.com' },
};

async function handleFormspree(formEl) {
  const btn  = formEl.querySelector('button[type="submit"]');
  const orig = btn.textContent;
  const t    = FORM_TEXTS[document.documentElement.lang] || FORM_TEXTS.ca;
  btn.textContent = t.sending;
  btn.disabled = true;
  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      body: new FormData(formEl),
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'contact_form_submit' });
      formEl.innerHTML = `
        <div style="padding:2rem 0;text-align:center">
          <div style="font-size:2.5rem;margin-bottom:1rem;color:var(--accent)">✓</div>
          <p style="font-size:1.1rem;font-weight:700;color:var(--fg);margin-bottom:0.5rem">${t.ok}</p>
          <p style="color:var(--muted);font-size:0.9rem">${t.okSub}</p>
        </div>
      `;
    } else {
      btn.textContent = orig;
      btn.disabled = false;
      alert(t.error);
    }
  } catch {
    btn.textContent = orig;
    btn.disabled = false;
    alert(t.offline);
  }
}

document.getElementById('form')?.addEventListener('submit', function(e) {
  e.preventDefault(); handleFormspree(this);
});

document.getElementById('form-overlay')?.addEventListener('submit', function(e) {
  e.preventDefault(); handleFormspree(this);
});
