import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { setMediaPlaying, isMediaPlaying, toggleMediaPlaying } from '../theme.js';

describe('theme.js media functions', () => {
  beforeEach(() => {
    document.body.className = '';
  });

  afterEach(() => {
    document.body.className = '';
  });

  describe('setMediaPlaying', () => {
    it('adds media-playing class when isPlaying is true', () => {
      setMediaPlaying(true);
      expect(document.body.classList.contains('media-playing')).toBe(true);
    });

    it('removes media-playing class when isPlaying is false', () => {
      document.body.classList.add('media-playing');
      setMediaPlaying(false);
      expect(document.body.classList.contains('media-playing')).toBe(false);
    });

    it('is idempotent when called multiple times with true', () => {
      setMediaPlaying(true);
      setMediaPlaying(true);
      setMediaPlaying(true);
      expect(document.body.classList.contains('media-playing')).toBe(true);
      // Should only have the class once (classList handles duplicates automatically)
      expect(document.body.className.split('media-playing').length - 1).toBe(1);
    });

    it('is idempotent when called multiple times with false', () => {
      setMediaPlaying(false);
      setMediaPlaying(false);
      setMediaPlaying(false);
      expect(document.body.classList.contains('media-playing')).toBe(false);
    });

    it('handles null document.body gracefully', () => {
      const originalBody = document.body;
      // Temporarily remove body for SSR/test safety test
      Object.defineProperty(document, 'body', {
        value: null,
        writable: true,
        configurable: true,
      });

      // Should not throw
      expect(() => setMediaPlaying(true)).not.toThrow();
      expect(() => setMediaPlaying(false)).not.toThrow();

      // Restore body
      Object.defineProperty(document, 'body', {
        value: originalBody,
        writable: true,
        configurable: true,
      });
    });
  });

  describe('isMediaPlaying', () => {
    it('returns true when media-playing class is present', () => {
      document.body.classList.add('media-playing');
      expect(isMediaPlaying()).toBe(true);
    });

    it('returns false when media-playing class is absent', () => {
      expect(isMediaPlaying()).toBe(false);
    });

    it('handles null document.body gracefully by returning false', () => {
      const originalBody = document.body;
      Object.defineProperty(document, 'body', {
        value: null,
        writable: true,
        configurable: true,
      });

      expect(isMediaPlaying()).toBe(false);

      // Restore body
      Object.defineProperty(document, 'body', {
        value: originalBody,
        writable: true,
        configurable: true,
      });
    });
  });

  describe('toggleMediaPlaying', () => {
    it('toggles from false to true when media is not playing', () => {
      expect(isMediaPlaying()).toBe(false);
      toggleMediaPlaying();
      expect(isMediaPlaying()).toBe(true);
    });

    it('toggles from true to false when media is playing', () => {
      setMediaPlaying(true);
      expect(isMediaPlaying()).toBe(true);
      toggleMediaPlaying();
      expect(isMediaPlaying()).toBe(false);
    });

    it('toggles state on multiple calls', () => {
      expect(isMediaPlaying()).toBe(false);

      toggleMediaPlaying();
      expect(isMediaPlaying()).toBe(true);

      toggleMediaPlaying();
      expect(isMediaPlaying()).toBe(false);

      toggleMediaPlaying();
      expect(isMediaPlaying()).toBe(true);
    });
  });
});
