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
    item.classList.add('will-reveal');
    revealObserver.observe(item);
  });

  // Never leave content hidden if a browser delays or skips an observer callback.
  window.setTimeout(() => revealItems.forEach(item => item.classList.add('is-visible')), 1200);
}

// Keep the detailed homepage footer consistent across every page.
const footer = document.querySelector('footer');
if (footer && !footer.querySelector('.footer-main')) {
  footer.innerHTML = `
    <div class="footer-main">
      <div>
        <a class="brand" href="index.html"><img class="brand-mark" src="assets/img/enkuso.jpeg" alt="Enkuso Maa Adventures logo" /><span>ENKUSO MAA<small>ADVENTURES</small></span></a>
        <p class="footer-tagline">Authentic culture. Meaningful journeys.<br />Lasting memories.</p>
      </div>
      <div class="footer-column"><p class="footer-label">Explore</p><a href="about.html">About us</a><a href="services.html">Services</a><a href="team.html">Our team</a></div>
      <div class="footer-column"><p class="footer-label">Connect</p><a href="contact.html">Plan your journey</a><a href="mailto:Enkusomaaadventures@gmail.com">Email us</a><a href="https://wa.me/254792629837" target="_blank" rel="noopener">WhatsApp</a></div>
      <div class="footer-column"><p class="footer-label">Find us</p><p>Maasai Mara<br />Narok County, Kenya</p></div>
    </div>
    <div class="footer-bottom"><span>&copy; 2026 Enkuso Maa Adventures</span><span>Made with care in the Mara</span></div>`;
}
