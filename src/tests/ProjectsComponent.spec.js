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

    it('renders #dialog-career-details with nes-dialog class', () => {
        const wrapper = mount(ProjectsComponent)
        const dialog = wrapper.find('#dialog-career-details')
        expect(dialog.exists()).toBe(true)
        expect(dialog.classes()).toContain('nes-dialog')
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

    it('showCareerDetails sets selectedCareer to matching career entry', () => {
        const wrapper = mount(ProjectsComponent)
        const testCareer = careers[0]
        wrapper.vm.showCareerDetails(testCareer.id)
        expect(wrapper.vm.selectedCareer).toEqual(testCareer)
    })

    it('showCareerDetails calls dialog.showModal() on #dialog-career-details', () => {
        const container = document.createElement('div')
        document.body.appendChild(container)
        const wrapper = mount(ProjectsComponent, { attachTo: container })
        const dialog = document.getElementById('dialog-career-details')
        const showModalSpy = vi.fn()
        dialog.showModal = showModalSpy
        const testCareer = careers[0]
        wrapper.vm.showCareerDetails(testCareer.id)
        expect(showModalSpy).toHaveBeenCalled()
        wrapper.unmount()
        container.remove()
    })

    it('showCareerDetails does nothing when dialog element is absent', () => {
        const wrapper = mount(ProjectsComponent)
        const testCareer = careers[0]
        const origGetById = document.getElementById
        document.getElementById = vi.fn((id) => {
            if (id === 'dialog-career-details') {return null}
            return origGetById.call(document, id)
        })
        expect(() => wrapper.vm.showCareerDetails(testCareer.id)).not.toThrow()
        document.getElementById = origGetById
    })

    it('showCareerDetails does nothing when career ID is not found', () => {
        const container = document.createElement('div')
        document.body.appendChild(container)
        const wrapper = mount(ProjectsComponent, { attachTo: container })
        const dialog = document.getElementById('dialog-career-details')
        const showModalSpy = vi.fn()
        dialog.showModal = showModalSpy
        wrapper.vm.showCareerDetails('nonexistent-id')
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

    it('career details dialog displays company logo in header', async () => {
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

        // Mock showModal before calling showCareerDetails
        const dialog = document.getElementById('dialog-career-details')
        dialog.showModal = vi.fn()

        // Open career details dialog
        wrapper.vm.showCareerDetails(careers[0].id)
        await wrapper.vm.$nextTick()

        // Check if logo is in dialog header
        const logoImg = wrapper.find('.career-details-logo')
        expect(logoImg.exists()).toBe(true)
        expect(logoImg.attributes('src')).toBe('/img/logos/test-company.png')

        wrapper.unmount()
        container.remove()
    })

    it('career details dialog shows placeholder when logo is null', async () => {
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

        // Mock showModal before calling showCareerDetails
        const dialog = document.getElementById('dialog-career-details')
        dialog.showModal = vi.fn()

        wrapper.vm.showCareerDetails(careers[0].id)
        await wrapper.vm.$nextTick()

        const placeholder = wrapper.find('.career-logo-placeholder')
        expect(placeholder.exists()).toBe(true)
        expect(placeholder.classes()).toContain('bi-x-lg')

        wrapper.unmount()
        container.remove()
    })

    it('career details dialog handles logo error with fallback', async () => {
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

        // Mock showModal before calling showCareerDetails
        const dialog = document.getElementById('dialog-career-details')
        dialog.showModal = vi.fn()

        wrapper.vm.showCareerDetails(careers[0].id)
        await wrapper.vm.$nextTick()

        // Trigger error on career details logo
        const logoImg = wrapper.find('.career-details-logo')
        expect(logoImg.exists()).toBe(true)
        await logoImg.trigger('error')

        // Should show placeholder after error
        const placeholder = wrapper.find('.career-logo-placeholder')
        expect(placeholder.exists()).toBe(true)

        wrapper.unmount()
        container.remove()
    })

    it('career details dialog displays description', async () => {
        const container = document.createElement('div')
        document.body.appendChild(container)
        const wrapper = mount(ProjectsComponent, {
            attachTo: container,
            data() {
                return {
                    careers: [
                        {
                            ...careers[0],
                            description: 'Test description for career',
                            screenshots: ['/img/screenshots/test.png']
                        }
                    ]
                }
            }
        })

        const dialog = document.getElementById('dialog-career-details')
        dialog.showModal = vi.fn()

        wrapper.vm.showCareerDetails(careers[0].id)
        await wrapper.vm.$nextTick()

        const infoSection = wrapper.find('.career-details-info')
        expect(infoSection.text()).toContain('Test description for career')

        wrapper.unmount()
        container.remove()
    })

    it('career details dialog displays period dates', async () => {
        const container = document.createElement('div')
        document.body.appendChild(container)
        const wrapper = mount(ProjectsComponent, {
            attachTo: container,
            data() {
                return {
                    careers: [
                        {
                            ...careers[0],
                            dates: '2020-2023',
                            screenshots: ['/img/screenshots/test.png']
                        }
                    ]
                }
            }
        })

        const dialog = document.getElementById('dialog-career-details')
        dialog.showModal = vi.fn()

        wrapper.vm.showCareerDetails(careers[0].id)
        await wrapper.vm.$nextTick()

        const infoSection = wrapper.find('.career-details-info')
        expect(infoSection.text()).toContain('2020-2023')

        wrapper.unmount()
        container.remove()
    })

    it('career details dialog displays platform icons', async () => {
        const container = document.createElement('div')
        document.body.appendChild(container)
        const wrapper = mount(ProjectsComponent, {
            attachTo: container,
            data() {
                return {
                    careers: [
                        {
                            ...careers[0],
                            platforms: ['bi-globe', 'bi-phone'],
                            screenshots: ['/img/screenshots/test.png']
                        }
                    ]
                }
            }
        })

        const dialog = document.getElementById('dialog-career-details')
        dialog.showModal = vi.fn()

        wrapper.vm.showCareerDetails(careers[0].id)
        await wrapper.vm.$nextTick()

        const platformIcons = wrapper.find('.career-details-info .platform-icons')
        expect(platformIcons.exists()).toBe(true)
        const icons = platformIcons.findAll('i')
        expect(icons.length).toBe(2)
        expect(icons[0].classes()).toContain('bi-globe')
        expect(icons[1].classes()).toContain('bi-phone')

        wrapper.unmount()
        container.remove()
    })

    it('career details dialog shows View Project button for url clickAction', async () => {
        const container = document.createElement('div')
        document.body.appendChild(container)
        const wrapper = mount(ProjectsComponent, {
            attachTo: container,
            data() {
                return {
                    careers: [
                        {
                            ...careers[0],
                            clickAction: 'url',
                            url: 'https://example.com',
                            screenshots: ['/img/screenshots/test.png']
                        }
                    ]
                }
            }
        })

        const dialog = document.getElementById('dialog-career-details')
        dialog.showModal = vi.fn()

        wrapper.vm.showCareerDetails(careers[0].id)
        await wrapper.vm.$nextTick()

        const ctaButton = wrapper.find('.career-cta')
        expect(ctaButton.exists()).toBe(true)
        expect(ctaButton.text()).toBe('View Project')
        expect(ctaButton.classes()).toContain('is-primary')

        wrapper.unmount()
        container.remove()
    })

    it('career details dialog shows disabled button for alert clickAction', async () => {
        const container = document.createElement('div')
        document.body.appendChild(container)
        const wrapper = mount(ProjectsComponent, {
            attachTo: container,
            data() {
                return {
                    careers: [
                        {
                            ...careers[0],
                            clickAction: 'alert',
                            url: null,
                            screenshots: ['/img/screenshots/test.png']
                        }
                    ]
                }
            }
        })

        const dialog = document.getElementById('dialog-career-details')
        dialog.showModal = vi.fn()

        wrapper.vm.showCareerDetails(careers[0].id)
        await wrapper.vm.$nextTick()

        const ctaButton = wrapper.find('.career-cta')
        expect(ctaButton.exists()).toBe(true)
        expect(ctaButton.text()).toBe('Project Unavailable')
        expect(ctaButton.classes()).toContain('is-disabled')

        wrapper.unmount()
        container.remove()
    })

    it('career details dialog shows placeholder image when no screenshots', async () => {
        const container = document.createElement('div')
        document.body.appendChild(container)
        const wrapper = mount(ProjectsComponent, {
            attachTo: container,
            data() {
                return {
                    careers: [
                        {
                            ...careers[0],
                            screenshots: []
                        }
                    ]
                }
            }
        })

        const dialog = document.getElementById('dialog-career-details')
        dialog.showModal = vi.fn()

        wrapper.vm.showCareerDetails(careers[0].id)
        await wrapper.vm.$nextTick()

        const screenshot = wrapper.find('.career-screenshot')
        expect(screenshot.exists()).toBe(true)
        expect(screenshot.attributes('src')).toBe('/img/projects/placeholder.png')

        wrapper.unmount()
        container.remove()
    })
})
