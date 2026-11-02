const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-header nav');
if (toggle && nav) {
  if (!nav.id) nav.id = 'main-navigation';
  toggle.setAttribute('aria-controls', nav.id);
  const setMenuOpen = open => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };

  toggle.addEventListener('click', () => {
    setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.querySelectorAll('a').forEach(link => {
    if (link.classList.contains('active')) link.setAttribute('aria-current', 'page');
    link.addEventListener('click', () => setMenuOpen(false));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      setMenuOpen(false);
      toggle.focus();
    }
  });
}

document.querySelectorAll('form').forEach(form => {
  const nameInput = form.querySelector('input[name="name"]');
  const topicSelect = form.querySelector('select[name="interest"]');
  const messageInput = form.querySelector('textarea[name="message"]');
  const status = document.createElement('p');
  status.className = 'form-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  form.append(status);

  if (nameInput && topicSelect && messageInput) {
    const item = new URLSearchParams(window.location.search).get('item');
    const productNames = {
      'beaded-collar': 'Maasai Beaded Collar',
      'bangle-set': 'Beaded Bangle Set',
      'beaded-bracelet': 'Woven Beaded Bracelet',
      'drop-earrings': 'Beaded Drop Earrings',
      'beaded-belt': 'Beaded Waist Belt',
      'beaded-keyring': 'Beaded Keyring',
    };
    const productName = item && productNames[item];

    if (productName) {
      topicSelect.value = 'Beads of Hope';
      messageInput.value = `I'm interested in the ${productName}. Please share current availability, payment, and delivery options.`;
      messageInput.focus({ preventScroll: true });
    }

    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const recipient = 'Enkusomaaadventures@gmail.com';
      const subject = `Enquiry: ${data.get('interest')}`;
      const body = [
        `Name: ${data.get('name')}`,
        `Email: ${data.get('email')}`,
        `Interest: ${data.get('interest')}`,
        `Preferred travel date: ${data.get('travel-date') || 'Not specified'}`,
        `Number of guests: ${data.get('guests') || 'Not specified'}`,
        '',
        String(data.get('message') || ''),
      ].join('\n');

      status.textContent = 'Opening your email app with your enquiry. If it does not open, email us directly at Enkusomaaadventures@gmail.com.';
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
});
// Page transitions and scroll reveals.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
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

const footer = document.querySelector('footer');
if (footer && !footer.querySelector('.footer-main')) {
  footer.innerHTML = `
    <div class="footer-main">
      <div>
        <a class="brand" href="index.html"><img class="brand-mark" src="assets/img/enkuso.jpeg" alt="Enkuso Maa Adventures logo" /><span>ENKUSO MAA<small>ADVENTURES</small></span></a>
        <p class="footer-tagline">Authentic culture. Meaningful journeys.<br />Lasting memories.</p>
      </div>
      <div class="footer-column"><p class="footer-label">Explore</p><a href="about.html">About us</a><a href="services.html">Services</a><a href="team.html">Our team</a><a href="beads.html">Beads of Hope</a><a href="insights.html">Insights</a></div>
      <div class="footer-column"><p class="footer-label">Connect</p><a href="contact.html">Plan your journey</a><a href="mailto:Enkusomaaadventures@gmail.com">Email us</a><a href="https://wa.me/254792629837" target="_blank" rel="noopener">WhatsApp</a></div>
      <div class="footer-column"><p class="footer-label">Find us</p><p>Maasai Mara<br />Narok County, Kenya</p></div>
    </div>
    <div class="footer-bottom"><span>&copy; ${new Date().getFullYear()} Enkuso Maa Adventures</span><span>Made with care in the Mara</span></div>`;
}
