<script>
  import { careers } from '../data/careers';

  export default {
    name: 'CareersComponent',
    components: {},
    data() {
      return {
        careers,
        logoErrors: {},
      };
    },
    methods: {
      isDark() {
        const dialog = document.getElementById('dialog-careers');
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
            console.warn(`[ProjectsComponent] Logo failed to load for: ${careerId}`);
          }
          this.logoErrors = { ...this.logoErrors, [careerId]: true };
        }
      },
      showCareerDetails(careerId) {
        window.dispatchEvent(
          new CustomEvent('open-career-details', {
            detail: { careerId },
          })
        );
      },
    },
  };
</script>

<template>
  <!-- CAREERS CONTAINER -->
  <div id="careers-container">
    <dialog id="dialog-careers" ref="careersDialog" class="nes-dialog">
      <h1 class="title">My Career</h1>
      <p class="subtitle">
        See more by
        <a @click="goToUrl('https://github.com/jcchikikomori')">contacting me</a>
        for my CV!
      </p>
      <div class="career-list">
        <div v-for="career in careers" :key="career.id" class="career-card nes-container">
          <div class="career-logo-wrapper">
            <template v-if="career.logo && !logoErrors[career.id]">
              <img
                :src="logoSrc(career)"
                :alt="career.company + ' logo'"
                class="career-logo"
                @error="onLogoError(career.id)"
              />
            </template>
            <template v-else>
              <i class="bi bi-x-lg career-logo-placeholder"></i>
            </template>
          </div>

          <h3 class="career-title">{{ career.company }}</h3>

          <div v-if="career.platforms.length > 0" class="career-platforms">
            <span class="platform-icons">
              <i v-for="icon in career.platforms" :key="icon" :class="'bi ' + icon"></i>
            </span>
          </div>

          <p class="career-dates">{{ career.dates }}</p>

          <button
            type="button"
            class="nes-btn is-default nes-pointer career-details-trigger"
            @click="showCareerDetails(career.id)"
          >
            View Details
          </button>
        </div>
      </div>

      <menu class="dialog-menu">
        <button
          type="button"
          class="nes-btn is-primary nes-pointer is-block"
          @click="$refs.careersDialog.close()"
        >
          Okay
        </button>
      </menu>
    </dialog>
  </div>
</template>

<style scoped>
  /* Styles are defined in _projects.scss */
</style>
