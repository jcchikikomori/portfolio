export const darkMode = () => {
  document.body.classList.add('is-dark');
  const logo = document.getElementById('profile-logo');
  if (logo) {
    logo.setAttribute('src', 'img/jcc_logo_w.png');
  }
  document.querySelectorAll('.nes-container').forEach((el) => el.classList.add('is-dark'));
  document.querySelectorAll('.nes-dialog').forEach((el) => el.classList.add('is-dark'));
};

export const normalTheme = () => {
  document.body.classList.remove('is-dark');
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

// Timeout ID for media-was-playing cleanup
let mediaWasPlayingTimeout = null;

// Duration for CRT turn-off animation (must match CSS)
const CRT_TURN_OFF_DURATION_MS = 400;

/**
 * Set media playing state by adding/removing 'media-playing' class
 * Also dispatches a custom event for Vue components to react to
 * @param {boolean} isPlaying - true to add class, false to remove
 */
export const setMediaPlaying = (isPlaying) => {
  // Add null check for document.body (SSR/test safety)
  if (!document.body) {
    return;
  }

  // Clear any pending timeout from previous state change
  if (mediaWasPlayingTimeout) {
    clearTimeout(mediaWasPlayingTimeout);
    mediaWasPlayingTimeout = null;
  }

  if (isPlaying) {
    // Remove transitional class if present (interrupt mid-fadeout)
    document.body.classList.remove('media-was-playing');
    document.body.classList.add('media-playing');
  } else {
    // Add transitional class for fade-out animation
    document.body.classList.add('media-was-playing');

    // Remove both classes after animation completes
    mediaWasPlayingTimeout = setTimeout(() => {
      document.body.classList.remove('media-playing');
      document.body.classList.remove('media-was-playing');
      mediaWasPlayingTimeout = null;
    }, CRT_TURN_OFF_DURATION_MS);
  }

  // Dispatch custom event for Vue components to react
  window.dispatchEvent(
    new CustomEvent('media-playing-change', {
      detail: { isPlaying },
    })
  );
};

/**
 * Check if media is currently playing
 * @returns {boolean} true if 'media-playing' class is present
 */
export const isMediaPlaying = () => {
  return document.body ? document.body.classList.contains('media-playing') : false;
};

/**
 * Toggle media playing state
 */
export const toggleMediaPlaying = () => {
  setMediaPlaying(!isMediaPlaying());
};
