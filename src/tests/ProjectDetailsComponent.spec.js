import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import ProjectDetailsComponent from '../components/ProjectDetailsComponent.vue';
import { careers } from '../data/careers';
import { projects } from '../data/projects';

describe('ProjectDetailsComponent.vue', () => {
  let wrapper;
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    wrapper = mount(ProjectDetailsComponent, { attachTo: container });

    // Mock showModal for dialog
    const dialog = document.getElementById('dialog-project-details');
    if (dialog) {
      dialog.showModal = vi.fn();
    }
  });

  afterEach(() => {
    wrapper.unmount();
    container.remove();
  });

  it('renders #dialog-project-details with nes-dialog class', () => {
    const dialog = wrapper.find('#dialog-project-details');
    expect(dialog.exists()).toBe(true);
    expect(dialog.classes()).toContain('nes-dialog');
  });

  it('renders project header with logo and name', async () => {
    const project = projects[0];
    wrapper.vm.showProjectDetails(project.id);
    await wrapper.vm.$nextTick();

    const header = wrapper.find('.project-details-header');
    expect(header.exists()).toBe(true);

    const title = wrapper.find('.project-details-header .title');
    expect(title.text()).toBe(project.name);
  });

  it('renders category and industry badges', async () => {
    const project = projects[0];
    wrapper.vm.showProjectDetails(project.id);
    await wrapper.vm.$nextTick();

    const badges = wrapper.find('.project-details-badges');
    expect(badges.exists()).toBe(true);
    expect(badges.text()).toContain(project.category);
  });

  it('renders project description section', async () => {
    const project = projects[0];
    wrapper.vm.showProjectDetails(project.id);
    await wrapper.vm.$nextTick();

    const descriptionSection = wrapper
      .findAll('.info-section')
      .find((s) => s.find('h3').text() === 'Description');
    expect(descriptionSection).toBeTruthy();
  });

  it('renders fallback text when project has no description', async () => {
    const wrapperNoDesc = mount(ProjectDetailsComponent, {
      attachTo: container,
      data() {
        return {
          selectedProject: {
            id: 'test-no-desc',
            name: 'Test Project',
            description: null,
            industry: 'web',
            category: 'personal',
            dates: '2024',
            screenshots: [],
            platforms: [],
          },
        };
      },
    });

    await wrapperNoDesc.vm.$nextTick();

    const descriptionSection = wrapperNoDesc
      .findAll('.info-section')
      .find((s) => s.find('h3').text() === 'Description');
    expect(descriptionSection).toBeTruthy();
    expect(descriptionSection.find('p').text()).toBe('No description available.');

    wrapperNoDesc.unmount();
  });

  it('renders project period/dates section', async () => {
    const project = projects[0];
    wrapper.vm.showProjectDetails(project.id);
    await wrapper.vm.$nextTick();

    const periodSection = wrapper
      .findAll('.info-section')
      .find((s) => s.find('h3').text() === 'Period');
    expect(periodSection).toBeTruthy();
    expect(periodSection.find('p').text()).toBe(project.dates);
  });

  it('renders company badge for corporate projects', async () => {
    const corporateProject = projects.find((p) => p.category === 'corporate');
    wrapper.vm.showProjectDetails(corporateProject.id);
    await wrapper.vm.$nextTick();

    const companySection = wrapper
      .findAll('.info-section')
      .find((s) => s.find('h3').text() === 'Company');
    expect(companySection).toBeTruthy();

    const companyBadge = companySection.find('.company-badge');
    expect(companyBadge.exists()).toBe(true);
  });

  it('does not render company section for personal projects', async () => {
    const personalProject = projects.find((p) => p.category === 'personal');
    wrapper.vm.showProjectDetails(personalProject.id);
    await wrapper.vm.$nextTick();

    const companySection = wrapper
      .findAll('.info-section')
      .find((s) => s.find('h3').text() === 'Company');
    expect(companySection).toBeFalsy();
  });

  it('clicking company badge dispatches open-career-details event', async () => {
    const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent');
    const corporateProject = projects.find((p) => p.category === 'corporate');

    wrapper.vm.showProjectDetails(corporateProject.id);
    await wrapper.vm.$nextTick();

    const companySection = wrapper
      .findAll('.info-section')
      .find((s) => s.find('h3').text() === 'Company');
    const companyBadge = companySection.find('.company-badge');

    await companyBadge.trigger('click');

    expect(dispatchEventSpy).toHaveBeenCalled();
    const event = dispatchEventSpy.mock.calls[0][0];
    expect(event.type).toBe('open-career-details');
    expect(event.detail.careerId).toBe(corporateProject.careerId);

    dispatchEventSpy.mockRestore();
  });

  it('renders platform icons when project has platforms', async () => {
    const project = projects.find((p) => p.platforms.length > 0);
    wrapper.vm.showProjectDetails(project.id);
    await wrapper.vm.$nextTick();

    const platformsSection = wrapper
      .findAll('.info-section')
      .find((s) => s.find('h3').text() === 'Platforms');
    expect(platformsSection).toBeTruthy();

    const icons = platformsSection.findAll('.platform-icons i');
    expect(icons.length).toBe(project.platforms.length);
  });

  it('renders skills list', async () => {
    const project = projects.find((p) => p.skills.length > 0);
    wrapper.vm.showProjectDetails(project.id);
    await wrapper.vm.$nextTick();

    const skillsSection = wrapper
      .findAll('.info-section')
      .find((s) => s.find('h3').text() === 'Skills');
    expect(skillsSection).toBeTruthy();

    const skills = skillsSection.findAll('.skill-tag');
    expect(skills.length).toBe(project.skills.length);
  });

  it('shows Visit Project button when project has URL', async () => {
    const project = projects.find((p) => p.url);
    wrapper.vm.showProjectDetails(project.id);
    await wrapper.vm.$nextTick();

    const ctaButton = wrapper.find('.project-cta');
    expect(ctaButton.exists()).toBe(true);
    expect(ctaButton.text()).toBe('Visit Project');
    expect(ctaButton.classes()).toContain('is-primary');
  });

  it('emits go-to-url event when Visit Project button is clicked', async () => {
    const project = projects.find((p) => p.url);
    wrapper.vm.showProjectDetails(project.id);
    await wrapper.vm.$nextTick();

    const ctaButton = wrapper.find('.project-cta');
    expect(ctaButton.exists()).toBe(true);

    // Check that clicking emits the event
    await ctaButton.trigger('click');
    expect(wrapper.emitted('go-to-url')).toBeTruthy();
    expect(wrapper.emitted('go-to-url')[0]).toEqual([project.url]);
  });

  it('shows disabled Project Unavailable button when project has no URL', async () => {
    const project = projects.find((p) => !p.url);
    wrapper.vm.showProjectDetails(project.id);
    await wrapper.vm.$nextTick();

    const ctaButton = wrapper.find('.project-cta');
    expect(ctaButton.exists()).toBe(true);
    expect(ctaButton.text()).toBe('Project Unavailable');
    expect(ctaButton.classes()).toContain('is-disabled');
  });

  it('dialog has close button', () => {
    const closeButton = wrapper.find('.dialog-menu button');
    expect(closeButton.exists()).toBe(true);
    expect(closeButton.text()).toBe('Close');
    expect(closeButton.classes()).toContain('nes-btn');
    expect(closeButton.classes()).toContain('is-primary');
  });

  it('close button click closes the dialog', async () => {
    const dialog = document.getElementById('dialog-project-details');
    const closeSpy = vi.fn();
    dialog.close = closeSpy;

    const closeButton = wrapper.find('.dialog-menu button');
    await closeButton.trigger('click');

    expect(closeSpy).toHaveBeenCalled();
  });

  it('responds to open-project-details event from window', async () => {
    const project = projects[0];
    const dialog = document.getElementById('dialog-project-details');
    dialog.showModal = vi.fn();

    window.dispatchEvent(
      new CustomEvent('open-project-details', {
        detail: { projectId: project.id },
      })
    );

    await wrapper.vm.$nextTick();

    expect(dialog.showModal).toHaveBeenCalled();
    expect(wrapper.vm.selectedProject.id).toBe(project.id);
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

  it('showProjectDetails does nothing for invalid projectId', () => {
    const dialog = document.getElementById('dialog-project-details');
    const showModalSpy = vi.spyOn(dialog, 'showModal');

    wrapper.vm.showProjectDetails('non-existent-id');

    expect(showModalSpy).not.toHaveBeenCalled();
    showModalSpy.mockRestore();
  });

  it('computed selectedCareer returns correct career for corporate project', async () => {
    const corporateProject = projects.find((p) => p.category === 'corporate');
    wrapper.vm.showProjectDetails(corporateProject.id);
    await wrapper.vm.$nextTick();

    const expectedCareer = careers.find((c) => c.id === corporateProject.careerId);
    expect(wrapper.vm.selectedCareer).toEqual(expectedCareer);
  });

  it('computed selectedCareer returns null when careerId not found', async () => {
    // Mount with a project that has invalid careerId
    const wrapperInvalid = mount(ProjectDetailsComponent, {
      attachTo: container,
      data() {
        return {
          selectedProject: {
            id: 'test-project',
            name: 'Test',
            careerId: 'non-existent-career',
            industry: 'web',
            description: 'Test description',
            screenshots: ['/img/test.png'],
            dates: '2024',
          },
        };
      },
    });

    expect(wrapperInvalid.vm.selectedCareer).toBeNull();
    wrapperInvalid.unmount();
  });

  it('computed selectedCareer returns null for personal project', async () => {
    const personalProject = projects.find((p) => p.category === 'personal');
    wrapper.vm.showProjectDetails(personalProject.id);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.selectedCareer).toBeNull();
  });

  it('showProjectDetails does nothing when dialog element is null', () => {
    const original = document.getElementById.bind(document);
    vi.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (id === 'dialog-project-details') {
        return null;
      }
      return original(id);
    });

    const project = projects[0];
    // Should not throw
    wrapper.vm.showProjectDetails(project.id);

    vi.restoreAllMocks();
  });

  it('showCareerDetails does nothing when selectedCareer is null', () => {
    const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent');

    // Ensure selectedCareer is null
    wrapper.setData({ selectedProject: null });

    // Should not throw or dispatch
    wrapper.vm.showCareerDetails();

    expect(dispatchEventSpy).not.toHaveBeenCalled();
    dispatchEventSpy.mockRestore();
  });

  it('onLogoError does not duplicate state for same projectId', async () => {
    const project = projects.find((p) => p.logo);
    wrapper.vm.showProjectDetails(project.id);
    await wrapper.vm.$nextTick();

    // First error
    wrapper.vm.onLogoError(project.id);
    expect(wrapper.vm.logoErrors[project.id]).toBe(true);

    // Second error should not change state
    const currentState = { ...wrapper.vm.logoErrors };
    wrapper.vm.onLogoError(project.id);
    expect(wrapper.vm.logoErrors).toEqual(currentState);
  });

  it('logoSrc uses logoDark in dark mode', async () => {
    const project = projects.find((p) => p.logo && p.logoDark);
    wrapper.vm.showProjectDetails(project.id);
    await wrapper.vm.$nextTick();

    // Simulate dark mode
    const dialog = document.getElementById('dialog-project-details');
    dialog.classList.add('is-dark');

    const logoSrc = wrapper.vm.logoSrc(project);
    expect(logoSrc).toBe(project.logoDark);

    // Clean up
    dialog.classList.remove('is-dark');
  });

  it('logoSrc falls back to logo when logoDark is null', async () => {
    // Find or create a project with logo but no logoDark
    const projectWithOnlyLightLogo = {
      ...projects[0],
      logo: 'https://example.com/logo.png',
      logoDark: null,
    };

    wrapper.setData({ selectedProject: projectWithOnlyLightLogo });
    await wrapper.vm.$nextTick();

    // Simulate dark mode
    const dialog = document.getElementById('dialog-project-details');
    dialog.classList.add('is-dark');

    const logoSrc = wrapper.vm.logoSrc(projectWithOnlyLightLogo);
    expect(logoSrc).toBe(projectWithOnlyLightLogo.logo);

    // Clean up
    dialog.classList.remove('is-dark');
  });

  it('isDark returns true when dialog has is-dark class', () => {
    const dialog = document.getElementById('dialog-project-details');
    dialog.classList.add('is-dark');

    expect(wrapper.vm.isDark()).toBe(true);

    dialog.classList.remove('is-dark');
  });

  it('isDark returns false when dialog does not have is-dark class', () => {
    const dialog = document.getElementById('dialog-project-details');
    dialog.classList.remove('is-dark');

    expect(wrapper.vm.isDark()).toBe(false);
  });

  it('isDark returns false when dialog element is not found', () => {
    const origGetElementById = document.getElementById.bind(document);
    vi.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (id === 'dialog-project-details') {
        return null;
      }
      return origGetElementById.call(document, id);
    });

    expect(wrapper.vm.isDark()).toBe(false);

    vi.restoreAllMocks();
  });

  it('img @error handler triggers onLogoError and shows placeholder', async () => {
    const corporateProject = projects.find((p) => p.category === 'corporate' && p.logo);
    wrapper.vm.showProjectDetails(corporateProject.id);
    await wrapper.vm.$nextTick();

    const logoImg = wrapper.find('.project-details-logo');
    expect(logoImg.exists()).toBe(true);

    // Trigger error event on img element
    await logoImg.trigger('error');

    // Should show placeholder after error
    expect(wrapper.vm.logoErrors[corporateProject.id]).toBe(true);
    const placeholder = wrapper.find('.project-details-logo-placeholder');
    expect(placeholder.exists()).toBe(true);
  });

  it('company badge click triggers showCareerDetails', async () => {
    const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent');
    const corporateProject = projects.find((p) => p.category === 'corporate');
    wrapper.vm.showProjectDetails(corporateProject.id);
    await wrapper.vm.$nextTick();

    const companyBadge = wrapper.find('.company-badge');
    expect(companyBadge.exists()).toBe(true);

    await companyBadge.trigger('click');

    expect(dispatchEventSpy).toHaveBeenCalled();
    const event = dispatchEventSpy.mock.calls[0][0];
    expect(event.type).toBe('open-career-details');
    expect(event.detail).toHaveProperty('careerId');

    dispatchEventSpy.mockRestore();
  });
});
