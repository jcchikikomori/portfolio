<script>
  /**
   * VisualizerComponent - Animated audio visualizer bar strip
   *
   * Displays a row of 28 animated bars at the bottom of the page
   * that pulse when media is playing. Uses NES pixel palette colors
   * and stepped animations for an 8-bit retro aesthetic.
   */
  export default {
    name: 'VisualizerComponent',
    props: {
      isPlaying: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        bars: [],
        barCount: 28,
        // NES palette colors for bar height ranges
        // Bottom 60%: green, next 25%: yellow, top 15%: red
      };
    },
    mounted() {
      this.initializeBars();
    },
    methods: {
      /**
       * Initialize bar configurations with randomized heights and durations
       * Each bar gets a unique maxHeight (8-48px) and duration (350-850ms)
       */
      initializeBars() {
        const newBars = [];
        for (let i = 0; i < this.barCount; i++) {
          newBars.push({
            id: i,
            maxHeight: this.getRandomHeight(),
            duration: this.getRandomDuration(),
          });
        }
        this.bars = newBars;
      },

      /**
       * Generate random height between 8 and 48 pixels
       * @returns {number} Random height value
       */
      getRandomHeight() {
        return Math.floor(Math.random() * 41) + 8; // 8 to 48
      },

      /**
       * Generate random animation duration between 350 and 850 milliseconds
       * @returns {number} Random duration value
       */
      getRandomDuration() {
        return Math.floor(Math.random() * 501) + 350; // 350 to 850
      },

      /**
       * Get inline style for a bar element
       * @param {Object} bar - Bar configuration object
       * @returns {Object} Style object with CSS custom properties
       */
      getBarStyle(bar) {
        return {
          '--bar-max-h': `${bar.maxHeight}px`,
          animationDuration: `${bar.duration}ms`,
        };
      },
    },
  };
</script>

<template>
  <div class="visualizer-strip" :class="{ 'is-playing': isPlaying }">
    <span v-for="bar in bars" :key="bar.id" class="v-bar" :style="getBarStyle(bar)"></span>
  </div>
</template>

<style lang="scss" scoped>
  // NES palette colors
  $nes-green: #92cc41;
  $nes-yellow: #f7d51d;
  $nes-red: #e76e55;
  $bar-base-height: 4px;

  .visualizer-strip {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 52px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 2px;
    padding: 0 4px;
    z-index: 10;
    pointer-events: none;
    image-rendering: pixelated;
    background: transparent;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 300ms ease-out,
      visibility 300ms ease-out;

    &.is-playing {
      opacity: 1;
      visibility: visible;
    }
  }

  .v-bar {
    display: inline-block;
    width: calc(100% / 28 - 2px);
    max-width: 16px;
    height: $bar-base-height;
    background-color: $nes-green;
    transition: height 200ms steps(4);

    // Color by position - NES VU meter style
    // Bottom 60% (bars 1-17): green
    // Next 25% (bars 18-24): yellow
    // Top 15% (bars 25-28): red

    // Yellow bars (indices 17-23, 0-based)
    &:nth-child(n + 18):nth-child(-n + 24) {
      background-color: $nes-yellow;
    }

    // Red bars (indices 24-27, 0-based)
    &:nth-child(n + 25) {
      background-color: $nes-red;
    }
  }

  // When playing: animate bars with pulse keyframe
  .visualizer-strip.is-playing .v-bar {
    animation-name: v-bar-pulse;
    animation-timing-function: steps(4);
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }

  // When not playing: collapse bars to base height
  .visualizer-strip:not(.is-playing) .v-bar {
    height: $bar-base-height;
    animation: none;
  }

  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    .visualizer-strip.is-playing .v-bar {
      animation: none;
      height: var(--bar-max-h, 20px);
    }
  }

  // Hide visualizer on mobile for performance (tablet and up only)
  @media (max-width: 767px) {
    .visualizer-strip {
      display: none !important;
    }
  }
</style>
