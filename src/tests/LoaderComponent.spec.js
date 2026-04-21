import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import LoaderComponent from '../components/LoaderComponent.vue'

describe('LoaderComponent.vue', () => {
    it('renders without errors', () => {
        const wrapper = mount(LoaderComponent)
        expect(wrapper.find('#loader-container').exists()).toBe(true)
    })

    it('shows initializing message', () => {
        const wrapper = mount(LoaderComponent)
        expect(wrapper.find('#loading-message').text()).toBe('Initializing...')
    })
})
