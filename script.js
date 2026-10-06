const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-header nav');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); toggle?.setAttribute('aria-expanded', 'false');
}));
document.querySelector('form')?.addEventListener('submit', event => {
  event.preventDefault();
  const name = event.currentTarget.querySelector('input').value;
  event.currentTarget.innerHTML = `<p class="form-success">Thank you${name ? `, ${name}` : ''}. Your journey starts here — we’ll be in touch soon.</p>`;
});
// Page transitions and scroll reveals.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) {
  document.documentElement.classList.add('js');
  requestAnimationFrame(() => document.documentElement.classList.add('page-ready'));

  const revealItems = [
    ...document.querySelectorAll('main > section:not(.hero):not(.page-hero)'),
    ...document.querySelectorAll('.service-card'),
  ];
  const revealObserver = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -40px' },
  );

  revealItems.forEach((item, index) => {
    item.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 80}ms`);
    revealObserver.observe(item);
  });
}
