import { describe, it, expect } from 'vitest'

import { careers } from '../data/careers.js'

describe('careers data module', () => {
    it('exports a non-empty array', () => {
        expect(Array.isArray(careers)).toBe(true)
        expect(careers.length).toBeGreaterThan(0)
    })

    it('exports exactly 6 entries', () => {
        expect(careers).toHaveLength(6)
    })

    it('every entry has required string fields (id, company, dates) that are non-empty', () => {
        for (const career of careers) {
            expect(typeof career.id).toBe('string')
            expect(career.id.length).toBeGreaterThan(0)

            expect(typeof career.company).toBe('string')
            expect(career.company.length).toBeGreaterThan(0)

            expect(typeof career.dates).toBe('string')
            expect(career.dates.length).toBeGreaterThan(0)
        }
    })

    it('every entry has logo (string or null), logoDark (string or null), platforms (array), screenshots (array)', () => {
        for (const career of careers) {
            expect(career.logo === null || typeof career.logo === 'string').toBe(true)
            expect(career.logoDark === null || typeof career.logoDark === 'string').toBe(true)
            expect(Array.isArray(career.platforms)).toBe(true)
            expect(Array.isArray(career.screenshots)).toBe(true)
        }
    })

    it('all IDs are unique', () => {
        const ids = careers.map(c => c.id)
        const uniqueIds = new Set(ids)
        expect(uniqueIds.size).toBe(ids.length)
    })

    it('entries with clickAction "url" have non-null url', () => {
        const urlEntries = careers.filter(c => c.clickAction === 'url')
        expect(urlEntries.length).toBeGreaterThan(0)
        for (const entry of urlEntries) {
            expect(entry.url).not.toBeNull()
            expect(typeof entry.url).toBe('string')
            expect(entry.url.length).toBeGreaterThan(0)
        }
    })

    it('entries with clickAction "alert" have non-null alertMsg', () => {
        const alertEntries = careers.filter(c => c.clickAction === 'alert')
        expect(alertEntries.length).toBeGreaterThan(0)
        for (const entry of alertEntries) {
            expect(entry.alertMsg).not.toBeNull()
            expect(typeof entry.alertMsg).toBe('string')
            expect(entry.alertMsg.length).toBeGreaterThan(0)
        }
    })
})
