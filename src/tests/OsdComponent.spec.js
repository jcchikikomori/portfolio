import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import OsdComponent from '../components/OsdComponent.vue';

describe('OsdComponent.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('rendering', () => {
    it('renders .osd-indicator container', () => {
      const wrapper = mount(OsdComponent);
      expect(wrapper.find('.osd-indicator').exists()).toBe(true);
    });

    it('renders VIDEO 1 label', () => {
      const wrapper = mount(OsdComponent);
      expect(wrapper.find('.osd-label').text()).toBe('VIDEO 1');
    });

    it('does not have is-visible class by default', () => {
      const wrapper = mount(OsdComponent);
      expect(wrapper.find('.osd-indicator').classes()).not.toContain('is-visible');
    });
  });

  describe('isPlaying prop', () => {
    it('defaults isPlaying to false', () => {
      const wrapper = mount(OsdComponent);
      expect(wrapper.props('isPlaying')).toBe(false);
    });

    it('shows OSD when isPlaying becomes true', async () => {
      const wrapper = mount(OsdComponent, {
        props: { isPlaying: false },
      });
      expect(wrapper.find('.osd-indicator').classes()).not.toContain('is-visible');

      await wrapper.setProps({ isPlaying: true });
      expect(wrapper.find('.osd-indicator').classes()).toContain('is-visible');
    });

    it('hides OSD when isPlaying becomes false', async () => {
      const wrapper = mount(OsdComponent, {
        props: { isPlaying: false },
      });

      // First set to true to show OSD
      await wrapper.setProps({ isPlaying: true });
      expect(wrapper.find('.osd-indicator').classes()).toContain('is-visible');

      // Then set to false to hide OSD
      await wrapper.setProps({ isPlaying: false });
      expect(wrapper.find('.osd-indicator').classes()).not.toContain('is-visible');
    });
  });

  describe('auto-hide behavior', () => {
    it('auto-hides OSD after 3 seconds', async () => {
      const wrapper = mount(OsdComponent, {
        props: { isPlaying: false },
      });

      await wrapper.setProps({ isPlaying: true });
      expect(wrapper.vm.isVisible).toBe(true);

      // Advance time by 3 seconds
      vi.advanceTimersByTime(3000);
      expect(wrapper.vm.isVisible).toBe(false);
    });

    it('does not auto-hide before 3 seconds', async () => {
      const wrapper = mount(OsdComponent, {
        props: { isPlaying: false },
      });

      await wrapper.setProps({ isPlaying: true });
      expect(wrapper.vm.isVisible).toBe(true);

      // Advance time by 2.9 seconds
      vi.advanceTimersByTime(2900);
      expect(wrapper.vm.isVisible).toBe(true);
    });

    it('clears timeout when isPlaying becomes false before auto-hide', async () => {
      const wrapper = mount(OsdComponent, {
        props: { isPlaying: false },
      });

      await wrapper.setProps({ isPlaying: true });
      expect(wrapper.vm.hideTimeoutId).not.toBeNull();

      await wrapper.setProps({ isPlaying: false });
      expect(wrapper.vm.hideTimeoutId).toBeNull();
      expect(wrapper.vm.isVisible).toBe(false);
    });

    it('resets timer when isPlaying toggles true again', async () => {
      const wrapper = mount(OsdComponent, {
        props: { isPlaying: false },
      });

      // First play
      await wrapper.setProps({ isPlaying: true });
      vi.advanceTimersByTime(2000);
      expect(wrapper.vm.isVisible).toBe(true);

      // Stop
      await wrapper.setProps({ isPlaying: false });
      expect(wrapper.vm.isVisible).toBe(false);

      // Play again - timer should reset
      await wrapper.setProps({ isPlaying: true });
      expect(wrapper.vm.isVisible).toBe(true);

      // Only 1 second passes - should still be visible
      vi.advanceTimersByTime(1000);
      expect(wrapper.vm.isVisible).toBe(true);

      // Full 3 seconds from second play
      vi.advanceTimersByTime(2000);
      expect(wrapper.vm.isVisible).toBe(false);
    });
  });

  describe('data properties', () => {
    it('has correct initial data values', () => {
      const data = OsdComponent.data();
      expect(data.isVisible).toBe(false);
      expect(data.hideTimeoutId).toBeNull();
      expect(data.displayDuration).toBe(3000);
    });
  });

  describe('methods', () => {
    describe('showOsd', () => {
      it('sets isVisible to true', () => {
        const wrapper = mount(OsdComponent);
        wrapper.vm.showOsd();
        expect(wrapper.vm.isVisible).toBe(true);
      });

      it('sets hideTimeoutId', () => {
        const wrapper = mount(OsdComponent);
        wrapper.vm.showOsd();
        expect(wrapper.vm.hideTimeoutId).not.toBeNull();
      });

      it('clears previous timeout before setting new one', () => {
        const wrapper = mount(OsdComponent);
        const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

        wrapper.vm.showOsd();
        const firstTimeoutId = wrapper.vm.hideTimeoutId;

        wrapper.vm.showOsd();
        expect(clearTimeoutSpy).toHaveBeenCalledWith(firstTimeoutId);

        clearTimeoutSpy.mockRestore();
      });
    });

    describe('hideOsd', () => {
      it('sets isVisible to false', () => {
        const wrapper = mount(OsdComponent);
        wrapper.vm.isVisible = true;
        wrapper.vm.hideOsd();
        expect(wrapper.vm.isVisible).toBe(false);
      });

      it('clears hideTimeoutId', () => {
        const wrapper = mount(OsdComponent);
        wrapper.vm.showOsd();
        expect(wrapper.vm.hideTimeoutId).not.toBeNull();

        wrapper.vm.hideOsd();
        expect(wrapper.vm.hideTimeoutId).toBeNull();
      });
    });

    describe('clearHideTimeout', () => {
      it('clears timeout and sets hideTimeoutId to null', () => {
        const wrapper = mount(OsdComponent);
        const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

        wrapper.vm.showOsd();
        const timeoutId = wrapper.vm.hideTimeoutId;

        wrapper.vm.clearHideTimeout();
        expect(clearTimeoutSpy).toHaveBeenCalledWith(timeoutId);
        expect(wrapper.vm.hideTimeoutId).toBeNull();

        clearTimeoutSpy.mockRestore();
      });

      it('does nothing if hideTimeoutId is null', () => {
        const wrapper = mount(OsdComponent);
        const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

        wrapper.vm.clearHideTimeout();
        expect(clearTimeoutSpy).not.toHaveBeenCalled();

        clearTimeoutSpy.mockRestore();
      });
    });
  });

  describe('lifecycle', () => {
    it('clears timeout on beforeUnmount', () => {
      const wrapper = mount(OsdComponent);
      wrapper.vm.showOsd();
      const timeoutId = wrapper.vm.hideTimeoutId;

      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
      wrapper.unmount();

      expect(clearTimeoutSpy).toHaveBeenCalledWith(timeoutId);
      clearTimeoutSpy.mockRestore();
    });

    it('handles unmount when no timeout is set', () => {
      const wrapper = mount(OsdComponent);
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

      // Should not throw
      expect(() => wrapper.unmount()).not.toThrow();
      expect(clearTimeoutSpy).not.toHaveBeenCalled();

      clearTimeoutSpy.mockRestore();
    });
  });
});
