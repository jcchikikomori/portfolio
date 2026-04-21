import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import App from '../App.vue'

describe('App.vue', () => {
    let warnSpy
    let errorSpy

    beforeEach(() => {
        warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
        errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    })

    it('mounts without Vue warnings', () => {
        mount(App)
        expect(warnSpy).not.toHaveBeenCalled()
        expect(errorSpy).not.toHaveBeenCalled()
    })

    it('renders root element', () => {
        const wrapper = mount(App)
        expect(wrapper.find('#app').exists()).toBe(true)
    })
})
