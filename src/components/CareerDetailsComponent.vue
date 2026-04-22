<script>
  import { careers } from '../data/careers';

  export default {
    name: 'CareerDetailsComponent',
    components: {},
    data() {
      return {
        selectedCareer: { company: '' },
        logoErrors: {},
      };
    },
    methods: {
      isDark() {
        const dialog = document.getElementById('dialog-career-details');
        return Boolean(dialog?.classList.contains('is-dark'));
      },
      logoSrc(career) {
        return this.isDark() && career.logoDark ? career.logoDark : career.logo;
      },
      goToUrl(url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      },
      onLogoError(careerId) {
        // eslint-disable-next-line security/detect-object-injection
        if (!this.logoErrors[careerId]) {
          if (import.meta.env.DEV) {
            console.warn(`[CareerDetailsComponent] Logo failed to load for: ${careerId}`);
          }
          this.logoErrors = { ...this.logoErrors, [careerId]: true };
        }
      },
      getCareerById(careerId) {
        return careers.find((c) => c.id === careerId) || null;
      },
      showCareerDetails(careerId) {
        const career = this.getCareerById(careerId);
        if (!career) {
          return;
        }
        this.selectedCareer = career;
        const dialog = document.getElementById('dialog-career-details');
        if (!dialog) {
          return;
        }
        dialog.showModal();
      },
      handleOpenCareerDetails(event) {
        const { careerId } = event.detail;
        if (careerId) {
          this.showCareerDetails(careerId);
        }
      },
    },
    mounted() {
      window.addEventListener('open-career-details', this.handleOpenCareerDetails);
    },
    beforeUnmount() {
      window.removeEventListener('open-career-details', this.handleOpenCareerDetails);
    },
  };
</script>

<template>
  <!-- CAREER DETAILS DIALOG -->
  <dialog id="dialog-career-details" ref="detailsDialog" class="nes-dialog">
    <div class="career-details-header">
      <h2 class="title">{{ selectedCareer.company }}</h2>
    </div>
    <div class="career-details-content">
      <!-- Media Section -->
      <div class="career-details-media">
        <img
          :src="selectedCareer.logo || '/img/projects/placeholder.png'"
          :alt="selectedCareer.company + ' logo'"
          class="career-screenshot"
        />
      </div>

      <!-- Info Section -->
      <div class="career-details-info">
        <div class="info-section">
          <h3>Description</h3>
          <p>{{ selectedCareer.description || 'No description available.' }}</p>
        </div>
        <div class="info-section">
          <h3>Period</h3>
          <p>{{ selectedCareer.dates }}</p>
        </div>
        <div
          v-if="selectedCareer.platforms && selectedCareer.platforms.length"
          class="info-section"
        >
          <h3>Platforms</h3>
          <div class="platform-icons">
            <i v-for="icon in selectedCareer.platforms" :key="icon" :class="'bi ' + icon"></i>
          </div>
        </div>
        <button
          v-if="selectedCareer.url"
          type="button"
          class="nes-btn is-primary nes-pointer career-cta"
          @click="goToUrl(selectedCareer.url)"
        >
          Visit Company
        </button>
        <button v-else type="button" class="nes-btn is-disabled career-cta">
          Website Unavailable
        </button>
      </div>
    </div>
    <menu class="dialog-menu">
      <button
        type="button"
        class="nes-btn is-primary nes-pointer is-block"
        @click="$refs.detailsDialog.close()"
      >
        Close
      </button>
    </menu>
  </dialog>
</template>

<style scoped>
  /* Styles are defined in _projects.scss */
</style>
