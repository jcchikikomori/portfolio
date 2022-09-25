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
          <p>@jcchikikomori</p>
          <ul class="profile-list">
            <li>
              Lazy Geek & Developer,
            </li>
            <li>and i love <a href="#" v-on:click="showSpotify"> music</a>!</li>
            <br />
            <li><a href="#" v-on:click="showProjects">My Career</a></li>
          </ul>
          <button
            v-on:click="goToUrl('https://linkedin.com/in/johncyrillcorsanes')"
            id="linkedin-btn"
            type="button"
            class="nes-btn"
          >
            <em class="nes-icon linkedin"></em> <span>LinkedIn</span>
          </button>
          <button
            v-on:click="goToUrl('https://github.com/jcchikikomori')"
            id="github-btn"
            type="button"
            class="nes-btn"
          >
            <em class="nes-icon github"></em> <span>GitHub</span>
          </button>
          <button
            v-on:click="goToUrl('https://www.youtube.com/user/jcstriker1')"
            id="youtube-btn"
            type="button"
            class="nes-btn"
          >
            <em class="nes-icon youtube"></em> <span>YouTube</span>
          </button>

          <br /><br />
          <p>
            <span style="font-size: 9px;">
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
              <a
                href="#"
                v-on:click="goToUrl('https://jcchikikomori.github.io/blog')"
                >Visit my blog!</a
              >
            </span>
          </p>
          <!-- <p>
            <span style="font-size: 9px;">
              <a target="_blank" style="font-size: 9px" href="v1"
                >Visit older version..</a
              >
            </span>
          </p> -->
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
import { version } from "../../package.json";

const appv = version;

export default {
  name: "ProfileComponent",
  components: {
    ProjectsComponent,
    SpotifyComponent,
    UpdatesComponent
  },
  methods: {
    goToUrl: function(url, includeTarget = true) {
      $("#redirect").attr("href", url);
      if (!includeTarget) {
        $("#redirect").attr("target", null);
      } else {
        $("#redirect").attr("target", "_blank");
      }
      $("#redirect")[0].click();
    },
    showProjects: function() {
      let projectsDialog = document.getElementById("dialog-projects");

      dialogPolyfill.registerDialog(projectsDialog);
      projectsDialog.showModal();
      projectsDialog.classList.add("-is-open");
      projectsDialog.scrollTo({ top: 0, behavior: 'smooth' });
    },
    showSpotify: function() {
      let spotifyDialog = document.getElementById("dialog-spotify");

      dialogPolyfill.registerDialog(spotifyDialog);
      spotifyDialog.showModal();
      spotifyDialog.classList.remove("-is-open");
    }
  },
  data() {
    return {
      app_version: appv
    };
  }
};
</script>
