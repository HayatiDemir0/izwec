const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const siblings = Array.from(entry.target.parentElement.children)
      .filter(el => el.hasAttribute('data-animate'));
    const idx = siblings.indexOf(entry.target);
    setTimeout(() => entry.target.classList.add('visible'), idx * 90);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.parentElement;
    const answer = item.querySelector('.faq-a');
    const isOpen = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(f => {
      f.classList.remove('active');
      f.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      f.querySelector('.faq-a').hidden = true;
    });
    if (!isOpen) {
      item.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
      answer.hidden = false;
    }
  });
});
const navbar = document.querySelector('.navbar');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 300) {
    navbar.style.transition = 'transform .3s ease';
    navbar.style.transform = y > lastY
      ? 'translateX(-50%) translateY(-120px)'
      : 'translateX(-50%) translateY(0)';
  } else {
    navbar.style.transform = 'translateX(-50%) translateY(0)';
  }
  lastY = y;
}, { passive: true });
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMenu(force) {
  const open = force !== undefined ? force : !hamburger.classList.contains('open');
  hamburger.classList.toggle('open', open);
  mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

hamburger.addEventListener('click', () => toggleMenu());
document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', () => toggleMenu(false)));
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});
document.querySelectorAll('.tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.transition = 'transform .2s cubic-bezier(.34,1.56,.64,1)';
  });
});