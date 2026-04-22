<script>
  import { industries } from '../data/industries';

  export default {
    name: 'IndustryProjectsComponent',
    components: {},
    data() {
      return {
        selectedIndustry: null,
      };
    },
    methods: {
      showIndustryProjects(industryName) {
        const industry = industries.find((i) => i.name === industryName);
        if (!industry) {
          return;
        }
        this.selectedIndustry = industry;
        const dialog = document.getElementById('dialog-industry-projects');
        if (!dialog) {
          return;
        }
        dialog.showModal();
      },
      openCareerDetails(careerId) {
        window.dispatchEvent(
          new CustomEvent('open-career-details', {
            detail: { careerId },
          })
        );
      },
      handleOpenIndustryProjects(event) {
        const { industryName } = event.detail;
        if (industryName) {
          this.showIndustryProjects(industryName);
        }
      },
    },
    mounted() {
      window.addEventListener('open-industry-projects', this.handleOpenIndustryProjects);
    },
    beforeUnmount() {
      window.removeEventListener('open-industry-projects', this.handleOpenIndustryProjects);
    },
  };
</script>

<template>
  <!-- INDUSTRY PROJECTS DIALOG -->
  <dialog id="dialog-industry-projects" ref="projectsDialog" class="nes-dialog">
    <template v-if="selectedIndustry">
      <h2 class="title">{{ selectedIndustry.name }} Projects</h2>

      <div class="projects-list">
        <div
          v-for="project in selectedIndustry.projects"
          :key="project.name"
          class="project-item nes-container"
          @click="openCareerDetails(project.careerId)"
        >
          <h4>{{ project.name }}</h4>
          <p>{{ project.description }}</p>

          <div class="project-skills">
            <div
              v-for="skill in project.skills"
              :key="skill.name"
              class="skill-item"
            >
              <i :class="'bi ' + skill.icon"></i>
              <span class="skill-name">{{ skill.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>

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
</template>

<style scoped>
  /* Styles are defined in _industry-projects.scss */
</style>
