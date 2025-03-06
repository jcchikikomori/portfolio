<template>
  <!-- MAIN CONTAINER -->
  <div id="main-container" class="main-screen">
    <!-- MAIN INFO -->
    <section id="profile-container" class="nes-container animate__animated animate__fadeIn animate__faster">
      <div class="containers">
        <div class="nes-container is-centered">
          <img
            id="profile-logo"
            src="img/jcc_logo.png"
            width="200"
            alt="My Logo"
          />
          <br /><br />
          <!-- <p>The Lazy Geek</p> -->
          <ul class="profile-list">
            <li>
              A Lazy Geek with
            </li>
            <li>Back Pains & Music Addiction</li>
          </ul>

          <div class="btn-group-vertical btn-block">
            <button v-on:click="showSpotify" class="btn nes-btn is-default is-block">Music</button>
            <button v-on:click="showProjects" class="btn nes-btn is-default is-block">Careers</button>
            <button class="btn nes-btn is-disabled is-block">Industries</button>
            <button v-on:click="goToUrl('https://jcchikikomori.github.io/blog')"
              class="btn nes-btn is-primary is-block">Blog</button>
          </div>
          <br /><br />
          <div class="btn-group">
            <button
              v-on:click="goToUrl('https://linkedin.com/in/johncyrillcorsanes')"
              id="linkedin-btn"
              type="button"
              class="btn nes-btn">
              <em class="nes-icon linkedin"></em> <span>LinkedIn</span>
            </button>
            <button
              v-on:click="goToUrl('https://github.com/jcchikikomori')"
              id="github-btn"
              type="button"
              class="btn nes-btn">
              <em class="nes-icon github"></em> <span>GitHub</span>
            </button>
          </div>

          <br /><br />
          <p>
            <span style="font-size: 9px;">
              Portfolio Build
              <a
                href="#"
                v-on:click="goToUrl('https://github.com/jcchikikomori/portfolio/releases/tag/v' + app_version)"
              >
                v{{ app_version }}
              </a>
            </span>
          </p>
          <p>
            <span style="font-size: 9px;">
              Powered by VueJS
            </span>
          </p>
        </div>
      </div>

      <br />
      <div class="containers">
        <div id="post-container" class="nes-container">
          <div id="all-post"></div>
        </div>
      </div>

      <ProjectsComponent></ProjectsComponent>
      <SpotifyComponent></SpotifyComponent>
      <UpdatesComponent></UpdatesComponent>
    </section>
  </div>
</template>

<script>
import dialogPolyfill from "dialog-polyfill";

import ProjectsComponent from "./ProjectsComponent.vue";
import SpotifyComponent from "./SpotifyComponent.vue";
import UpdatesComponent from "./UpdatesComponent.vue";
import $ from "jquery";
import { visualizerIsOn } from "../visualizer";
import packageInfo from '../../package.json';

export default {
  name: "ProfileComponent",
  components: {
    ProjectsComponent,
    SpotifyComponent,
    UpdatesComponent
  },
  methods: {
    goToUrl: (url, includeTarget = true) => {
      $("#redirect").attr("href", url);
      if (!includeTarget) {
        $("#redirect").attr("target", null);
      } else {
        $("#redirect").attr("target", "_blank");
      }
      $("#redirect")[0].click();
    },
    showProjects: () => {
      let projectsDialog = document.getElementById("dialog-projects");

      dialogPolyfill.registerDialog(projectsDialog);
      projectsDialog.showModal();
      projectsDialog.classList.add("-is-open");
      projectsDialog.scrollTo({ top: 0, behavior: 'smooth' });
    },
    showSpotify: () => {
      let spotifyDialog = document.getElementById("dialog-spotify");

      dialogPolyfill.registerDialog(spotifyDialog);
      spotifyDialog.showModal();
      spotifyDialog.classList.remove("-is-open");
      visualizerIsOn();
    }
  },
  data() {
    return {
      app_version: packageInfo.version
    };
  }
};
</script>
