/**
 * Slogan data store for randomizer feature
 *
 * Contains 7 slogans with varying randomize/enabled settings.
 * Exactly one slogan has default: true (Japanese greeting).
 */

import type { Slogan } from '@/types/index.ts';

export const slogans: Slogan[] = [
  {
    message: 'こんにちは！サイです！よろしく お願いします! Turn on the CRT filter (Star button) for the full experience!',
    randomize: true,
    enabled: true,
    default: true,
  },
  {
    message: 'Hello World!',
    randomize: true,
    enabled: true,
    default: false,
  },
  {
    message: 'Mabuhay!',
    randomize: true,
    enabled: true,
    default: false,
  },
  {
    message:
      'I\'m just Running In The 90s!!',
    randomize: true,
    enabled: true,
    default: false,
  },
  {
    message: 'Cyber talking, cybersex is on the line',
    randomize: true,
    enabled: true,
    default: false,
  },
  {
    message: '私は近いうちに日本に行きたかった…。',
    randomize: true,
    enabled: true,
    default: false,
  },
  {
    message: 'The Lazy Geek',
    randomize: true,
    enabled: true,
    default: false,
  },
];

export const defaultSlogan = slogans.find((s) => s.default === true) || slogans[0];

export function getRandomizableSlogans(): Slogan[] {
  return slogans.filter((s) => s.enabled === true && s.randomize === true);
}
