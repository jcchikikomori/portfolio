import { describe, it, expect } from 'vitest';

import { assetUrl } from '../utils/assetUrl.js';

describe('assetUrl', () => {
  describe('falsy inputs are passed through unchanged', () => {
    it('returns null when given null', () => {
      expect(assetUrl(null)).toBeNull();
    });

    it('returns undefined when given undefined', () => {
      expect(assetUrl(undefined)).toBeUndefined();
    });

    it('returns empty string when given an empty string', () => {
      expect(assetUrl('')).toBe('');
    });
  });

  describe('external URLs and special schemes pass through unchanged', () => {
    it('passes through https:// URLs', () => {
      expect(assetUrl('https://example.com/img.png')).toBe('https://example.com/img.png');
    });

    it('passes through http:// URLs', () => {
      expect(assetUrl('http://example.com/img.png')).toBe('http://example.com/img.png');
    });

    it('passes through data: URIs', () => {
      expect(assetUrl('data:image/png;base64,abc')).toBe('data:image/png;base64,abc');
    });

    it('passes through blob: URIs', () => {
      expect(assetUrl('blob:https://example.com/uuid')).toBe('blob:https://example.com/uuid');
    });

    it('passes through mailto: links', () => {
      expect(assetUrl('mailto:test@example.com')).toBe('mailto:test@example.com');
    });

    it('passes through tel: links', () => {
      expect(assetUrl('tel:+1234567890')).toBe('tel:+1234567890');
    });
  });

  describe('root-absolute and relative asset paths resolve against BASE_URL', () => {
    it('prepends BASE_URL to a root-absolute path (stripping the leading slash)', () => {
      expect(assetUrl('/img/logos/test.png')).toBe(
        `${import.meta.env.BASE_URL}img/logos/test.png`
      );
    });

    it('prepends BASE_URL to a relative path (no leading slash to strip)', () => {
      expect(assetUrl('img/logos/test.png')).toBe(
        `${import.meta.env.BASE_URL}img/logos/test.png`
      );
    });

    it('is a no-op for root-absolute paths when BASE_URL is "/"', () => {
      // In the test environment, GITHUB_ACTIONS is unset so vite.config.js picks
      // base: '/'. A leading-slash path should round-trip unchanged.
      expect(import.meta.env.BASE_URL).toBe('/');
      expect(assetUrl('/img/logos/engagia-logo.png')).toBe('/img/logos/engagia-logo.png');
    });
  });
});
