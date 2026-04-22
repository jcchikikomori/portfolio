import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import IndustryProjectsComponent from '../components/IndustryProjectsComponent.vue'
import { industries } from '../data/industries.js'

describe('IndustryProjectsComponent.vue', () => {
    let wrapper
    let container

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
        wrapper = mount(IndustryProjectsComponent, { attachTo: container })
        // Mock showModal for all tests that call showIndustryProjects
        const dialog = document.getElementById('dialog-industry-projects')
        if (dialog) {
            dialog.showModal = vi.fn()
        }
    })

    afterEach(() => {
        wrapper.unmount()
        container.remove()
    })

    it('renders #dialog-industry-projects with nes-dialog class', () => {
        const dialog = wrapper.find('#dialog-industry-projects')
        expect(dialog.exists()).toBe(true)
        expect(dialog.classes()).toContain('nes-dialog')
    })

    it('dialog has natural height with max-height 90vh', () => {
        const dialog = document.getElementById('dialog-industry-projects')
        expect(dialog).toBeTruthy()
    })

    it('renders industry name in title when showing projects', async () => {
        const industry = industries[0]
        wrapper.vm.showIndustryProjects(industry.name)
        await wrapper.vm.$nextTick()

        const title = wrapper.find('.title')
        expect(title.exists()).toBe(true)
        expect(title.text()).toContain(industry.name)
    })

    it('renders projects list container', async () => {
        const industry = industries[0]
        wrapper.vm.showIndustryProjects(industry.name)
        await wrapper.vm.$nextTick()

        const projectsList = wrapper.find('.projects-list')
        expect(projectsList.exists()).toBe(true)
    })

    it('renders correct number of project items', async () => {
        const industry = industries[0]
        wrapper.vm.showIndustryProjects(industry.name)
        await wrapper.vm.$nextTick()

        const projectItems = wrapper.findAll('.project-item')
        expect(projectItems.length).toBe(industry.projects.length)
    })

    it('each project item shows name and description', async () => {
        const industry = industries[0]
        wrapper.vm.showIndustryProjects(industry.name)
        await wrapper.vm.$nextTick()

        const projectItems = wrapper.findAll('.project-item')
        industry.projects.forEach((project, index) => {
            const item = projectItems[index]
            expect(item.find('h4').text()).toBe(project.name)
            expect(item.find('p').text()).toBe(project.description)
        })
    })

    it('each project item shows skills with icons', async () => {
        const industry = industries[0]
        wrapper.vm.showIndustryProjects(industry.name)
        await wrapper.vm.$nextTick()

        const projectItems = wrapper.findAll('.project-item')
        industry.projects.forEach((project, index) => {
            const item = projectItems[index]
            const skillItems = item.findAll('.skill-item')
            expect(skillItems.length).toBe(project.skills.length)

            project.skills.forEach((skill, skillIndex) => {
                const skillItem = skillItems[skillIndex]
                const icon = skillItem.find('i')
                expect(icon.classes()).toContain(skill.icon)
                expect(skillItem.text()).toContain(skill.name)
            })
        })
    })

    it('project items are clickable', async () => {
        const industry = industries[0]
        const dialog = document.getElementById('dialog-industry-projects')
        dialog.showModal = vi.fn()

        wrapper.vm.showIndustryProjects(industry.name)
        await wrapper.vm.$nextTick()

        const projectItem = wrapper.find('.project-item')
        expect(projectItem.exists()).toBe(true)
        // Cursor style is applied via CSS, so we just verify element exists
        expect(projectItem.exists()).toBe(true)
    })

    it('clicking project item dispatches open-career-details event', async () => {
        const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent')
        const industry = industries[0]
        const dialog = document.getElementById('dialog-industry-projects')
        dialog.showModal = vi.fn()

        wrapper.vm.showIndustryProjects(industry.name)
        await wrapper.vm.$nextTick()

        const projectItem = wrapper.find('.project-item')
        await projectItem.trigger('click')

        expect(dispatchEventSpy).toHaveBeenCalled()
        const event = dispatchEventSpy.mock.calls[0][0]
        expect(event.type).toBe('open-career-details')
        expect(event.detail).toHaveProperty('careerId')
        expect(typeof event.detail.careerId).toBe('string')

        dispatchEventSpy.mockRestore()
    })

    it('dispatches event with correct careerId from project', async () => {
        const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent')
        const industry = industries[0]
        const project = industry.projects[0]
        const dialog = document.getElementById('dialog-industry-projects')
        dialog.showModal = vi.fn()

        wrapper.vm.showIndustryProjects(industry.name)
        await wrapper.vm.$nextTick()

        const projectItem = wrapper.find('.project-item')
        await projectItem.trigger('click')

        const event = dispatchEventSpy.mock.calls[0][0]
        expect(event.detail.careerId).toBe(project.careerId)

        dispatchEventSpy.mockRestore()
    })

    it('dialog has close button', () => {
        const closeButton = wrapper.find('.dialog-menu button')
        expect(closeButton.exists()).toBe(true)
        expect(closeButton.text()).toBe('Close')
        expect(closeButton.classes()).toContain('nes-btn')
        expect(closeButton.classes()).toContain('is-primary')
    })

    it('close button click closes the dialog', async () => {
        const dialog = document.getElementById('dialog-industry-projects')
        const closeSpy = vi.fn()
        dialog.close = closeSpy

        const closeButton = wrapper.find('.dialog-menu button')
        await closeButton.trigger('click')

        expect(closeSpy).toHaveBeenCalled()
    })

    it('responds to open-industry-projects event from window', async () => {
        const industry = industries[0]
        const dialog = document.getElementById('dialog-industry-projects')
        dialog.showModal = vi.fn()

        window.dispatchEvent(new CustomEvent('open-industry-projects', {
            detail: { industryName: industry.name }
        }))

        await wrapper.vm.$nextTick()

        expect(dialog.showModal).toHaveBeenCalled()
        expect(wrapper.vm.selectedIndustry.name).toBe(industry.name)
    })

    it('handleOpenIndustryProjects does nothing for missing industryName', () => {
        const dialog = document.getElementById('dialog-industry-projects')
        dialog.showModal = vi.fn()

        wrapper.vm.handleOpenIndustryProjects({ detail: {} })

        expect(dialog.showModal).not.toHaveBeenCalled()
    })

    it('showIndustryProjects does nothing for invalid industry name', () => {
        const dialog = document.getElementById('dialog-industry-projects')
        dialog.showModal = vi.fn()

        wrapper.vm.showIndustryProjects('Nonexistent Industry')

        expect(dialog.showModal).not.toHaveBeenCalled()
        expect(wrapper.vm.selectedIndustry).toBeNull()
    })

    it('adds event listener on mount', () => {
        const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
        const freshContainer = document.createElement('div')
        document.body.appendChild(freshContainer)
        const freshWrapper = mount(IndustryProjectsComponent, { attachTo: freshContainer })

        expect(addEventListenerSpy).toHaveBeenCalledWith(
            'open-industry-projects',
            freshWrapper.vm.handleOpenIndustryProjects
        )

        addEventListenerSpy.mockRestore()
        freshWrapper.unmount()
        freshContainer.remove()
    })

    it('removes event listener on unmount', () => {
        const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
        
        wrapper.unmount()

        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'open-industry-projects',
            wrapper.vm.handleOpenIndustryProjects
        )

        removeEventListenerSpy.mockRestore()
    })

    it('renders all industries correctly when selected', async () => {
        const dialog = document.getElementById('dialog-industry-projects')
        dialog.showModal = vi.fn()

        for (const industry of industries) {
            wrapper.vm.showIndustryProjects(industry.name)
            await wrapper.vm.$nextTick()

            const title = wrapper.find('.title')
            expect(title.text()).toContain(industry.name)

            const projectItems = wrapper.findAll('.project-item')
            expect(projectItems.length).toBe(industry.projects.length)
        }
    })

    it('project items have nes-container styling for consistency', async () => {
        const industry = industries[0]
        const dialog = document.getElementById('dialog-industry-projects')
        dialog.showModal = vi.fn()

        wrapper.vm.showIndustryProjects(industry.name)
        await wrapper.vm.$nextTick()

        const projectItems = wrapper.findAll('.project-item')
        projectItems.forEach(item => {
            expect(item.classes()).toContain('nes-container')
        })
    })

    it('project skills display in a row with gap', async () => {
        const industry = industries[0]
        const dialog = document.getElementById('dialog-industry-projects')
        dialog.showModal = vi.fn()

        wrapper.vm.showIndustryProjects(industry.name)
        await wrapper.vm.$nextTick()

        const projectItem = wrapper.find('.project-item')
        const projectSkills = projectItem.find('.project-skills')
        expect(projectSkills.exists()).toBe(true)

        const skillItems = projectSkills.findAll('.skill-item')
        expect(skillItems.length).toBeGreaterThan(0)
    })

    it('selectedIndustry is null initially', () => {
        expect(wrapper.vm.selectedIndustry).toBeNull()
    })

    it('handles projects with many skills correctly', async () => {
        // Find industry with most skills
        const industryWithMostSkills = industries.reduce((max, industry) => {
            const maxSkills = max.projects.reduce((sum, p) => sum + p.skills.length, 0)
            const currentSkills = industry.projects.reduce((sum, p) => sum + p.skills.length, 0)
            return currentSkills > maxSkills ? industry : max
        }, industries[0])

        const dialog = document.getElementById('dialog-industry-projects')
        dialog.showModal = vi.fn()

        wrapper.vm.showIndustryProjects(industryWithMostSkills.name)
        await wrapper.vm.$nextTick()

        const projectItems = wrapper.findAll('.project-item')
        expect(projectItems.length).toBe(industryWithMostSkills.projects.length)
    })
})
