import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import App from '../App.vue';

describe('App.vue', () => {
  let warnSpy;
  let errorSpy;

  beforeEach(() => {
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    document.body.className = '';
    localStorage.clear();

    // Mock matchMedia for initCrt
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('mounts without Vue warnings', () => {
    mount(App);
    expect(warnSpy).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('renders root element', () => {
    const wrapper = mount(App);
    expect(wrapper.find('#app').exists()).toBe(true);
  });

  it('renders CRT filter overlay', () => {
    const wrapper = mount(App);
    const overlay = wrapper.find('.crt-filter');
    expect(overlay.exists()).toBe(true);
    expect(overlay.attributes('aria-hidden')).toBe('true');
  });

  it('renders CRT toggle button with correct classes', () => {
    const wrapper = mount(App);
    const button = wrapper.find('button.crt-toggle');
    expect(button.exists()).toBe(true);
    expect(button.classes()).toContain('nes-btn');
    expect(button.classes()).toContain('is-default');
    expect(button.classes()).toContain('nes-pointer');
  });

  it('toggle button has correct aria-label and title', () => {
    const wrapper = mount(App);
    const button = wrapper.find('button.crt-toggle');
    expect(button.attributes('aria-label')).toBe('Toggle CRT filter');
    expect(button.attributes('title')).toBe('Toggle CRT filter');
  });

  it('toggle button contains NES star icon', () => {
    const wrapper = mount(App);
    const icon = wrapper.find('button.crt-toggle .nes-icon.star');
    expect(icon.exists()).toBe(true);
  });

  it('toggle button click toggles crt-enabled class on body', async () => {
    document.body.classList.remove('crt-enabled');
    const wrapper = mount(App);
    const button = wrapper.find('button.crt-toggle');
    await button.trigger('click');
    expect(document.body.classList.contains('crt-enabled')).toBe(true);
    await button.trigger('click');
    expect(document.body.classList.contains('crt-enabled')).toBe(false);
  });

  it('calls initCrt on mount', () => {
    mount(App);
    // initCrt should have been called - verify by checking localStorage was set
    expect(localStorage.getItem('crt-enabled')).toBe('false');
  });
});
