// ── Translations ───────────────────────────────────────────────
const TRANSLATIONS = {
  es: {
    'nav.services':       'Servicios',
    'nav.process':        'Proceso',
    'nav.pricing':        'Precios',
    'nav.contact':        'Contacto',
    'nav.cta':            'Hablar con nosotros',
    'hero.tag':           'Hacemos webs para negocios reales',
    'hero.line1':         'Tu empresa,',
    'hero.line2':         'visible',
    'hero.line3':         'en internet.',
    'hero.p':             'Si tu web no te trae clientes, algo falla.<br>Nosotros lo arreglamos.',
    'hero.cta':           'Pide presupuesto gratis',
    'hero.demo':          'Demo gratuita incluida',
    'svc.design':         'Diseño Web',
    'svc.design.desc':    'Webs que no parecen plantillas. Diseñamos desde cero pensando en tus clientes.',
    'svc.dev':            'Desarrollo Web',
    'svc.dev.desc':       'Rápidas, seguras y que funcionan bien en el móvil. Sin constructores de webs baratos.',
    'svc.seo.tag':        'Lo más pedido',
    'svc.seo.desc':       'Para que cuando alguien busque lo que ofreces en Google, aparezcas tú. No tu competencia.',
    'svc.shop':           'Tienda Online',
    'svc.shop.desc':      'Tu tienda completa lista para vender. Pagos, stock, pedidos — todo funcionando.',
    'svc.social':         'Redes Sociales',
    'svc.social.desc':    'Creamos y gestionamos tu perfil. Contenido que no parece corporativo.',
    'svc.email.desc':     'Newsletters que la gente abre. Mantén el contacto con tus clientes sin molestar.',
    'svc.maint':          'Mantenimiento Web',
    'svc.maint.desc':     'Para que tu web no se caiga, no se hackee y siempre esté actualizada.',
    'services.label':     '01 — Qué hacemos',
    'process.label':      '03 — Cómo trabajamos',
    'process.1.title':    'Nos cuentas qué necesitas',
    'process.1.desc':     'Una llamada o un mensaje basta. Sin formularios de 30 preguntas.',
    'process.2.title':    'Presupuesto en 24h',
    'process.2.desc':     'Detallado, con lo que incluye y lo que no. Sin sorpresas al final.',
    'process.3.title':    'Diseñamos juntos',
    'process.3.desc':     'Revisiones abiertas. Puedes ver el avance y pedir cambios en todo momento.',
    'process.4.title':    'Lanzamos y seguimos',
    'process.4.desc':     'No desaparecemos. Seguimos disponibles si algo falla o quieres crecer.',
    'work.label':         '04 — Proyectos',
    'work.type.restaurant': 'Restaurante ecológico',
    'work.type.studio':   'Estudio de pilates y yoga',
    'work.type.craft':    'Mobiliari artesanal',
    'work.see':           'Ver demo →',
    'pricing.label':      '02 — Precios',
    'pricing.cta.price':  'Webs desde <span>299€</span>',
    'pricing.cta.sub':    'Cada negocio es diferente, así que el precio final depende de lo que necesites. Cuéntanos tu proyecto y te mandamos un presupuesto sin compromiso.',
    'pricing.cta.btn':    'Pide tu presupuesto gratis',
    'contact.label':      '05 — Contacto',
    'contact.title':      '¿Hablamos?',
    'contact.desc':       'Cuéntanos qué tienes en mente. Te respondemos en menos de 24 horas.',
    'contact.name':       'Nombre',
    'contact.select':     '¿Qué necesitas?',
    'contact.msg':        'Cuéntanos tu proyecto...',
    'contact.send':       'Enviar mensaje',
    'contact.note':       'Respondemos en menos de 24h — normalmente antes',
    'contact.advice':         'No sé, necesito consejo',
    'services.overlay.cta.text': '¿Algún servicio te interesa?',
    'services.overlay.cta.btn':  'Hablemos →',
    'overlay.back':              'Volver',
    'svc.design.b1': 'Diseño 100% a medida',
    'svc.design.b2': 'Revisiones ilimitadas',
    'svc.design.b3': 'Lista en 2–3 semanas',
    'svc.dev.b1':    'Código limpio y optimizado',
    'svc.dev.b2':    'Carga ultrarrápida',
    'svc.dev.b3':    'SSL y seguridad incluida',
    'svc.seo.b1':    'Auditoría inicial gratuita',
    'svc.seo.b2':    'Alta en Google Search Console',
    'svc.seo.b3':    'Seguimiento mensual',
    'svc.shop.b1':   'Pago con Stripe / PayPal',
    'svc.shop.b2':   'Gestión de stock y pedidos',
    'svc.shop.b3':   'Facturas automáticas',
    'svc.social.b1': 'Estrategia de contenido',
    'svc.social.b2': 'Diseño de publicaciones',
    'svc.social.b3': 'Gestión y publicación',
    'svc.email.b1':  'Diseño de newsletters',
    'svc.email.b2':  'Automatizaciones básicas',
    'svc.email.b3':  'Analíticas de apertura',
    'svc.maint.b1':  'Copias de seguridad diarias',
    'svc.maint.b2':  'Actualizaciones de seguridad',
    'svc.maint.b3':  'Monitorización 24/7',
  },
  ca: {
    'nav.team':           'Equip',
    'nav.services':       'Serveis',
    'nav.process':        'Procés',
    'nav.pricing':        'Preus',
    'nav.contact':        'Contacte',
    'nav.cta':            'Parlem-ne',
    'hero.tag':           'Fem webs per a negocis reals',
    'hero.line1':         'La teva empresa,',
    'hero.line2':         'visible',
    'hero.line3':         'a internet.',
    'hero.p':             'Si la teva web no et porta clients, alguna cosa falla.<br>Nosaltres ho arreglem.',
    'hero.cta':           'Demana pressupost gratis',
    'hero.demo':          'Demo gratuïta inclosa',
    'svc.design':         'Disseny Web',
    'svc.design.desc':    'Webs que no semblen plantilles. Dissenyem des de zero pensant en els teus clients.',
    'svc.dev':            'Desenvolupament Web',
    'svc.dev.desc':       'Ràpides, segures i que funcionen bé al mòbil. Sense constructors de webs barats.',
    'svc.seo.tag':        'El més demanat',
    'svc.seo.desc':       'Perquè quan algú busqui el que ofereixes a Google, apareguis tu. No la teva competència.',
    'svc.shop':           'Botiga Online',
    'svc.shop.desc':      'La teva botiga completa llesta per vendre. Pagaments, estoc, comandes — tot funcionant.',
    'svc.social':         'Xarxes Socials',
    'svc.social.desc':    'Creem i gestionem el teu perfil. Contingut que no sembla corporatiu.',
    'svc.email.desc':     'Newsletters que la gent obre. Mantén el contacte amb els teus clients sense molestar.',
    'svc.maint':          'Manteniment Web',
    'svc.maint.desc':     'Perquè la teva web no caigui, no es hackegi i sempre estigui actualitzada.',
    'services.label':     '01 — Què fem',
    'process.label':      '03 — Com treballem',
    'process.1.title':    'Ens expliques què necessites',
    'process.1.desc':     'Una trucada o un missatge és suficient. Sense formularis de 30 preguntes.',
    'process.2.title':    'Pressupost en 24h',
    'process.2.desc':     'Detallat, amb el que inclou i el que no. Sense sorpreses al final.',
    'process.3.title':    'Dissenyem junts',
    'process.3.desc':     'Revisions obertes. Pots veure el progrés i demanar canvis en tot moment.',
    'process.4.title':    'Llancem i seguim',
    'process.4.desc':     'No desapareixem. Seguim disponibles si alguna cosa falla o vols créixer.',
    'work.label':         '04 — Projectes',
    'work.type.restaurant': 'Restaurant ecològic',
    'work.type.studio':   'Estudi de pilates i ioga',
    'work.type.craft':    'Mobiliari artesanal',
    'work.see':           'Veure demo →',
    'pricing.label':      '02 — Preus',
    'pricing.cta.price':  'Webs des de <span>299€</span>',
    'pricing.cta.sub':    'Cada negoci és diferent, per això el preu final depèn del que necessitis. Explica\'ns el teu projecte i t\'enviem un pressupost sense compromís.',
    'pricing.cta.btn':    'Demana el teu pressupost gratis',
    'contact.label':      '05 — Contacte',
    'contact.title':      'Parlem?',
    'contact.desc':       'Explica\'ns què tens al cap. Et responem en menys de 24 hores.',
    'contact.name':       'Nom',
    'contact.select':     'Què necessites?',
    'contact.msg':        'Explica\'ns el teu projecte...',
    'contact.send':       'Enviar missatge',
    'contact.note':       'Responem en menys de 24h — normalment abans',
    'contact.advice':         'No sé, necessito consell',
    'services.overlay.cta.text': 'Algun servei t\'interessa?',
    'services.overlay.cta.btn':  'Parlem →',
    'overlay.back':              'Tornar',
    'svc.design.b1': 'Disseny 100% a mida',
    'svc.design.b2': 'Revisions il·limitades',
    'svc.design.b3': 'Llesta en 2–3 setmanes',
    'svc.dev.b1':    'Codi net i optimitzat',
    'svc.dev.b2':    'Càrrega ultraràpida',
    'svc.dev.b3':    'SSL i seguretat inclosa',
    'svc.seo.b1':    'Auditoria inicial gratuïta',
    'svc.seo.b2':    'Alta a Google Search Console',
    'svc.seo.b3':    'Seguiment mensual',
    'svc.shop.b1':   'Pagament amb Stripe / PayPal',
    'svc.shop.b2':   'Gestió d\'estoc i comandes',
    'svc.shop.b3':   'Factures automàtiques',
    'svc.social.b1': 'Estratègia de contingut',
    'svc.social.b2': 'Disseny de publicacions',
    'svc.social.b3': 'Gestió i publicació',
    'svc.email.b1':  'Disseny de newsletters',
    'svc.email.b2':  'Automatitzacions bàsiques',
    'svc.email.b3':  'Analítiques d\'obertura',
    'svc.maint.b1':  'Còpies de seguretat diàries',
    'svc.maint.b2':  'Actualitzacions de seguretat',
    'svc.maint.b3':  'Monitorització 24/7',
  },
  en: {
    'nav.team':           'Team',
    'nav.services':       'Services',
    'nav.process':        'Process',
    'nav.pricing':        'Pricing',
    'nav.contact':        'Contact',
    'nav.cta':            'Talk to us',
    'hero.tag':           'We build websites for real businesses',
    'hero.line1':         'Your business,',
    'hero.line2':         'visible',
    'hero.line3':         'online.',
    'hero.p':             'If your website isn\'t bringing in clients, something\'s wrong.<br>We fix it.',
    'hero.cta':           'Get a free quote',
    'hero.demo':          'Free demo included',
    'svc.design':         'Web Design',
    'svc.design.desc':    'Websites that don\'t look like templates. Designed from scratch with your customers in mind.',
    'svc.dev':            'Web Development',
    'svc.dev.desc':       'Fast, secure and mobile-friendly. No cheap website builders.',
    'svc.seo.tag':        'Most requested',
    'svc.seo.desc':       'So that when someone searches what you offer on Google, they find you. Not your competition.',
    'svc.shop':           'Online Store',
    'svc.shop.desc':      'Your complete shop ready to sell. Payments, stock, orders — all working.',
    'svc.social':         'Social Media',
    'svc.social.desc':    'We create and manage your profile. Content that doesn\'t look corporate.',
    'svc.email.desc':     'Newsletters people actually open. Stay in touch with your clients without being annoying.',
    'svc.maint':          'Web Maintenance',
    'svc.maint.desc':     'So your website doesn\'t go down, doesn\'t get hacked, and is always up to date.',
    'services.label':     '01 — What we do',
    'process.label':      '03 — How we work',
    'process.1.title':    'You tell us what you need',
    'process.1.desc':     'A call or a message is enough. No 30-question forms.',
    'process.2.title':    'Quote in 24h',
    'process.2.desc':     'Detailed, with what\'s included and what\'s not. No surprises at the end.',
    'process.3.title':    'We design together',
    'process.3.desc':     'Open revisions. You can see the progress and request changes at any time.',
    'process.4.title':    'We launch and keep going',
    'process.4.desc':     'We don\'t disappear. We\'re still available if something breaks or you want to grow.',
    'work.label':         '04 — Projects',
    'work.type.restaurant': 'Organic restaurant',
    'work.type.studio':   'Pilates & yoga studio',
    'work.type.craft':    'Artisan furniture',
    'work.see':           'View demo →',
    'pricing.label':      '02 — Pricing',
    'pricing.cta.price':  'Websites from <span>€299</span>',
    'pricing.cta.sub':    'Every business is different, so the final price depends on what you need. Tell us about your project and we\'ll send you a no-obligation quote.',
    'pricing.cta.btn':    'Get your free quote',
    'contact.label':      '05 — Contact',
    'contact.title':      'Let\'s talk?',
    'contact.desc':       'Tell us what you have in mind. We\'ll get back to you in less than 24 hours.',
    'contact.name':       'Name',
    'contact.select':     'What do you need?',
    'contact.msg':        'Tell us about your project...',
    'contact.send':       'Send message',
    'contact.note':       'We reply in under 24h — usually sooner',
    'contact.advice':         'Not sure, I need advice',
    'services.overlay.cta.text': 'Interested in a service?',
    'services.overlay.cta.btn':  'Let\'s talk →',
    'overlay.back':              'Back',
    'svc.design.b1': '100% custom design',
    'svc.design.b2': 'Unlimited revisions',
    'svc.design.b3': 'Ready in 2–3 weeks',
    'svc.dev.b1':    'Clean, optimized code',
    'svc.dev.b2':    'Ultra-fast loading',
    'svc.dev.b3':    'SSL and security included',
    'svc.seo.b1':    'Free initial audit',
    'svc.seo.b2':    'Google Search Console setup',
    'svc.seo.b3':    'Monthly tracking',
    'svc.shop.b1':   'Stripe / PayPal payments',
    'svc.shop.b2':   'Stock and order management',
    'svc.shop.b3':   'Automatic invoices',
    'svc.social.b1': 'Content strategy',
    'svc.social.b2': 'Post design',
    'svc.social.b3': 'Publishing and management',
    'svc.email.b1':  'Newsletter design',
    'svc.email.b2':  'Basic automations',
    'svc.email.b3':  'Open rate analytics',
    'svc.maint.b1':  'Daily backups',
    'svc.maint.b2':  'Security updates',
    'svc.maint.b3':  '24/7 monitoring',
  },
};

