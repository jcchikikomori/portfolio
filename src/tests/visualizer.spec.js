import { describe, it, expect, vi, beforeEach } from 'vitest'

import { handlePlayback } from '../visualizer.js'

describe('visualizer.js', () => {
    beforeEach(() => {
        document.body.className = ''
    })

    it('adds breathing-visualizer class when AudioContext is running', () => {
        window.AudioContext = vi.fn().mockImplementation(() => ({
            state: 'running',
            createAnalyser: vi.fn(),
            createMediaElementSource: vi.fn(),
        }))
        handlePlayback()
        expect(document.body.classList.contains('breathing-visualizer')).toBe(true)
    })

    it('removes breathing-visualizer class when AudioContext is not running (suspended)', () => {
        document.body.classList.add('breathing-visualizer')
        window.AudioContext = vi.fn().mockImplementation(() => ({
            state: 'suspended',
            createAnalyser: vi.fn(),
            createMediaElementSource: vi.fn(),
        }))
        handlePlayback()
        expect(document.body.classList.contains('breathing-visualizer')).toBe(false)
    })

    it('removes breathing-visualizer class when AudioContext is not running (closed)', () => {
        document.body.classList.add('breathing-visualizer')
        window.AudioContext = vi.fn().mockImplementation(() => ({
            state: 'closed',
            createAnalyser: vi.fn(),
            createMediaElementSource: vi.fn(),
        }))
        handlePlayback()
        expect(document.body.classList.contains('breathing-visualizer')).toBe(false)
    })

    it('falls back to webkitAudioContext when AudioContext is not available', () => {
        const originalAudioContext = window.AudioContext
        window.AudioContext = undefined
        window.webkitAudioContext = vi.fn().mockImplementation(() => ({
            state: 'running',
            createAnalyser: vi.fn(),
            createMediaElementSource: vi.fn(),
        }))
        handlePlayback()
        expect(document.body.classList.contains('breathing-visualizer')).toBe(true)
        window.AudioContext = originalAudioContext
        window.webkitAudioContext = undefined
    })
})
