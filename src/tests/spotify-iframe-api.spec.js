import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import SpotifyComponent from '../components/SpotifyComponent.vue';
import { setMediaPlaying } from '../theme.js';

// Mock theme.js
vi.mock('../theme.js', () => ({
  setMediaPlaying: vi.fn(),
}));

describe('SpotifyComponent.vue - Iframe API', () => {
  let wrapper;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock dialog methods
    const mockDialog = {
      showModal: vi.fn(),
      close: vi.fn(),
    };

    // Create a container for the dialog
    const container = document.createElement('div');
    container.id = 'spotify-container';
    const dialog = document.createElement('dialog');
    dialog.id = 'dialog-spotify';
    Object.assign(dialog, mockDialog);
    container.appendChild(dialog);
    document.body.appendChild(container);

    // Create embed-iframe element
    const embedDiv = document.createElement('div');
    embedDiv.id = 'embed-iframe';
    dialog.appendChild(embedDiv);
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
    // Clean up DOM
    const container = document.getElementById('spotify-container');
    if (container) {
      container.remove();
    }
    // Reset window.onSpotifyIframeApiReady
    window.onSpotifyIframeApiReady = undefined;
    delete window.IFrameAPI;
  });

  it('renders without errors', () => {
    wrapper = mount(SpotifyComponent, {
      attachTo: document.getElementById('spotify-container'),
    });
    expect(wrapper.find('#dialog-spotify').exists()).toBe(true);
    expect(wrapper.find('#embed-iframe').exists()).toBe(true);
  });

  it('sets up window.onSpotifyIframeApiReady callback on mount', () => {
    wrapper = mount(SpotifyComponent, {
      attachTo: document.getElementById('spotify-container'),
    });

    // Should define the callback
    expect(typeof window.onSpotifyIframeApiReady).toBe('function');
  });

  it('creates EmbedController when Iframe API is ready', async () => {
    const mockAddListener = vi.fn();
    const mockDestroy = vi.fn();

    const mockEmbedController = {
      addListener: mockAddListener,
      destroy: mockDestroy,
    };

    const mockCreateController = vi.fn((element, options, callback) => {
      callback(mockEmbedController);
    });

    const mockIFrameAPI = {
      createController: mockCreateController,
    };

    wrapper = mount(SpotifyComponent, {
      attachTo: document.getElementById('spotify-container'),
    });

    // Simulate API ready
    window.onSpotifyIframeApiReady(mockIFrameAPI);

    // Wait for Vue to process
    await wrapper.vm.$nextTick();

    // Verify controller was created with correct options
    expect(mockCreateController).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      expect.objectContaining({
        width: '100%',
        height: '450',
        uri: expect.stringContaining('spotify:'),
      }),
      expect.any(Function)
    );

    // Verify event listeners were added
    expect(mockAddListener).toHaveBeenCalledWith('playback_update', expect.any(Function));
    expect(mockAddListener).toHaveBeenCalledWith('playback_started', expect.any(Function));
    expect(mockAddListener).toHaveBeenCalledWith('ready', expect.any(Function));
  });

  it('calls setMediaPlaying(true) when playback_update reports isPaused: false', async () => {
    let playbackUpdateHandler;

    const mockEmbedController = {
      addListener: vi.fn((event, handler) => {
        if (event === 'playback_update') {
          playbackUpdateHandler = handler;
        }
      }),
      destroy: vi.fn(),
    };

    const mockIFrameAPI = {
      createController: vi.fn((element, options, callback) => {
        callback(mockEmbedController);
      }),
    };

    wrapper = mount(SpotifyComponent, {
      attachTo: document.getElementById('spotify-container'),
    });

    window.onSpotifyIframeApiReady(mockIFrameAPI);
    await wrapper.vm.$nextTick();

    // Simulate playback update with isPaused: false (music playing)
    playbackUpdateHandler({ data: { isPaused: false } });

    expect(setMediaPlaying).toHaveBeenCalledWith(true);
  });

  it('calls setMediaPlaying(false) when playback_update reports isPaused: true', async () => {
    let playbackUpdateHandler;

    const mockEmbedController = {
      addListener: vi.fn((event, handler) => {
        if (event === 'playback_update') {
          playbackUpdateHandler = handler;
        }
      }),
      destroy: vi.fn(),
    };

    const mockIFrameAPI = {
      createController: vi.fn((element, options, callback) => {
        callback(mockEmbedController);
      }),
    };

    wrapper = mount(SpotifyComponent, {
      attachTo: document.getElementById('spotify-container'),
    });

    window.onSpotifyIframeApiReady(mockIFrameAPI);
    await wrapper.vm.$nextTick();

    // Simulate playback update with isPaused: true (music paused)
    playbackUpdateHandler({ data: { isPaused: true } });

    expect(setMediaPlaying).toHaveBeenCalledWith(false);
  });

  it('calls setMediaPlaying(true) when playback_started event fires', async () => {
    let playbackStartedHandler;

    const mockEmbedController = {
      addListener: vi.fn((event, handler) => {
        if (event === 'playback_started') {
          playbackStartedHandler = handler;
        }
      }),
      destroy: vi.fn(),
    };

    const mockIFrameAPI = {
      createController: vi.fn((element, options, callback) => {
        callback(mockEmbedController);
      }),
    };

    wrapper = mount(SpotifyComponent, {
      attachTo: document.getElementById('spotify-container'),
    });

    window.onSpotifyIframeApiReady(mockIFrameAPI);
    await wrapper.vm.$nextTick();

    // Simulate playback started
    playbackStartedHandler({ data: { playingURI: 'spotify:track:123' } });

    expect(setMediaPlaying).toHaveBeenCalledWith(true);
  });

  it('destroys EmbedController on unmount', async () => {
    const mockDestroy = vi.fn();

    const mockEmbedController = {
      addListener: vi.fn(),
      destroy: mockDestroy,
    };

    const mockIFrameAPI = {
      createController: vi.fn((element, options, callback) => {
        callback(mockEmbedController);
      }),
    };

    wrapper = mount(SpotifyComponent, {
      attachTo: document.getElementById('spotify-container'),
    });

    window.onSpotifyIframeApiReady(mockIFrameAPI);
    await wrapper.vm.$nextTick();

    // Unmount component
    wrapper.unmount();

    expect(mockDestroy).toHaveBeenCalled();
  });

  it('handles API already being loaded', async () => {
    // Pre-set the callback
    window.onSpotifyIframeApiReady = vi.fn();

    const mockAddListener = vi.fn();
    const mockEmbedController = {
      addListener: mockAddListener,
      destroy: vi.fn(),
    };

    window.IFrameAPI = {
      createController: vi.fn((element, options, callback) => {
        callback(mockEmbedController);
      }),
    };

    wrapper = mount(SpotifyComponent, {
      attachTo: document.getElementById('spotify-container'),
    });

    // Should call setupEmbedController immediately
    await wrapper.vm.$nextTick();

    // Verify controller was created
    expect(window.IFrameAPI.createController).toHaveBeenCalled();
  });

  it('closeSpotify method logs debug message', () => {
    const consoleSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

    wrapper = mount(SpotifyComponent, {
      attachTo: document.getElementById('spotify-container'),
    });

    wrapper.vm.closeSpotify();

    expect(consoleSpy).toHaveBeenCalledWith('SpotifyComponent: Spotify dialog closed.');

    consoleSpy.mockRestore();
  });

  it('handles case when embedController is null during destroy', () => {
    // Mount without initializing the controller
    wrapper = mount(SpotifyComponent, {
      attachTo: document.getElementById('spotify-container'),
    });

    // Ensure embedController is null
    wrapper.vm.embedController = null;

    // Should not throw when unmounting
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('logs error when addPlaybackListeners called without embedController', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    wrapper = mount(SpotifyComponent, {
      attachTo: document.getElementById('spotify-container'),
    });

    // Call addPlaybackListeners directly with null embedController
    wrapper.vm.embedController = null;
    wrapper.vm.addPlaybackListeners();

    expect(consoleErrorSpy).toHaveBeenCalledWith('SpotifyComponent: No EmbedController available');

    consoleErrorSpy.mockRestore();
  });

  it('handles ready event from EmbedController', async () => {
    let readyHandler;
    const consoleSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

    const mockEmbedController = {
      addListener: vi.fn((event, handler) => {
        if (event === 'ready') {
          readyHandler = handler;
        }
      }),
      destroy: vi.fn(),
    };

    const mockIFrameAPI = {
      createController: vi.fn((element, options, callback) => {
        callback(mockEmbedController);
      }),
    };

    wrapper = mount(SpotifyComponent, {
      attachTo: document.getElementById('spotify-container'),
    });

    window.onSpotifyIframeApiReady(mockIFrameAPI);
    await wrapper.vm.$nextTick();

    // Simulate ready event
    readyHandler();

    expect(consoleSpy).toHaveBeenCalledWith('SpotifyComponent: Embed ready');

    consoleSpy.mockRestore();
  });

  it('logs error when embed-iframe element is not found', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Remove the existing embed-iframe element created in beforeEach
    const existingEmbed = document.getElementById('embed-iframe');
    if (existingEmbed) {
      existingEmbed.remove();
    }

    // Verify element is removed
    expect(document.getElementById('embed-iframe')).toBeNull();

    // Manually call createEmbedController which should fail to find the element
    const mockIFrameAPI = {
      createController: vi.fn(),
    };

    wrapper.vm.createEmbedController(mockIFrameAPI);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'SpotifyComponent: Embed iframe element not found'
    );
    expect(mockIFrameAPI.createController).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
