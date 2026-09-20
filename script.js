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
