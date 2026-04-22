import { describe, it, expect } from 'vitest'

import { careers } from '../data/careers'

describe('careers data module', () => {
    it('exports a non-empty array', () => {
        expect(Array.isArray(careers)).toBe(true)
        expect(careers.length).toBeGreaterThan(0)
    })

    it('exports exactly 3 employment entries', () => {
        expect(careers).toHaveLength(3)
    })

    it('every entry has required string fields (id, company, description, dates) that are non-empty', () => {
        for (const career of careers) {
            expect(typeof career.id).toBe('string')
            expect(career.id.length).toBeGreaterThan(0)

            expect(typeof career.company).toBe('string')
            expect(career.company.length).toBeGreaterThan(0)

            expect(typeof career.description).toBe('string')
            expect(career.description.length).toBeGreaterThan(0)

            expect(typeof career.dates).toBe('string')
            expect(career.dates.length).toBeGreaterThan(0)
        }
    })

    it('every entry has logo (string or null), logoDark (string or null), platforms (array), url (string or null)', () => {
        for (const career of careers) {
            expect(career.logo === null || typeof career.logo === 'string').toBe(true)
            expect(career.logoDark === null || typeof career.logoDark === 'string').toBe(true)
            expect(Array.isArray(career.platforms)).toBe(true)
            expect(career.url === null || typeof career.url === 'string').toBe(true)
        }
    })

    it('all IDs are unique', () => {
        const ids = careers.map(c => c.id)
        const uniqueIds = new Set(ids)
        expect(uniqueIds.size).toBe(ids.length)
    })

    it('at least one entry has a URL', () => {
        const urlEntries = careers.filter(c => c.url !== null)
        expect(urlEntries.length).toBeGreaterThan(0)
    })
})
