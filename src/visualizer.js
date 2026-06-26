import { setMediaPlaying } from './theme';

const isAudioPlaying = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  return audioContext.state === 'running';
};

/**
 * Handle playback state changes
 * @deprecated Consider using setMediaPlaying directly from theme.js for new code
 */
export const handlePlayback = () => {
  // eslint-disable-next-line no-console
  console.debug('handlePlayback');
  if (isAudioPlaying()) {
    visualizerIsOn();
  } else {
    visualizerIsOff();
  }
};

const visualizerIsOn = () => {
  // Delegate to theme.js for unified state management
  setMediaPlaying(true);
  // Keep breathing-visualizer for backward compatibility
  document.body.classList.add('breathing-visualizer');
};

const visualizerIsOff = () => {
  // Delegate to theme.js for unified state management
  setMediaPlaying(false);
  // Keep breathing-visualizer for backward compatibility
  document.body.classList.remove('breathing-visualizer');
};
