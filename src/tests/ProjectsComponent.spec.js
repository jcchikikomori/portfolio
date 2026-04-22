import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import ProjectsComponent from '../components/ProjectsComponent.vue';
import { projects } from '../data/projects';

describe('ProjectsComponent.vue', () => {
  let wrapper;
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    wrapper = mount(ProjectsComponent, { attachTo: container });
  });

  afterEach(() => {
    wrapper.unmount();
    container.remove();
  });

  it('renders #dialog-projects with nes-dialog class', () => {
    const dialog = wrapper.find('#dialog-projects');
    expect(dialog.exists()).toBe(true);
    expect(dialog.classes()).toContain('nes-dialog');
  });

  it('renders dialog title "My Projects"', () => {
    const title = wrapper.find('h1.title');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe('My Projects');
  });

  it('renders filter dropdown', () => {
    const filterContainer = wrapper.find('.filter-container');
    expect(filterContainer.exists()).toBe(true);

    const select = wrapper.find('#project-filter');
    expect(select.exists()).toBe(true);
  });

  it('renders all projects by default', () => {
    const projectCards = wrapper.findAll('.project-card');
    expect(projectCards.length).toBe(projects.length);
  });

  it('filters projects by category', async () => {
    const select = wrapper.find('#project-filter');

    // Filter to corporate
    await select.setValue('corporate');
    const corporateProjects = wrapper.findAll('.project-card');
    const corporateCount = projects.filter((p) => p.category === 'corporate').length;
    expect(corporateProjects.length).toBe(corporateCount);

    // Filter to personal
    await select.setValue('personal');
    const personalProjects = wrapper.findAll('.project-card');
    const personalCount = projects.filter((p) => p.category === 'personal').length;
    expect(personalProjects.length).toBe(personalCount);
  });

  it('each project shows name, badges, and dates', () => {
    const cards = wrapper.findAll('.project-card');
    projects.forEach((project, index) => {
      const name = cards[index].find('.project-name');
      expect(name.exists()).toBe(true);
      expect(name.text()).toBe(project.name);

      const dates = cards[index].find('.project-dates');
      expect(dates.exists()).toBe(true);
      expect(dates.text()).toBe(project.dates);

      const badges = cards[index].find('.project-badges');
      expect(badges.exists()).toBe(true);
    });
  });

  it('project cards have "View Details" button', () => {
    const cards = wrapper.findAll('.project-card');
    cards.forEach((card) => {
      const button = card.find('button.project-details-btn');
      expect(button.exists()).toBe(true);
      expect(button.text()).toBe('View Details');
    });
  });

  it('clicking "View Details" dispatches open-project-details event', async () => {
    const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent');
    const firstProject = projects[0];
    const card = wrapper.findAll('.project-card')[0];
    const button = card.find('button.project-details-btn');

    await button.trigger('click');

    expect(dispatchEventSpy).toHaveBeenCalled();
    const event = dispatchEventSpy.mock.calls[0][0];
    expect(event.type).toBe('open-project-details');
    expect(event.detail).toHaveProperty('projectId');
    expect(event.detail.projectId).toBe(firstProject.id);

    dispatchEventSpy.mockRestore();
  });

  it('dialog has close button that closes dialog', async () => {
    const dialog = document.getElementById('dialog-projects');
    const closeSpy = vi.fn();
    dialog.close = closeSpy;

    const closeButton = wrapper.find('.dialog-menu button');
    expect(closeButton.exists()).toBe(true);
    expect(closeButton.text()).toBe('Close');

    await closeButton.trigger('click');
    expect(closeSpy).toHaveBeenCalled();
  });

  it('renders all projects', () => {
    const cards = wrapper.findAll('.project-card');
    expect(cards.length).toBe(projects.length);
  });

  it('project cards have nes-container styling', () => {
    const cards = wrapper.findAll('.project-card');
    cards.forEach((card) => {
      expect(card.classes()).toContain('nes-container');
    });
  });

  it('getIndustryLabel returns correct labels', () => {
    const labels = {
      'e-commerce': 'E-Commerce',
      'online-payment': 'Online Payment',
      b2b: 'B2B',
      sales: 'Sales',
      devops: 'DevOps',
      web: 'Web',
      mobile: 'Mobile',
    };

    Object.entries(labels).forEach(([key, value]) => {
      expect(wrapper.vm.getIndustryLabel(key)).toBe(value);
    });
  });

  it('getIndustryLabel returns industry value when label not found', () => {
    expect(wrapper.vm.getIndustryLabel('unknown-industry')).toBe('unknown-industry');
    expect(wrapper.vm.getIndustryLabel('')).toBe('');
  });

  it('showProjectDetails method dispatches correct event', () => {
    const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent');
    const projectId = 'test-project';

    wrapper.vm.showProjectDetails(projectId);

    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'open-project-details',
        detail: { projectId },
      })
    );

    dispatchEventSpy.mockRestore();
  });

  it('isDark returns true when dialog has is-dark class', () => {
    const dialog = document.getElementById('dialog-projects');
    dialog.classList.add('is-dark');

    expect(wrapper.vm.isDark()).toBe(true);

    dialog.classList.remove('is-dark');
  });

  it('isDark returns false when dialog does not have is-dark class', () => {
    const dialog = document.getElementById('dialog-projects');
    dialog.classList.remove('is-dark');

    expect(wrapper.vm.isDark()).toBe(false);
  });

  it('logoSrc uses logoDark in dark mode', () => {
    const dialog = document.getElementById('dialog-projects');
    dialog.classList.add('is-dark');

    const project = {
      logo: '/light-logo.png',
      logoDark: '/dark-logo.png',
    };

    expect(wrapper.vm.logoSrc(project)).toBe('/dark-logo.png');

    dialog.classList.remove('is-dark');
  });

  it('logoSrc falls back to logo when logoDark is null', () => {
    const dialog = document.getElementById('dialog-projects');
    dialog.classList.add('is-dark');

    const project = {
      logo: '/light-logo.png',
      logoDark: null,
    };

    expect(wrapper.vm.logoSrc(project)).toBe('/light-logo.png');

    dialog.classList.remove('is-dark');
  });

  it('logoSrc uses logo in light mode', () => {
    const dialog = document.getElementById('dialog-projects');
    dialog.classList.remove('is-dark');

    const project = {
      logo: '/light-logo.png',
      logoDark: '/dark-logo.png',
    };

    expect(wrapper.vm.logoSrc(project)).toBe('/light-logo.png');
  });

  it('onLogoError updates logoErrors state', () => {
    const projectId = 'test-project';

    wrapper.vm.onLogoError(projectId);

    expect(wrapper.vm.logoErrors[projectId]).toBe(true);
  });

  it('onLogoError does not duplicate state for same projectId', () => {
    const projectId = 'test-project';

    // First error
    wrapper.vm.onLogoError(projectId);
    expect(wrapper.vm.logoErrors[projectId]).toBe(true);

    // Second error should not change state
    const currentState = { ...wrapper.vm.logoErrors };
    wrapper.vm.onLogoError(projectId);
    expect(wrapper.vm.logoErrors).toEqual(currentState);
  });

  it('img @error handler triggers onLogoError and shows placeholder', async () => {
    const wrapperWithLogo = mount(ProjectsComponent, {
      attachTo: container,
      data() {
        return {
          projects: [
            {
              id: 'test-logo-error',
              name: 'Test Project',
              logo: '/broken-logo.png',
              logoDark: null,
              category: 'corporate',
              industry: 'web',
              platforms: [],
              dates: '2024',
            },
          ],
        };
      },
    });

    const logoImg = wrapperWithLogo.find('.project-logo');
    expect(logoImg.exists()).toBe(true);

    // Trigger error event on img element
    await logoImg.trigger('error');

    // Should show placeholder after error
    expect(wrapperWithLogo.vm.logoErrors['test-logo-error']).toBe(true);
    const placeholder = wrapperWithLogo.find('.project-logo-placeholder');
    expect(placeholder.exists()).toBe(true);

    wrapperWithLogo.unmount();
  });

  it('renders placeholder icon when project has no logo', () => {
    const wrapperNoLogo = mount(ProjectsComponent, {
      attachTo: container,
      data() {
        return {
          projects: [
            {
              id: 'test-no-logo',
              name: 'Test No Logo',
              logo: null,
              logoDark: null,
              category: 'personal',
              industry: 'web',
              platforms: [],
              dates: '2024',
            },
          ],
        };
      },
    });

    // Should render placeholder, not img
    const logoImg = wrapperNoLogo.find('.project-logo');
    expect(logoImg.exists()).toBe(false);

    const placeholder = wrapperNoLogo.find('.project-logo-placeholder');
    expect(placeholder.exists()).toBe(true);
    expect(placeholder.classes()).toContain('bi');
    expect(placeholder.classes()).toContain('bi-box');

    wrapperNoLogo.unmount();
  });

  it('filteredProjects computed property returns all projects when filter is "all"', () => {
    wrapper.setData({ selectedFilter: 'all' });
    expect(wrapper.vm.filteredProjects.length).toBe(projects.length);
  });

  it('filteredProjects computed property filters by category', () => {
    wrapper.setData({ selectedFilter: 'corporate' });
    const corporateCount = projects.filter((p) => p.category === 'corporate').length;
    expect(wrapper.vm.filteredProjects.length).toBe(corporateCount);
    wrapper.vm.filteredProjects.forEach((project) => {
      expect(project.category).toBe('corporate');
    });
  });

  it('matchesCategoryFilter returns true when project category matches filter', () => {
    wrapper.setData({ selectedFilter: 'corporate' });
    const corporateProject = projects.find((p) => p.category === 'corporate');
    expect(wrapper.vm.matchesCategoryFilter(corporateProject)).toBe(true);
  });

  it('matchesCategoryFilter returns false when project category does not match filter', () => {
    wrapper.setData({ selectedFilter: 'corporate' });
    const personalProject = projects.find((p) => p.category === 'personal');
    expect(wrapper.vm.matchesCategoryFilter(personalProject)).toBe(false);
  });

  it('renders project logos with alt text', () => {
    const projectWithLogo = projects.find((p) => p.logo);
    const logoImg = wrapper.findAll('.project-logo').find((img) => {
      return img.attributes('alt')?.includes(projectWithLogo.name);
    });
    expect(logoImg).toBeTruthy();
    expect(logoImg.attributes('alt')).toBe(`${projectWithLogo.name} logo`);
  });

  it('renders platform icons for projects with platforms', () => {
    const projectWithPlatforms = projects.find((p) => p.platforms.length > 0);
    const cards = wrapper.findAll('.project-card');
    const cardWithPlatforms = cards.find(
      (card) => card.find('.project-name').text() === projectWithPlatforms.name
    );
    const platformsSection = cardWithPlatforms.find('.project-platforms');
    expect(platformsSection.exists()).toBe(true);
  });

  it('renders all template branches including platform icons and badges', () => {
    // This test ensures all Vue template expression functions are covered
    const cards = wrapper.findAll('.project-card');
    expect(cards.length).toBeGreaterThan(0);

    // Check each card renders all elements
    cards.forEach((card) => {
      // Project name
      const name = card.find('.project-name');
      expect(name.exists()).toBe(true);

      // Badges
      const badges = card.find('.project-badges');
      expect(badges.exists()).toBe(true);

      // Dates
      const dates = card.find('.project-dates');
      expect(dates.exists()).toBe(true);

      // Category badge with dynamic class
      const categoryBadge = card.find('.badge-label');
      expect(categoryBadge.exists()).toBe(true);
    });
  });

  it('renders project with all template expressions evaluated', () => {
    // Mount with all filter options to trigger all branches
    const filters = ['all', 'corporate', 'personal'];
    filters.forEach((filter) => {
      wrapper.setData({ selectedFilter: filter });
      expect(wrapper.vm.filteredProjects).toBeDefined();
    });

    // Reset to all
    wrapper.setData({ selectedFilter: 'all' });
    const cards = wrapper.findAll('.project-card');

    // Trigger rendering of all cards
    cards.forEach((card, index) => {
      const project = projects[index];
      expect(card.find('.project-name').text()).toBe(project.name);
    });
  });
});
