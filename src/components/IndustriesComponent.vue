<script>
  import { careers } from '../data/careers';
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
      getCompanyName(companyId) {
        const career = careers.find((c) => c.id === companyId);
        return career ? career.company : '';
      },
    },
  };
</script>

<template>
  <!-- INDUSTRIES CONTAINER -->
  <div id="industries-container">
    <dialog id="dialog-industries" class="nes-dialog">
      <form method="dialog">
        <p class="title">Companies &amp; Industries</p>
        <div
          v-for="industry in industries"
          :key="industry.name"
          class="nes-container industry-card"
        >
          <p>
            <i :class="'bi ' + industry.icon + ' industry-icon'"></i>
            {{ industry.name }}
          </p>
          <ul class="industry-companies">
            <li v-for="companyId in industry.companyIds" :key="companyId">
              {{ getCompanyName(companyId) }}
            </li>
          </ul>
        </div>
        <menu class="dialog-menu">
          <button class="nes-btn is-primary nes-pointer is-block">Okay</button>
        </menu>
      </form>
    </dialog>
  </div>
</template>
