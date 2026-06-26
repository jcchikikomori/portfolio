import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import SpotifyComponent from '../components/SpotifyComponent.vue';

describe('SpotifyComponent.vue', () => {
  let debugSpy;

  beforeEach(() => {
    debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
  });

  it('renders without errors', () => {
    const wrapper = mount(SpotifyComponent);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('#dialog-spotify').exists()).toBe(true);
  });

  it('close button triggers closeSpotify debug log', async () => {
    const wrapper = mount(SpotifyComponent);
    const closeBtn = wrapper.find('button.nes-btn.is-primary');
    await closeBtn.trigger('click');
    expect(debugSpy).toHaveBeenCalledWith('SpotifyComponent: Spotify dialog closed.');
  });

  it('form[method=dialog] closes the dialog after showModal', async () => {
    const attachDiv = document.createElement('div');
    document.body.appendChild(attachDiv);
    const wrapper = mount(SpotifyComponent, { attachTo: attachDiv });

    const spotifyDialog = document.getElementById('dialog-spotify');

    // jsdom does not implement showModal/close — polyfill to simulate open/close cycle
    spotifyDialog.showModal = vi.fn(() => {
      spotifyDialog.open = true;
    });
    spotifyDialog.close = vi.fn(() => {
      spotifyDialog.open = false;
    });

    // Simulate native <form method="dialog"> close on form submit
    const form = spotifyDialog.querySelector('form[method="dialog"]');
    form.addEventListener('submit', () => spotifyDialog.close());

    spotifyDialog.showModal();
    expect(spotifyDialog.open).toBe(true);

    const closeBtn = wrapper.find('button.nes-btn.is-primary');
    await closeBtn.trigger('click');

    expect(spotifyDialog.open).toBe(false);

    wrapper.unmount();
    attachDiv.remove();
  });
});
