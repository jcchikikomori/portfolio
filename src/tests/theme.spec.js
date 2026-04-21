import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { darkMode, normalTheme } from '../theme.js'

describe('theme.js', () => {
    let logoEl

    beforeEach(() => {
        document.body.className = ''
        logoEl = document.createElement('img')
        logoEl.id = 'profile-logo'
        logoEl.setAttribute('src', '')
        document.body.appendChild(logoEl)
    })

    afterEach(() => {
        const existing = document.getElementById('profile-logo')
        if (existing) {
            existing.remove()
        }
    })

    it('darkMode adds dark class to body', () => {
        darkMode()
        expect(document.body.classList.contains('dark')).toBe(true)
    })

    it('normalTheme removes dark class from body', () => {
        darkMode()
        normalTheme()
        expect(document.body.classList.contains('dark')).toBe(false)
    })

    it('darkMode sets logo to white variant', () => {
        darkMode()
        expect(document.getElementById('profile-logo').getAttribute('src')).toContain('jcc_logo_w.png')
    })

    it('normalTheme sets logo to default variant', () => {
        darkMode()
        normalTheme()
        expect(document.getElementById('profile-logo').getAttribute('src')).toContain('jcc_logo.png')
        expect(document.getElementById('profile-logo').getAttribute('src')).not.toContain('jcc_logo_w.png')
    })
})
