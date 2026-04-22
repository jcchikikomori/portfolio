import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import ProjectsComponent from '../components/ProjectsComponent.vue'
import { careers } from '../data/careers.js'

describe('ProjectsComponent.vue', () => {
    beforeEach(() => {
        window.open.mockClear()
    })

    it('renders #dialog-projects with nes-dialog class', () => {
        const wrapper = mount(ProjectsComponent)
        const dialog = wrapper.find('#dialog-projects')
        expect(dialog.exists()).toBe(true)
        expect(dialog.classes()).toContain('nes-dialog')
    })

    it('renders career list with flexbox container class', () => {
        const wrapper = mount(ProjectsComponent)
        const careerList = wrapper.find('.career-list')
        expect(careerList.exists()).toBe(true)
    })

    it('renders cards within flexbox container', () => {
        const wrapper = mount(ProjectsComponent)
        const careerList = wrapper.find('.career-list')
        const cards = careerList.findAll('.card')
        expect(cards.length).toBe(careers.length)
    })

    it('contact link calls window.open with noopener', async () => {
        const wrapper = mount(ProjectsComponent)
        const contactLink = wrapper.find('a')
        await contactLink.trigger('click')
        expect(window.open).toHaveBeenCalled()
        const call = window.open.mock.calls[0]
        expect(call[2]).toBe('noopener,noreferrer')
    })

    it('renders correct number of career cards from data', () => {
        const wrapper = mount(ProjectsComponent)
        const cards = wrapper.findAll('.card')
        expect(cards.length).toBe(careers.length)
    })

    it('renders company name for each card', () => {
        const wrapper = mount(ProjectsComponent)
        const titles = wrapper.findAll('.card-title')
        careers.forEach((career, index) => {
            expect(titles[index].text()).toBe(career.company)
        })
    })

    it('renders date range for each card', () => {
        const wrapper = mount(ProjectsComponent)
        const cards = wrapper.findAll('.card')
        careers.forEach((career, index) => {
            const muted = cards[index].find('.text-muted')
            expect(muted.text()).toBe(career.dates)
        })
    })

    it('does not render description (handled by CareerDetailsComponent)', () => {
        const wrapper = mount(ProjectsComponent)
        const cards = wrapper.findAll('.card')
        careers.forEach((career, index) => {
            if (career.description) {
                const body = cards[index].find('.card-body')
                expect(body.text()).not.toContain(career.description)
            }
        })
    })

    it('card click dispatches open-career-details event', async () => {
        const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent')
        const wrapper = mount(ProjectsComponent)
        const cards = wrapper.findAll('.card')
        
        await cards[0].trigger('click')
        
        expect(dispatchEventSpy).toHaveBeenCalled()
        const event = dispatchEventSpy.mock.calls[0][0]
        expect(event.type).toBe('open-career-details')
        expect(event.detail.careerId).toBe(careers[0].id)
        
        dispatchEventSpy.mockRestore()
    })

    it('View Details button dispatches open-career-details event', async () => {
        const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent')
        const wrapper = mount(ProjectsComponent)
        const button = wrapper.find('.career-details-trigger')
        
        await button.trigger('click')
        
        expect(dispatchEventSpy).toHaveBeenCalled()
        const event = dispatchEventSpy.mock.calls[0][0]
        expect(event.type).toBe('open-career-details')
        
        dispatchEventSpy.mockRestore()
    })

    it('renders placeholder icon for careers with null logo', () => {
        const wrapper = mount(ProjectsComponent)
        const placeholders = wrapper.findAll('.career-logo-placeholder')
        const nullLogoCount = careers.filter(c => c.logo === null).length
        expect(placeholders.length).toBe(nullLogoCount)
        placeholders.forEach(placeholder => {
            expect(placeholder.classes()).toContain('bi')
            expect(placeholder.classes()).toContain('bi-x-lg')
        })
    })

    it('renders logo img when career.logo is set', () => {
        const wrapper = mount(ProjectsComponent, {
            data() {
                return {
                    careers: [
                        {
                            ...careers[0],
                            logo: '/img/logos/test-logo.svg',
                            logoDark: null,
                        }
                    ]
                }
            }
        })
        const logoImg = wrapper.find('.career-logo')
        expect(logoImg.exists()).toBe(true)
        expect(logoImg.attributes('src')).toBe('/img/logos/test-logo.svg')
    })

    it('renders platform icons when career.platforms is non-empty', () => {
        const wrapper = mount(ProjectsComponent, {
            data() {
                return {
                    careers: [
                        {
                            ...careers[0],
                            platforms: ['bi-globe', 'bi-phone'],
                        }
                    ]
                }
            }
        })
        const iconRow = wrapper.find('.platform-icons')
        expect(iconRow.exists()).toBe(true)
        const icons = iconRow.findAll('i')
        expect(icons.length).toBe(2)
        expect(icons[0].classes()).toContain('bi-globe')
        expect(icons[1].classes()).toContain('bi-phone')
    })

    it('does not render platform icon row when platforms is empty', () => {
        const wrapper = mount(ProjectsComponent, {
            data() {
                return {
                    careers: [
                        {
                            ...careers[0],
                            platforms: [],
                        },
                    ],
                }
            },
        })
        const iconRow = wrapper.find('.platform-icons')
        expect(iconRow.exists()).toBe(false)
    })

    it('img @error handler falls back to placeholder', async () => {
        const wrapper = mount(ProjectsComponent, {
            data() {
                return {
                    careers: [
                        {
                            ...careers[0],
                            logo: '/img/logos/broken.svg',
                            logoDark: null,
                        }
                    ]
                }
            }
        })
        const logoImg = wrapper.find('.career-logo')
        expect(logoImg.exists()).toBe(true)
        await logoImg.trigger('error')
        const placeholder = wrapper.find('.career-logo-placeholder')
        expect(placeholder.exists()).toBe(true)
        expect(wrapper.find('.career-logo').exists()).toBe(false)
    })

    it('career details trigger rendered for all cards', () => {
        const wrapper = mount(ProjectsComponent)
        const cards = wrapper.findAll('.card')
        expect(cards.length).toBe(careers.length)
        cards.forEach((card) => {
            const trigger = card.find('.career-details-trigger')
            expect(trigger.exists()).toBe(true)
            expect(trigger.text()).toBe('View Details')
        })
    })

    it('showCareerDetails dispatches event with careerId', () => {
        const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent')
        const wrapper = mount(ProjectsComponent)
        const testCareer = careers[0]
        
        wrapper.vm.showCareerDetails(testCareer.id)
        
        expect(dispatchEventSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                type: 'open-career-details',
                detail: { careerId: testCareer.id }
            })
        )
        
        dispatchEventSpy.mockRestore()
    })

    it('dark mode falls back to logo when logoDark is null', async () => {
        const container = document.createElement('div')
        document.body.appendChild(container)
        const wrapper = mount(ProjectsComponent, {
            attachTo: container,
            data() {
                return {
                    careers: [
                        {
                            ...careers[0],
                            logo: '/img/logos/light.svg',
                            logoDark: null,
                        }
                    ]
                }
            }
        })
        const dialog = document.getElementById('dialog-projects')
        dialog.classList.add('is-dark')
        expect(wrapper.vm.isDark()).toBe(true)
        await wrapper.vm.$forceUpdate()
        await wrapper.vm.$nextTick()
        const logoImg = wrapper.find('.career-logo')
        expect(logoImg.exists()).toBe(true)
        expect(logoImg.attributes('src')).toBe('/img/logos/light.svg')
        wrapper.unmount()
        container.remove()
    })

    it('dark mode uses logoDark when available', async () => {
        const container = document.createElement('div')
        document.body.appendChild(container)
        const wrapper = mount(ProjectsComponent, {
            attachTo: container,
            data() {
                return {
                    careers: [
                        {
                            ...careers[0],
                            logo: '/img/logos/light.svg',
                            logoDark: '/img/logos/dark.svg',
                        }
                    ]
                }
            }
        })
        // Simulate dark mode by adding is-dark class to the dialog
        const dialog = document.getElementById('dialog-projects')
        dialog.classList.add('is-dark')
        // Verify isDark method detects the class
        expect(wrapper.vm.isDark()).toBe(true)
        // Force re-render so logoSrc picks up dark mode
        await wrapper.vm.$forceUpdate()
        await wrapper.vm.$nextTick()
        const logoImg = wrapper.find('.career-logo')
        expect(logoImg.exists()).toBe(true)
        expect(logoImg.attributes('src')).toBe('/img/logos/dark.svg')
        wrapper.unmount()
        container.remove()
    })

    it('handles multiple logo errors without duplicating state', async () => {
        const wrapper = mount(ProjectsComponent, {
            data() {
                return {
                    careers: [
                        { ...careers[0], id: 'test1', logo: '/broken1.png' },
                        { ...careers[1], id: 'test2', logo: '/broken2.png' }
                    ]
                }
            }
        })
        const logos = wrapper.findAll('.career-logo')
        await logos[0].trigger('error')
        await logos[1].trigger('error')
        expect(Object.keys(wrapper.vm.logoErrors).length).toBe(2)
        expect(wrapper.vm.logoErrors.test1).toBe(true)
        expect(wrapper.vm.logoErrors.test2).toBe(true)
    })

    it('close button closes careers dialog', async () => {
        const container = document.createElement('div')
        document.body.appendChild(container)
        const wrapper = mount(ProjectsComponent, { attachTo: container })
        
        const careersDialog = document.getElementById('dialog-projects')
        const closeSpy = vi.fn()
        careersDialog.close = closeSpy
        
        // Get the close button from the dialog-menu in careers dialog
        const closeButton = wrapper.findAll('.dialog-menu button').filter(b => b.text() === 'Okay')[0]
        expect(closeButton.exists()).toBe(true)
        
        await closeButton.trigger('click')
        expect(closeSpy).toHaveBeenCalled()
        
        wrapper.unmount()
        container.remove()
    })
})
