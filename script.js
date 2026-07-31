// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// Status board: stagger rows in (JS adds the pre-anim state itself,
// so content is never hidden if this script fails to run), then start an uptime counter
const statusRows = document.querySelectorAll('.status-row');
statusRows.forEach(row => {
  row.classList.add('pre-anim');
  const delay = Number(row.dataset.delay || 0);
  setTimeout(() => row.classList.add('is-visible'), 200 + delay * 180);
});

const uptimeEl = document.getElementById('uptimeCounter');
if (uptimeEl) {
  let seconds = 0;
  const format = n => String(n).padStart(2, '0');
  setInterval(() => {
    seconds += 1;
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    uptimeEl.textContent = `${format(h)}:${format(m)}:${format(s)}`;
  }, 1000);
}

// Scroll-reveal for sections (progressive enhancement: JS adds the
// hidden starting state itself, so the page works fine even if this fails)
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  revealEls.forEach(el => el.classList.add('pre-anim'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));
}