function setLang(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  document.documentElement.lang = lang;
}

// ── Overlay helpers ────────────────────────────────────────────
function openOverlay(el) {
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
  const first = el.querySelector('input, button:not([id$="close"])');
  if (first) first.focus();
}
function closeOverlay(el) {
  el.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Services overlay ───────────────────────────────────────────
const servicesOverlay = document.getElementById('services-overlay');

document.querySelectorAll('.js-services-overlay').forEach(el => {
  el.addEventListener('click', e => { e.preventDefault(); openOverlay(servicesOverlay); });
});
document.querySelectorAll('#svc-overlay-close, #svc-overlay-close-mobile').forEach(btn => {
  btn.addEventListener('click', () => closeOverlay(servicesOverlay));
});
document.querySelectorAll('.js-close-svc').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    closeOverlay(servicesOverlay);
    const target = el.getAttribute('href');
    if (target && !el.classList.contains('js-contact-overlay')) {
      setTimeout(() => document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' }), 300);
    }
  });
});

// ── Contact overlay ────────────────────────────────────────────
const contactOverlay = document.getElementById('contact-overlay');
const overlayClose   = document.getElementById('overlay-close');

document.querySelectorAll('.js-contact-overlay').forEach(el => {
  el.addEventListener('click', e => { e.preventDefault(); openOverlay(contactOverlay); });
});
overlayClose.addEventListener('click', () => closeOverlay(contactOverlay));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeOverlay(contactOverlay);
    closeOverlay(servicesOverlay);
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

// ── Language switcher ──────────────────────────────────────────
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});
setLang('ca');

// ── Active nav highlight ───────────────────────────────────────
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

async function handleFormspree(formEl) {
  const btn  = formEl.querySelector('button[type="submit"]');
  const orig = btn.textContent;
  btn.textContent = 'Enviando...';
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
}

document.getElementById('form').addEventListener('submit', function(e) {
  e.preventDefault(); handleFormspree(this);
});

document.getElementById('form-overlay').addEventListener('submit', function(e) {
  e.preventDefault(); handleFormspree(this);
});
