import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SpotifyComponent from '../components/SpotifyComponent.vue'

describe('SpotifyComponent.vue', () => {
    let debugSpy

    beforeEach(() => {
        debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})
    })

    it('renders without errors', () => {
        const wrapper = mount(SpotifyComponent)
        expect(wrapper.exists()).toBe(true)
        expect(wrapper.find('#dialog-spotify').exists()).toBe(true)
    })

    it('close button triggers closeSpotify debug log', async () => {
        const wrapper = mount(SpotifyComponent)
        const closeBtn = wrapper.find('button.nes-btn.is-primary')
        await closeBtn.trigger('click')
        expect(debugSpy).toHaveBeenCalledWith('SpotifyComponent: Spotify dialog closed.')
    })
})
