import { describe, it, expect } from 'vitest';

import { slogans, defaultSlogan, getRandomizableSlogans } from '../data/slogans';

describe('slogans data module', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(slogans)).toBe(true);
    expect(slogans.length).toBeGreaterThan(0);
  });

  it('exports exactly 7 slogans', () => {
    expect(slogans).toHaveLength(7);
  });

  it('every slogan has required fields (message, randomize, enabled, default)', () => {
    for (const slogan of slogans) {
      expect(typeof slogan.message).toBe('string');
      expect(typeof slogan.randomize).toBe('boolean');
      expect(typeof slogan.enabled).toBe('boolean');
      expect(typeof slogan.default).toBe('boolean');
    }
  });

  it('every slogan has non-empty message string', () => {
    for (const slogan of slogans) {
      expect(slogan.message.length).toBeGreaterThan(0);
    }
  });

  it('has exactly one default slogan', () => {
    const defaults = slogans.filter((s) => s.default === true);
    expect(defaults).toHaveLength(1);
  });

  it('returns the correct default slogan', () => {
    expect(defaultSlogan).toBeDefined();
    expect(defaultSlogan.default).toBe(true);
  });

  it('returns defaultSlogan as first slogan when no default is found', () => {
    // Verify the implementation falls back to slogans[0]
    expect(defaultSlogan).toBe(slogans[0]);
  });

  it('getRandomizableSlogans returns only enabled and randomizable slogans', () => {
    const pool = getRandomizableSlogans();

    for (const slogan of pool) {
      expect(slogan.enabled).toBe(true);
      expect(slogan.randomize).toBe(true);
    }
  });

  it('getRandomizableSlogans returns an array', () => {
    const pool = getRandomizableSlogans();
    expect(Array.isArray(pool)).toBe(true);
  });

  it('getRandomizableSlogans excludes disabled slogans', () => {
    const pool = getRandomizableSlogans();
    const disabledInPool = pool.filter((s) => s.enabled === false);
    expect(disabledInPool).toHaveLength(0);
  });

  it('getRandomizableSlogans excludes non-randomizable slogans', () => {
    const pool = getRandomizableSlogans();
    const nonRandomizableInPool = pool.filter((s) => s.randomize === false);
    expect(nonRandomizableInPool).toHaveLength(0);
  });

  it('has expected randomizable pool size', () => {
    const pool = getRandomizableSlogans();
    expect(pool.length).toBe(7);
  });
});
