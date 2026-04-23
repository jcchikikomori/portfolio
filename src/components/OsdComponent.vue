<script>
  /**
   * OsdComponent - CRT On-Screen Display indicator
   *
   * Displays a "VIDEO 1" label in the upper-right corner when media
   * starts playing, simulating a classic CRT TV input channel indicator.
   * Auto-hides after 3 seconds.
   */
  export default {
    name: 'OsdComponent',
    props: {
      isPlaying: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        isVisible: false,
        hideTimeoutId: null,
        displayDuration: 3000, // 3 seconds
      };
    },
    watch: {
      isPlaying(newVal) {
        if (newVal) {
          this.showOsd();
        } else {
          this.hideOsd();
        }
      },
    },
    beforeUnmount() {
      this.clearHideTimeout();
    },
    methods: {
      /**
       * Show the OSD and start the auto-hide timer
       */
      showOsd() {
        this.clearHideTimeout();
        this.isVisible = true;
        this.hideTimeoutId = setTimeout(() => {
          this.isVisible = false;
        }, this.displayDuration);
      },

      /**
       * Immediately hide the OSD
       */
      hideOsd() {
        this.clearHideTimeout();
        this.isVisible = false;
      },

      /**
       * Clear any pending hide timeout
       */
      clearHideTimeout() {
        if (this.hideTimeoutId !== null) {
          clearTimeout(this.hideTimeoutId);
          this.hideTimeoutId = null;
        }
      },
    },
  };
</script>

<template>
  <div class="osd-indicator" :class="{ 'is-visible': isVisible }">
    <span class="osd-label">VIDEO 1</span>
  </div>
</template>

<style lang="scss" scoped>
  // Classic CRT OSD colors
  $osd-blue: #0000aa;
  $osd-text: #fff;
  $osd-glow: rgba(100, 200, 255, 0.6);

  .osd-indicator {
    position: fixed;
    top: 1rem;
    right: 1rem;
    padding: 0.25rem 0.75rem;
    background-color: $osd-blue;
    border: 2px solid lighten($osd-blue, 20%);
    z-index: var(--z-crt-toggle);
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 150ms ease-out,
      visibility 150ms ease-out;

    &.is-visible {
      opacity: 1;
      visibility: visible;
      animation: osd-flicker 150ms steps(3) forwards;
    }
  }

  .osd-label {
    display: block;
    font-family: var(--font-family-base);
    font-size: 1rem;
    font-weight: bold;
    color: $osd-text;
    text-shadow:
      0 0 4px $osd-glow,
      0 0 8px $osd-glow;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    .osd-indicator.is-visible {
      animation: none;
    }
  }
</style>
