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

  it('toggle button has dynamic aria-label and title based on CRT state', async () => {
    const wrapper = mount(App);
    const button = wrapper.find('button.crt-toggle');
    // Initially disabled (localStorage defaults to false)
    expect(button.attributes('aria-label')).toBe('Enable CRT filter');
    expect(button.attributes('title')).toBe('Enable CRT filter');
    // After clicking, CRT is enabled
    await button.trigger('click');
    expect(button.attributes('aria-label')).toBe('Disable CRT filter');
    expect(button.attributes('title')).toBe('Disable CRT filter');
    // After clicking again, CRT is disabled
    await button.trigger('click');
    expect(button.attributes('aria-label')).toBe('Enable CRT filter');
    expect(button.attributes('title')).toBe('Enable CRT filter');
  });

  it('toggle button contains NES star icon with is-empty class when CRT is disabled', async () => {
    const wrapper = mount(App);
    const icon = wrapper.find('button.crt-toggle .nes-icon.star');
    expect(icon.exists()).toBe(true);
    // Initially CRT is disabled, star should have is-empty
    expect(icon.classes()).toContain('is-empty');
    // After enabling CRT, is-empty should be removed
    await wrapper.find('button.crt-toggle').trigger('click');
    expect(icon.classes()).not.toContain('is-empty');
  });

  it('toggle button has is-disabled class when CRT is disabled', async () => {
    const wrapper = mount(App);
    const button = wrapper.find('button.crt-toggle');
    // Initially CRT is disabled, button should have is-disabled
    expect(button.classes()).toContain('is-disabled');
    // After enabling CRT, is-disabled should be removed
    await button.trigger('click');
    expect(button.classes()).not.toContain('is-disabled');
    // After disabling again, is-disabled should return
    await button.trigger('click');
    expect(button.classes()).toContain('is-disabled');
  });

  it('toggle button click toggles crt-enabled class on body and visual state', async () => {
    document.body.classList.remove('crt-enabled');
    const wrapper = mount(App);
    const button = wrapper.find('button.crt-toggle');
    const icon = wrapper.find('button.crt-toggle .nes-icon.star');

    // Initially CRT is disabled
    expect(document.body.classList.contains('crt-enabled')).toBe(false);
    expect(button.classes()).toContain('is-disabled');
    expect(icon.classes()).toContain('is-empty');

    // Click to enable
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    expect(document.body.classList.contains('crt-enabled')).toBe(true);
    expect(button.classes()).not.toContain('is-disabled');
    expect(icon.classes()).not.toContain('is-empty');
    expect(button.attributes('aria-label')).toBe('Disable CRT filter');

    // Click to disable
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    expect(document.body.classList.contains('crt-enabled')).toBe(false);
    expect(button.classes()).toContain('is-disabled');
    expect(icon.classes()).toContain('is-empty');
    expect(button.attributes('aria-label')).toBe('Enable CRT filter');
  });

  it('calls initCrt on mount', () => {
    mount(App);
    // initCrt should have been called - verify by checking localStorage was set
    expect(localStorage.getItem('crt-enabled')).toBe('false');
  });

  it('reads initial CRT state from localStorage on mount', async () => {
    // Set localStorage to enabled before mounting
    localStorage.setItem('crt-enabled', 'true');
    const wrapper = mount(App);
    await wrapper.vm.$nextTick();
    // Button should not have is-disabled class
    const button = wrapper.find('button.crt-toggle');
    expect(button.classes()).not.toContain('is-disabled');
    // Star icon should not have is-empty class
    const icon = wrapper.find('button.crt-toggle .nes-icon.star');
    expect(icon.classes()).not.toContain('is-empty');
    // Aria-label should indicate CRT is enabled
    expect(button.attributes('aria-label')).toBe('Disable CRT filter');
  });

  describe('CRT barrel distortion SVG filter', () => {
    it('renders SVG filter container with correct id', () => {
      const wrapper = mount(App);
      const svg = wrapper.find('#crt-svg-filters');
      expect(svg.exists()).toBe(true);
    });

    it('SVG filter has aria-hidden="true" for accessibility', () => {
      const wrapper = mount(App);
      const svg = wrapper.find('#crt-svg-filters');
      expect(svg.attributes('aria-hidden')).toBe('true');
    });

    it('SVG filter has role="presentation" for accessibility', () => {
      const wrapper = mount(App);
      const svg = wrapper.find('#crt-svg-filters');
      expect(svg.attributes('role')).toBe('presentation');
    });

    it('SVG filter has crt-svg-filters class for styling', () => {
      const wrapper = mount(App);
      const svg = wrapper.find('#crt-svg-filters');
      expect(svg.classes()).toContain('crt-svg-filters');
    });

    it('SVG contains defs element with filter definition', () => {
      const wrapper = mount(App);
      const defs = wrapper.find('#crt-svg-filters defs');
      expect(defs.exists()).toBe(true);
    });

    it('SVG contains barrel distortion filter with correct id', () => {
      const wrapper = mount(App);
      const filter = wrapper.find('#crt-svg-filters filter#crt-barrel');
      expect(filter.exists()).toBe(true);
    });

    it('barrel filter contains feImage element', () => {
      const wrapper = mount(App);
      const feImage = wrapper.find('#crt-svg-filters filter#crt-barrel feImage');
      expect(feImage.exists()).toBe(true);
    });

    it('barrel filter contains feDisplacementMap element', () => {
      const wrapper = mount(App);
      const feDisplacementMap = wrapper.find(
        '#crt-svg-filters filter#crt-barrel feDisplacementMap'
      );
      expect(feDisplacementMap.exists()).toBe(true);
    });

    it('feDisplacementMap has correct channel selectors', () => {
      const wrapper = mount(App);
      const feDisplacementMap = wrapper.find(
        '#crt-svg-filters filter#crt-barrel feDisplacementMap'
      );
      // SVG attributes preserve camelCase in JSDOM
      expect(feDisplacementMap.attributes('xChannelSelector')).toBe('R');
      expect(feDisplacementMap.attributes('yChannelSelector')).toBe('G');
    });
  });
});
