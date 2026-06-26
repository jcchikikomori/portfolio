import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { darkMode, normalTheme, toggleCrt, enableCrt, disableCrt, initCrt } from '../theme.js';

describe('theme.js', () => {
  let logoEl;
  let matchMediaMock;

  beforeEach(() => {
    document.body.className = '';
    logoEl = document.createElement('img');
    logoEl.id = 'profile-logo';
    logoEl.setAttribute('src', '');
    document.body.appendChild(logoEl);
    localStorage.clear();

    // Mock matchMedia by default to return no preference
    matchMediaMock = vi.fn().mockReturnValue({ matches: false });
    window.matchMedia = matchMediaMock;
  });

  afterEach(() => {
    const existing = document.getElementById('profile-logo');
    if (existing) {
      existing.remove();
    }
    vi.restoreAllMocks();
  });

  it('darkMode adds is-dark class to body', () => {
    darkMode();
    expect(document.body.classList.contains('is-dark')).toBe(true);
  });

  it('normalTheme removes is-dark class from body', () => {
    darkMode();
    normalTheme();
    expect(document.body.classList.contains('is-dark')).toBe(false);
  });

  it('darkMode sets logo to white variant', () => {
    darkMode();
    expect(document.getElementById('profile-logo').getAttribute('src')).toContain('jcc_logo_w.png');
  });

  it('normalTheme sets logo to default variant', () => {
    darkMode();
    normalTheme();
    expect(document.getElementById('profile-logo').getAttribute('src')).toContain('jcc_logo.png');
    expect(document.getElementById('profile-logo').getAttribute('src')).not.toContain(
      'jcc_logo_w.png'
    );
  });

  it('toggleCrt adds crt-enabled class when not present', () => {
    document.body.classList.remove('crt-enabled');
    toggleCrt();
    expect(document.body.classList.contains('crt-enabled')).toBe(true);
  });

  it('toggleCrt removes crt-enabled class when present', () => {
    document.body.classList.add('crt-enabled');
    toggleCrt();
    expect(document.body.classList.contains('crt-enabled')).toBe(false);
  });

  it('toggleCrt toggles crt-enabled class on multiple calls', () => {
    document.body.classList.remove('crt-enabled');
    toggleCrt();
    expect(document.body.classList.contains('crt-enabled')).toBe(true);
    toggleCrt();
    expect(document.body.classList.contains('crt-enabled')).toBe(false);
    toggleCrt();
    expect(document.body.classList.contains('crt-enabled')).toBe(true);
  });

  describe('enableCrt', () => {
    it('adds crt-enabled class to body', () => {
      enableCrt();
      expect(document.body.classList.contains('crt-enabled')).toBe(true);
    });

    it('saves enabled state to localStorage', () => {
      enableCrt();
      expect(localStorage.getItem('crt-enabled')).toBe('true');
    });
  });

  describe('disableCrt', () => {
    it('removes crt-enabled class from body', () => {
      document.body.classList.add('crt-enabled');
      disableCrt();
      expect(document.body.classList.contains('crt-enabled')).toBe(false);
    });

    it('saves disabled state to localStorage', () => {
      document.body.classList.add('crt-enabled');
      disableCrt();
      expect(localStorage.getItem('crt-enabled')).toBe('false');
    });
  });

  describe('initCrt', () => {
    it('disables CRT when prefers-reduced-motion is set', () => {
      matchMediaMock.mockReturnValue({ matches: true });
      initCrt();
      expect(document.body.classList.contains('crt-enabled')).toBe(false);
    });

    it('enables CRT when saved state is true and no reduced-motion preference', () => {
      localStorage.setItem('crt-enabled', 'true');
      matchMediaMock.mockReturnValue({ matches: false });
      initCrt();
      expect(document.body.classList.contains('crt-enabled')).toBe(true);
    });

    it('disables CRT when saved state is false and no reduced-motion preference', () => {
      localStorage.setItem('crt-enabled', 'false');
      matchMediaMock.mockReturnValue({ matches: false });
      initCrt();
      expect(document.body.classList.contains('crt-enabled')).toBe(false);
    });

    it('defaults to disabled when no saved state exists', () => {
      matchMediaMock.mockReturnValue({ matches: false });
      initCrt();
      expect(document.body.classList.contains('crt-enabled')).toBe(false);
      expect(localStorage.getItem('crt-enabled')).toBe('false');
    });
  });
});
