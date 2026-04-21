import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import IndustriesComponent from '../components/IndustriesComponent.vue'
import { industries } from '../data/industries.js'
import { careers } from '../data/careers.js'

describe('IndustriesComponent.vue', () => {
    it('renders #dialog-industries with nes-dialog class', () => {
        const wrapper = mount(IndustriesComponent)
        const dialog = wrapper.find('#dialog-industries')
        expect(dialog.exists()).toBe(true)
        expect(dialog.classes()).toContain('nes-dialog')
    })

    it('renders correct number of industry groups', () => {
        const wrapper = mount(IndustriesComponent)
        const groups = wrapper.findAll('.industry-card')
        expect(groups.length).toBe(industries.length)
    })

    it('each industry shows icon and name', () => {
        const wrapper = mount(IndustriesComponent)
        const groups = wrapper.findAll('.industry-card')
        industries.forEach((industry, index) => {
            const icon = groups[index].find('.industry-icon')
            expect(icon.exists()).toBe(true)
            expect(icon.classes()).toContain(industry.icon)
            expect(groups[index].text()).toContain(industry.name)
        })
    })

    it('company names resolved from career IDs are displayed', () => {
        const wrapper = mount(IndustriesComponent)
        const groups = wrapper.findAll('.industry-card')
        industries.forEach((industry, index) => {
            industry.companyIds.forEach(companyId => {
                const career = careers.find(c => c.id === companyId)
                expect(groups[index].text()).toContain(career.company)
            })
        })
    })

    it('dialog has form with method dialog and close button', () => {
        const wrapper = mount(IndustriesComponent)
        const form = wrapper.find('form[method="dialog"]')
        expect(form.exists()).toBe(true)
        const closeBtn = wrapper.find('button.nes-btn.is-primary')
        expect(closeBtn.exists()).toBe(true)
    })

    it('getCompanyName returns correct name for valid id', () => {
        const wrapper = mount(IndustriesComponent)
        const result = wrapper.vm.getCompanyName('accenture')
        expect(result).toBe('Accenture')
    })

    it('getCompanyName returns empty string for invalid id', () => {
        const wrapper = mount(IndustriesComponent)
        const result = wrapper.vm.getCompanyName('nonexistent-id')
        expect(result).toBe('')
    })
})
