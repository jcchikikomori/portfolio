export const darkMode = () => {
  document.body.classList.add('dark');
  const logo = document.getElementById('profile-logo');
  if (logo) {
    logo.setAttribute('src', 'img/jcc_logo_w.png');
  }
  document.querySelectorAll('.nes-container').forEach((el) => el.classList.add('is-dark'));
  document.querySelectorAll('.nes-dialog').forEach((el) => el.classList.add('is-dark'));
};

export const normalTheme = () => {
  document.body.classList.remove('dark');
  const logo = document.getElementById('profile-logo');
  if (logo) {
    logo.setAttribute('src', 'img/jcc_logo.png');
  }
  document.querySelectorAll('.nes-container').forEach((el) => el.classList.remove('is-dark'));
  document.querySelectorAll('.nes-dialog').forEach((el) => el.classList.remove('is-dark'));
};

const CRT_STORAGE_KEY = 'crt-enabled';

export const enableCrt = () => {
  document.body.classList.add('crt-enabled');
  localStorage.setItem(CRT_STORAGE_KEY, 'true');
};

export const disableCrt = () => {
  document.body.classList.remove('crt-enabled');
  localStorage.setItem(CRT_STORAGE_KEY, 'false');
};

export const toggleCrt = () => {
  if (document.body.classList.contains('crt-enabled')) {
    disableCrt();
  } else {
    enableCrt();
  }
};

export const initCrt = () => {
  // Respect reduced-motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    disableCrt();
    return;
  }

  // Restore saved state or default to disabled
  const savedState = localStorage.getItem(CRT_STORAGE_KEY);
  if (savedState === 'true') {
    enableCrt();
  } else {
    disableCrt();
  }
};
