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
            <button v-on:click="showSpotify" class="nes-btn is-default nes-pointer is-block">
              Music
            </button>
            <button v-on:click="showProjects" class="nes-btn is-default nes-pointer is-block">
              Careers
            </button>
            <button v-on:click="showIndustries" class="nes-btn is-default nes-pointer is-block">
              Industries
            </button>
            <button
              v-on:click="goToUrl('https://jcchikikomori.github.io/blog')"
              class="nes-btn is-default nes-pointer is-block"
            >
              Blog
            </button>
          </div>
          <br /><br />
          <div class="btn-group-vertical btn-block">
            <button
              v-on:click="goToUrl('https://linkedin.com/in/johncyrillcorsanes')"
              id="linkedin-btn"
              type="button"
              class="nes-btn is-default nes-pointer is-block"
            >
              <em class="nes-icon linkedin"></em> <span>LinkedIn</span>
            </button>
            <button
              v-on:click="goToUrl('https://github.com/jcchikikomori')"
              id="github-btn"
              type="button"
              class="nes-btn is-default nes-pointer is-block"
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
                v-on:click="
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
    </section>
  </div>
</template>

<script>
  import ProjectsComponent from './ProjectsComponent.vue';
  import SpotifyComponent from './SpotifyComponent.vue';
  import IndustriesComponent from './IndustriesComponent.vue';
  import packageInfo from '../../package.json';

  export default {
    name: 'ProfileComponent',
    components: {
      ProjectsComponent,
      SpotifyComponent,
      IndustriesComponent,
    },
    methods: {
      goToUrl(url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      },
      showProjects: () => {
        const projectsDialog = document.getElementById('dialog-projects');
        if (!projectsDialog) return;
        projectsDialog.showModal();
        projectsDialog.classList.add('-is-open');
        projectsDialog.scrollTo({ top: 0, behavior: 'smooth' });
      },
      showSpotify: () => {
        const spotifyDialog = document.getElementById('dialog-spotify');
        if (!spotifyDialog) return;
        spotifyDialog.classList.remove('-is-open');
        spotifyDialog.showModal();
      },
      showIndustries: () => {
        const industriesDialog = document.getElementById('dialog-industries');
        if (!industriesDialog) return;
        industriesDialog.showModal();
      },
    },
    data() {
      return {
        app_version: packageInfo.version,
      };
    },
  };
</script>
