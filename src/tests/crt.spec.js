import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { enableCrt, disableCrt, toggleCrt, initCrt } from '../theme.js';

describe('crt.spec.js - CRT Filter Functionality', () => {
  let matchMediaMock;

  beforeEach(() => {
    document.body.className = '';
    localStorage.clear();

    // Mock matchMedia by default to return no preference
    matchMediaMock = vi.fn().mockReturnValue({ matches: false });
    window.matchMedia = matchMediaMock;
  });

  afterEach(() => {
    vi.restoreAllMocks();
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

  describe('toggleCrt', () => {
    it('adds crt-enabled class when not present', () => {
      document.body.classList.remove('crt-enabled');
      toggleCrt();
      expect(document.body.classList.contains('crt-enabled')).toBe(true);
    });

    it('removes crt-enabled class when present', () => {
      document.body.classList.add('crt-enabled');
      toggleCrt();
      expect(document.body.classList.contains('crt-enabled')).toBe(false);
    });

    it('toggles crt-enabled class on multiple calls', () => {
      document.body.classList.remove('crt-enabled');

      toggleCrt();
      expect(document.body.classList.contains('crt-enabled')).toBe(true);
      expect(localStorage.getItem('crt-enabled')).toBe('true');

      toggleCrt();
      expect(document.body.classList.contains('crt-enabled')).toBe(false);
      expect(localStorage.getItem('crt-enabled')).toBe('false');

      toggleCrt();
      expect(document.body.classList.contains('crt-enabled')).toBe(true);
      expect(localStorage.getItem('crt-enabled')).toBe('true');
    });

    it('updates localStorage when toggling on', () => {
      document.body.classList.remove('crt-enabled');
      toggleCrt();
      expect(localStorage.getItem('crt-enabled')).toBe('true');
    });

    it('updates localStorage when toggling off', () => {
      document.body.classList.add('crt-enabled');
      toggleCrt();
      expect(localStorage.getItem('crt-enabled')).toBe('false');
    });
  });

  describe('initCrt', () => {
    it('disables CRT when prefers-reduced-motion is set', () => {
      matchMediaMock.mockReturnValue({ matches: true });
      localStorage.setItem('crt-enabled', 'true');

      initCrt();

      expect(document.body.classList.contains('crt-enabled')).toBe(false);
    });

    it('does not check localStorage when prefers-reduced-motion is set', () => {
      matchMediaMock.mockReturnValue({ matches: true });
      const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');

      initCrt();

      // Should not read localStorage when reduced motion is preferred
      expect(getItemSpy).not.toHaveBeenCalled();

      getItemSpy.mockRestore();
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

    it('calls matchMedia with correct query string', () => {
      matchMediaMock.mockReturnValue({ matches: false });

      initCrt();

      expect(matchMediaMock).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
    });

    it('preserves existing crt-enabled class when reduced-motion is set', () => {
      document.body.classList.add('crt-enabled');
      matchMediaMock.mockReturnValue({ matches: true });

      initCrt();

      // Should disable regardless of previous state
      expect(document.body.classList.contains('crt-enabled')).toBe(false);
    });

    it('restores from saved state after page reload simulation', () => {
      // First enable
      enableCrt();
      expect(document.body.classList.contains('crt-enabled')).toBe(true);

      // Simulate page reload: clear body class but keep localStorage
      document.body.classList.remove('crt-enabled');
      expect(document.body.classList.contains('crt-enabled')).toBe(false);

      // Re-initialize
      matchMediaMock.mockReturnValue({ matches: false });
      initCrt();

      // Should restore enabled state
      expect(document.body.classList.contains('crt-enabled')).toBe(true);
    });
  });

  describe('localStorage persistence', () => {
    it('persists enabled state across multiple operations', () => {
      enableCrt();
      expect(localStorage.getItem('crt-enabled')).toBe('true');

      toggleCrt();
      expect(localStorage.getItem('crt-enabled')).toBe('false');

      toggleCrt();
      expect(localStorage.getItem('crt-enabled')).toBe('true');

      disableCrt();
      expect(localStorage.getItem('crt-enabled')).toBe('false');
    });

    it('maintains state independently of body class', () => {
      // Enable and verify
      enableCrt();
      expect(localStorage.getItem('crt-enabled')).toBe('true');

      // Manually remove class (simulating external manipulation)
      document.body.classList.remove('crt-enabled');

      // localStorage should still have the saved state
      expect(localStorage.getItem('crt-enabled')).toBe('true');
    });
  });

  describe('prefers-reduced-motion detection', () => {
    it('detects reduced motion preference correctly', () => {
      matchMediaMock.mockReturnValue({ matches: true });
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      expect(prefersReducedMotion).toBe(true);
    });

    it('detects no reduced motion preference correctly', () => {
      matchMediaMock.mockReturnValue({ matches: false });
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      expect(prefersReducedMotion).toBe(false);
    });

    it('respects reduced motion even when localStorage has enabled state', () => {
      // Set up: user previously enabled CRT
      localStorage.setItem('crt-enabled', 'true');

      // But user has reduced motion preference
      matchMediaMock.mockReturnValue({ matches: true });

      initCrt();

      // CRT should be disabled for accessibility
      expect(document.body.classList.contains('crt-enabled')).toBe(false);
    });
  });

  describe('body class as source of truth', () => {
    it('toggleCrt reads current state from body class', () => {
      // Set localStorage to true but body class to false
      localStorage.setItem('crt-enabled', 'true');
      document.body.classList.remove('crt-enabled');

      toggleCrt();

      // Should enable based on body class, not localStorage
      expect(document.body.classList.contains('crt-enabled')).toBe(true);
    });

    it('toggleCrt disables when body class is present regardless of localStorage', () => {
      // Set localStorage to false but body class to true
      localStorage.setItem('crt-enabled', 'false');
      document.body.classList.add('crt-enabled');

      toggleCrt();

      // Should disable based on body class
      expect(document.body.classList.contains('crt-enabled')).toBe(false);
    });
  });
});
