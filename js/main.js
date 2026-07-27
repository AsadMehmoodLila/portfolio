(() => {
  const config = window.PORTFOLIO_CONFIG || {};
  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const navButton = document.querySelector('[data-nav-toggle]');
  const navMenu = document.querySelector('[data-nav-menu]');
  const yearNode = document.querySelector('[data-current-year]');

  const savedTheme = localStorage.getItem('asadlilla-theme');
  const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = savedTheme || (preferredDark ? 'dark' : 'light');

  const updateThemeLabel = () => {
    if (!themeButton) return;
    const isDark = root.dataset.theme === 'dark';
    themeButton.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    themeButton.setAttribute('title', isDark ? 'Light theme' : 'Dark theme');
  };

  updateThemeLabel();

  themeButton?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('asadlilla-theme', root.dataset.theme);
    updateThemeLabel();
  });

  navButton?.addEventListener('click', () => {
    const isOpen = navMenu?.classList.toggle('is-open');
    navButton.setAttribute('aria-expanded', String(Boolean(isOpen)));
  });

  navMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navButton?.setAttribute('aria-expanded', 'false');
    });
  });

  const hydrateLinks = () => {
    const map = {
      email: `mailto:${config.email || ''}`,
      github: config.github,
      linkedin: config.linkedin,
      robloxGame: config.robloxGame
    };

    document.querySelectorAll('[data-link]').forEach((element) => {
      const key = element.dataset.link;
      const value = map[key];
      if (!value || value.includes('YOUR_')) {
        element.classList.add('is-placeholder');
        element.setAttribute('title', 'Update this link in js/config.js');
        return;
      }
      element.setAttribute('href', value);
    });

    document.querySelectorAll('[data-config-text]').forEach((element) => {
      const key = element.dataset.configText;
      if (config[key]) element.textContent = config[key];
    });
  };

  hydrateLinks();

  if (yearNode) yearNode.textContent = new Date().getFullYear();

  const revealNodes = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealNodes.forEach((node) => observer.observe(node));
  } else {
    revealNodes.forEach((node) => node.classList.add('is-visible'));
  }

  const copyButton = document.querySelector('[data-copy-email]');
  copyButton?.addEventListener('click', async () => {
    if (!config.email || config.email.includes('YOUR_')) {
      copyButton.textContent = 'Add email in config.js';
      return;
    }
    try {
      await navigator.clipboard.writeText(config.email);
      const original = copyButton.textContent;
      copyButton.textContent = 'Email copied';
      setTimeout(() => { copyButton.textContent = original; }, 1800);
    } catch {
      window.location.href = `mailto:${config.email}`;
    }
  });
})();
