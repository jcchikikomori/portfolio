import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('main.js', () => {
    let appDiv
    let logoEl
    let consoleErrorSpy
    let changeHandler

    beforeEach(() => {
        appDiv = document.createElement('div')
        appDiv.id = 'app'
        document.body.appendChild(appDiv)

        logoEl = document.createElement('img')
        logoEl.id = 'profile-logo'
        logoEl.setAttribute('src', '')
        document.body.appendChild(logoEl)

        consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
        changeHandler = null

        // Capture the change event handler registered on matchMedia
        window.matchMedia = vi.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn((event, handler) => {
                if (event === 'change') {changeHandler = handler}
            }),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }))
    })

    afterEach(() => {
        if (appDiv && appDiv.parentNode) {appDiv.parentNode.removeChild(appDiv)}
        if (logoEl && logoEl.parentNode) {logoEl.parentNode.removeChild(logoEl)}
        document.body.classList.remove('dark')
        consoleErrorSpy.mockRestore()
    })

    it('imports and mounts the Vue app without throwing', async () => {
        await import('../main.js')
        expect(document.getElementById('app')).toBeTruthy()
    })

    it('window.onload registers play/pause/ended event listeners', async () => {
        await import('../main.js')
        const addEventListenerSpy = vi.spyOn(document, 'addEventListener')
        window.onload()
        const calls = addEventListenerSpy.mock.calls.map(c => c[0])
        expect(calls).toContain('play')
        expect(calls).toContain('pause')
        expect(calls).toContain('ended')
        addEventListenerSpy.mockRestore()
    })

    it('window.onload applies dark mode when matchMedia prefers dark', async () => {
        window.matchMedia = vi.fn().mockImplementation(query => ({
            matches: query === '(prefers-color-scheme: dark)',
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }))
        await import('../main.js')
        window.onload()
        expect(document.body.classList.contains('dark')).toBe(true)
    })

    it('window.onload applies normal theme when matchMedia does not prefer dark', async () => {
        await import('../main.js')
        window.onload()
        expect(document.body.classList.contains('dark')).toBe(false)
    })

    it('matchMedia change event switches to dark mode', async () => {
        await import('../main.js')
        window.onload()
        // changeHandler is set by the matchMedia.addEventListener mock
        expect(changeHandler).not.toBeNull()
        changeHandler({ matches: true })
        expect(document.body.classList.contains('dark')).toBe(true)
    })

    it('matchMedia change event switches to light mode', async () => {
        await import('../main.js')
        document.body.classList.add('dark')
        window.onload()
        expect(changeHandler).not.toBeNull()
        changeHandler({ matches: false })
        expect(document.body.classList.contains('dark')).toBe(false)
    })
})
