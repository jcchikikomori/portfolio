import Vue from "vue";
import App from "./App.vue";
import $ from "jquery";
import "nes.css/css/nes.min.css";
import { darkMode, normalTheme } from './theme';
import { handlePlayback } from "./visualizer";
import { microProcessor } from "./http";

import './registerServiceWorker'

Vue.config.productionTip = false;

/** main */
window.onload = function() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    darkMode();
  } else {
    normalTheme();
  }

  // Currently not working
  // setInterval(() => {
  //   if (isAudioPlaying()) {
  //     visualizerIsOn();
  //   } else {
  //     visualizerIsOff();
  //   }
  // }, 1000);

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", e => {
      const newColorScheme = e.matches ? "dark" : "light";
      if (newColorScheme == "dark") {
        darkMode();
      } else {
        normalTheme();
      }
    });

  document.addEventListener('play', handlePlayback, true);
  document.addEventListener('pause', handlePlayback, true);
  document.addEventListener('ended', handlePlayback, true);

  $("#profile-container").show();
};

new Vue({
  render: h => h(App)
}).$mount("#app");
