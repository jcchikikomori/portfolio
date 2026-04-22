<script>
  import { careers } from '../data/careers';
  import { projects } from '../data/projects';

  export default {
    name: 'ProjectDetailsComponent',
    components: {},
    data() {
      return {
        selectedProject: null,
        logoErrors: {},
      };
    },
    computed: {
      selectedCareer() {
        if (!this.selectedProject || !this.selectedProject.careerId) {
          return null;
        }
        return careers.find((c) => c.id === this.selectedProject.careerId) || null;
      },
    },
    mounted() {
      window.addEventListener('open-project-details', this.handleOpenProjectDetails);
    },
    beforeUnmount() {
      window.removeEventListener('open-project-details', this.handleOpenProjectDetails);
    },
    methods: {
      isDark() {
        const dialog = document.getElementById('dialog-project-details');
        return Boolean(dialog?.classList.contains('is-dark'));
      },
      logoSrc(project) {
        return this.isDark() && project.logoDark ? project.logoDark : project.logo;
      },
      onLogoError(projectId) {
        // eslint-disable-next-line security/detect-object-injection
        if (!this.logoErrors[projectId]) {
          if (import.meta.env.DEV) {
            console.warn(`[ProjectDetailsComponent] Logo failed to load for: ${projectId}`);
          }
          this.logoErrors = { ...this.logoErrors, [projectId]: true };
        }
      },
      getProjectById(projectId) {
        return projects.find((p) => p.id === projectId) || null;
      },
      showProjectDetails(projectId) {
        const project = this.getProjectById(projectId);
        if (!project) {
          return;
        }
        this.selectedProject = project;
        const dialog = document.getElementById('dialog-project-details');
        if (!dialog) {
          return;
        }
        dialog.showModal();
      },
      showCareerDetails() {
        if (!this.selectedCareer) {
          return;
        }
        window.dispatchEvent(
          new CustomEvent('open-career-details', {
            detail: { careerId: this.selectedCareer.id },
          })
        );
      },
      getIndustryLabel(industry) {
        const labels = {
          'e-commerce': 'E-Commerce',
          'online-payment': 'Online Payment',
          b2b: 'B2B',
          sales: 'Sales',
          devops: 'DevOps',
          web: 'Web',
          mobile: 'Mobile',
        };
        return labels[industry] || industry;
      },
      handleOpenProjectDetails(event) {
        const { projectId } = event.detail;
        if (projectId) {
          this.showProjectDetails(projectId);
        }
      },
    },
  };
</script>

<template>
  <!-- PROJECT DETAILS DIALOG -->
  <dialog id="dialog-project-details" ref="detailsDialog" class="nes-dialog">
    <template v-if="selectedProject">
      <!-- Header with Logo and Title -->
      <div class="project-details-header">
        <template v-if="selectedProject.logo && !logoErrors[selectedProject.id]">
          <img
            :src="logoSrc(selectedProject)"
            :alt="selectedProject.name + ' logo'"
            class="project-details-logo"
            @error="onLogoError(selectedProject.id)"
          />
        </template>
        <template v-else>
          <i class="bi bi-box project-details-logo-placeholder"></i>
        </template>
        <h2 class="title">{{ selectedProject.name }}</h2>
      </div>

      <!-- Badges -->
      <div class="project-details-badges">
        <span
          :class="[
            'badge',
            'nes-badge',
            selectedProject.category === 'corporate' ? 'is-primary' : 'is-success',
          ]"
        >
          <span class="badge-label">{{ selectedProject.category }}</span>
        </span>
        <span class="badge industry-badge">
          {{ getIndustryLabel(selectedProject.industry) }}
        </span>
      </div>

      <!-- Content -->
      <div class="project-details-content">
        <!-- Media Section -->
        <div class="project-details-media">
          <img
            :src="selectedProject.screenshots[0] || '/img/projects/placeholder.png'"
            :alt="selectedProject.name + ' screenshot'"
            class="project-screenshot"
          />
        </div>

        <!-- Info Section -->
        <div class="project-details-info">
          <!-- Description -->
          <div class="info-section">
            <h3>Description</h3>
            <p>{{ selectedProject.description || 'No description available.' }}</p>
          </div>

          <!-- Period -->
          <div class="info-section">
            <h3>Period</h3>
            <p>{{ selectedProject.dates }}</p>
          </div>

          <!-- Company (if corporate) -->
          <div v-if="selectedCareer" class="info-section">
            <h3>Company</h3>
            <button
              type="button"
              class="company-badge nes-btn is-default nes-pointer"
              @click="showCareerDetails"
            >
              <i class="bi bi-building"></i>
              {{ selectedCareer.company }}
            </button>
          </div>

          <!-- Platforms -->
          <div
            v-if="selectedProject.platforms && selectedProject.platforms.length"
            class="info-section"
          >
            <h3>Platforms</h3>
            <div class="platform-icons">
              <i v-for="icon in selectedProject.platforms" :key="icon" :class="'bi ' + icon"></i>
            </div>
          </div>

          <!-- Skills -->
          <div v-if="selectedProject.skills && selectedProject.skills.length" class="info-section">
            <h3>Skills</h3>
            <div class="skills-list">
              <span v-for="skill in selectedProject.skills" :key="skill.name" class="skill-tag">
                <i :class="'bi ' + skill.icon"></i>
                {{ skill.name }}
              </span>
            </div>
          </div>

          <!-- CTA Button -->
          <button
            v-if="selectedProject.url"
            type="button"
            class="nes-btn is-primary nes-pointer project-cta"
            @click="$emit('go-to-url', selectedProject.url)"
          >
            Visit Project
          </button>
          <button v-else type="button" class="nes-btn is-disabled project-cta">
            Project Unavailable
          </button>
        </div>
      </div>
    </template>

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
  /* Styles are defined in _project-details.scss */
</style>
