(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const data = window.SITE_DATA || {};

  // Optional open-source smooth scrolling. The site still works if the CDN is unavailable.
  if (!reducedMotion && window.Lenis) {
    const lenis = new window.Lenis({
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1.2
    });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  // Fill and hide optional links from site-data.js.
  document.querySelectorAll('[data-site-link]').forEach((element) => {
    const key = element.dataset.siteLink;
    const value = data[key];
    if (!value) {
      element.hidden = true;
      return;
    }
    if (key === 'email') {
      element.href = `mailto:${value}`;
      if (!element.textContent.trim()) element.textContent = value;
    } else {
      element.href = value;
    }
  });

  // Current year.
  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  // Header state and scroll progress.
  const header = document.querySelector('[data-header]');
  const progress = document.querySelector('[data-scroll-progress]');
  const updateScrollUi = () => {
    const top = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle('is-scrolled', top > 18);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(top / max, 1) : 0})`;
    }
  };
  updateScrollUi();
  window.addEventListener('scroll', updateScrollUi, { passive: true });
  window.addEventListener('resize', updateScrollUi);

  // Mobile navigation.
  const menuButton = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  const setMenu = (open) => {
    if (!menuButton || !menu) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menu.setAttribute('aria-hidden', String(!open));
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  };
  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  // Scroll reveal with a no-JS-safe CSS fallback handled by the class toggle.
  const revealItems = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealItems.forEach((item) => observer.observe(item));
  }

  // Accessible certificate lightbox.
  const modal = document.querySelector('[data-certificate-modal]');
  const modalImage = modal?.querySelector('[data-modal-image]');
  const modalCaption = modal?.querySelector('[data-modal-caption]');
  let previouslyFocused = null;

  document.querySelectorAll('[data-certificate]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!modal || !modalImage || !modalCaption) return;
      previouslyFocused = button;
      modalImage.src = button.dataset.certificate;
      modalImage.alt = button.dataset.certificateTitle || 'Certificate preview';
      modalCaption.textContent = button.dataset.certificateTitle || '';
      modal.showModal();
    });
  });

  const closeModal = () => {
    if (!modal?.open) return;
    modal.close();
    previouslyFocused?.focus();
  };
  modal?.querySelector('[data-modal-close]')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (event) => {
    const rect = modal.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) closeModal();
  });
})();
