import { vi } from 'vitest';

// jsdom does not implement matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// jsdom does not implement AudioContext
window.AudioContext = vi.fn().mockImplementation(() => ({
  createAnalyser: vi.fn(),
  createMediaElementSource: vi.fn(),
}));

// spy on window.open
window.open = vi.fn();

// mock register-service-worker
vi.mock('register-service-worker', () => ({
  register: vi.fn(),
}));
