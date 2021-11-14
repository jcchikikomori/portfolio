<template>
  <!-- MAIN CONTAINER -->
  <div id="main-container" class="main-screen">
    <!-- MAIN INFO -->
    <section id="profile-container" class="animated fadeIn nes-container">
      <div class="containers">
        <div class="nes-container is-centered">
          <img
            id="profile-logo"
            src="img/jcc_logo.png"
            width="200"
            alt="My Logo"
          />
          <br /><br />
          <!-- <p>@jcchikikomori</p> -->
          <ul class="profile-list">
            <li>
              Lazy Geek & <a href="#" v-on:click="showProjects">Developer</a>,
            </li>
            <!-- <li>for Android & Web.</li> -->
            <!-- <br /> -->
            <li>and i love <a href="#" v-on:click="showSpotify"> music</a>!</li>
            <br />
            <!-- <li><a href="#" v-on:click="showProjects">My projects</a></li> -->
          </ul>
          <button
            onclick="goToUrl('https://johncyrillcorsanes.medium.com')"
            id="medium-btn"
            type="button"
            class="nes-btn"
          >
            <i class="nes-icon medium"></i> <span>Medium</span>
          </button>
          <button
            onclick="goToUrl('https://linkedin.com/in/johncyrillcorsanes')"
            id="linkedin-btn"
            type="button"
            class="nes-btn"
          >
            <i class="nes-icon linkedin"></i> <span>LinkedIn</span>
          </button>
          <button
            onclick="goToUrl('https://github.com/jcchikikomori')"
            id="github-btn"
            type="button"
            class="nes-btn"
          >
            <i class="nes-icon github"></i> <span>GitHub</span>
          </button>
          <button
            onclick="goToUrl('https://www.youtube.com/user/jcstriker1')"
            id="youtube-btn"
            type="button"
            class="nes-btn"
          >
            <i class="nes-icon youtube"></i> <span>YouTube</span>
          </button>

          <br /><br />
          <p>
            <span style="font-size: 9px;">
              <a
                href="javascript:goToUrl('https://github.com/jcchikikomori/portfolio/releases')"
              >
                v{{ app_version }}
              </a>
            </span>
          </p>
          <p>
            <span style="font-size: 9px;">
              <a
                href="javascript:goToUrl('https://jcchikikomori.github.io/blog')"
                >Visit my blog!</a
              >
            </span>
          </p>
          <p>
            <span style="font-size: 9px;">
              <a target="_blank" style="font-size: 9px" href="v1"
                >Visit older version..</a
              >
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

      <Projects></Projects>
      <Spotify></Spotify>
      <Updates></Updates>
    </section>
  </div>
</template>

<script>
import dialogPolyfill from "dialog-polyfill";

import Projects from "../components/Projects.vue";
import Spotify from "../components/Spotify.vue";
import Updates from "../components/Updates.vue";
import { version } from "../../package.json";

const appv = version;

export default {
  name: "Profile",
  components: {
    Projects,
    Spotify,
    Updates
  },
  methods: {
    showProjects: function() {
      var projectsDialog = document.getElementById("dialog-projects");

      dialogPolyfill.registerDialog(projectsDialog);
      projectsDialog.showModal();
      // projectsDialog.classList.add("-is-open");
    },
    showSpotify: function() {
      var spotifyDialog = document.getElementById("dialog-spotify");

      dialogPolyfill.registerDialog(spotifyDialog);
      spotifyDialog.showModal();
      // spotifyDialog.classList.remove("-is-open");
    }
  },
  data() {
    return {
      app_version: appv
    };
  }
};
</script>
