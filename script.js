const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
const copyButton = document.querySelector('.copy-button');
const yearElement = document.querySelector('#year');

function closeMenu() {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 700) closeMenu();
});

if (copyButton) {
  copyButton.addEventListener('click', async () => {
    const email = copyButton.dataset.email;
    const originalText = copyButton.textContent;
    try {
      await navigator.clipboard.writeText(email);
      copyButton.textContent = '邮箱已复制';
      window.setTimeout(() => { copyButton.textContent = originalText; }, 1800);
    } catch {
      copyButton.textContent = email;
    }
  });
}

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -35px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
