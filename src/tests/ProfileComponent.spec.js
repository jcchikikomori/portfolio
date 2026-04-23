/* eslint-disable no-import-assign */
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import OsdComponent from '../components/OsdComponent.vue';
import ProfileComponent from '../components/ProfileComponent.vue';
import VisualizerComponent from '../components/VisualizerComponent.vue';
import * as slogansModule from '../data/slogans';

// Expected default slogan text (matches slogans.ts)
const DEFAULT_SLOGAN =
  'こんにちは！サイです！よろしく お願いします! Turn on the CRT filter (Star button) for the full experience!';

describe('ProfileComponent.vue', () => {
  let wrapper;
  let attachDiv;

  beforeEach(() => {
    window.open.mockClear();
    // Attach to a div in document.body so document.getElementById can find dialog elements
    attachDiv = document.createElement('div');
    document.body.appendChild(attachDiv);
    wrapper = mount(ProfileComponent, { attachTo: attachDiv });

    // jsdom does not implement showModal or scrollTo on dialog elements
    const spotifyDialog = document.getElementById('dialog-spotify');
    if (spotifyDialog) {
      spotifyDialog.showModal = vi.fn();
    }
    const careersDialog = document.getElementById('dialog-careers');
    if (careersDialog) {
      careersDialog.showModal = vi.fn();
      careersDialog.scrollTo = vi.fn();
    }
    const projectsDialog = document.getElementById('dialog-projects');
    if (projectsDialog) {
      projectsDialog.showModal = vi.fn();
      projectsDialog.scrollTo = vi.fn();
    }
  });

  afterEach(() => {
    wrapper.unmount();
    attachDiv.remove();
  });

  describe('slogan display', () => {
    let localStorageMock;
    let attachDivSlogan;

    beforeEach(() => {
      // Setup localStorage mock
      localStorageMock = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      };
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true,
      });

      attachDivSlogan = document.createElement('div');
      document.body.appendChild(attachDivSlogan);
    });

    afterEach(() => {
      vi.restoreAllMocks();
      if (attachDivSlogan) {
        attachDivSlogan.remove();
      }
    });

    it('should display default slogan on first visit', () => {
      // Arrange: no localStorage entry
      localStorageMock.getItem.mockReturnValue(null);

      // Act
      const sloganWrapper = mount(ProfileComponent, { attachTo: attachDivSlogan });

      // Assert
      expect(sloganWrapper.vm.currentSlogan).toBe(DEFAULT_SLOGAN);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('slogan-initialized', 'true');

      sloganWrapper.unmount();
    });

    it('should display random slogan on returning visit', () => {
      // Arrange: localStorage indicates returning visitor
      localStorageMock.getItem.mockReturnValue('true');
      const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0);

      // Act
      const sloganWrapper = mount(ProfileComponent, { attachTo: attachDivSlogan });

      // Assert
      expect(sloganWrapper.vm.currentSlogan).toBeDefined();
      expect(sloganWrapper.vm.currentSlogan.length).toBeGreaterThan(0);
      randomSpy.mockRestore();

      sloganWrapper.unmount();
    });

    it('should fallback to default when localStorage is unavailable', () => {
      // Arrange: localStorage throws error
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage unavailable');
      });

      // Act
      const sloganWrapper = mount(ProfileComponent, { attachTo: attachDivSlogan });

      // Assert
      expect(sloganWrapper.vm.currentSlogan).toBe(DEFAULT_SLOGAN);

      sloganWrapper.unmount();
    });

    it('should fallback to default when randomization pool is empty', () => {
      // Arrange: mock getRandomizableSlogans to return empty array
      localStorageMock.getItem.mockReturnValue('true');
      const spy = vi.spyOn(slogansModule, 'getRandomizableSlogans').mockReturnValue([]);

      // Act
      const sloganWrapper = mount(ProfileComponent, { attachTo: attachDivSlogan });

      // Assert: Should fallback to default slogan
      expect(sloganWrapper.vm.currentSlogan).toBe(DEFAULT_SLOGAN);

      // Cleanup
      spy.mockRestore();
      sloganWrapper.unmount();
    });

    it('should render slogan-container in template', async () => {
      localStorageMock.getItem.mockReturnValue(null);

      const sloganWrapper = mount(ProfileComponent, { attachTo: attachDivSlogan });

      // Wait for Vue to render
      await sloganWrapper.vm.$nextTick();

      const container = sloganWrapper.find('.slogan-container');
      expect(container.exists()).toBe(true);
      expect(container.text()).toContain('こんにちは');

      sloganWrapper.unmount();
    });

    it('should use Math.random to select from pool on returning visit', () => {
      // Arrange: localStorage indicates returning visitor
      localStorageMock.getItem.mockReturnValue('true');
      const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.5);

      // Act
      const sloganWrapper = mount(ProfileComponent, { attachTo: attachDivSlogan });

      // Assert: Math.random should have been called to pick from pool
      expect(randomSpy).toHaveBeenCalled();
      expect(sloganWrapper.vm.currentSlogan).toBeDefined();

      randomSpy.mockRestore();
      sloganWrapper.unmount();
    });

    it('should not call localStorage.setItem on returning visit', () => {
      // Arrange: localStorage indicates returning visitor
      localStorageMock.getItem.mockReturnValue('true');

      // Act
      const sloganWrapper = mount(ProfileComponent, { attachTo: attachDivSlogan });

      // Assert: setItem should not be called for returning visitors
      expect(localStorageMock.setItem).not.toHaveBeenCalledWith('slogan-initialized', 'true');

      sloganWrapper.unmount();
    });

    it('should fallback to slogans[0] when defaultSlogan is null on first visit', () => {
      // Arrange: mock defaultSlogan to be null
      localStorageMock.getItem.mockReturnValue(null);
      const originalDefaultSlogan = slogansModule.defaultSlogan;
      Object.defineProperty(slogansModule, 'defaultSlogan', {
        value: null,
        writable: true,
        configurable: true,
      });

      // Act
      const sloganWrapper = mount(ProfileComponent, { attachTo: attachDivSlogan });

      // Assert: Should fallback to first slogan in array
      expect(sloganWrapper.vm.currentSlogan).toBe(DEFAULT_SLOGAN);

      // Cleanup
      Object.defineProperty(slogansModule, 'defaultSlogan', {
        value: originalDefaultSlogan,
        writable: true,
        configurable: true,
      });
      sloganWrapper.unmount();
    });

    it('should fallback to empty string when both defaultSlogan and slogans[0] are null', () => {
      // Arrange: mock both defaultSlogan and slogans to be null/empty
      localStorageMock.getItem.mockReturnValue(null);
      const originalDefaultSlogan = slogansModule.defaultSlogan;
      const originalSlogans = slogansModule.slogans;
      Object.defineProperty(slogansModule, 'defaultSlogan', {
        value: null,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(slogansModule, 'slogans', {
        value: [],
        writable: true,
        configurable: true,
      });

      // Act
      const sloganWrapper = mount(ProfileComponent, { attachTo: attachDivSlogan });

      // Assert: Should fallback to empty string
      expect(sloganWrapper.vm.currentSlogan).toBe('');

      // Cleanup
      Object.defineProperty(slogansModule, 'defaultSlogan', {
        value: originalDefaultSlogan,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(slogansModule, 'slogans', {
        value: originalSlogans,
        writable: true,
        configurable: true,
      });
      sloganWrapper.unmount();
    });

    it('should fallback to slogans[0] when defaultSlogan is null in catch block', () => {
      // Arrange: localStorage throws and defaultSlogan is null
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage unavailable');
      });
      const originalDefaultSlogan = slogansModule.defaultSlogan;
      Object.defineProperty(slogansModule, 'defaultSlogan', {
        value: null,
        writable: true,
        configurable: true,
      });

      // Act
      const sloganWrapper = mount(ProfileComponent, { attachTo: attachDivSlogan });

      // Assert: Should fallback to first slogan in array
      expect(sloganWrapper.vm.currentSlogan).toBe(DEFAULT_SLOGAN);

      // Cleanup
      Object.defineProperty(slogansModule, 'defaultSlogan', {
        value: originalDefaultSlogan,
        writable: true,
        configurable: true,
      });
      sloganWrapper.unmount();
    });

    it('should fallback to empty string when both defaultSlogan and slogans are null in catch block', () => {
      // Arrange: localStorage throws, defaultSlogan is null, and slogans is empty
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage unavailable');
      });
      const originalDefaultSlogan = slogansModule.defaultSlogan;
      const originalSlogans = slogansModule.slogans;
      Object.defineProperty(slogansModule, 'defaultSlogan', {
        value: null,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(slogansModule, 'slogans', {
        value: [],
        writable: true,
        configurable: true,
      });

      // Act
      const sloganWrapper = mount(ProfileComponent, { attachTo: attachDivSlogan });

      // Assert: Should fallback to empty string
      expect(sloganWrapper.vm.currentSlogan).toBe('');

      // Cleanup
      Object.defineProperty(slogansModule, 'defaultSlogan', {
        value: originalDefaultSlogan,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(slogansModule, 'slogans', {
        value: originalSlogans,
        writable: true,
        configurable: true,
      });
      sloganWrapper.unmount();
    });

    it('should fallback to slogans[0] when defaultSlogan is null and pool is empty', () => {
      // Arrange: returning visitor, pool is empty, defaultSlogan is null
      localStorageMock.getItem.mockReturnValue('true');
      const originalDefaultSlogan = slogansModule.defaultSlogan;
      Object.defineProperty(slogansModule, 'defaultSlogan', {
        value: null,
        writable: true,
        configurable: true,
      });
      const spy = vi.spyOn(slogansModule, 'getRandomizableSlogans').mockReturnValue([]);

      // Act
      const sloganWrapper = mount(ProfileComponent, { attachTo: attachDivSlogan });

      // Assert: Should fallback to first slogan in array
      expect(sloganWrapper.vm.currentSlogan).toBe(DEFAULT_SLOGAN);

      // Cleanup
      spy.mockRestore();
      Object.defineProperty(slogansModule, 'defaultSlogan', {
        value: originalDefaultSlogan,
        writable: true,
        configurable: true,
      });
      sloganWrapper.unmount();
    });

    it('should fallback to empty string when defaultSlogan is null, slogans is empty, and pool is empty', () => {
      // Arrange: returning visitor, pool is empty, defaultSlogan is null, slogans is empty
      localStorageMock.getItem.mockReturnValue('true');
      const originalDefaultSlogan = slogansModule.defaultSlogan;
      const originalSlogans = slogansModule.slogans;
      Object.defineProperty(slogansModule, 'defaultSlogan', {
        value: null,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(slogansModule, 'slogans', {
        value: [],
        writable: true,
        configurable: true,
      });
      const spy = vi.spyOn(slogansModule, 'getRandomizableSlogans').mockReturnValue([]);

      // Act
      const sloganWrapper = mount(ProfileComponent, { attachTo: attachDivSlogan });

      // Assert: Should fallback to empty string
      expect(sloganWrapper.vm.currentSlogan).toBe('');

      // Cleanup
      spy.mockRestore();
      Object.defineProperty(slogansModule, 'defaultSlogan', {
        value: originalDefaultSlogan,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(slogansModule, 'slogans', {
        value: originalSlogans,
        writable: true,
        configurable: true,
      });
      sloganWrapper.unmount();
    });
  });

  it('showCareers does nothing when dialog element is absent', async () => {
    const original = document.getElementById.bind(document);
    vi.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (id === 'dialog-careers') {
        return null;
      }
      return original(id);
    });
    const careersBtn = wrapper.findAll('button').find((b) => b.text().includes('Careers'));
    // Should not throw
    await careersBtn.trigger('click');
    vi.restoreAllMocks();
  });

  it('showSpotify does nothing when dialog element is absent', async () => {
    const original = document.getElementById.bind(document);
    vi.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (id === 'dialog-spotify') {
        return null;
      }
      return original(id);
    });
    const musicBtn = wrapper.findAll('button').find((b) => b.text().includes('Music'));
    // Should not throw
    await musicBtn.trigger('click');
    vi.restoreAllMocks();
  });

  it('Music button opens Spotify dialog', async () => {
    const musicBtn = wrapper.findAll('button').find((b) => b.text().includes('Music'));
    await musicBtn.trigger('click');
    const spotifyDialog = document.getElementById('dialog-spotify');
    expect(spotifyDialog.showModal).toHaveBeenCalled();
  });

  it('Careers button opens Careers dialog', async () => {
    const careersBtn = wrapper.findAll('button').find((b) => b.text().includes('Careers'));
    await careersBtn.trigger('click');
    const careersDialog = document.getElementById('dialog-careers');
    expect(careersDialog.showModal).toHaveBeenCalled();
  });

  it('LinkedIn button calls window.open with noopener', async () => {
    const linkedinBtn = wrapper.find('#linkedin-btn');
    await linkedinBtn.trigger('click');
    expect(window.open).toHaveBeenCalled();
    const call = window.open.mock.calls[0];
    expect(call[2]).toBe('noopener,noreferrer');
  });

  it('GitHub button calls window.open with correct URL and noopener', async () => {
    const githubBtn = wrapper.find('#github-btn');
    await githubBtn.trigger('click');
    expect(window.open).toHaveBeenCalled();
    const call = window.open.mock.calls[0];
    expect(call[0]).toBe('https://github.com/jcchikikomori');
    expect(call[1]).toBe('_blank');
    expect(call[2]).toBe('noopener,noreferrer');
  });

  it('version link calls window.open with portfolio releases URL and noopener', async () => {
    const versionLink = wrapper.find('a[href="#"]');
    await versionLink.trigger('click');
    expect(window.open).toHaveBeenCalled();
    const call = window.open.mock.calls[0];
    expect(call[0]).toContain('github.com/jcchikikomori/portfolio/releases/tag/v');
    expect(call[2]).toBe('noopener,noreferrer');
  });

  it('Blog button calls window.open with blog URL and noopener', async () => {
    const blogBtn = wrapper.findAll('button').find((b) => b.text().includes('Blog'));
    await blogBtn.trigger('click');
    expect(window.open).toHaveBeenCalled();
    const call = window.open.mock.calls[0];
    expect(call[0]).toBe('https://jcchikikomori.github.io/blog');
    expect(call[1]).toBe('_blank');
    expect(call[2]).toBe('noopener,noreferrer');
  });

  it('Projects button click opens projects dialog', async () => {
    const projectsBtn = wrapper.findAll('button').find((b) => b.text().includes('Projects'));
    await projectsBtn.trigger('click');
    const projectsDialog = document.getElementById('dialog-projects');
    expect(projectsDialog.showModal).toHaveBeenCalled();
  });

  it('showProjects does nothing when dialog element is absent', async () => {
    const original = document.getElementById.bind(document);
    vi.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (id === 'dialog-projects') {
        return null;
      }
      return original(id);
    });
    const projectsBtn = wrapper.findAll('button').find((b) => b.text().includes('Projects'));
    // Should not throw
    await projectsBtn.trigger('click');
    vi.restoreAllMocks();
  });

  it('Projects button does NOT have is-disabled class', () => {
    const industriesBtn = wrapper.findAll('button').find((b) => b.text().includes('Projects'));
    expect(industriesBtn.classes()).not.toContain('is-disabled');
  });

  it('Projects button has is-success class', () => {
    const projectsBtn = wrapper.findAll('button').find((b) => b.text().includes('Projects'));
    expect(projectsBtn.classes()).toContain('is-success');
  });

  describe('VisualizerComponent integration', () => {
    let attachDivVisualizer;
    let localStorageMock;

    beforeEach(() => {
      localStorageMock = {
        getItem: vi.fn().mockReturnValue(null),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      };
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true,
      });

      attachDivVisualizer = document.createElement('div');
      document.body.appendChild(attachDivVisualizer);
    });

    afterEach(() => {
      if (attachDivVisualizer) {
        attachDivVisualizer.remove();
      }
    });

    it('renders VisualizerComponent in the template', () => {
      const visualizerWrapper = mount(ProfileComponent, { attachTo: attachDivVisualizer });
      const visualizer = visualizerWrapper.findComponent(VisualizerComponent);
      expect(visualizer.exists()).toBe(true);
      visualizerWrapper.unmount();
    });

    it('isMediaPlaying data starts as false', () => {
      const visualizerWrapper = mount(ProfileComponent, { attachTo: attachDivVisualizer });
      expect(visualizerWrapper.vm.isMediaPlaying).toBe(false);
      visualizerWrapper.unmount();
    });

    it('passes isMediaPlaying prop to VisualizerComponent', () => {
      const visualizerWrapper = mount(ProfileComponent, { attachTo: attachDivVisualizer });
      const visualizer = visualizerWrapper.findComponent(VisualizerComponent);
      expect(visualizer.props('isPlaying')).toBe(false);
      visualizerWrapper.unmount();
    });

    it('updates isMediaPlaying when media-playing-change event fires with true', async () => {
      const visualizerWrapper = mount(ProfileComponent, { attachTo: attachDivVisualizer });

      window.dispatchEvent(
        new CustomEvent('media-playing-change', {
          detail: { isPlaying: true },
        })
      );

      await visualizerWrapper.vm.$nextTick();
      expect(visualizerWrapper.vm.isMediaPlaying).toBe(true);

      visualizerWrapper.unmount();
    });

    it('updates isMediaPlaying when media-playing-change event fires with false', async () => {
      const visualizerWrapper = mount(ProfileComponent, { attachTo: attachDivVisualizer });

      // First set to true
      window.dispatchEvent(
        new CustomEvent('media-playing-change', {
          detail: { isPlaying: true },
        })
      );
      await visualizerWrapper.vm.$nextTick();
      expect(visualizerWrapper.vm.isMediaPlaying).toBe(true);

      // Then set to false
      window.dispatchEvent(
        new CustomEvent('media-playing-change', {
          detail: { isPlaying: false },
        })
      );
      await visualizerWrapper.vm.$nextTick();
      expect(visualizerWrapper.vm.isMediaPlaying).toBe(false);

      visualizerWrapper.unmount();
    });

    it('VisualizerComponent receives updated isPlaying prop', async () => {
      const visualizerWrapper = mount(ProfileComponent, { attachTo: attachDivVisualizer });
      const visualizer = visualizerWrapper.findComponent(VisualizerComponent);

      expect(visualizer.props('isPlaying')).toBe(false);

      window.dispatchEvent(
        new CustomEvent('media-playing-change', {
          detail: { isPlaying: true },
        })
      );

      await visualizerWrapper.vm.$nextTick();
      expect(visualizer.props('isPlaying')).toBe(true);

      visualizerWrapper.unmount();
    });

    it('removes event listener on beforeUnmount', () => {
      const visualizerWrapper = mount(ProfileComponent, { attachTo: attachDivVisualizer });

      // Unmount to trigger beforeUnmount
      visualizerWrapper.unmount();

      // Dispatch event after unmount - should not throw
      expect(() => {
        window.dispatchEvent(
          new CustomEvent('media-playing-change', {
            detail: { isPlaying: true },
          })
        );
      }).not.toThrow();
    });

    it('onMediaPlayingChange method updates isMediaPlaying correctly', () => {
      const visualizerWrapper = mount(ProfileComponent, { attachTo: attachDivVisualizer });

      // Test with true
      visualizerWrapper.vm.onMediaPlayingChange({ detail: { isPlaying: true } });
      expect(visualizerWrapper.vm.isMediaPlaying).toBe(true);

      // Test with false
      visualizerWrapper.vm.onMediaPlayingChange({ detail: { isPlaying: false } });
      expect(visualizerWrapper.vm.isMediaPlaying).toBe(false);

      visualizerWrapper.unmount();
    });
  });

  describe('OsdComponent integration', () => {
    let attachDivOsd;
    let localStorageMock;

    beforeEach(() => {
      vi.useFakeTimers();
      localStorageMock = {
        getItem: vi.fn().mockReturnValue(null),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      };
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true,
      });

      attachDivOsd = document.createElement('div');
      document.body.appendChild(attachDivOsd);
    });

    afterEach(() => {
      vi.useRealTimers();
      if (attachDivOsd) {
        attachDivOsd.remove();
      }
    });

    it('renders OsdComponent in the template', () => {
      const osdWrapper = mount(ProfileComponent, { attachTo: attachDivOsd });
      const osd = osdWrapper.findComponent(OsdComponent);
      expect(osd.exists()).toBe(true);
      osdWrapper.unmount();
    });

    it('passes isMediaPlaying prop to OsdComponent', () => {
      const osdWrapper = mount(ProfileComponent, { attachTo: attachDivOsd });
      const osd = osdWrapper.findComponent(OsdComponent);
      expect(osd.props('isPlaying')).toBe(false);
      osdWrapper.unmount();
    });

    it('OsdComponent receives updated isPlaying prop when media starts', async () => {
      const osdWrapper = mount(ProfileComponent, { attachTo: attachDivOsd });
      const osd = osdWrapper.findComponent(OsdComponent);

      expect(osd.props('isPlaying')).toBe(false);

      window.dispatchEvent(
        new CustomEvent('media-playing-change', {
          detail: { isPlaying: true },
        })
      );

      await osdWrapper.vm.$nextTick();
      expect(osd.props('isPlaying')).toBe(true);

      osdWrapper.unmount();
    });

    it('OsdComponent receives updated isPlaying prop when media stops', async () => {
      const osdWrapper = mount(ProfileComponent, { attachTo: attachDivOsd });
      const osd = osdWrapper.findComponent(OsdComponent);

      // Start playing
      window.dispatchEvent(
        new CustomEvent('media-playing-change', {
          detail: { isPlaying: true },
        })
      );
      await osdWrapper.vm.$nextTick();
      expect(osd.props('isPlaying')).toBe(true);

      // Stop playing
      window.dispatchEvent(
        new CustomEvent('media-playing-change', {
          detail: { isPlaying: false },
        })
      );
      await osdWrapper.vm.$nextTick();
      expect(osd.props('isPlaying')).toBe(false);

      osdWrapper.unmount();
    });
  });
});
