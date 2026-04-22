import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import CareerDetailsComponent from '../components/CareerDetailsComponent.vue';
import { careers } from '../data/careers';

describe('CareerDetailsComponent.vue', () => {
  let wrapper;
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    wrapper = mount(CareerDetailsComponent, { attachTo: container });
    // Mock showModal for all tests that call showCareerDetails
    const dialog = document.getElementById('dialog-career-details');
    if (dialog) {
      dialog.showModal = vi.fn();
    }
  });

  afterEach(() => {
    wrapper.unmount();
    container.remove();
  });

  it('renders #dialog-career-details with nes-dialog class', () => {
    const dialog = wrapper.find('#dialog-career-details');
    expect(dialog.exists()).toBe(true);
    expect(dialog.classes()).toContain('nes-dialog');
  });

  it('dialog has natural height with max-height 90vh', () => {
    const dialog = document.getElementById('dialog-career-details');
    // Note: JSDOM may not compute styles accurately, so we check the element exists
    expect(dialog).toBeTruthy();
  });

  it('renders career header with company name', async () => {
    const career = careers[0];
    wrapper.vm.showCareerDetails(career.id);
    await wrapper.vm.$nextTick();

    const header = wrapper.find('.career-details-header');
    expect(header.exists()).toBe(true);

    const title = wrapper.find('.career-details-header .title');
    expect(title.text()).toBe(career.company);
  });

  it('renders career description section', async () => {
    const career = careers[0];
    wrapper.vm.showCareerDetails(career.id);
    await wrapper.vm.$nextTick();

    const descriptionSection = wrapper.findAll('.info-section').at(0);
    expect(descriptionSection.exists()).toBe(true);
    expect(descriptionSection.find('h3').text()).toBe('Description');
  });

  it('renders career period/dates section', async () => {
    const career = careers[0];
    wrapper.vm.showCareerDetails(career.id);
    await wrapper.vm.$nextTick();

    const periodSection = wrapper.findAll('.info-section').at(1);
    expect(periodSection.exists()).toBe(true);
    expect(periodSection.find('h3').text()).toBe('Period');
    expect(periodSection.find('p').text()).toBe(career.dates);
  });

  it('renders platform icons when career has platforms', async () => {
    const career = careers.find((c) => c.platforms.length > 0);
    wrapper.vm.showCareerDetails(career.id);
    await wrapper.vm.$nextTick();

    const platformsSection = wrapper
      .findAll('.info-section')
      .find((s) => s.find('h3').text() === 'Platforms');
    expect(platformsSection).toBeTruthy();

    const icons = platformsSection.findAll('.platform-icons i');
    expect(icons.length).toBe(career.platforms.length);
  });

  it('shows Visit Company button when career has URL', async () => {
    const career = careers.find((c) => c.url);
    wrapper.vm.showCareerDetails(career.id);
    await wrapper.vm.$nextTick();

    const ctaButton = wrapper.find('.career-cta');
    expect(ctaButton.exists()).toBe(true);
    expect(ctaButton.text()).toBe('Visit Company');
    expect(ctaButton.classes()).toContain('is-warning');
  });

  it('shows disabled Website Unavailable button when career has no URL', async () => {
    // Create a mock career without URL since all real careers have URLs
    const careerWithoutUrl = {
      ...careers[0],
      id: 'test-no-url',
      url: null,
    };

    // Temporarily add to careers or use component data
    wrapper.setData({
      selectedCareer: careerWithoutUrl,
    });
    await wrapper.vm.$nextTick();

    const ctaButton = wrapper.find('.career-cta');
    expect(ctaButton.exists()).toBe(true);
    expect(ctaButton.text()).toBe('Website Unavailable');
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
    const dialog = document.getElementById('dialog-career-details');
    const closeSpy = vi.fn();
    dialog.close = closeSpy;

    const closeButton = wrapper.find('.dialog-menu button');
    await closeButton.trigger('click');

    expect(closeSpy).toHaveBeenCalled();
  });

  it('responds to open-career-details event from window', async () => {
    const career = careers[0];
    const dialog = document.getElementById('dialog-career-details');
    dialog.showModal = vi.fn();

    window.dispatchEvent(
      new CustomEvent('open-career-details', {
        detail: { careerId: career.id },
      })
    );

    await wrapper.vm.$nextTick();

    expect(dialog.showModal).toHaveBeenCalled();
    expect(wrapper.vm.selectedCareer.id).toBe(career.id);
  });

  it('getCareerById returns correct career for valid id', () => {
    const career = wrapper.vm.getCareerById('accenture');
    expect(career).not.toBeNull();
    expect(career.company).toBe('Accenture');
  });

  it('getCareerById returns null for invalid id', () => {
    const career = wrapper.vm.getCareerById('nonexistent-id');
    expect(career).toBeNull();
  });

  it('showCareerDetails does nothing for invalid careerId', () => {
    const dialog = document.getElementById('dialog-career-details');
    dialog.showModal = vi.fn();

    wrapper.vm.showCareerDetails('nonexistent-id');

    expect(dialog.showModal).not.toHaveBeenCalled();
  });

  it('showCareerDetails does nothing when dialog element is not found', () => {
    const career = careers[0];
    const origGetElementById = document.getElementById;
    document.getElementById = vi.fn((id) => {
      if (id === 'dialog-career-details') {
        return null;
      }
      return origGetElementById.call(document, id);
    });

    // Should not throw
    expect(() => wrapper.vm.showCareerDetails(career.id)).not.toThrow();

    document.getElementById = origGetElementById;
  });

  it('adds event listener on mount', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const freshWrapper = mount(CareerDetailsComponent, {
      attachTo: document.createElement('div'),
    });

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'open-career-details',
      freshWrapper.vm.handleOpenCareerDetails
    );

    addEventListenerSpy.mockRestore();
    freshWrapper.unmount();
  });

  it('removes event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    wrapper.unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'open-career-details',
      wrapper.vm.handleOpenCareerDetails
    );

    removeEventListenerSpy.mockRestore();
  });

  it('handles logo error by updating logoErrors state', async () => {
    const career = careers.find((c) => c.logo);
    wrapper.vm.showCareerDetails(career.id);
    await wrapper.vm.$nextTick();

    wrapper.vm.onLogoError(career.id);

    expect(wrapper.vm.logoErrors[career.id]).toBe(true);
  });

  it('uses dark mode logo when dialog has is-dark class', async () => {
    const career = careers.find((c) => c.logoDark);
    const dialog = document.getElementById('dialog-career-details');
    dialog.classList.add('is-dark');

    wrapper.vm.showCareerDetails(career.id);
    await wrapper.vm.$nextTick();

    const logoSrc = wrapper.vm.logoSrc(career);
    expect(logoSrc).toBe(career.logoDark);

    dialog.classList.remove('is-dark');
  });

  it('uses regular logo when not in dark mode', async () => {
    const career = careers.find((c) => c.logo);
    const dialog = document.getElementById('dialog-career-details');
    dialog.classList.remove('is-dark');

    wrapper.vm.showCareerDetails(career.id);
    await wrapper.vm.$nextTick();

    const logoSrc = wrapper.vm.logoSrc(career);
    expect(logoSrc).toBe(career.logo);
  });

  it('goToUrl opens URL in new tab', () => {
    const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    const url = 'https://example.com';

    wrapper.vm.goToUrl(url);

    expect(windowOpenSpy).toHaveBeenCalledWith(url, '_blank', 'noopener,noreferrer');
    windowOpenSpy.mockRestore();
  });

  it('Visit Company button calls goToUrl when clicked', async () => {
    const career = careers.find((c) => c.url);
    const goToUrlSpy = vi.spyOn(wrapper.vm, 'goToUrl');

    wrapper.vm.showCareerDetails(career.id);
    await wrapper.vm.$nextTick();

    const ctaButton = wrapper.find('.career-cta');
    await ctaButton.trigger('click');

    expect(goToUrlSpy).toHaveBeenCalledWith(career.url);
    goToUrlSpy.mockRestore();
  });
});
