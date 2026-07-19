// ── Scroll Progress Bar ──
const bar = document.getElementById('scroll-progress');
if (bar) {
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / max * 100) + '%';
  }, { passive: true });
}

// ── Letter-by-letter title animation ──
const titleEl = document.querySelector('.site-title');
if (titleEl) {
  const text = titleEl.textContent;
  titleEl.innerHTML = '';
  [...text].forEach((ch, i) => {
    const s = document.createElement('span');
    s.textContent = ch === ' ' ? '\u00A0' : ch;
    s.style.animationDelay = (0.5 + i * 0.05) + 's';
    titleEl.appendChild(s);
  });
}

// ── Intersection Observer for scroll animations ──
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // stagger hobby list items
      if (e.target.classList.contains('hobby-panel')) {
        e.target.querySelectorAll('li').forEach((li, i) => {
          setTimeout(() => li.classList.add('visible'), i * 150);
        });
      }
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll(
  '.fade-up, .fade-left, .fade-right, .section-heading, .hobby-panel, .social-card, .cert-card'
).forEach(el => io.observe(el));

// stagger cards
document.querySelectorAll('.cards-grid .card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.15) + 's';
});

document.querySelectorAll('.socials-grid .social-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.1) + 's';
});

document.querySelectorAll('.certs-grid .cert-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.15) + 's';
});

// ── Social card hover glow ──
document.querySelectorAll('.social-card[data-color]').forEach(card => {
  const color = card.dataset.color;
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = `0 16px 40px ${color}30`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '';
  });
});
