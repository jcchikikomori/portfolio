<script>
  import { projects } from '../data/projects';

  export default {
    name: 'ProjectsComponent',
    components: {},
    data() {
      return {
        projects,
        selectedFilter: 'all',
        logoErrors: {},
      };
    },
    computed: {
      filteredProjects() {
        if (this.selectedFilter === 'all') {
          return this.projects;
        }
        return this.projects.filter(this.matchesCategoryFilter);
      },
    },
    methods: {
      isDark() {
        const dialog = document.getElementById('dialog-projects');
        return Boolean(dialog?.classList.contains('is-dark'));
      },
      logoSrc(project) {
        return this.isDark() && project.logoDark ? project.logoDark : project.logo;
      },
      onLogoError(projectId) {
        // eslint-disable-next-line security/detect-object-injection
        if (!this.logoErrors[projectId]) {
          if (import.meta.env.DEV) {
            console.warn(`[ProjectsComponent] Logo failed to load for: ${projectId}`);
          }
          this.logoErrors = { ...this.logoErrors, [projectId]: true };
        }
      },
      showProjectDetails(projectId) {
        window.dispatchEvent(
          new CustomEvent('open-project-details', {
            detail: { projectId },
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
      matchesCategoryFilter(project) {
        return project.category === this.selectedFilter;
      },
    },
  };
</script>

<template>
  <!-- PROJECTS CONTAINER -->
  <div id="projects-container">
    <dialog id="dialog-projects" ref="projectsDialog" class="nes-dialog">
      <h1 class="title">My Projects</h1>

      <!-- Filter Dropdown -->
      <div class="filter-container">
        <label for="project-filter">Filter:</label>
        <div class="nes-select">
          <select id="project-filter" v-model="selectedFilter">
            <option value="all">All Projects</option>
            <option value="corporate">Corporate</option>
            <option value="personal">Personal</option>
          </select>
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-card nes-container"
        >
          <!-- Project Logo -->
          <div class="project-logo-wrapper">
            <template v-if="project.logo && !logoErrors[project.id]">
              <img
                :src="logoSrc(project)"
                :alt="project.name + ' logo'"
                class="project-logo"
                @error="onLogoError(project.id)"
              />
            </template>
            <template v-else>
              <i class="bi bi-box project-logo-placeholder"></i>
            </template>
          </div>

          <!-- Project Name -->
          <h3 class="project-name">{{ project.name }}</h3>

          <!-- Badges -->
          <div class="project-badges">
            <span
              :class="[
                'badge',
                'nes-badge',
                project.category === 'corporate' ? 'is-primary' : 'is-success',
              ]"
            >
              <span class="badge-label">{{ project.category }}</span>
            </span>
            <span class="badge industry-badge">
              {{ getIndustryLabel(project.industry) }}
            </span>
          </div>

          <!-- Platforms -->
          <div v-if="project.platforms.length > 0" class="project-platforms">
            <span class="platform-icons">
              <i v-for="icon in project.platforms" :key="icon" :class="'bi ' + icon"></i>
            </span>
          </div>

          <!-- Dates -->
          <p class="project-dates">{{ project.dates }}</p>

          <!-- View Details Button -->
          <button
            type="button"
            class="nes-btn is-default nes-pointer project-details-btn"
            @click="showProjectDetails(project.id)"
          >
            View Details
          </button>
        </div>
      </div>

      <menu class="dialog-menu">
        <button
          type="button"
          class="nes-btn is-primary nes-pointer is-block"
          @click="$refs.projectsDialog.close()"
        >
          Close
        </button>
      </menu>
    </dialog>
  </div>
</template>

<style scoped>
  /* Component-specific styles - main styles in _projects.scss */
</style>
