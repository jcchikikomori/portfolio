import { describe, it, expect } from 'vitest'

import { careers } from '../data/careers.js'
import { industries } from '../data/industries.js'

describe('industries data module', () => {
    it('exports a non-empty array', () => {
        expect(Array.isArray(industries)).toBe(true)
        expect(industries.length).toBeGreaterThan(0)
    })

    it('every entry has non-empty name and icon strings', () => {
        for (const industry of industries) {
            expect(typeof industry.name).toBe('string')
            expect(industry.name.length).toBeGreaterThan(0)

            expect(typeof industry.icon).toBe('string')
            expect(industry.icon.length).toBeGreaterThan(0)
        }
    })

    it('every entry has companyIds array', () => {
        for (const industry of industries) {
            expect(Array.isArray(industry.companyIds)).toBe(true)
        }
    })

    it('all companyIds reference existing career IDs', () => {
        const careerIds = new Set(careers.map(c => c.id))
        for (const industry of industries) {
            for (const companyId of industry.companyIds) {
                expect(careerIds.has(companyId)).toBe(true)
            }
        }
    })
})
