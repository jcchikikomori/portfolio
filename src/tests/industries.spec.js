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
            expect(industry.icon).toMatch(/^bi-/)
        }
    })

    it('every entry has projects array', () => {
        for (const industry of industries) {
            expect(Array.isArray(industry.projects)).toBe(true)
            expect(industry.projects.length).toBeGreaterThan(0)
        }
    })

    it('every project has required properties', () => {
        for (const industry of industries) {
            for (const project of industry.projects) {
                expect(typeof project.name).toBe('string')
                expect(project.name.length).toBeGreaterThan(0)

                expect(typeof project.careerId).toBe('string')
                expect(project.careerId.length).toBeGreaterThan(0)

                expect(typeof project.description).toBe('string')
                expect(project.description.length).toBeGreaterThan(0)

                expect(Array.isArray(project.skills)).toBe(true)
                expect(project.skills.length).toBeGreaterThan(0)
            }
        }
    })

    it('all careerIds reference existing career IDs', () => {
        const careerIds = new Set(careers.map(c => c.id))
        for (const industry of industries) {
            for (const project of industry.projects) {
                expect(careerIds.has(project.careerId)).toBe(true)
            }
        }
    })

    it('every skill has non-empty name and valid icon', () => {
        for (const industry of industries) {
            for (const project of industry.projects) {
                for (const skill of project.skills) {
                    expect(typeof skill.name).toBe('string')
                    expect(skill.name.length).toBeGreaterThan(0)

                    expect(typeof skill.icon).toBe('string')
                    expect(skill.icon.length).toBeGreaterThan(0)
                    expect(skill.icon).toMatch(/^bi-/)
                }
            }
        }
    })

    it('has exactly 5 industries', () => {
        expect(industries.length).toBe(5)
    })

    it('industry names match expected list', () => {
        const expectedNames = ['E-Commerce', 'Online Payment', 'B2B', 'Sales', 'Personal']
        const actualNames = industries.map(i => i.name)
        expect(actualNames).toEqual(expectedNames)
    })
})
