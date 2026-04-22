<script>
  import { careers } from '../data/careers';

  export default {
    name: 'ProjectsComponent',
    components: {},
    data() {
      return {
        careers,
        logoErrors: {},
      };
    },
    methods: {
      isDark() {
        const dialog = document.getElementById('dialog-projects');
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
  <!-- PROJECTS CONTAINER -->
  <div id="projects-container">
    <dialog id="dialog-projects" ref="careersDialog" class="nes-dialog">
      <h1 class="title">My Career</h1>
      <p class="subtitle">
        See more by
        <a @click="goToUrl('https://github.com/jcchikikomori')">contacting me</a>
        for my CV!
      </p>
      <div class="career-list">
        <div
          v-for="career in careers"
          :key="career.id"
          class="card"
          @click="showCareerDetails(career.id)"
        >
          <div class="card-body">
            <template v-if="career.logo && !logoErrors[career.id]">
              <div class="card-body-logo">
                <img
                  :src="logoSrc(career)"
                  :alt="career.company + ' logo'"
                  class="career-logo"
                  @error="onLogoError(career.id)"
                />
              </div>
            </template>
            <template v-else>
              <div class="card-body-logo">
                <i class="bi bi-x-lg career-logo-placeholder"></i>
              </div>
            </template>
            <h6 class="card-title">{{ career.company }}</h6>
            <div class="card-body-flex">
              <span v-if="career.platforms.length > 0" class="platform-icons">
                <i v-for="icon in career.platforms" :key="icon" :class="'bi ' + icon"></i>
              </span>
              <p class="card-text">
                <small class="text-muted">{{ career.dates }}</small>
              </p>
            </div>
            <button
              type="button"
              class="nes-btn is-default nes-pointer career-details-trigger"
              @click.stop="showCareerDetails(career.id)"
            >
              View Details
            </button>
          </div>
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
