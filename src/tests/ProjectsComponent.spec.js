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
    const corporateCount = projects.filter(p => p.category === 'corporate').length;
    expect(corporateProjects.length).toBe(corporateCount);

    // Filter to personal
    await select.setValue('personal');
    const personalProjects = wrapper.findAll('.project-card');
    const personalCount = projects.filter(p => p.category === 'personal').length;
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
      'b2b': 'B2B',
      'sales': 'Sales',
      'devops': 'DevOps',
      'web': 'Web',
      'mobile': 'Mobile',
    };

    Object.entries(labels).forEach(([key, value]) => {
      expect(wrapper.vm.getIndustryLabel(key)).toBe(value);
    });
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
});
