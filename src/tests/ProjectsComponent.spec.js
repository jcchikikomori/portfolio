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

    it('does not render description (temporarily disabled for details dialog migration)', () => {
        const wrapper = mount(ProjectsComponent)
        const cards = wrapper.findAll('.card')
        careers.forEach((career, index) => {
            if (career.description) {
                const body = cards[index].find('.card-body')
                expect(body.text()).not.toContain(career.description)
            }
        })
    })

    it('Accenture card click calls handleCardClick dispatching to window.open', async () => {
        const wrapper = mount(ProjectsComponent)
        const cards = wrapper.findAll('.card')
        const accentureIndex = careers.findIndex(c => c.id === 'accenture')
        await cards[accentureIndex].trigger('click')
        expect(window.open).toHaveBeenCalled()
        const call = window.open.mock.calls[0]
        expect(call[0]).toBe('https://accenture.com')
        expect(call[2]).toBe('noopener,noreferrer')
    })

    it('hello-php card click calls handleCardClick dispatching to alert', async () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
        const wrapper = mount(ProjectsComponent)
        const cards = wrapper.findAll('.card')
        const helloPhpIndex = careers.findIndex(c => c.id === 'hello-php')
        await cards[helloPhpIndex].trigger('click')
        expect(alertSpy).toHaveBeenCalledWith('Preview not available anymore.')
        alertSpy.mockRestore()
    })

    it('Chatgenie card click calls window.open with correct URL', async () => {
        const wrapper = mount(ProjectsComponent)
        const cards = wrapper.findAll('.card')
        const chatgenieIndex = careers.findIndex(c => c.id === 'chatgenie')
        await cards[chatgenieIndex].trigger('click')
        expect(window.open).toHaveBeenCalled()
        const call = window.open.mock.calls[0]
        expect(call[0]).toBe('https://chatgenie.ph')
        expect(call[2]).toBe('noopener,noreferrer')
    })

    it('GCash card click calls window.open with correct URL', async () => {
        const wrapper = mount(ProjectsComponent)
        const cards = wrapper.findAll('.card')
        const gcashIndex = careers.findIndex(c => c.id === 'gcash-miniprogram')
        await cards[gcashIndex].trigger('click')
        expect(window.open).toHaveBeenCalled()
        const call = window.open.mock.calls[0]
        expect(call[0]).toBe('https://miniprogram.gcash.com')
        expect(call[2]).toBe('noopener,noreferrer')
    })

    it('Cove Manila card click calls alert for unavailable preview', async () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
        const wrapper = mount(ProjectsComponent)
        const cards = wrapper.findAll('.card')
        const coveIndex = careers.findIndex(c => c.id === 'covemanila')
        await cards[coveIndex].trigger('click')
        expect(alertSpy).toHaveBeenCalledWith('Preview not available anymore.')
        alertSpy.mockRestore()
    })

    it('McDelivery card click calls window.open with correct URL', async () => {
        const wrapper = mount(ProjectsComponent)
        const cards = wrapper.findAll('.card')
        const mcIndex = careers.findIndex(c => c.id === 'mcdelivery')
        await cards[mcIndex].trigger('click')
        expect(window.open).toHaveBeenCalled()
        const call = window.open.mock.calls[0]
        expect(call[0]).toContain('mcdelivery.com.ph')
        expect(call[2]).toBe('noopener,noreferrer')
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

    it('renders #dialog-screenshots with nes-dialog class', () => {
        const wrapper = mount(ProjectsComponent)
        const dialog = wrapper.find('#dialog-screenshots')
        expect(dialog.exists()).toBe(true)
        expect(dialog.classes()).toContain('nes-dialog')
    })

    it('screenshot trigger disabled for cards with empty screenshots', () => {
        const wrapper = mount(ProjectsComponent)
        const cards = wrapper.findAll('.card')
        careers.forEach((career, index) => {
            if (career.screenshots.length === 0) {
                const trigger = cards[index].find('.screenshot-trigger')
                expect(trigger.exists()).toBe(true)
                expect(trigger.classes()).toContain('is-disabled')
            }
        })
    })

    it('screenshot trigger enabled for cards with non-empty screenshots', () => {
        const wrapper = mount(ProjectsComponent)
        const cards = wrapper.findAll('.card')
        const careersWithScreenshots = careers.filter(c => c.screenshots.length > 0)
        expect(careersWithScreenshots.length).toBeGreaterThan(0)
        careers.forEach((career, index) => {
            if (career.screenshots.length > 0) {
                const trigger = cards[index].find('.screenshot-trigger')
                expect(trigger.exists()).toBe(true)
                expect(trigger.classes()).toContain('is-default')
            }
        })
    })

    it('showScreenshots sets selectedCareer to matching career entry', () => {
        const wrapper = mount(ProjectsComponent)
        const careerWithScreenshots = careers.find(c => c.screenshots.length > 0)
        wrapper.vm.showScreenshots(careerWithScreenshots.id)
        expect(wrapper.vm.selectedCareer).toEqual(careerWithScreenshots)
    })

    it('showScreenshots calls dialog.showModal() on #dialog-screenshots', () => {
        const container = document.createElement('div')
        document.body.appendChild(container)
        const wrapper = mount(ProjectsComponent, { attachTo: container })
        const dialog = document.getElementById('dialog-screenshots')
        const showModalSpy = vi.fn()
        dialog.showModal = showModalSpy
        const careerWithScreenshots = careers.find(c => c.screenshots.length > 0)
        wrapper.vm.showScreenshots(careerWithScreenshots.id)
        expect(showModalSpy).toHaveBeenCalled()
        wrapper.unmount()
        container.remove()
    })

    it('showScreenshots does nothing when dialog element is absent', () => {
        const wrapper = mount(ProjectsComponent)
        const careerWithScreenshots = careers.find(c => c.screenshots.length > 0)
        const origGetById = document.getElementById
        document.getElementById = vi.fn((id) => {
            if (id === 'dialog-screenshots') {return null}
            return origGetById.call(document, id)
        })
        expect(() => wrapper.vm.showScreenshots(careerWithScreenshots.id)).not.toThrow()
        document.getElementById = origGetById
    })

    it('showScreenshots does nothing when career ID is not found', () => {
        const container = document.createElement('div')
        document.body.appendChild(container)
        const wrapper = mount(ProjectsComponent, { attachTo: container })
        const dialog = document.getElementById('dialog-screenshots')
        const showModalSpy = vi.fn()
        dialog.showModal = showModalSpy
        wrapper.vm.showScreenshots('nonexistent-id')
        expect(wrapper.vm.selectedCareer.company).toBe('')
        expect(showModalSpy).not.toHaveBeenCalled()
        wrapper.unmount()
        container.remove()
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

    it('screenshot dialog displays company logo in header', async () => {
        const container = document.createElement('div')
        document.body.appendChild(container)
        const wrapper = mount(ProjectsComponent, {
            attachTo: container,
            data() {
                return {
                    careers: [
                        {
                            ...careers[0],
                            logo: '/img/logos/test-company.png',
                            screenshots: ['/img/screenshots/test.png']
                        }
                    ]
                }
            }
        })

        // Mock showModal before calling showScreenshots
        const dialog = document.getElementById('dialog-screenshots')
        dialog.showModal = vi.fn()

        // Open screenshot dialog
        wrapper.vm.showScreenshots(careers[0].id)
        await wrapper.vm.$nextTick()

        // Check if logo is in dialog header
        const logoImg = wrapper.find('.screenshot-logo')
        expect(logoImg.exists()).toBe(true)
        expect(logoImg.attributes('src')).toBe('/img/logos/test-company.png')

        wrapper.unmount()
        container.remove()
    })

    it('screenshot dialog shows placeholder when logo is null', async () => {
        const container = document.createElement('div')
        document.body.appendChild(container)
        const wrapper = mount(ProjectsComponent, {
            attachTo: container,
            data() {
                return {
                    careers: [
                        {
                            ...careers[0],
                            logo: null,
                            screenshots: ['/img/screenshots/test.png']
                        }
                    ]
                }
            }
        })

        // Mock showModal before calling showScreenshots
        const dialog = document.getElementById('dialog-screenshots')
        dialog.showModal = vi.fn()

        wrapper.vm.showScreenshots(careers[0].id)
        await wrapper.vm.$nextTick()

        const placeholder = wrapper.find('.career-logo-placeholder')
        expect(placeholder.exists()).toBe(true)
        expect(placeholder.classes()).toContain('bi-x-lg')

        wrapper.unmount()
        container.remove()
    })

    it('screenshot dialog handles logo error with fallback', async () => {
        const container = document.createElement('div')
        document.body.appendChild(container)
        const wrapper = mount(ProjectsComponent, {
            attachTo: container,
            data() {
                return {
                    careers: [
                        {
                            ...careers[0],
                            logo: '/img/logos/broken.png',
                            screenshots: ['/img/screenshots/test.png']
                        }
                    ]
                }
            }
        })

        // Mock showModal before calling showScreenshots
        const dialog = document.getElementById('dialog-screenshots')
        dialog.showModal = vi.fn()

        wrapper.vm.showScreenshots(careers[0].id)
        await wrapper.vm.$nextTick()

        // Trigger error on screenshot logo
        const logoImg = wrapper.find('.screenshot-logo')
        expect(logoImg.exists()).toBe(true)
        await logoImg.trigger('error')

        // Should show placeholder after error
        const placeholder = wrapper.find('.career-logo-placeholder')
        expect(placeholder.exists()).toBe(true)

        wrapper.unmount()
        container.remove()
    })
})
