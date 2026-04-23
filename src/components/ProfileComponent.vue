<script>
  import { slogans, defaultSlogan, getRandomizableSlogans } from '@/data/slogans';

  import CareerDetailsComponent from './CareerDetailsComponent.vue';
  import CareersComponent from './CareersComponent.vue';
  import ProjectDetailsComponent from './ProjectDetailsComponent.vue';
  import ProjectsComponent from './ProjectsComponent.vue';
  import SpotifyComponent from './SpotifyComponent.vue';
  import packageInfo from '../../package.json';

  const SLOGAN_INITIALIZED_KEY = 'slogan-initialized';

  export default {
    name: 'ProfileComponent',
    components: {
      CareersComponent,
      ProjectsComponent,
      ProjectDetailsComponent,
      SpotifyComponent,
      CareerDetailsComponent,
    },
    data() {
      return {
        app_version: packageInfo.version,
        currentSlogan: '',
      };
    },
    mounted() {
      this.selectSlogan();
    },
    methods: {
      goToUrl(url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      },
      showCareers() {
        const careersDialog = document.getElementById('dialog-careers');
        if (!careersDialog) {
          return;
        }
        careersDialog.showModal();
        careersDialog.scrollTo({ top: 0, behavior: 'smooth' });
      },
      showSpotify() {
        const spotifyDialog = document.getElementById('dialog-spotify');
        if (!spotifyDialog) {
          return;
        }
        spotifyDialog.showModal();
      },
      showProjects() {
        const projectsDialog = document.getElementById('dialog-projects');
        if (!projectsDialog) {
          return;
        }
        projectsDialog.showModal();
        projectsDialog.scrollTo({ top: 0, behavior: 'smooth' });
      },
      selectSlogan() {
        try {
          const isReturning = localStorage.getItem(SLOGAN_INITIALIZED_KEY);

          if (!isReturning) {
            // First visit: show default slogan
            this.currentSlogan = defaultSlogan?.message || slogans[0]?.message || '';
            localStorage.setItem(SLOGAN_INITIALIZED_KEY, 'true');
          } else {
            // Returning visit: show random slogan from pool
            const pool = getRandomizableSlogans();
            if (pool.length > 0) {
              const randomIndex = Math.floor(Math.random() * pool.length);
              // eslint-disable-next-line security/detect-object-injection
              this.currentSlogan = pool[randomIndex].message;
            } else {
              // Fallback if pool is empty
              this.currentSlogan = defaultSlogan?.message || slogans[0]?.message || '';
            }
          }
        } catch (e) {
          // localStorage unavailable: fallback to default
          this.currentSlogan = defaultSlogan?.message || slogans[0]?.message || '';
        }
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
          <div class="slogan-container">
            {{ currentSlogan }}
          </div>

          <div class="btn-group-vertical btn-block">
            <button class="nes-btn is-default nes-pointer is-block" @click="showSpotify">
              Music
            </button>
            <button class="nes-btn is-success nes-pointer is-block" @click="showCareers">
              Careers
            </button>
            <button class="nes-btn is-success nes-pointer is-block" @click="showProjects">
              Projects
            </button>
            <button
              class="nes-btn is-warning nes-pointer is-block"
              @click="goToUrl('https://jcchikikomori.github.io/blog')"
            >
              Blog
            </button>
            <button
              id="linkedin-btn"
              type="button"
              class="nes-btn is-primary nes-pointer is-block"
              @click="goToUrl('https://linkedin.com/in/johncyrillcorsanes')"
            >
              <em class="nes-icon linkedin"></em> <span>LinkedIn</span>
            </button>
            <button
              id="github-btn"
              type="button"
              class="nes-btn is-primary nes-pointer is-block"
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

      <CareersComponent></CareersComponent>
      <ProjectsComponent></ProjectsComponent>
      <ProjectDetailsComponent @go-to-url="goToUrl"></ProjectDetailsComponent>
      <SpotifyComponent></SpotifyComponent>
      <CareerDetailsComponent></CareerDetailsComponent>
    </section>
  </div>
</template>
