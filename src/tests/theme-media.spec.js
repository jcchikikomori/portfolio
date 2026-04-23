import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { setMediaPlaying, isMediaPlaying, toggleMediaPlaying } from '../theme.js';

describe('theme.js media functions', () => {
  beforeEach(() => {
    document.body.className = '';
    vi.useFakeTimers();
  });

  afterEach(() => {
    document.body.className = '';
    vi.useRealTimers();
  });

  describe('setMediaPlaying', () => {
    it('adds media-playing class when isPlaying is true', () => {
      setMediaPlaying(true);
      expect(document.body.classList.contains('media-playing')).toBe(true);
    });

    it('removes media-was-playing class when isPlaying is true', () => {
      document.body.classList.add('media-was-playing');
      setMediaPlaying(true);
      expect(document.body.classList.contains('media-was-playing')).toBe(false);
    });

    it('adds media-was-playing class when isPlaying is false', () => {
      document.body.classList.add('media-playing');
      setMediaPlaying(false);
      expect(document.body.classList.contains('media-was-playing')).toBe(true);
    });

    it('removes both classes after 400ms timeout when isPlaying is false', () => {
      document.body.classList.add('media-playing');
      setMediaPlaying(false);

      // Classes should still be present before timeout
      expect(document.body.classList.contains('media-playing')).toBe(true);
      expect(document.body.classList.contains('media-was-playing')).toBe(true);

      // Advance timers by 400ms
      vi.advanceTimersByTime(400);

      // Now both classes should be removed
      expect(document.body.classList.contains('media-playing')).toBe(false);
      expect(document.body.classList.contains('media-was-playing')).toBe(false);
    });

    it('clears pending timeout when called with true mid-fadeout', () => {
      document.body.classList.add('media-playing');
      setMediaPlaying(false);

      // Start fadeout
      expect(document.body.classList.contains('media-was-playing')).toBe(true);

      // Interrupt with true before timeout completes
      vi.advanceTimersByTime(200); // Only half the timeout
      setMediaPlaying(true);

      // media-was-playing should be removed, media-playing should stay
      expect(document.body.classList.contains('media-was-playing')).toBe(false);
      expect(document.body.classList.contains('media-playing')).toBe(true);

      // Advance past original timeout - should have no effect
      vi.advanceTimersByTime(300);
      expect(document.body.classList.contains('media-playing')).toBe(true);
    });

    it('clears pending timeout when called with false again', () => {
      document.body.classList.add('media-playing');
      setMediaPlaying(false);

      // Start fadeout
      vi.advanceTimersByTime(200);

      // Call false again (restarts the timeout)
      setMediaPlaying(false);

      // Advance by 200ms - not enough for new timeout
      vi.advanceTimersByTime(200);
      expect(document.body.classList.contains('media-was-playing')).toBe(true);

      // Advance remaining 200ms to complete new timeout
      vi.advanceTimersByTime(200);
      expect(document.body.classList.contains('media-was-playing')).toBe(false);
    });

    it('is idempotent when called multiple times with true', () => {
      setMediaPlaying(true);
      setMediaPlaying(true);
      setMediaPlaying(true);
      expect(document.body.classList.contains('media-playing')).toBe(true);
      // Should only have the class once (classList handles duplicates automatically)
      expect(document.body.className.split('media-playing').length - 1).toBe(1);
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

    it('dispatches media-playing-change event with isPlaying true', () => {
      const eventHandler = vi.fn();
      window.addEventListener('media-playing-change', eventHandler);

      setMediaPlaying(true);

      expect(eventHandler).toHaveBeenCalledTimes(1);
      expect(eventHandler.mock.calls[0][0].detail).toEqual({ isPlaying: true });

      window.removeEventListener('media-playing-change', eventHandler);
    });

    it('dispatches media-playing-change event with isPlaying false', () => {
      const eventHandler = vi.fn();
      window.addEventListener('media-playing-change', eventHandler);

      setMediaPlaying(false);

      expect(eventHandler).toHaveBeenCalledTimes(1);
      expect(eventHandler.mock.calls[0][0].detail).toEqual({ isPlaying: false });

      window.removeEventListener('media-playing-change', eventHandler);
    });

    it('dispatches event even when body is in transition state', () => {
      const eventHandler = vi.fn();
      window.addEventListener('media-playing-change', eventHandler);

      document.body.classList.add('media-playing');
      setMediaPlaying(false);

      expect(eventHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: { isPlaying: false },
        })
      );

      window.removeEventListener('media-playing-change', eventHandler);
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

    it('returns true even when media-was-playing is also present', () => {
      document.body.classList.add('media-playing');
      document.body.classList.add('media-was-playing');
      expect(isMediaPlaying()).toBe(true);
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
      // Note: immediately after toggle, media-playing is still present during fadeout
      expect(document.body.classList.contains('media-was-playing')).toBe(true);
    });

    it('toggles state on multiple calls', () => {
      expect(isMediaPlaying()).toBe(false);

      toggleMediaPlaying();
      expect(isMediaPlaying()).toBe(true);

      toggleMediaPlaying();
      // After toggle to false, media-playing still present during transition
      expect(document.body.classList.contains('media-was-playing')).toBe(true);

      // Complete the fadeout
      vi.advanceTimersByTime(400);
      expect(isMediaPlaying()).toBe(false);

      toggleMediaPlaying();
      expect(isMediaPlaying()).toBe(true);
    });
  });
});
