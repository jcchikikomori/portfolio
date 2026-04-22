<script>
  import CareerDetailsComponent from './CareerDetailsComponent.vue';
  import IndustriesComponent from './IndustriesComponent.vue';
  import IndustryProjectsComponent from './IndustryProjectsComponent.vue';
  import ProjectsComponent from './ProjectsComponent.vue';
  import SpotifyComponent from './SpotifyComponent.vue';
  import packageInfo from '../../package.json';

  export default {
    name: 'ProfileComponent',
    components: {
      ProjectsComponent,
      SpotifyComponent,
      IndustriesComponent,
      CareerDetailsComponent,
      IndustryProjectsComponent,
    },
    data() {
      return {
        app_version: packageInfo.version,
      };
    },
    methods: {
      goToUrl(url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      },
      showProjects: () => {
        const projectsDialog = document.getElementById('dialog-projects');
        if (!projectsDialog) {
          return;
        }
        projectsDialog.showModal();
        projectsDialog.classList.add('-is-open');
        projectsDialog.scrollTo({ top: 0, behavior: 'smooth' });
      },
      showSpotify: () => {
        const spotifyDialog = document.getElementById('dialog-spotify');
        if (!spotifyDialog) {
          return;
        }
        spotifyDialog.classList.remove('-is-open');
        spotifyDialog.showModal();
      },
      showIndustries: () => {
        const industriesDialog = document.getElementById('dialog-industries');
        if (!industriesDialog) {
          return;
        }
        industriesDialog.showModal();
      },
    },
  };
</script>

<template>
  <!-- MAIN CONTAINER -->
  <div id="main-container" class="main-screen">
    <!-- MAIN INFO -->
    <section
      id="profile-container"
      class="nes-container animate__animated animate__fadeIn animate__faster"
    >
      <div class="containers">
        <div class="nes-container is-centered">
          <img id="profile-logo" src="/img/jcc_logo.png" width="200" alt="My Logo" />
          <br /><br />
          <!-- <p>The Lazy Geek</p> -->
          <ul class="profile-list">
            <li>A Lazy Geek with</li>
            <li>Back Pains & Music Addiction</li>
          </ul>

          <div class="btn-group-vertical btn-block">
            <button class="nes-btn is-default nes-pointer is-block" @click="showSpotify">
              Music
            </button>
            <button class="nes-btn is-default nes-pointer is-block" @click="showProjects">
              Careers
            </button>
            <button class="nes-btn is-default nes-pointer is-block" @click="showIndustries">
              Projects
            </button>
            <button
              class="nes-btn is-default nes-pointer is-block"
              @click="goToUrl('https://jcchikikomori.github.io/blog')"
            >
              Blog
            </button>
          </div>
          <br /><br />
          <div class="btn-group-vertical btn-block">
            <button
              id="linkedin-btn"
              type="button"
              class="nes-btn is-default nes-pointer is-block"
              @click="goToUrl('https://linkedin.com/in/johncyrillcorsanes')"
            >
              <em class="nes-icon linkedin"></em> <span>LinkedIn</span>
            </button>
            <button
              id="github-btn"
              type="button"
              class="nes-btn is-default nes-pointer is-block"
              @click="goToUrl('https://github.com/jcchikikomori')"
            >
              <em class="nes-icon github"></em> <span>GitHub</span>
            </button>
          </div>

          <br /><br />
          <p>
            <span style="font-size: 9px">
              Portfolio Build
              <a
                href="#"
                @click="
                  goToUrl('https://github.com/jcchikikomori/portfolio/releases/tag/v' + app_version)
                "
              >
                v{{ app_version }}
              </a>
            </span>
          </p>
          <p>
            <span style="font-size: 9px"> Powered by VueJS </span>
          </p>
        </div>
      </div>

      <ProjectsComponent></ProjectsComponent>
      <SpotifyComponent></SpotifyComponent>
      <IndustriesComponent></IndustriesComponent>
      <CareerDetailsComponent></CareerDetailsComponent>
      <IndustryProjectsComponent></IndustryProjectsComponent>
    </section>
  </div>
</template>
