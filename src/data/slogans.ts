/**
 * Slogan data store for randomizer feature
 *
 * Contains 7 slogans with varying randomize/enabled settings.
 * Exactly one slogan has default: true (Japanese greeting).
 */

import type { Slogan } from '@/types/index.ts';

export const slogans: Slogan[] = [
  {
    message: 'こんにちは！サイです！よろしく お願いします!',
    randomize: false,
    enabled: true,
    default: true,
  },
  {
    message: 'Building digital experiences that matter.',
    randomize: true,
    enabled: true,
    default: false,
  },
  {
    message: 'コードを書くのが好きです。', // "I love writing code."
    randomize: true,
    enabled: true,
    default: false,
  },
  {
    message:
      'This is a very long slogan that is designed to test text wrapping capabilities in the UI component to ensure that long messages display properly without breaking the layout or causing overflow issues.',
    randomize: true,
    enabled: false,
    default: false,
  },
  {
    message: 'Full-stack developer.',
    randomize: false,
    enabled: false,
    default: false,
  },
  {
    message: '常に学び続けるエンジニアです。', // "I am an engineer who always keeps learning."
    randomize: true,
    enabled: true,
    default: false,
  },
  {
    message: 'Hi!',
    randomize: true,
    enabled: true,
    default: false,
  },
];

export const defaultSlogan = slogans.find((s) => s.default === true) || slogans[0];

export function getRandomizableSlogans(): Slogan[] {
  return slogans.filter((s) => s.enabled === true && s.randomize === true);
}
