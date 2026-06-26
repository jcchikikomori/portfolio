import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, it, expect } from 'vitest';

const __dirname = dirname(fileURLToPath(import.meta.url));
const robotsPath = resolve(__dirname, '../../public/robots.txt');

describe('robots.txt', () => {
  it('blocks GPTBot, ClaudeBot, and PerplexityBot from crawling', async () => {
    const content = await readFile(robotsPath, 'utf8');

    expect(content).toContain('User-agent: GPTBot\nDisallow: /');
    expect(content).toContain('User-agent: ClaudeBot\nDisallow: /');
    expect(content).toContain('User-agent: PerplexityBot\nDisallow: /');
    expect(content).toContain('Disallow: /');
  });
});
