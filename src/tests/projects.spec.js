import { describe, it, expect } from 'vitest';

import { careers } from '../data/careers';
import { projects } from '../data/projects';

describe('projects data module', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it('exports exactly 10 projects', () => {
    expect(projects).toHaveLength(10);
  });

  it('every entry has required string fields (id, name, description, dates, industry) that are non-empty', () => {
    for (const project of projects) {
      expect(typeof project.id).toBe('string');
      expect(project.id.length).toBeGreaterThan(0);

      expect(typeof project.name).toBe('string');
      expect(project.name.length).toBeGreaterThan(0);

      expect(typeof project.description).toBe('string');
      expect(project.description.length).toBeGreaterThan(0);

      expect(typeof project.dates).toBe('string');
      expect(project.dates.length).toBeGreaterThan(0);

      expect(typeof project.industry).toBe('string');
      expect(project.industry.length).toBeGreaterThan(0);
    }
  });

  it('every entry has category (corporate or personal)', () => {
    for (const project of projects) {
      expect(project.category === 'corporate' || project.category === 'personal').toBe(true);
    }
  });

  it('every entry has logo (string or null), logoDark (string or null), platforms (array), url (string or null)', () => {
    for (const project of projects) {
      expect(project.logo === null || typeof project.logo === 'string').toBe(true);
      expect(project.logoDark === null || typeof project.logoDark === 'string').toBe(true);
      expect(Array.isArray(project.platforms)).toBe(true);
      expect(project.url === null || typeof project.url === 'string').toBe(true);
    }
  });

  it('every entry has careerId (string or null) and skills (array)', () => {
    for (const project of projects) {
      expect(project.careerId === null || typeof project.careerId === 'string').toBe(true);
      expect(Array.isArray(project.skills)).toBe(true);
      expect(Array.isArray(project.screenshots)).toBe(true);
    }
  });

  it('all IDs are unique', () => {
    const ids = projects.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('corporate projects have valid careerIds that reference existing careers', () => {
    const careerIds = new Set(careers.map((c) => c.id));
    const corporateProjects = projects.filter((p) => p.category === 'corporate');
    expect(corporateProjects.length).toBeGreaterThan(0);

    for (const project of corporateProjects) {
      expect(project.careerId).not.toBeNull();
      expect(careerIds.has(project.careerId)).toBe(true);
    }
  });

  it('personal projects have null careerId', () => {
    const personalProjects = projects.filter((p) => p.category === 'personal');
    expect(personalProjects.length).toBeGreaterThan(0);

    for (const project of personalProjects) {
      expect(project.careerId).toBeNull();
    }
  });

  it('every skill has non-empty name and valid icon', () => {
    for (const project of projects) {
      for (const skill of project.skills) {
        expect(typeof skill.name).toBe('string');
        expect(skill.name.length).toBeGreaterThan(0);

        expect(typeof skill.icon).toBe('string');
        expect(skill.icon.length).toBeGreaterThan(0);
        expect(skill.icon).toMatch(/^bi-/);
      }
    }
  });

  it('has projects in all expected industries', () => {
    const industries = new Set(projects.map((p) => p.industry));
    const expectedIndustries = [
      'e-commerce',
      'online-payment',
      'b2b',
      'sales',
      'devops',
      'web',
      'llm',
    ];

    for (const industry of expectedIndustries) {
      expect(industries.has(industry)).toBe(true);
    }
  });
});
