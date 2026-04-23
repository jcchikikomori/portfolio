import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import VisualizerComponent from '../components/VisualizerComponent.vue';

describe('VisualizerComponent.vue', () => {
  let randomSpy;

  beforeEach(() => {
    // Mock Math.random for deterministic tests
    randomSpy = vi.spyOn(Math, 'random');
  });

  afterEach(() => {
    randomSpy.mockRestore();
  });

  describe('rendering', () => {
    it('renders .visualizer-strip container', () => {
      const wrapper = mount(VisualizerComponent);
      expect(wrapper.find('.visualizer-strip').exists()).toBe(true);
    });

    it('renders exactly 28 bar elements', async () => {
      const wrapper = mount(VisualizerComponent);
      await wrapper.vm.$nextTick();
      // Bars are rendered as span children of visualizer-strip
      const strip = wrapper.find('.visualizer-strip');
      const bars = strip.findAll('span');
      expect(bars.length).toBe(28);
    });

    it('each bar has --bar-max-h inline style', async () => {
      const wrapper = mount(VisualizerComponent);
      await wrapper.vm.$nextTick();
      const strip = wrapper.find('.visualizer-strip');
      const bars = strip.findAll('span');
      bars.forEach((bar) => {
        const style = bar.attributes('style');
        expect(style).toContain('--bar-max-h');
      });
    });

    it('each bar has animation-duration inline style', async () => {
      const wrapper = mount(VisualizerComponent);
      await wrapper.vm.$nextTick();
      const strip = wrapper.find('.visualizer-strip');
      const bars = strip.findAll('span');
      bars.forEach((bar) => {
        const style = bar.attributes('style');
        expect(style).toContain('animation-duration');
      });
    });
  });

  describe('isPlaying prop', () => {
    it('adds is-playing class to strip when isPlaying is true', () => {
      const wrapper = mount(VisualizerComponent, {
        props: { isPlaying: true },
      });
      expect(wrapper.find('.visualizer-strip').classes()).toContain('is-playing');
    });

    it('does not have is-playing class when isPlaying is false', () => {
      const wrapper = mount(VisualizerComponent, {
        props: { isPlaying: false },
      });
      expect(wrapper.find('.visualizer-strip').classes()).not.toContain('is-playing');
    });

    it('defaults isPlaying to false', () => {
      const wrapper = mount(VisualizerComponent);
      expect(wrapper.props('isPlaying')).toBe(false);
      expect(wrapper.find('.visualizer-strip').classes()).not.toContain('is-playing');
    });

    it('updates class when isPlaying prop changes', async () => {
      const wrapper = mount(VisualizerComponent, {
        props: { isPlaying: false },
      });
      expect(wrapper.find('.visualizer-strip').classes()).not.toContain('is-playing');

      await wrapper.setProps({ isPlaying: true });
      expect(wrapper.find('.visualizer-strip').classes()).toContain('is-playing');

      await wrapper.setProps({ isPlaying: false });
      expect(wrapper.find('.visualizer-strip').classes()).not.toContain('is-playing');
    });
  });

  describe('bar initialization', () => {
    it('generates maxHeight values within 8-48px range', () => {
      // Test boundary: Math.random returns 0 -> height = 8
      randomSpy.mockReturnValue(0);
      const wrapper1 = mount(VisualizerComponent);
      expect(wrapper1.vm.bars[0].maxHeight).toBe(8);
      wrapper1.unmount();

      // Test boundary: Math.random returns ~1 -> height = 48
      randomSpy.mockReturnValue(0.999);
      const wrapper2 = mount(VisualizerComponent);
      expect(wrapper2.vm.bars[0].maxHeight).toBe(48);
      wrapper2.unmount();
    });

    it('generates duration values within 350-850ms range', () => {
      // Test boundary: Math.random returns 0 -> duration = 350
      randomSpy.mockReturnValue(0);
      const wrapper1 = mount(VisualizerComponent);
      expect(wrapper1.vm.bars[0].duration).toBe(350);
      wrapper1.unmount();

      // Test boundary: Math.random returns ~1 -> duration = 850
      randomSpy.mockReturnValue(0.999);
      const wrapper2 = mount(VisualizerComponent);
      expect(wrapper2.vm.bars[0].duration).toBe(850);
      wrapper2.unmount();
    });

    it('calls Math.random 56 times in mounted (28 bars x 2 values)', () => {
      randomSpy.mockReturnValue(0.5);
      mount(VisualizerComponent);
      // 28 bars, each needs 2 random values (maxHeight + duration)
      expect(randomSpy).toHaveBeenCalledTimes(56);
    });

    it('each bar has unique id matching its index', () => {
      const wrapper = mount(VisualizerComponent);
      wrapper.vm.bars.forEach((bar, index) => {
        expect(bar.id).toBe(index);
      });
    });
  });

  describe('getBarStyle method', () => {
    it('returns correct style object with CSS custom properties', () => {
      const wrapper = mount(VisualizerComponent);
      const bar = { id: 0, maxHeight: 30, duration: 500 };
      const style = wrapper.vm.getBarStyle(bar);

      expect(style).toEqual({
        '--bar-max-h': '30px',
        animationDuration: '500ms',
      });
    });

    it('handles boundary values correctly', () => {
      const wrapper = mount(VisualizerComponent);

      // Min values
      const minBar = { id: 0, maxHeight: 8, duration: 350 };
      expect(wrapper.vm.getBarStyle(minBar)).toEqual({
        '--bar-max-h': '8px',
        animationDuration: '350ms',
      });

      // Max values
      const maxBar = { id: 27, maxHeight: 48, duration: 850 };
      expect(wrapper.vm.getBarStyle(maxBar)).toEqual({
        '--bar-max-h': '48px',
        animationDuration: '850ms',
      });
    });
  });

  describe('getRandomHeight method', () => {
    it('returns 8 when Math.random returns 0', () => {
      randomSpy.mockReturnValue(0);
      const wrapper = mount(VisualizerComponent);
      expect(wrapper.vm.getRandomHeight()).toBe(8);
    });

    it('returns 48 when Math.random returns ~1', () => {
      randomSpy.mockReturnValue(0.999);
      const wrapper = mount(VisualizerComponent);
      expect(wrapper.vm.getRandomHeight()).toBe(48);
    });

    it('returns value in middle of range', () => {
      randomSpy.mockReturnValue(0.5);
      const wrapper = mount(VisualizerComponent);
      const height = wrapper.vm.getRandomHeight();
      expect(height).toBeGreaterThanOrEqual(8);
      expect(height).toBeLessThanOrEqual(48);
    });
  });

  describe('getRandomDuration method', () => {
    it('returns 350 when Math.random returns 0', () => {
      randomSpy.mockReturnValue(0);
      const wrapper = mount(VisualizerComponent);
      expect(wrapper.vm.getRandomDuration()).toBe(350);
    });

    it('returns 850 when Math.random returns ~1', () => {
      randomSpy.mockReturnValue(0.999);
      const wrapper = mount(VisualizerComponent);
      expect(wrapper.vm.getRandomDuration()).toBe(850);
    });

    it('returns value in middle of range', () => {
      randomSpy.mockReturnValue(0.5);
      const wrapper = mount(VisualizerComponent);
      const duration = wrapper.vm.getRandomDuration();
      expect(duration).toBeGreaterThanOrEqual(350);
      expect(duration).toBeLessThanOrEqual(850);
    });
  });

  describe('initializeBars method', () => {
    it('populates bars array with 28 items', () => {
      const wrapper = mount(VisualizerComponent);
      expect(wrapper.vm.bars.length).toBe(28);
    });

    it('each bar object has required properties', () => {
      const wrapper = mount(VisualizerComponent);
      wrapper.vm.bars.forEach((bar) => {
        expect(bar).toHaveProperty('id');
        expect(bar).toHaveProperty('maxHeight');
        expect(bar).toHaveProperty('duration');
        expect(typeof bar.id).toBe('number');
        expect(typeof bar.maxHeight).toBe('number');
        expect(typeof bar.duration).toBe('number');
      });
    });

    it('can be called to reinitialize bars', () => {
      randomSpy.mockReturnValue(0.5);
      const wrapper = mount(VisualizerComponent);
      const initialBars = [...wrapper.vm.bars];

      // Reinitialize with different random values
      randomSpy.mockReturnValue(0.2);
      wrapper.vm.initializeBars();

      expect(wrapper.vm.bars.length).toBe(28);
      // Bars should have different values now
      expect(wrapper.vm.bars[0].maxHeight).not.toBe(initialBars[0].maxHeight);
    });
  });

  describe('data properties', () => {
    it('barCount is set to 28', () => {
      const wrapper = mount(VisualizerComponent);
      expect(wrapper.vm.barCount).toBe(28);
    });

    it('bars array is initially empty before mount', () => {
      // Check initial data factory
      const data = VisualizerComponent.data();
      expect(data.bars).toEqual([]);
      expect(data.barCount).toBe(28);
    });
  });
});
