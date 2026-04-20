import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ProjectsComponent from '../components/ProjectsComponent.vue'

describe('ProjectsComponent.vue', () => {
    beforeEach(() => {
        window.open.mockClear()
    })

    it('project card link calls window.open with noopener', async () => {
        const wrapper = mount(ProjectsComponent)
        const contactLink = wrapper.find('a')
        await contactLink.trigger('click')
        expect(window.open).toHaveBeenCalled()
        const call = window.open.mock.calls[0]
        expect(call[2]).toBe('noopener,noreferrer')
    })

    it('Accenture card image click calls window.open with noopener', async () => {
        const wrapper = mount(ProjectsComponent)
        const accentureCard = wrapper.find('.card-img-top.placeholder')
        await accentureCard.trigger('click')
        expect(window.open).toHaveBeenCalled()
        const call = window.open.mock.calls[0]
        expect(call[0]).toBe('https://accenture.com')
        expect(call[2]).toBe('noopener,noreferrer')
    })

    it('hello-php card image click calls alert for unavailable preview', async () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
        const wrapper = mount(ProjectsComponent)
        const helloPhpCard = wrapper.find('.card-img-top.hello-php')
        await helloPhpCard.trigger('click')
        expect(alertSpy).toHaveBeenCalledWith('Preview not available anymore.')
        alertSpy.mockRestore()
    })

    it('Chatgenie card image click calls window.open with correct URL and noopener', async () => {
        const wrapper = mount(ProjectsComponent)
        const chatgenieCard = wrapper.find('.card-img-top.chatgenie')
        await chatgenieCard.trigger('click')
        expect(window.open).toHaveBeenCalled()
        const call = window.open.mock.calls[0]
        expect(call[0]).toBe('https://chatgenie.ph')
        expect(call[2]).toBe('noopener,noreferrer')
    })

    it('GCash Mini Program card image click calls window.open with correct URL and noopener', async () => {
        const wrapper = mount(ProjectsComponent)
        const gcashCard = wrapper.find('.card-img-top.gcash-miniprogram')
        await gcashCard.trigger('click')
        expect(window.open).toHaveBeenCalled()
        const call = window.open.mock.calls[0]
        expect(call[0]).toBe('https://miniprogram.gcash.com')
        expect(call[2]).toBe('noopener,noreferrer')
    })

    it('Cove Manila card image click calls alert for unavailable preview', async () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
        const wrapper = mount(ProjectsComponent)
        const coveCard = wrapper.find('.card-img-top.covemanila')
        await coveCard.trigger('click')
        expect(alertSpy).toHaveBeenCalledWith('Preview not available anymore.')
        alertSpy.mockRestore()
    })

    it('McDelivery card image click calls window.open with correct URL and noopener', async () => {
        const wrapper = mount(ProjectsComponent)
        const mcdeliveryCard = wrapper.find('.card-img-top.mcdelivery')
        await mcdeliveryCard.trigger('click')
        expect(window.open).toHaveBeenCalled()
        const call = window.open.mock.calls[0]
        expect(call[0]).toContain('mcdelivery.com.ph')
        expect(call[2]).toBe('noopener,noreferrer')
    })
})
