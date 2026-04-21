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

    it('renders description when career has one', () => {
        const wrapper = mount(ProjectsComponent)
        const cards = wrapper.findAll('.card')
        careers.forEach((career, index) => {
            if (career.description) {
                const body = cards[index].find('.card-body')
                expect(body.text()).toContain(career.description)
            }
        })
    })

    it('Accenture card click calls handleCardClick dispatching to window.open', async () => {
        const wrapper = mount(ProjectsComponent)
        const cards = wrapper.findAll('.card')
        const accentureIndex = careers.findIndex(c => c.id === 'accenture')
        const imgTop = cards[accentureIndex].find('.card-img-top')
        await imgTop.trigger('click')
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
        const imgTop = cards[helloPhpIndex].find('.card-img-top')
        await imgTop.trigger('click')
        expect(alertSpy).toHaveBeenCalledWith('Preview not available anymore.')
        alertSpy.mockRestore()
    })

    it('Chatgenie card click calls window.open with correct URL', async () => {
        const wrapper = mount(ProjectsComponent)
        const cards = wrapper.findAll('.card')
        const chatgenieIndex = careers.findIndex(c => c.id === 'chatgenie')
        const imgTop = cards[chatgenieIndex].find('.card-img-top')
        await imgTop.trigger('click')
        expect(window.open).toHaveBeenCalled()
        const call = window.open.mock.calls[0]
        expect(call[0]).toBe('https://chatgenie.ph')
        expect(call[2]).toBe('noopener,noreferrer')
    })

    it('GCash card click calls window.open with correct URL', async () => {
        const wrapper = mount(ProjectsComponent)
        const cards = wrapper.findAll('.card')
        const gcashIndex = careers.findIndex(c => c.id === 'gcash-miniprogram')
        const imgTop = cards[gcashIndex].find('.card-img-top')
        await imgTop.trigger('click')
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
        const imgTop = cards[coveIndex].find('.card-img-top')
        await imgTop.trigger('click')
        expect(alertSpy).toHaveBeenCalledWith('Preview not available anymore.')
        alertSpy.mockRestore()
    })

    it('McDelivery card click calls window.open with correct URL', async () => {
        const wrapper = mount(ProjectsComponent)
        const cards = wrapper.findAll('.card')
        const mcIndex = careers.findIndex(c => c.id === 'mcdelivery')
        const imgTop = cards[mcIndex].find('.card-img-top')
        await imgTop.trigger('click')
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
        const wrapper = mount(ProjectsComponent)
        const cards = wrapper.findAll('.card')
        const emptyPlatformIndex = careers.findIndex(c => c.platforms.length === 0)
        const iconRow = cards[emptyPlatformIndex].find('.platform-icons')
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
})
