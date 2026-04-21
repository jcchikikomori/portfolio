<script>
import { careers } from '../data/careers.js'

export default {
  name: "ProjectsComponent",
  components: {},
  data() {
    return {
      careers,
      logoErrors: {},
      selectedCareer: { company: '', screenshots: [] },
    }
  },
  methods: {
    isDark() {
      const dialog = document.getElementById('dialog-projects')
      return Boolean(dialog?.classList.contains('is-dark'))
    },
    logoSrc(career) {
      return this.isDark() && career.logoDark
        ? career.logoDark
        : career.logo
    },
    goToUrl(url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    },
    alert(msg) {
      alert(msg)
    },
    handleCardClick(career) {
      if (career.clickAction === 'url') {
        this.goToUrl(career.url)
      } else {
        this.alert(career.alertMsg)
      }
    },
    onLogoError(careerId) {
      if (!this.logoErrors[careerId]) {
        if (import.meta.env.DEV) {
          console.warn(`[ProjectsComponent] Logo failed to load for: ${careerId}`)
        }
        this.logoErrors = { ...this.logoErrors, [careerId]: true }
      }
    },
    showScreenshots(careerId) {
      const career = this.careers.find(c => c.id === careerId)
      if (!career) {return}
      this.selectedCareer = career
      const dialog = document.getElementById('dialog-screenshots')
      if (!dialog) {return}
      dialog.showModal()
    },
  },
}
</script>

<template>
  <!-- PROJECTS CONTAINER -->
  <div id="projects-container">
    <dialog id="dialog-projects" class="nes-dialog">
      <form method="dialog">
        <h1 class="title">My Career</h1>
        <p class="subtitle">
          See more by
          <a @click="goToUrl('https://github.com/jcchikikomori')"
            >contacting me</a
          >
          for my CV!
        </p>
        <div class="career-list">
          <div
            v-for="career in careers"
            :key="career.id"
            class="card"
            @click="handleCardClick(career)"
          >
            <div class="card-body">
              <template v-if="career.logo && !logoErrors[career.id]">
                <div class="card-body-logo">
                  <img
                    :src="logoSrc(career)"
                    :alt="career.company + ' logo'"
                    class="career-logo"
                    @error="onLogoError(career.id)"
                  />
                </div>
              </template>
              <template v-else>
                <div class="card-body-logo">
                  <i class="bi bi-x-lg career-logo-placeholder"></i>
                </div>
              </template>
              <h6 class="card-title">{{ career.company }}</h6>
              <!-- <p v-if="career.description" class="card-text">
                {{ career.description }}
              </p> -->
              <div class="card-body-flex">
                <span
                v-if="career.platforms.length > 0"
                class="platform-icons"
              >
                <i
                  v-for="icon in career.platforms"
                  :key="icon"
                  :class="'bi ' + icon"
                ></i>
                </span>
                <p class="card-text">
                  <small class="text-muted">{{ career.dates }}</small>
                </p>
              </div>
              <button
                v-if="career.screenshots.length > 0"
                class="btn nes-btn is-default screenshot-trigger"
                @click.stop="showScreenshots(career.id)"
              >Screenshots</button>
              <button
                v-if="career.screenshots.length <= 0"
                class="btn nes-btn is-disabled screenshot-trigger"
              >Screenshots</button>
            </div>
          </div>
        </div>

        <menu class="dialog-menu">
          <button class="btn nes-btn is-primary is-block">Okay</button>
        </menu>
      </form>
    </dialog>
    <dialog id="dialog-screenshots" class="nes-dialog">
      <form method="dialog">
        <div class="screenshot-header">
          <template v-if="selectedCareer.logo && !logoErrors[selectedCareer.id]">
            <img
              :src="logoSrc(selectedCareer)"
              :alt="selectedCareer.company + ' logo'"
              class="screenshot-logo"
              @error="onLogoError(selectedCareer.id)"
            />
          </template>
          <h2 class="title">{{ selectedCareer.company }} Screenshots</h2>
        </div>
        <div class="screenshot-gallery">
          <img
            v-for="(src, index) in selectedCareer.screenshots"
            :key="index"
            :src="src"
            :alt="selectedCareer.company + ' screenshot ' + (index + 1)"
            class="screenshot-img"
          />
        </div>
        <menu class="dialog-menu">
          <button class="btn nes-btn is-primary is-block">Close</button>
        </menu>
      </form>
    </dialog>
  </div>
</template>
