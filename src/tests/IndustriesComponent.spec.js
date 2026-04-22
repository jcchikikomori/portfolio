import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import IndustriesComponent from '../components/IndustriesComponent.vue'
import { industries } from '../data/industries.js'

describe('IndustriesComponent.vue', () => {
    let wrapper
    let container

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
        wrapper = mount(IndustriesComponent, { attachTo: container })
    })

    afterEach(() => {
        wrapper.unmount()
        container.remove()
    })

    it('renders #dialog-industries with nes-dialog class', () => {
        const dialog = wrapper.find('#dialog-industries')
        expect(dialog.exists()).toBe(true)
        expect(dialog.classes()).toContain('nes-dialog')
    })

    it('renders dialog title "Industries"', () => {
        const title = wrapper.find('h1.title')
        expect(title.exists()).toBe(true)
        expect(title.text()).toBe('Industries')
    })

    it('renders industries in flexbox grid layout', () => {
        const grid = wrapper.find('.industries-grid')
        expect(grid.exists()).toBe(true)

        const cards = wrapper.findAll('.industry-card')
        expect(cards.length).toBe(industries.length)
    })

    it('each industry shows icon and name', () => {
        const cards = wrapper.findAll('.industry-card')
        industries.forEach((industry, index) => {
            const icon = cards[index].find('.industry-icon')
            expect(icon.exists()).toBe(true)
            expect(icon.classes()).toContain(industry.icon)

            const name = cards[index].find('h3')
            expect(name.exists()).toBe(true)
            expect(name.text()).toBe(industry.name)
        })
    })

    it('industry cards have "View Projects" button', () => {
        const cards = wrapper.findAll('.industry-card')
        cards.forEach((card) => {
            const button = card.find('button.industry-toggle')
            expect(button.exists()).toBe(true)
            expect(button.text()).toBe('View Projects')
        })
    })

    it('clicking "View Projects" dispatches open-industry-projects event', async () => {
        const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent')
        const firstIndustry = industries[0]
        const card = wrapper.findAll('.industry-card')[0]
        const button = card.find('button.industry-toggle')

        await button.trigger('click')

        expect(dispatchEventSpy).toHaveBeenCalled()
        const event = dispatchEventSpy.mock.calls[0][0]
        expect(event.type).toBe('open-industry-projects')
        expect(event.detail).toHaveProperty('industryName')
        expect(event.detail.industryName).toBe(firstIndustry.name)

        dispatchEventSpy.mockRestore()
    })

    it('dialog has close button that closes dialog', async () => {
        const dialog = document.getElementById('dialog-industries')
        const closeSpy = vi.fn()
        dialog.close = closeSpy

        const closeButton = wrapper.find('.dialog-menu button')
        expect(closeButton.exists()).toBe(true)
        expect(closeButton.text()).toBe('Close')

        await closeButton.trigger('click')
        expect(closeSpy).toHaveBeenCalled()
    })

    it('renders all 4 industries', () => {
        const cards = wrapper.findAll('.industry-card')
        expect(cards.length).toBe(4)
    })

    it('industry icons are rendered correctly', () => {
        const expectedIcons = ['bi-cart', 'bi-credit-card', 'bi-building', 'bi-box-seam']
        const icons = wrapper.findAll('.industry-icon')

        icons.forEach((icon, index) => {
            expect(icon.classes()).toContain(expectedIcons[index])
        })
    })

    it('industry cards have nes-container styling', () => {
        const cards = wrapper.findAll('.industry-card')
        cards.forEach((card) => {
            expect(card.classes()).toContain('nes-container')
        })
    })

    it('showIndustryProjects method dispatches correct event', () => {
        const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent')
        const industryName = 'E-Commerce'

        wrapper.vm.showIndustryProjects(industryName)

        expect(dispatchEventSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                type: 'open-industry-projects',
                detail: { industryName }
            })
        )

        dispatchEventSpy.mockRestore()
    })
})
