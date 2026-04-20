import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import ProfileComponent from '../components/ProfileComponent.vue'

describe('ProfileComponent.vue', () => {
    let wrapper
    let attachDiv

    beforeEach(() => {
        window.open.mockClear()
        // Attach to a div in document.body so document.getElementById can find dialog elements
        attachDiv = document.createElement('div')
        document.body.appendChild(attachDiv)
        wrapper = mount(ProfileComponent, { attachTo: attachDiv })

        // jsdom does not implement showModal or scrollTo on dialog elements
        const spotifyDialog = document.getElementById('dialog-spotify')
        if (spotifyDialog) {
            spotifyDialog.showModal = vi.fn()
        }
        const projectsDialog = document.getElementById('dialog-projects')
        if (projectsDialog) {
            projectsDialog.showModal = vi.fn()
            projectsDialog.scrollTo = vi.fn()
        }
    })

    afterEach(() => {
        wrapper.unmount()
        attachDiv.remove()
    })

    it('Music button opens Spotify dialog', async () => {
        const musicBtn = wrapper.findAll('button').find(b => b.text().includes('Music'))
        await musicBtn.trigger('click')
        const spotifyDialog = document.getElementById('dialog-spotify')
        expect(spotifyDialog.showModal).toHaveBeenCalled()
    })

    it('Careers button opens Projects dialog', async () => {
        const careersBtn = wrapper.findAll('button').find(b => b.text().includes('Careers'))
        await careersBtn.trigger('click')
        const projectsDialog = document.getElementById('dialog-projects')
        expect(projectsDialog.showModal).toHaveBeenCalled()
    })

    it('LinkedIn button calls window.open with noopener', async () => {
        const linkedinBtn = wrapper.find('#linkedin-btn')
        await linkedinBtn.trigger('click')
        expect(window.open).toHaveBeenCalled()
        const call = window.open.mock.calls[0]
        expect(call[2]).toBe('noopener,noreferrer')
    })

    it('GitHub button calls window.open with correct URL and noopener', async () => {
        const githubBtn = wrapper.find('#github-btn')
        await githubBtn.trigger('click')
        expect(window.open).toHaveBeenCalled()
        const call = window.open.mock.calls[0]
        expect(call[0]).toBe('https://github.com/jcchikikomori')
        expect(call[1]).toBe('_blank')
        expect(call[2]).toBe('noopener,noreferrer')
    })

    it('version link calls window.open with portfolio releases URL and noopener', async () => {
        const versionLink = wrapper.find('a[href="#"]')
        await versionLink.trigger('click')
        expect(window.open).toHaveBeenCalled()
        const call = window.open.mock.calls[0]
        expect(call[0]).toContain('github.com/jcchikikomori/portfolio/releases/tag/v')
        expect(call[2]).toBe('noopener,noreferrer')
    })
})
