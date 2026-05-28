// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMobile = document.querySelector('.nav-mobile');
hamburger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMobile.classList.remove('open'));
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .portfolio-card, .section-header, .contact-left, .contact-form').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Contact form
document.getElementById('form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  // Simulate send (replace with real backend/formspree/etc.)
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

// Smooth active nav link highlight
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? '#a78bfa' : '';
  });
});
