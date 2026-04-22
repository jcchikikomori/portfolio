<script>
  import { industries } from '../data/industries';

  export default {
    name: 'IndustriesComponent',
    components: {},
    data() {
      return {
        industries,
      };
    },
    methods: {
      showIndustryProjects(industryName) {
        window.dispatchEvent(
          new CustomEvent('open-industry-projects', {
            detail: { industryName },
          })
        );
      },
    },
  };
</script>

<template>
  <!-- INDUSTRIES CONTAINER -->
  <div id="industries-container">
    <dialog id="dialog-industries" ref="industriesDialog" class="nes-dialog">
      <h1 class="title">Industries</h1>

      <div class="industries-grid">
        <div
          v-for="industry in industries"
          :key="industry.name"
          class="industry-card nes-container"
        >
          <div class="industry-header">
            <i :class="'bi ' + industry.icon + ' industry-icon'"></i>
            <h3>{{ industry.name }}</h3>
          </div>

          <button
            type="button"
            class="nes-btn is-default nes-pointer industry-toggle"
            @click="showIndustryProjects(industry.name)"
          >
            View Projects
          </button>
        </div>
      </div>

      <menu class="dialog-menu">
        <button
          type="button"
          class="nes-btn is-primary nes-pointer is-block"
          @click="$refs.industriesDialog.close()"
        >
          Close
        </button>
      </menu>
    </dialog>
  </div>
</template>

<style scoped>
  /* Component-specific styles - main styles in _industries.scss */
</style>
